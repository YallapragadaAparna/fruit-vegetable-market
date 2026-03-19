const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);

router.get("/", cartController.getCartItems);

router.delete("/:id", cartController.removeCartItem);

module.exports = router;