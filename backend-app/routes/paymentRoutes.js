import express from "express";

const router = express.Router();

router.post("/create-order", (req, res) => {
    const { amount, currency } = req.body;

    try {
        // Simulate the order response
        const order = {
            id: "order_placeholderID",
            amount: amount * 100,
            currency: currency || "INR",
            recipt: `receipt_${Date.now()}`,
        };

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: "Error creating the order", error: err.message });
    }
});

export default router;