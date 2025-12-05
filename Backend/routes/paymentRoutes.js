const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");
const adminAuth = require("../middlewares/adminAuth"); // ✅ your existing middleware

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------------------------------
   1️⃣ CREATE ORDER
---------------------------------- */
router.post("/create-razorpay-order", async (req, res) => {
  try {
    let { amount } = req.body;

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "Amount required" });
    }

    amount = Number(amount);

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    return res.json({ success: true, order });
  } catch (err) {
    console.error("❌ Error Creating Razorpay Order:", err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

/* ---------------------------------
   2️⃣ VERIFY PAYMENT
---------------------------------- */
router.post("/verify-razorpay-payment", adminAuth, async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderPayload,
    } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Signature verification
    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Signature verification failed" });
    }

    // SAVE ORDER IN DATABASE
    const newOrder = await Order.create({
      ...orderPayload,
      userId: req.adminId, // ✅ use token from your middleware
      paymentId: razorpay_payment_id,
      paymentStatus: "Success",
    });

    return res.json({
      success: true,
      orderId: newOrder._id,
      message: "Payment verified successfully",
    });
  } catch (err) {
    console.error("❌ Razorpay Verification Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Verification failed" });
  }
});

module.exports = router;
