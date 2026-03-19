import React, { useState } from "react";
import api from "../../services/api";
import "./Register.css";

function Register({ openLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password
      });

      // store user info
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      // ✅ updated success message
      setMessage(
        res.data.message ||
        "✅ Registration successful! A confirmation email has been sent to your email."
      );

      // clear fields
      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "❌ User already exists"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">

      <form className="register-form" onSubmit={handleRegister}>

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : "Register"}
        </button>

        {/* ✅ styled message */}
        {message && (
          <p className={`message ${message.includes("successful") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <p className="login-text">
          Already have an account?
          <span className="login-link" onClick={openLogin}>
            Login
          </span>
        </p>

      </form>
    </div>
  );
}

export default Register;