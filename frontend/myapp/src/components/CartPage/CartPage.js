import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api, { IMAGE_URL } from "../../services/api";
import "./CartPage.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

// Final total
const totalAmount = subtotal + 40;
  // Fetch cart items
  const fetchCart = async () => {

    const token = localStorage.getItem("token");

    try {

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartItems(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchCart();

  }, []);

  // Remove item
  const removeFromCart = async (id) => {

    const token = localStorage.getItem("token");

    try {

      await api.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartItems(cartItems.filter(item => item._id !== id));

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="cart-container">

      {/* Cart Items */}
      <div className="cart-items">

        <h2>Your Cart</h2>

        {cartItems.length === 0 && <p>Your cart is empty</p>}

        {cartItems.map((item) => (

          <div className="cart-card" key={item._id}>

            <img
              src={`${IMAGE_URL}${item.image}`}
              alt={item.name}
              className="cart-image"
            />

            <div className="cart-details">

              <h3>{item.name}</h3>

              <p>Weight: {item.weight}</p>

              <p>Quantity: {item.quantity}</p>

              <p className="item-total">
                Total: ₹{item.price * item.quantity}
              </p>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Order Summary */}
      {cartItems.length > 0 && (

        <div className="order-summary">

          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>₹40</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{subtotal + 40}</span>
          </div>

          {/* <button className="checkout-btn">
            Proceed to Checkout
          </button> */}
          <button 
  className="checkout-btn"
  onClick={() => navigate("/checkout",{
    state: {
        cartItems: cartItems,
        totalAmount: totalAmount
      }
    }
  )}
>
  Proceed to Checkout
</button>

        </div>

      )}

    </div>

  );

}

export default Cart;