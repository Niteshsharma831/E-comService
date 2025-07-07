require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
connectDB();

// ✅ Middleware Setup
app.use(
  cors({
    origin: "https://shopizo-online.vercel.app", // your frontend domain
    credentials: true, // 👈 Required to allow cookies
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Welcome to E-commerce Backend");
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
