const product = require("../models/productModel");
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      stock,
      brand,
      tags,
      discount,
      sku,
    } = req.body;

    if (
      !name ||
      !Array.isArray(description) ||
      description.length === 0 ||
      !price ||
      !category ||
      !image ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required and description must be an array",
      });
    }

    const newProduct = await product.create({
      name,
      description,
      price,
      category,
      image,
      stock,
      brand,
      tags: tags || [],
      discount: discount || 0,
      sku: sku || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await product.find({ isActive: true });
    res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productItem = await product.findById(id);

    if (!productItem || !productItem.isActive) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product: productItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updatedAt = new Date();
    const updatedProduct = await product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming you're using Mongoose and soft delete via `isActive: false`
    const deletedProduct = await product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Missing search query" });
    }

    const regex = new RegExp(query, "i");
    let filter = {
      $or: [
        { name: { $regex: regex } },
        { category: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $in: [regex] } }, // ← Search inside tags array
      ],
    };

    if (!isNaN(query)) {
      filter = {
        $or: [...filter.$or, { price: { $lte: Number(query) } }],
      };
    }

    const results = await product.find(filter);
    res.status(200).json({ products: results });
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

const countProducts = async (req, res) => {
  try {
    const count = await product.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error counting products", error });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  countProducts,
};
