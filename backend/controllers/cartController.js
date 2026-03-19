const Cart = require("../models/Cart");


// Add item to cart
exports.addToCart = async (req, res) => {
  try {

    const cartItem = new Cart(req.body);

    await cartItem.save();

    res.json({ message: "Item added to cart", cartItem });

  } catch (error) {
    res.status(500).json(error);
  }
};


// Get all cart items
exports.getCartItems = async (req, res) => {
  try {

    const cartItems = await Cart.find();

    res.json(cartItems);

  } catch (error) {
    res.status(500).json(error);
  }
};


// Remove item
exports.removeCartItem = async (req, res) => {
  try {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({ message: "Item removed from cart" });

  } catch (error) {
    res.status(500).json(error);
  }
};