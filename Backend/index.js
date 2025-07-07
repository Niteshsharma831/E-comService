require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;

const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
connectDB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to E-commerce Backend");
});

// Server start
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
