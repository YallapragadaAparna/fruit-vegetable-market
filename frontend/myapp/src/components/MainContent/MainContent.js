import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <div className="navLinks">
          <h3>Fresh Cart(Fruits & Vegetables)</h3>
          <a href="/">Home</a>
          <button onClick={() => setShowLogin(true)}>Login</button>
           <button onClick={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}>
            Register
          </button>

          {/* <a href="/admin">Admin</a> */}
        </div>
      </div>

      {/* Background */}
      <div
        className="page-content"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <h1>Fresh Cart(Fruits & Vegetables)</h1>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <div className="overlay">
          <div className="modal">
            <Login openRegister={() => {
                setShowLogin(false);
          setShowRegister(true);
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
      {/* Register Popup */}
      {showRegister && (
        <div className="overlay">
          <div className="modal">
            <Register  openLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
            <button className="close-btn" onClick={() => setShowRegister(false)}>X</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default MainContent;