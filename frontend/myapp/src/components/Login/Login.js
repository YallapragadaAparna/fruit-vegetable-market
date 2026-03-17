import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import api from "../../services/api";
import "./Login.css";

function Login({ openRegister,openForgot }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/auth/login", {
        email,
        password
      });

      const { token, user } = res.data;

      // Save token
      localStorage.setItem("token", token);
          // Save full user object
      localStorage.setItem("user", JSON.stringify(user));


    
      // Save userId separately (important for orders)
      localStorage.setItem("userId", user.id);
      
      // Debug logs
      console.log("Login Successful");
      console.log("User:", user);
      console.log("UserId stored:", user.id);

      setMessage("Login Successful");

      // Navigate based on role
      if (user.role === "admin") {
        navigate("/adminproducts");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {

      console.log("Login Error:", err);

      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Invalid Email or Password");
      }

    }
  };

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleLogin}>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* <p className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p> */}
            <p className="forgot-password">
  <span onClick={openForgot} style={{ cursor: "pointer" }}>
    Forgot Password?
  </span>
</p>

        <button type="submit">Login</button>

        {message && <p className="message">{message}</p>}

        <p className="register-text">
          Don't have an account?
          <span className="register-link" onClick={openRegister}>
            Register
          </span>
        </p>

      </form>

    </div>
  );
}

export default Login;