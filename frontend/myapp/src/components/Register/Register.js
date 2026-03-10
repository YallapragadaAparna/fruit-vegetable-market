import React, { useState } from "react";
//import axios from "axios";
import api from "../../services/api";
import "./Register.css";

function Register({ openLogin }){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");

  const handleRegister = async (e)=>{
    e.preventDefault();

    try{

      const res = await api.post( "/auth/register",
        {
          name:name,
          email:email,
          password:password
        }
      );
       setMessage(res.data.message);
      setMessage("Registration Successful");

      setName("");
      setEmail("");
      setPassword("");

    }catch(err){

      setMessage("User already exists");

    }
  };

  return(

    <div className="register-container">

      <form className="register-form" onSubmit={handleRegister}>

        <h2>Register</h2>

        <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
        />

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

        <button type="submit">Register</button>

        <p className="message">{message}</p>
       
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