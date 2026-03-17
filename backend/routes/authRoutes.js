// const express = require("express");
// const router = express.Router();

// const {
//   registerUser,
//   loginUser,
//   forgotPassword,
//    resetPassword
// } = require("../controllers/authController");

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

// module.exports = router;
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// ✅ Correct routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;