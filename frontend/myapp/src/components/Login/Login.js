// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api  from "../../services/api";
// //import axios from "axios";
// import "./Login.css";

// function Login({ openRegister }) {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//     const res = await api.post("/auth/login",
//         {
//           email: email,
//           password: password
//         }
//       );

//       localStorage.setItem("token", res.data.token);
//       console.log(res.data.user);  
//       setMessage("Login Successful");
      
//       // get role from response
//       const role = res.data.user.role;

//       // navigate based on role
//       if (role === "admin") {
//         navigate("/adminproducts");
//       } else {
//         navigate("/dashboard");
//       }

//     } catch (err) {
//       setMessage("Invalid Email or Password");
//     }
//   };

//   return (

//     <div className="login-container">

//       <form className="login-form" onSubmit={handleLogin}>

//         <h2>Login</h2>

//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <p className="forgot-password">
//           <Link to="/forgot-password">Forgot Password?</Link>
//         </p>

//         <button type="submit">Login</button>

//         <p className="message">{message}</p>

//         <p className="register-text">
//           Don't have an account?
//           <span className="register-link" onClick={openRegister}>
//             Register
//           </span>
//         </p>

//       </form>

//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";

function Login({ openRegister }) {

const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const handleLogin = async (e) => {
e.preventDefault();

try {

  const res = await api.post("/auth/login", {
    email: email,
    password: password
  });

  // save token
  localStorage.setItem("token", res.data.token);

  // save user details
  localStorage.setItem("user", JSON.stringify(res.data.user));

  setMessage("Login Successful");

  const role = res.data.user.role;

  // navigate based on role
  if (role === "admin") {
    navigate("/adminproducts");
  } else {
    navigate("/dashboard");
  }

} catch (err) {

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

    <p className="forgot-password">
      <Link to="/forgot-password">Forgot Password?</Link>
    </p>

    <button type="submit">Login</button>

    <p className="message">{message}</p>

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
