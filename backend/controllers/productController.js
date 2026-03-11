const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

// ADD PRODUCT
exports.addProducts = async (req, res) => {
  try {

    const { name, price, category, stock } = req.body;

    const image = req.file
      ? "/uploads/" + req.file.filename
      : "";

    const product = new Product({
      name,
      price,
      category,
      stock,
      image
    });

    const savedProduct = await product.save();

    res.json(savedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE PRODUCT
exports.deleteProducts = async (req, res) => {
  try {
       // find product first
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // delete image from uploads folder
    if (product.image) {

      const imagePath = path.join(__dirname, "..", product.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {

    const { name, price, category, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // update fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    // update image if new one uploaded
    if (req.file) {

      const fs = require("fs");
      const path = require("path");

      if (product.image) {
        const oldImage = path.join(__dirname, "..", product.image.replace(/^\/+/, ""));
        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }

      product.image = "/uploads/" + req.file.filename;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};