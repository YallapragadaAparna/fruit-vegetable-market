// // const express = require("express")
// // const router = express.Router()

// // const Product = require("../models/Product")

// // // get products
// // router.get("/",async(req,res)=>{

// //     const products = await Product.find()

// //     res.json(products)

// // })

// // // add product
// // router.post("/",async(req,res)=>{

// //     const product = new Product(req.body)

// //     const saved = await product.save()

// //     res.json(saved)

// // })

// // module.exports = router
// const express = require("express");
// const router = express.Router();

// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   deleteProduct
// } = require("../controllers/productController");


// // GET all products
// router.get("/", getProducts);

// // GET single product
// router.get("/:id", getProductById);

// // ADD product
// router.post("/", addProduct);

// // DELETE product
// router.delete("/:id", deleteProduct);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { addProducts, getProducts, deleteProducts , updateProduct } =
require("../controllers/productController");
const uploadDir = "uploads/";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({

  destination: (req,file,cb)=>{
    cb(null,"uploads/");
  },

  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
  }

});

const upload = multer({storage});

router.get("/",getProducts);

router.post("/",upload.single("image"),addProducts);

router.delete("/:id",deleteProducts);
router.put("/:id", upload.single("image"), updateProduct);

module.exports = router;