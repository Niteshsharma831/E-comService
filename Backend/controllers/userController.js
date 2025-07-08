const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const querySchema = require("../models/Query");
const Order = require("../models/orderModel");

const SECRET_KEY = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  try {
    const { name, email, password, address, phone, gender, profilePicture } =
      req.body;

    if (!name || !email || !password || !address || !phone || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      gender,
      profilePicture,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // ✅ Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Set token as a secure cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // Required for Render (HTTPS)
        sameSite: "None", // Required for cross-origin
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          profile: newUser.profilePicture,
          phone: newUser.phone,
          gender: newUser.gender,
          address: newUser.address,
          isAdmin: newUser.isAdmin,
        },
      });

    await newUser.save();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          profilePicture: user.profilePicture,
          address: user.address,
          isAdmin: user.isAdmin,
        },
      });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    sameSite: "Lax",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // We'll extract this from token or middleware

    const user = await userModel.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user profile", error: error.message });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;

    const updatedUser = await userModel
      .findByIdAndUpdate(
        req.userId, // from token!
        { name, email, address, phone },
        { new: true, runValidators: true }
      )
      .select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

const countUsers = async (req, res) => {
  try {
    const total = await User.countDocuments();
    const admins = await User.countDocuments({ role: "admin" });

    res.status(200).json({
      users: total,
      admins: admins,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to count users", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing user ID." });
  }

  try {
    const updates = {};
    for (let key in req.body) {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await userModel.findById(req.userId);

    const existingItem = user.cart.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      user.cart.push({ productId, quantity: quantity || 1 });
    }

    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add to cart", error: error.message });
  }
};

// 👉 Get Cart
const getCart = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .populate("cart.productId");

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get cart", error: error.message });
  }
};

// 👉 Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await userModel.findById(req.userId);

    user.cart = user.cart.filter((item) => !item.productId.equals(productId));

    await user.save();
    res.status(200).json({ message: "Item removed", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove item", error: error.message });
  }
};

// 👉 Clear Cart
const clearCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    user.cart = [];

    await user.save();
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to clear cart", error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("👉 UserID:", userId);
    console.log("👉 Request Body:", JSON.stringify(req.body, null, 2));

    const { fullName, gender, phone, address, pincode, paymentMethod, items } =
      req.body;

    if (
      !fullName ||
      !gender ||
      !phone ||
      !address ||
      !pincode ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let orderItems = [];

    // Check if "Buy Now" items are provided
    if (items && Array.isArray(items) && items.length > 0) {
      // Validate all productIds
      for (let item of items) {
        if (!mongoose.Types.ObjectId.isValid(item.productId)) {
          return res
            .status(400)
            .json({ message: `Invalid productId: ${item.productId}` });
        }
      }

      orderItems = items.map((item) => ({
        productId: new mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity || 1,
      }));
    } else {
      // Use items from user's cart
      const user = await User.findById(userId).populate("cart.productId");
      if (!user || !user.cart || user.cart.length === 0) {
        return res.status(400).json({ message: "Cart is empty." });
      }

      orderItems = user.cart.map((item) => ({
        productId: item.productId._id || item.productId,
        quantity: item.quantity || 1,
      }));
    }

    console.log("🛒 Final Order Items:", orderItems);

    const newOrder = await Order.create({
      userId,
      fullName,
      gender,
      phone,
      address,
      pincode,
      paymentMethod,
      items: orderItems,
    });

    // Clear user's cart if it was a cart-based order
    if (!items || items.length === 0) {
      await User.findByIdAndUpdate(userId, { $set: { cart: [] } });
    }

    console.log("✅ Order created:", newOrder._id);

    return res.status(201).json({
      message: "✅ Order placed!",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ Order Error:", error.message);
    return res.status(500).json({
      message: "Something went wrong while placing order.",
      error: error.message,
    });
  }
};
// ✅ Get Orders for Logged-in User
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).populate(
      "items.productId"
    );
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const submitQuery = async (req, res) => {
  try {
    const { name, email, category, message } = req.body;

    if (!name || !email || !category || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newQuery = await querySchema.create({
      userId: req.userId, // ✅ Use this
      name,
      email,
      category,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Query submitted successfully",
      data: newQuery,
    });
  } catch (error) {
    console.error("Query Submission Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getQueries = async (req, res) => {
  try {
    const userId = req.userId;
    const queries = await querySchema.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: queries,
    });
  } catch (error) {
    console.error("Fetch Queries Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  countUsers,
  getAllUsers,
  deleteUser,
  updateUser,
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  createOrder,
  getMyOrders,
  submitQuery,
  getQueries,
};
