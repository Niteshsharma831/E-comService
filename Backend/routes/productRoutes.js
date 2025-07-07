const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  countProducts,
} = require("../controllers/productController");
router.post("/create", createProduct);
router.get("/getallproducts", getAllProducts);
router.get("/getproducts/:id", getProductById);
router.put("/updateproducts/:id", updateProduct);
router.delete("/deleteproducts/:id", deleteProduct);
router.get("/search", searchProducts);
router.get("/count", countProducts);

module.exports = router;
