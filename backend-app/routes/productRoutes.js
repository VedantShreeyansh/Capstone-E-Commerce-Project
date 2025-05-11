import express from "express";
import products from "../data/product.js";

const router = express.Router();

router.get("/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products[0].products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});

export default router;