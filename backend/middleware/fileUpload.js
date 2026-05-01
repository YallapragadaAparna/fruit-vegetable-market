// // const multer = require("multer");

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   }
// // });

// // const fileUpload = multer({ storage });

// // module.exports = fileUpload;
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "freshcart_uploads",
//     allowed_formats: ["jpg", "png", "jpeg"]
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "freshcart_uploads",
//       allowed_formats: ["jpg", "png", "jpeg"],
//       public_id: Date.now() + "-" + file.originalname,
//     };
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;
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
