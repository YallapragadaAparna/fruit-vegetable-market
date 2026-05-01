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

  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 Detect reset route instantly (FIX)
  const isResetRoute = location.pathname.startsWith("/reset-password/");
  const resetToken = isResetRoute
    ? location.pathname.split("/")[2]
    : "";

  // 🔄 Background slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

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

      {/* 🔐 Login Modal */}
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

      {/* 📝 Register Modal */}
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

      {/* 🔑 Forgot Password Modal */}
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

      {/* 🔄 Reset Password Modal (FIXED) */}
      {isResetRoute && (
        <div className="overlay">
          <div className="modal">
            <ResetPassword
              token={resetToken}
              onClose={() => {
                navigate("/");
              }}
            />

            <button
              className="close-btn"
              onClick={() => {
                navigate("/");
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
