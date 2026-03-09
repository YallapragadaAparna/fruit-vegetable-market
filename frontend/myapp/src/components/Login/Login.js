import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email:email,
          password:password
        }
      );

      localStorage.setItem("token",res.data.token);

      setMessage("Login Successful");

      console.log(res.data);

    }catch(err){

      setMessage("Invalid Email or Password");

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
        onChange={(e)=>setEmail(e.target.value)}
        required
        />

        <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        />

        <button type="submit">Login</button>

        <p className="message">{message}</p>

      </form>

    </div>

  );
}

export default Login;