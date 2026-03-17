// import React, { useState, useEffect} from "react";
// import { useLocation } from "react-router-dom";
// import Footer from "../Footer/Footer";
// import Register from "../Register/Register";
// import Login from "../Login/Login";
// import ForgotPassword from "../ForgotPassword/ForgotPassword";
// import ResetPassword from "../ResetPassword/ResetPassword";
// import "./MainContent.css";

// function MainContent() {
//   const images = [
//     "/images/logo1.png",
//     "/images/logo2.png",
//     "/images/logo3.png"
//   ];

//   const [currentImage, setCurrentImage] = useState(0);
//   const [showLogin, setShowLogin] = useState(false);
//  const [showRegister, setShowRegister] = useState(false);
//  const [showForgot, setShowForgot] = useState(false);
//  const [showReset, setShowReset] = useState(false);
//  const [resetToken, setResetToken] = useState("");
// const location = useLocation();
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length]);
//   useEffect(() => {
//   if (location.pathname.includes("reset-password")) {
//     const token = location.pathname.split("/").pop();
//     setResetToken(token);
//     setShowReset(true);
//   }
// }, [location]);

//   return (
//     <>
//       {/* Navbar */}
//       <div className="navbar">
//         <div className="navLinks">
//           <h3>Fresh Cart(Fruits & Vegetables)</h3>
//           <a href="/">Home</a>
//           <button onClick={() => setShowLogin(true)}>Login</button>
//            <button onClick={() => {
//             setShowRegister(true);
//             setShowLogin(false);
//           }}>
//             Register
//           </button>

//           {/* <a href="/admin">Admin</a> */}
//         </div>
//       </div>

//       {/* Background */}
//       <div
//         className="page-content"
//         style={{ backgroundImage: `url(${images[currentImage]})` }}
//       >
//         <h1>Fresh Cart(Fruits & Vegetables)</h1>
//       </div>

//       {/* Login Popup */}
//       {showLogin && (
//         <div className="overlay">
//           <div className="modal">
//             <Login openRegister={() => {
//                 setShowLogin(false);
//           setShowRegister(true);
//         }} 
//          openForgot={() => {
//     setShowLogin(false);   // close login
//     setShowForgot(true);   // open forgot password
//   }}
//       />
//             <button
//               className="close-btn"
//               onClick={() => setShowLogin(false)}
//             >
//               X
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Register Popup */}
//       {showRegister && (
//         <div className="overlay">
//           <div className="modal">
//             <Register  openLogin={() => {
//           setShowRegister(false);
//           setShowLogin(true);
//         }}
//       />

//             <button className="close-btn" onClick={() => setShowRegister(false)}>X</button>
//           </div>
//         </div>
//       )}
//       {showForgot && (
//   <div className="overlay">
//     <div className="modal">
//       <ForgotPassword 
//         openLogin={() => {
//           setShowForgot(false);
//           setShowLogin(true);
//         }}
//       />
//       <button 
//         className="close-btn" 
//         onClick={() => setShowForgot(false)}
//       >
//         X
//       </button>
//     </div>
//   </div>
// )}
// {showReset && (
//   <div className="overlay">
//     <div className="modal">
//       <ResetPassword token={resetToken} />
//       <button
//         className="close-btn"
//         onClick={() => setShowReset(false)}
//       >
//         X
//       </button>
//     </div>
//   </div>
// )}

//       <Footer />
//     </>
//   );
// }

// export default MainContent;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import "./MainContent.css";

function MainContent() {
  const images = [
    "/images/logo1.png",
    "/images/logo2.png",
    "/images/logo3.png"
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // 🔄 Background image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // 🔥 Handle reset-password route
  useEffect(() => {
    if (location.pathname.startsWith("/reset-password/")) {
      const token = location.pathname.split("/")[2];

      setResetToken(token);

      // close other modals
      setShowLogin(false);
      setShowRegister(false);
      setShowForgot(false);

      setShowReset(true);
    } else {
      setShowReset(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* ✅ Navbar */}
      <div className="navbar">
        <div className="navLinks">
          <h3>Fresh Cart(Fruits & Vegetables)</h3>
          <a href="/">Home</a>

          <button onClick={() => setShowLogin(true)}>Login</button>

          <button
            onClick={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
          >
            Register
          </button>
        </div>
      </div>

      {/* ✅ Background */}
      <div
        className="page-content"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <h1>Fresh Cart(Fruits & Vegetables)</h1>
      </div>

      {/* 🔐 Login Popup */}
      {showLogin && (
        <div className="overlay">
          <div className="modal">
            <Login
              openRegister={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
              openForgot={() => {
                setShowLogin(false);
                setShowForgot(true);
              }}
            />
            <button
              className="close-btn"
              onClick={() => setShowLogin(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* 📝 Register Popup */}
      {showRegister && (
        <div className="overlay">
          <div className="modal">
            <Register
              openLogin={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
            />
            <button
              className="close-btn"
              onClick={() => setShowRegister(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* 🔑 Forgot Password Popup */}
      {showForgot && (
        <div className="overlay">
          <div className="modal">
            <ForgotPassword
              openLogin={() => {
                setShowForgot(false);
                setShowLogin(true);
              }}
            />
            <button
              className="close-btn"
              onClick={() => setShowForgot(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* 🔄 Reset Password Popup */}
      {showReset && (
        <div className="overlay">
          <div className="modal">
            <ResetPassword token={resetToken} />

            <button
              className="close-btn"
              onClick={() => {
                setShowReset(false);
                navigate("/"); // 🔥 go back to home
              }}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* ✅ Footer */}
      <Footer />
    </>
  );
}

export default MainContent;