const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// ================= ADD PRODUCT =================
exports.addProducts = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    const image = req.file ? req.file.path : "";

    const product = new Product({
      name,
      price,
      category,
      stock,
      image,
    });

    const savedProduct = await product.save();
    res.json(savedProduct);

  } catch (error) {
    console.log("ADD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL PRODUCTS =================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET SINGLE PRODUCT (FIX 404) =================
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= DELETE PRODUCT =================
exports.deleteProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ delete from cloudinary
    if (product.image && product.image.includes("res.cloudinary.com")) {
      const publicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy("freshcart_uploads/" + publicId);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE PRODUCT =================
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    if (req.file) {

      // delete old cloudinary image
      if (product.image && product.image.includes("res.cloudinary.com")) {
        const publicId = product.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy("freshcart_uploads/" + publicId);
      }

      product.image = req.file.path;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
