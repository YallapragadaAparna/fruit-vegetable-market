// const Product = require("../models/Product");


// // GET all products
// exports.getProducts = async (req, res) => {

//   try {

//     const products = await Product.find();
//     res.json(products);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

// };


// // GET single product
// exports.getProductById = async (req, res) => {

//   try {

//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

// };


// // ADD product
// exports.addProduct = async (req, res) => {

//   try {

//     const product = new Product(req.body);

//     const savedProduct = await product.save();

//     res.json(savedProduct);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

// };


// // DELETE product
// exports.deleteProduct = async (req, res) => {

//   try {

//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json({ message: "Product deleted successfully" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

// };
const Product = require("../models/Product");

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

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};