// import React, { useEffect, useState } from "react";
// import { IMAGE_URL } from "../../services/api";
// import "./Cart.css";

// function Cart() {

//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     setCartItems(cart);

//   }, []);

//   const removeFromCart = (id, weight) => {

//     const updatedCart = cartItems.filter(
//       (item) => !(item._id === id && item.weight === weight)
//     );

//     setCartItems(updatedCart);

//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//   };

//   return (

//     <div className="cart-container">

//       <h2>Your Cart</h2>

//       {cartItems.map((item) => (

//         <div className="cart-card" key={item._id + item.weight}>

//           <img
//             src={`${IMAGE_URL}${item.image}`}
//             alt={item.name}
//             className="cart-image"
//           />

//           <div className="cart-details">

//             <h3>{item.name}</h3>

//             <p>Weight: {item.weight}</p>

//             <p>Quantity: {item.quantity}</p>

//             <p>Total: ₹{item.price * item.quantity}</p>

//             <button
//               className="remove-btn"
//               onClick={() => removeFromCart(item._id, item.weight)}
//             >
//               Remove
//             </button>

//           </div>

//         </div>

//       ))}

//     </div>

//   );
// }

// export default Cart;
import React, { useEffect, useState } from "react";
import api, { IMAGE_URL } from "../../services/api";
import "./Cart.css";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  // Fetch cart from backend
  const fetchCart = async () => {
const token = localStorage.getItem("token");
    try {

      const res = await api.get("/cart",{
        headers: {
    Authorization: `Bearer ${token}`}
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

      await api.delete(`/cart/${id}`,
        {
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

            <p>Total: ₹{item.price * item.quantity}</p>

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

  );

}

export default Cart;