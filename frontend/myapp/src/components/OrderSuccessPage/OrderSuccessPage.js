import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccessPage.css";

function OrderSuccess() {

  const navigate = useNavigate();

  return (

    <div className="success-container">

      <h2>Order Placed Successfully 🎉</h2>

      <p>Your fruits and vegetables will arrive soon.</p>

      <button onClick={() => navigate("/dashboard")}>
        Continue Shopping
      </button>

    </div>

  );

}

export default OrderSuccess;