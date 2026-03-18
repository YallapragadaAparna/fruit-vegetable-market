import React, { useState } from "react";
import api from "../../services/api";
import "./ResetPassword.css";

function ResetPassword({ token, onClose }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        password
      });

      setMessage(res.data.message);

      // ✅ Close modal + go home after success
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <form className="rp-form" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Reset Password</button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default ResetPassword;