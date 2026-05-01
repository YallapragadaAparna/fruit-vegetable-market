// // import React, { useState, useEffect } from "react";
// // import api from "../../services/api";
// // import "./Profile.css";

// // function Profile() {

// //   const [user, setUser] = useState({
// //     name: "",
// //     email: ""
// //   });

// //   const [phone, setPhone] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [city, setCity] = useState("");
// //   const [dob, setDob] = useState("");

// //   const [photo, setPhoto] = useState("");
// //   const [photoFile, setPhotoFile] = useState(null);

// //   const [editPhone, setEditPhone] = useState(false);
// //   const [editAddress, setEditAddress] = useState(false);
// //   const [editCity, setEditCity] = useState(false);
// //   const [editDob, setEditDob] = useState(false);

// //   useEffect(() => {
// //     loadProfile();
// //   }, []);

// //   // ✅ LOAD PROFILE
// //   const loadProfile = async () => {
// //     try {
// //       const res = await api.get("/profile", {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`
// //         }
// //       });

// //       const data = res.data;

// //       setUser({
// //         name: data.name,
// //         email: data.email
// //       });

// //       setPhone(data.phone || "");
// //       setAddress(data.address || "");
// //       setCity(data.city || "");
// //       setDob(
// //         data.dob ? new Date(data.dob).toISOString().split("T")[0] : ""
// //       );

// //       // ✅ IMPORTANT: Cloudinary URL directly
// //       setPhoto(data.photo || "");

// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   // ✅ PHOTO PREVIEW
// //   const handlePhotoUpload = (e) => {
// //     const file = e.target.files[0];

// //     if (file) {
// //       setPhotoFile(file);
// //       setPhoto(URL.createObjectURL(file)); // preview only
// //     }
// //   };

// //   // ✅ SAVE PROFILE
// //   const handleSave = async () => {
// //     try {
// //       const formData = new FormData();

// //       formData.append("phone", phone);
// //       formData.append("address", address);
// //       formData.append("city", city);
// //       formData.append("dob", dob);

// //       if (photoFile) {
// //         formData.append("photo", photoFile);
// //       }

// //       const res = await api.post("/profile/update", formData, {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`
// //         }
// //       });

// //       // ✅ FIX: use direct Cloudinary URL
// //       const updatedUser = {
// //         ...user,
// //         profileImage: res.data.photo
// //       };

// //       localStorage.setItem("user", JSON.stringify(updatedUser));

// //       window.dispatchEvent(new Event("userUpdated"));

// //       alert("Profile Updated ✅");

// //       setEditPhone(false);
// //       setEditAddress(false);
// //       setEditCity(false);
// //       setEditDob(false);

// //       loadProfile();

// //     } catch (err) {
// //       console.log(err);
// //       alert("Error updating profile");
// //     }
// //   };

// //   // ✅ DELETE PHOTO
// //   const handleDeletePhoto = async () => {
// //     try {
// //       await api.delete("/profile/photo", {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`
// //         }
// //       });

// //       setPhoto("");
// //       setPhotoFile(null);

// //       const fileInput = document.getElementById("fileUpload");
// //       if (fileInput) fileInput.value = "";

// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div className="profile-container">
// //       <div className="profile-card">

// //         {/* IMAGE */}
// //         <div className="avatar-wrapper">
// //           {photo ? (
// //             <img
// //               src={photo}   // ✅ FIX: no IMAGE_URL
// //               className="profile-img"
// //               alt="profile"
// //             />
// //           ) : (
// //             <div className="profile-avatar">
// //               {user.name ? user.name.charAt(0).toUpperCase() : " "}
// //             </div>
// //           )}

// //           <div className="photo-actions">

// //             <input
// //               type="file"
// //               id="fileUpload"
// //               accept="image/*"
// //               onChange={handlePhotoUpload}
// //               style={{ display: "none" }}
// //             />

// //             <label htmlFor="fileUpload" className="upload-btn">
// //               Upload Photo
// //             </label>

// //             {photo && (
// //               <button className="delete-photo" onClick={handleDeletePhoto}>
// //                 Remove
// //               </button>
// //             )}

// //           </div>
// //         </div>

// //         {/* NAME */}
// //         <div className="profile-field">
// //           <label>Name</label>
// //           <p>{user.name}</p>
// //         </div>

// //         {/* EMAIL */}
// //         <div className="profile-field">
// //           <label>Email</label>
// //           <p>{user.email}</p>
// //         </div>

// //         {/* PHONE */}
// //         <div className="profile-field">
// //           <label>
// //             Phone
// //             <span className="edit-icon" onClick={() => setEditPhone(!editPhone)}>
// //               ✏️
// //             </span>
// //           </label>

// //           {editPhone ? (
// //             <input
// //               type="text"
// //               value={phone}
// //               onChange={(e) => setPhone(e.target.value)}
// //             />
// //           ) : (
// //             <p>{phone || "Not added"}</p>
// //           )}
// //         </div>

// //         {/* ADDRESS */}
// //         <div className="profile-field">
// //           <label>
// //             Address
// //             <span className="edit-icon" onClick={() => setEditAddress(!editAddress)}>
// //               ✏️
// //             </span>
// //           </label>

