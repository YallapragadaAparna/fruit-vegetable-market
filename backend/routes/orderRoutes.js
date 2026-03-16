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
// Admin - Update order status
//router.post("/admin/order/:id/status", orderController.updateOrderStatus);

router.put("/:id/status",  orderController.updateOrderStatus);
module.exports = router;