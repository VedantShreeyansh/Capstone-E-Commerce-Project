import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Fix the typo in the route prefix
app.use("/api/auth", authRoutes);

mongoose.connect("mongodb+srv://vedant1204:vedant1204@cluster0.3ojt6wy.mongodb.net/e-commerce")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.listen(5000, () => console.log("Server is running on port 5000"));