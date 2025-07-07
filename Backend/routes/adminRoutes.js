const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth");
const {
  createAdmin,
  loginAdmin,
  adminProfile,
  logoutAdmin,
} = require("../controllers/adminController");
// const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create-admin", createAdmin);
router.post("/admin-login", loginAdmin);
router.get("/admin-profile", adminAuth, adminProfile);
router.get("/logout", logoutAdmin);

module.exports = router;
