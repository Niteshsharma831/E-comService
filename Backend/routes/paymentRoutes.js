// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");

// Razorpay instance - MUST MATCH .env names
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------------------------------
   1️⃣ CREATE RAZORPAY ORDER
---------------------------------- */
router.post("/create-razorpay-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) return res.status(400).json({ error: "Amount is required" });

    const options = {
      amount: Number(amount),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({ success: true, order });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
});

/* ---------------------------------
   2️⃣ VERIFY PAYMENT + SAVE ORDER
---------------------------------- */
router.post("/verify-razorpay-payment", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderPayload,
    } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment fields",
      });
    }

    // Generate signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    // Save order to DB
    const newOrder = await Order.create({
      ...orderPayload,
      status: "Confirmed",
      paymentId: razorpay_payment_id,
    });

    res.json({
      success: true,
      message: "Payment verified successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("Payment Verification Error:", err);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

module.exports = router;
