import express from "express";
import multer from "multer";
import products from "../data/product.js";

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
const upload = multer({ storage });

// Fetch all products
router.get("/list", (req, res) => {
  try {
    res.status(200).json(products[0].products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// Fetch a single product by ID
router.get("/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const product = products[0].products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
});

// Add a new product with image
router.post("/add", upload.single("image"), (req, res) => {
  try {
    const { title, price, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "https://via.placeholder.com/150";

    const newProduct = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      category,
      thumbnail: `https://capstone-e-commerce-project.onrender.com${imageUrl}`,
    };

    products[0].products.push(newProduct);
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
});

// Delete a product
router.delete("/delete/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const productIndex = products[0].products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    products[0].products.splice(productIndex, 1);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

export default router;