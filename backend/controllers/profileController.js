// const User = require("../models/User");

// // ✅ GET PROFILE
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .select("-password")
//       .lean();

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error fetching profile" });
//   }
// };

// // ✅ UPDATE PROFILE (FINAL FIXED)
// exports.updateProfile = async (req, res) => {
//   try {
    
//     const { phone, address, city, dob } = req.body;

//     const updateData = {};

//     // ✅ IMPORTANT: allow empty values also
//     if (phone !== undefined) updateData.phone = phone;
//     if (address !== undefined) updateData.address = address;
//     if (city !== undefined) updateData.city = city;
//     if (dob !== undefined) updateData.dob = dob;

//     // ✅ FILE UPLOAD
//     if (req.file) {
//      // updateData.photo = `/uploads/${req.file.filename}`;
//     updateData.photo = req.file.path;
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       { $set: updateData },
//       {
//         new: true,
//         runValidators: true
//       }
//     )
//       .select("-password")
//       .lean();

//     res.json(updatedUser);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Update failed" });
//   }
// };

// // ✅ DELETE PHOTO
// exports.deletePhoto = async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(
//       req.user.id,
//       { $set: { photo: "" } },
//       { new: true }
//     );

//     res.json({ message: "Photo removed" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Delete failed" });
//   }
// };
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.log("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};


// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { phone, address, city, dob } = req.body;

    const updateData = {};

    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (dob !== undefined) updateData.dob = dob;

    // ✅ HANDLE IMAGE
    if (req.file) {
      const user = await User.findById(req.user.id);

      // 🔥 SAFE DELETE (only if valid)
      if (user && user.photo && user.photo.includes("cloudinary")) {
        try {
          const parts = user.photo.split("/");
          const fileName = parts[parts.length - 1];
          const publicId = "freshcart_uploads/" + fileName.split(".")[0];

          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Cloudinary delete error:", err.message);
        }
      }

      // ✅ SAVE NEW IMAGE
      updateData.photo = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.json(updatedUser);

  } catch (err) {
    console.log("🔥 UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// ================= DELETE PHOTO =================
exports.deletePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.photo && user.photo.includes("cloudinary")) {
      try {
        const parts = user.photo.split("/");
        const fileName = parts[parts.length - 1];
        const publicId = "freshcart_uploads/" + fileName.split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log("Cloudinary delete error:", err.message);
      }
    }

    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { photo: "" } },
      { new: true }
    );

    res.json({ message: "Photo removed" });

  } catch (err) {
    console.log("DELETE PHOTO ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
