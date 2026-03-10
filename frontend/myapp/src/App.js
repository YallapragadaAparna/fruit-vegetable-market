// // // // import React from "react";
// // // // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // // // import Navbar from "./components/Navbar/Navbar";
// // // // import Footer from "./components/Footer/Footer";

// // // // import Home from "./pages/Home";
// // // // import Cart from "./pages/Cart";
// // // // import Admin from "./pages/Admin";
// // // // import Login from "./pages/Login/Login";

// // // // import "./App.css";

// // // // function App() {

// // // //   return (

// // // //     <BrowserRouter>

// // // //       <Navbar />

// // // //       <Routes>

// // // //         <Route path="/" element={<Home />} />
        
// // // //         <Route path="/Login" element={<Login />} />

// // // //         <Route path="/cart" element={<Cart />} />

// // // //         <Route path="/admin" element={<Admin />} />

// // // //       </Routes>

// // // //       <Footer />

// // // //     </BrowserRouter>

// // // //   );

// // // // }

// // // // export default App;
// // // import React from "react";
// // // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // // import Navbar from "./components/Navbar/Navbar";
// // // import Footer from "./components/Footer/Footer";
// // // import MainContent from "./components/MainContent/MainContent";
// // // import Home from "./pages/Home";
// // // import Cart from "./pages/Cart";
// // // import Admin from "./pages/Admin";
// // // import Login from "./pages/Login/Login";
// // // import Register from "./pages/Register/Register";

// // // import "./App.css";

// // // function App() {

// // //   return (

// // //     <BrowserRouter>

// // //       <div className="app-container">

// // //         <Navbar />
// // //         <MainContent/>

// // //         <div className="page-content">

// // //           <Routes>
           
// // //             <Route path="/" element={<Home />} />
// // //             <Route path="/login" element={<Login />} />
// // //             <Route path="/register" element={<Register/>}/>
// // //             <Route path="/cart" element={<Cart />} />
// // //             <Route path="/admin" element={<Admin />} />

// // //           </Routes>

// // //         </div>

// // //         <Footer />

// // //       </div>

// // //     </BrowserRouter>

// // //   );

// // // }

// // // export default App;
// // import React from "react";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // import Navbar from "./components/Navbar/Navbar";
// // import Footer from "./components/Footer/Footer";
// // import MainContent from "./components/MainContent/MainContent";

// // import Home from "./pages/Home";
// // import Cart from "./pages/Cart";
// // import Admin from "./pages/Admin";
// // import Login from "./pages/Login/Login";
// // import Register from "./pages/Register/Register";

// // import "./App.css";

// // function App() {

// //   return (

// //     <BrowserRouter>

// //       <div className="app-container">

// //         <Navbar />

// //         {/* Hero Slider */}
// //         <MainContent />

// //         {/* Page Routes */}
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register/>}/>
// //           <Route path="/cart" element={<Cart />} />
// //           <Route path="/admin" element={<Admin />} />
// //         </Routes>

// //         <Footer />

// //       </div>

// //     </BrowserRouter>

// //   );

// // }

// // export default App;
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
// import MainContent from "./components/MainContent/MainContent";

// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import Admin from "./pages/Admin";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";

// import "./App.css";

// function App() {

//   return (

//     <BrowserRouter>

//       <Navbar />

//       <Routes>

//         <Route path="/" element={
//           <>
//             <MainContent/>
//             <Home/>
//           </>
//         } />

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/admin" element={<Admin />} />

//       </Routes>

//       <Footer />

//     </BrowserRouter>

//   );

// }

// export default App;/
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import Navbar from "./components/Navbar/Navbar";
//import Footer from "./components/Footer/Footer";
import MainContent from "./components/MainContent/MainContent";

//import Home from "./pages/Home";
import Cart from "./components/cart/Cart";
//import Admin from "./pages/Admin";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">

        {/* <Navbar /> */}

        {/* <MainContent /> */}

        {/* <div className="page-content"> */}
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/cart" element={<Cart />} />
            <Route path="/adminproducts" element={<AdminProducts />} />
          </Routes>
        </div>

        {/* <Footer /> */}
{/* 
      </div> */}
    </BrowserRouter>
  );
}

export default App;