// //           {editAddress ? (
// //             <input
// //               type="text"
// //               value={address}
// //               onChange={(e) => setAddress(e.target.value)}
// //             />
// //           ) : (
// //             <p>{address || "Not added"}</p>
// //           )}
// //         </div>

// //         {/* CITY */}
// //         <div className="profile-field">
// //           <label>
// //             City
// //             <span className="edit-icon" onClick={() => setEditCity(!editCity)}>
// //               ✏️
// //             </span>
// //           </label>

// //           {editCity ? (
// //             <input
// //               type="text"
// //               value={city}
// //               onChange={(e) => setCity(e.target.value)}
// //             />
// //           ) : (
// //             <p>{city || "Not added"}</p>
// //           )}
// //         </div>

// //         {/* DOB */}
// //         <div className="profile-field">
// //           <label>
// //             Date of Birth
// //             <span className="edit-icon" onClick={() => setEditDob(!editDob)}>
// //               ✏️
// //             </span>
// //           </label>

// //           {editDob ? (
// //             <input
// //               type="date"
// //               value={dob}
// //               onChange={(e) => setDob(e.target.value)}
// //             />
// //           ) : (
// //             <p>{dob || "Not added"}</p>
// //           )}
// //         </div>

// //         <button className="save-btn" onClick={handleSave}>
// //           Save Changes
// //         </button>

// //       </div>
// //     </div>
// //   );
// // }

// // export default Profile;
// import React, { useState, useEffect } from "react";
// import api, { IMAGE_URL } from "../../services/api";
// import "./Profile.css";

// function Profile() {

//   const [user, setUser] = useState({ name: "", email: "" });
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [dob, setDob] = useState("");

//   const [photo, setPhoto] = useState("");
//   const [photoFile, setPhotoFile] = useState(null);

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       const res = await api.get("/profile", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       });

//       const data = res.data;

//       setUser({ name: data.name, email: data.email });
//       setPhone(data.phone || "");
//       setAddress(data.address || "");
//       setCity(data.city || "");
//       setDob(data.dob ? new Date(data.dob).toISOString().split("T")[0] : "");
//       setPhoto(data.photo || "");

//       // ✅ STORE USER IN LOCALSTORAGE (IMPORTANT)
//       localStorage.setItem("user", JSON.stringify(data));

//       // ✅ TRIGGER DASHBOARD UPDATE
//       window.dispatchEvent(new Event("userUpdated"));

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhotoFile(file);
//       setPhoto(URL.createObjectURL(file));
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("phone", phone);
//       formData.append("address", address);
//       formData.append("city", city);
//       formData.append("dob", dob);

//       if (photoFile) {
//         formData.append("image", photoFile); // ✅ MUST MATCH BACKEND
//       }

//       const res = await api.post("/profile/update", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       });

//       // ✅ UPDATE LOCAL STORAGE
//       localStorage.setItem("user", JSON.stringify(res.data));

//       window.dispatchEvent(new Event("userUpdated"));

//       alert("Profile Updated ✅");

//       loadProfile();

//     } catch (err) {
//       console.log(err);
//       alert("Error updating profile");
//     }
//   };

//   const handleDeletePhoto = async () => {
//     try {
//       await api.delete("/profile/photo", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       });

//       setPhoto("");
//       setPhotoFile(null);

//       // ✅ UPDATE LOCAL STORAGE
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       storedUser.photo = "";
//       localStorage.setItem("user", JSON.stringify(storedUser));

//       window.dispatchEvent(new Event("userUpdated"));

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">

//         {/* IMAGE */}
//         <div className="avatar-wrapper">
//           {photo ? (
//             <img
//               src={photo.startsWith("blob") ? photo : photo}
//               className="profile-img"
//               alt="profile"
//             />
//           ) : (
//             <div className="profile-avatar">
//               {user.name ? user.name.charAt(0).toUpperCase() : "U"}
//             </div>
//           )}
//         </div>

//         <input type="file" onChange={handlePhotoUpload} />
//         <button onClick={handleSave}>Save</button>

//         {photo && <button onClick={handleDeletePhoto}>Remove</button>}

//       </div>
//     </div>
//   );
// }

// export default Profile;
import React, { useState, useEffect } from "react";
import api from "../../services/api";
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

      // ✅ FIXED: store full Cloudinary URL
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
      setPhoto(URL.createObjectURL(file)); // preview only
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
        formData.append("image", photoFile); // ✅ match backend
      }

      const res = await api.post("/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // ✅ UPDATE LOCAL STORAGE WITH PHOTO
      const updatedUser = {
        ...user,
        photo: res.data.photo
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      window.dispatchEvent(new Event("userUpdated"));

      alert("Profile Updated ✅");

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

      setPhoto("");
      setPhotoFile(null);

      // ✅ UPDATE LOCAL STORAGE
      const storedUser = JSON.parse(localStorage.getItem("user"));
      storedUser.photo = "";
      localStorage.setItem("user", JSON.stringify(storedUser));

      window.dispatchEvent(new Event("userUpdated"));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* ✅ IMAGE FIXED */}
        <div className="avatar-wrapper">
          {photo ? (
            <img
              src={photo}   // ✅ NO IMAGE_URL, direct Cloudinary OR blob
              className="profile-img"
              alt="profile"
            />
          ) : (
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <div className="photo-actions">

            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />

            <label htmlFor="fileUpload" className="upload-btn">
              Upload Photo
            </label>

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

