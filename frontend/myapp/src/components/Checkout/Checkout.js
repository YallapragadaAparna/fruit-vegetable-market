import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];
  const totalAmount = location.state?.totalAmount || 0;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const userId = localStorage.getItem("userId");
  console.log("UserId:",userId);

    if (!userId|| userId === "undefined") {
      alert("User not logged in!");
      return;
    }

    try {
  const orderData = {
  userId:userId,
  name: formData.name,
  phone: formData.phone,
  address: formData.address,
  city: formData.city,
  payment: formData.payment,
  items: cartItems.map(item => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    weight: item.weight 
  })),
  totalAmount
};
console.log("ORDER DATA:", orderData);
    
      await api.post("/orders/place-order", orderData);
     
    const token = localStorage.getItem("token");

    // Remove all items from cart
    for (let item of cartItems) {

      await api.delete(`/cart/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    }

     

      alert("Order placed successfully!");

      navigate("/order-successpage");

    } catch (err) {

      console.log(err);
      alert("Order failed");

    }

  };

  return (

    <div className="checkout-container">

      <div className="checkout-card">

        <h2>Checkout</h2>

        <form className="checkout-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            required
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            required
            value={formData.city}
            onChange={handleChange}
          />

          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Card Payment</option>
          </select>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>

        </form>

      </div>

    </div>

  );

}

export default Checkout;