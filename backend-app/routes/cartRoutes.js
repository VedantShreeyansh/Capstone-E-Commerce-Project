import express from "express";
import User from "../models/User.js";
import { authenticateToken } from "../Middleware/Auth.js";

const router = express.Router();

router.get("/", authenticateToken, async ( req, res) => {
    try {
      const user = await User.findById(req.user.id).populate("cart.productId");
      res.status(200).json(user.cart);
    } catch (err) {
      res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
  });
  
  router.post("/add", authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
       const user = await User.findById(req.user.id);
       const existingItem = user.cart.find((item) => item.productId.toString() === productId);
  
       if (existingItem) {
          existingItem.quantity += quantity;
       } else {
          user.cart.push({ productId, quantity });
       }
  
       await user.save();
       res.status(200).json({ message: "Item added to cart", cart: user.cart})
    } catch (err) {
       res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
  });
  
  router.post("/update", authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const item = user.cart.find((item) => item.productId.toString() === productId);
  
      if (item) {
        item.quantity = quantity;
        await user.save();
        res.status(200).json({ message: "Cart updated", cart: user.cart });
      } else {
        res.status(404).json({ message: "Item not found in cart"});
      }
    } catch (err) {
        res.status(500).json({ message: "Error updating cart", error: err.message });
    }
  });
  
  // Remove item from cart
  router.delete("/remove/:productId", authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.cart = user.cart.filter((item) => item.productId.toString() !== req.params.productId);
      await user.save();
      res.status(200).json({ message: "Item removed from cart", cart: user.cart });
    }
    catch (err) {
      res.status(500).json({ message: "Error removing item", error: err.message });
    }
  });

export default router;