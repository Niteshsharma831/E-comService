const dotenv = require("dotenv");

// Load environment variables based on NODE_ENV
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
const cookieParser = require("cookie-parser");

// Database Connection
const connectDB = require("./config/db");
connectDB();

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://shopizo-online.vercel.app",
];

// CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("❌ Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

// Health Check
app.get("/", (req, res) => {
  res.send("✅ Welcome to E-commerce Backend");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
