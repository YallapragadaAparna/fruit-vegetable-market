const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

////////////////////////////////////////////////////
// Place Order
exports.placeOrder = async (req, res) => {
  try {
    //console.log("REQ BODY:", req.body);
    const { userId, items, totalAmount, name, phone, address, city, payment } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items required",
      });
    }

    const newOrder = new Order({
      userId,
      name,
      phone,
      address,
      city,
      payment,
      items,
      totalAmount,
    });

    await newOrder.save();

    await Cart.deleteMany({ userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("Place Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
};

////////////////////////////////////////////////////
// Get My Orders
exports.getMyOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log("Get Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

////////////////////////////////////////////////////
// Get Single Order
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Order ID",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log("Get Order By Id Error:", error);

    res.status(500).json({
      message: "Error fetching order",
    });
  }
};
// Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {

    console.log("Get All Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }

};
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const { status } = req.body;

//     // Only allow valid enum values
//     if (!["Pending", "Accepted", "Declined"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found." });
//     }

//     res.json(updatedOrder);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Allow all valid statuses
    if (!["Pending", "Accepted", "Declined", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json(updatedOrder);

  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: error.message });
  }
};