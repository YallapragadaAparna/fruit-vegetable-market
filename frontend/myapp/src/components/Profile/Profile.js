import React, { useState, useEffect } from "react";
import api, { IMAGE_URL } from "../../services/api";
import "./Profile.css";

function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");

  const [photo, setPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  // ✅ EDIT STATES
  const [editPhone, setEditPhone] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editCity, setEditCity] = useState(false);
  const [editDob, setEditDob] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  // ✅ LOAD PROFILE
  const loadProfile = async () => {
    try {
      const res = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = res.data;

      setUser({
        name: data.name,
        email: data.email
      });

      setPhone(data.phone || "");
      setAddress(data.address || "");
      setCity(data.city || "");
      setDob(
        data.dob ? new Date(data.dob).toISOString().split("T")[0] : ""
      );
      setPhoto(data.photo || "");

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ PHOTO PREVIEW
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhotoFile(file);
      setPhoto(URL.createObjectURL(file));
    }
  };

  // ✅ SAVE PROFILE
  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("dob", dob);

      if (photoFile) {
        formData.append("photo", photoFile);
      }

        const res = await api.post("/profile/update", formData, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

// ✅ UPDATE LOCALSTORAGE (VERY IMPORTANT)
const updatedUser = {
  ...user,
  profileImage: res.data.photo || photo   // backend should send photo
};

localStorage.setItem("user", JSON.stringify(updatedUser));

// ✅ TRIGGER DASHBOARD UPDATE
window.dispatchEvent(new Event("userUpdated"));

alert("Profile Updated ✅");

      // close edit mode
      setEditPhone(false);
      setEditAddress(false);
      setEditCity(false);
      setEditDob(false);

      loadProfile();

    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }
  };

  // ✅ DELETE PHOTO
  const handleDeletePhoto = async () => {
    try {
      await api.delete("/profile/photo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // reset UI
      setPhoto("");
      setPhotoFile(null);

      // clear file input
      const fileInput = document.getElementById("fileUpload");
      if (fileInput) fileInput.value = "";

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* IMAGE */}
        <div className="avatar-wrapper">
          {photo ? (
            <img
              src={photo.startsWith("blob") ? photo : IMAGE_URL + photo}
              className="profile-img"
              alt="profile"
            />
          ) : (
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <div className="photo-actions">

            {/* HIDDEN INPUT */}
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />

            {/* UPLOAD BUTTON */}
            <label htmlFor="fileUpload" className="upload-btn">
              Upload Photo
            </label>

            {/* REMOVE BUTTON */}
            {photo && (
              <button className="delete-photo" onClick={handleDeletePhoto}>
                Remove
              </button>
            )}

          </div>
        </div>

        {/* NAME */}
        <div className="profile-field">
          <label>Name</label>
          <p>{user.name}</p>
        </div>

        {/* EMAIL */}
        <div className="profile-field">
          <label>Email</label>
          <p>{user.email}</p>
        </div>

        {/* PHONE */}
        <div className="profile-field">
          <label>
            Phone
            <span className="edit-icon" onClick={() => setEditPhone(!editPhone)}>
              ✏️
            </span>
          </label>

          {editPhone ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <p>{phone || "Not added"}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="profile-field">
          <label>
            Address
            <span className="edit-icon" onClick={() => setEditAddress(!editAddress)}>
              ✏️
            </span>
          </label>

          {editAddress ? (
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          ) : (
            <p>{address || "Not added"}</p>
          )}
        </div>

        {/* CITY */}
        <div className="profile-field">
          <label>
            City
            <span className="edit-icon" onClick={() => setEditCity(!editCity)}>
              ✏️
            </span>
          </label>

          {editCity ? (
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          ) : (
            <p>{city || "Not added"}</p>
          )}
        </div>

        {/* DOB */}
        <div className="profile-field">
          <label>
            Date of Birth
            <span className="edit-icon" onClick={() => setEditDob(!editDob)}>
              ✏️
            </span>
          </label>

          {editDob ? (
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          ) : (
            <p>{dob || "Not added"}</p>
          )}
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default Profile;