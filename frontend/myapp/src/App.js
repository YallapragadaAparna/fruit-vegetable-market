import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import Navbar from "./components/Navbar/Navbar";
//import Footer from "./components/Footer/Footer";
import MainContent from "./components/MainContent/MainContent";
import Fruits from "./components/Fruits/Fruits";
import Vegetables from "./components/Vegetables/Vegetables";
import Checkout from "./components/Checkout/Checkout";
//import Home from "./pages/Home";
import OrderSuccessPage from "./components/OrderSuccessPage/OrderSuccessPage";
import CartPage from "./components/CartPage/CartPage";
import AdminOrders from "./components/admin/AdminOrders";
//import Admin from "./pages/Admin";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import MyOrders from "./components/MyOrders/MyOrders";

import ViewOrder from "./components/ViewOrder/ViewOrder";
import Profile from "./components/Profile/Profile";
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
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/adminproducts" element={<AdminProducts />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/vegetables" element={<Vegetables />} />
            <Route path="/checkout" element={<Checkout />} />
<Route path="/my-orders" element={<MyOrders />} />
<Route path="/order-successpage" element={<OrderSuccessPage />} />
<Route path="/view-order/:id" element={<ViewOrder />} />
<Route path="/admin-orders" element={<AdminOrders />} />
<Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* <Footer /> */}
{/* 
      </div> */}
    </BrowserRouter>
  );
}

export default App;