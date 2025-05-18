import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const corsOptions = {
  origin: ["http://localhost:5173", "https://capstone-e-commerce-project.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Fix the typo in the route prefix
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

mongoose.connect("mongodb+srv://vedant1204:vedant1204@cluster0.3ojt6wy.mongodb.net/e-commerce")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

  app.get("/", (req, res) => {
    res.send("Backend is running. Use the API routes to interact with the server.");
  });

app.listen(5000, () => console.log("Server is running on port 5000"));