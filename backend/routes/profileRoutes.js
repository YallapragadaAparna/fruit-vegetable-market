const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const fileupload = require("../middleware/fileUpload");

const {
  getProfile,
  updateProfile,
  deletePhoto
} = require("../controllers/profileController");

// ✅ GET PROFILE
router.get("/", authMiddleware, getProfile);

// ✅ UPDATE PROFILE
router.post(
  "/update",
  authMiddleware,
  fileupload.single("photo"),
  updateProfile
);

// ✅ DELETE PHOTO
router.delete("/photo", authMiddleware, deletePhoto);

module.exports = router;