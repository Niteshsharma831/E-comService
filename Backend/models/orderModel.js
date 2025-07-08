const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Processing", "Confirmed", "Delivered", "Cancelled"], // 👈 "Cancelled" is the correct spelling
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Correct model name and schema reference
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
