import React, { useState } from "react"; 
import api from "../../services/api";
import "./ForgotPassword.css";

function ForgotPassword({ openLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);      // ✅ start loading
    setMessage("");        // optional: clear old message

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);   // ✅ stop loading
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
          disabled={loading} // ✅ disable input while loading
        />

        <button 
          className="fp-btn" 
          type="submit"
          disabled={loading} // ✅ disable button
        >
          {/* {loading ? "Sending..." : "Send Reset Link"} */}
          {loading ? <span className="loader"></span> : "Send Reset Link"}
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