const express = require("express");
const router = express.Router();

const upload = require("../middleware/fileUpload");

const {
  addProducts,
  getProducts,
  getSingleProduct,
  deleteProducts,
  updateProduct,
} = require("../controllers/productController");

router.post("/", upload.single("image"), addProducts);
router.get("/", getProducts);

// ✅ FIX: needed for /api/products/:id
router.get("/:id", getSingleProduct);

router.delete("/:id", deleteProducts);
router.put("/:id", upload.single("image"), updateProduct);

module.exports = router;
