import React, { useEffect, useState } from "react";
import { IMAGE_URL } from "../../services/api";
import "./Cart.css";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);

  }, []);

  const removeFromCart = (id, weight) => {

    const updatedCart = cartItems.filter(
      (item) => !(item._id === id && item.weight === weight)
    );

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

  };

  return (

    <div className="cart-container">

      <h2>Your Cart</h2>

      {cartItems.map((item) => (

        <div className="cart-card" key={item._id + item.weight}>

          <img
            src={`${IMAGE_URL}${item.image}`}
            alt={item.name}
            className="cart-image"
          />

          <div className="cart-details">

            <h3>{item.name}</h3>

            <p>Weight: {item.weight}</p>

            <p>Quantity: {item.quantity}</p>

            <p>Total: ₹{item.price * item.quantity}</p>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item._id, item.weight)}
            >
              Remove
            </button>

          </div>

        </div>

      ))}

    </div>

  );
}

export default Cart;