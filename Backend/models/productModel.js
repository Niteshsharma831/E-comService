const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: [String], 
lowercase: true,
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: "Description must have at least one point.",
    },
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  brand: {
    type: String,
    trim: true,
    lowercase: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true,
    lowercase: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  weight: {
    type: Number,
  },
  dimensions: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
