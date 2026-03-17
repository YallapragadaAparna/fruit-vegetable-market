// import React, { useState } from "react";
// import api from "../../services/api";
// import "./ForgotPassword.css";
// import { Link } from "react-router-dom";

// function ForgotPassword() {

//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
  

//   const handleReset = async () => {
//     try {
//       const res = await api.put("/auth/forgot-password", {
//         email,
//         newPassword
//       });

//       alert(res.data.message);
//     } catch (err) {
//       alert("Error resetting password");
//     }
//   };

//   return (
//     <div className="fp-container">

//       <div className="fp-form">

//         <h2>Forgot Password</h2>

//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Enter New Password"
//           value={newPassword}
//           onChange={(e)=>setNewPassword(e.target.value)}
//         />

//         <button onClick={handleReset}>
//           Reset Password
//         </button>

//         <div className="fp-back">
//           <Link to="/login">Back to Login</Link>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default ForgotPassword;
import React, { useState } from "react";
import api from "../../services/api";
import "./ForgotPassword.css";

function ForgotPassword({ openLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fp-container">
      <form className="fp-form" onSubmit={handleSubmit}>
        <h2 className="fp-title">Forgot Password</h2>

        <input
          className="fp-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="fp-btn" type="submit">
          Send Reset Link
        </button>

        {message && <p className="fp-message">{message}</p>}

        <p className="fp-login-text">
          Remember password?
          <span className="fp-login-link" onClick={openLogin}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;