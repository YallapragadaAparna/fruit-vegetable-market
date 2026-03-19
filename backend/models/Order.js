const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  payment: {
    type: String,
    default: "Cash on Delivery"
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      name: String,

      price: Number,

      quantity: Number,
       weight: String  

    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },
    status: {
    type: String,
    enum: ["Pending", "Accepted", "Declined"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);