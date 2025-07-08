const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
  countUsers,
  getAllUsers,
  deleteUser,
  updateUser,
  updateUserProfile,
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  createOrder,
  getMyOrders,
  submitQuery,
  getQueries,
  updateOrderStatus,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

// User routes
router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/getallusers", getAllUsers);
router.get("/count", countUsers);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.put("/update", authMiddleware, updateUserProfile);

// Cart routes (protected)
router.post("/cart/add", authMiddleware, addToCart);
router.get("/cart", authMiddleware, getCart);
router.delete("/cart/:productId", authMiddleware, removeFromCart);
router.delete("/cart/clear", authMiddleware, clearCart);

// Order routes
router.post("/create-order", authMiddleware, createOrder);
router.get("/mine", authMiddleware, getMyOrders);
router.put("/update-status/:id", authMiddleware, updateOrderStatus);

// Queries
router.post("/query", authMiddleware, submitQuery);
router.get("/query", authMiddleware, getQueries);

module.exports = router;
