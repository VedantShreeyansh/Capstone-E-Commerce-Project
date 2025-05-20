import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const allowedOrigins = [
  "https://capstone-e-commerce-project.vercel.app", // Production frontend
  "http://localhost:5173", // Development frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // Include OPTIONS for preflight requests
  allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://vedant1204:vedant1204@cluster0.3ojt6wy.mongodb.net/e-commerce")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Start the server
app.listen(5000, () => console.log("Server is running on port 5000"));