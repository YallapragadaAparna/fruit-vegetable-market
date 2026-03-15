const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Place order
router.post("/place-order", orderController.placeOrder);

// Get orders of user
router.get("/my-orders/:userId", orderController.getMyOrders);

// Get single order
router.get("/:id", orderController.getOrderById);

module.exports = router;