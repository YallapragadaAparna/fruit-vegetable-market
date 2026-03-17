const User = require("../models/User");

// ✅ GET PROFILE
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
    console.log(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// ✅ UPDATE PROFILE (FINAL FIXED)
exports.updateProfile = async (req, res) => {
  try {
    
    const { phone, address, city, dob } = req.body;

    const updateData = {};

    // ✅ IMPORTANT: allow empty values also
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (dob !== undefined) updateData.dob = dob;

    // ✅ FILE UPLOAD
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true
      }
    )
      .select("-password")
      .lean();

    res.json(updatedUser);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
};

// ✅ DELETE PHOTO
exports.deletePhoto = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { photo: "" } },
      { new: true }
    );

    res.json({ message: "Photo removed" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Delete failed" });
  }
};