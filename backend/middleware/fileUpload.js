const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "freshcart_uploads",

      // ✅ FIX: remove extension duplication
      public_id: Date.now() + "-" + file.originalname.split(".")[0],

      // optional but good
      resource_type: "image"
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
