const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Place order
router.post("/place-order", orderController.placeOrder);

// Get orders of user
router.get("/my-orders/:userId", orderController.getMyOrders);
// Admin - Get all orders
router.get("/admin-orders", orderController.getAllOrders);
// Get single order
router.get("/:id", orderController.getOrderById);


module.exports = router;