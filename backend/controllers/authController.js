const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // role: role || "user"
    role: role ? role : "user"   
    });
      // ✅ EMAIL SETUP
    const transporter = nodemailer.createTransport({
      //service: "gmail",
        host: "smtp.gmail.com",
    port: 587,
    secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // use app password
      }
    });
        // ✅ SEND EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER ,
      to: email,
      subject: "Registration Successful 🎉",
      text: `Hello ${name},\n\nThis is from FreshCart(Online Fruits & Vegetables Store)\n\n Your registration was successful!\n\nThank you for joining us.`
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
   role: user.role

      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOGIN USER
exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
      // ✅ Save login time
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role  
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
  

    // ✅ EMAIL
    const transporter = nodemailer.createTransport({
      //service: "gmail",
        host: "smtp.gmail.com",
    port: 587,
    secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
      <p> This is from FreshCart(Online Fruits & Vegetables Store)</p>
              <h3>Password Reset Request</h3>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Reset link sent to your email" });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Email sending failed" });
  }
};
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
