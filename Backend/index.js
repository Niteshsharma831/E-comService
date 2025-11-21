require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
const cookieParser = require("cookie-parser");

// Database Connection
const connectDB = require("./config/db");
connectDB();

// -----------------------------------------
// ✅ CORS Setup for Localhost + Live Frontend
// -----------------------------------------
const allowedOrigins = [
  "http://localhost:3000", // React Local
  "http://localhost:5173", // Vite Local
  "https://shopizo-online.vercel.app", // Live frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// -----------------------------------------
// Middleware
// -----------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -----------------------------------------
// Routes
// -----------------------------------------
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// -----------------------------------------
// Health Check
// -----------------------------------------
app.get("/", (req, res) => {
  res.send("✅ Welcome to E-commerce Backend");
});

// -----------------------------------------
// Start Server
// -----------------------------------------
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
