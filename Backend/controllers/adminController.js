const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminSchema = require("../models/adminModel");

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, address, profile, gender } = req.body;

    if (!name || !email || !password || !phone || !address || !gender) {
      return res.status(400).json({
        message: "All fields except profile are required",
      });
    }

    const existingAdmin = await adminSchema.findOne({ email });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "Admin already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminSchema({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      phone,
      address,
      profile: profile || "",
      gender,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
        address: newAdmin.address,
        role: newAdmin.role,
        gender: newAdmin.gender,
        profile: newAdmin.profile,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating admin",
      error: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminSchema.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id }, "your_jwt_secret", {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        address: admin.address,
        role: admin.role,
        gender: admin.gender,
        profile: admin.profile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
const adminProfile = async (req, res) => {
  try {
    const adminId = req.adminId; // ✅ injected by middleware
    const admin = await adminSchema.findById(adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const logoutAdmin = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "Lax",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
module.exports = { createAdmin, loginAdmin, adminProfile, logoutAdmin };
