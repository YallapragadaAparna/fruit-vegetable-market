import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MyOrder.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in");
        return;
      }

      const res = await api.get(`/orders/my-orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();

    // ⭐ Automatically refresh orders every 5 seconds
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
       <div className="orders-grid">
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><b>Name:</b> {order.name}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>

          <div className="status-box">
  <b>Status:</b>

  <span className={`order-status ${order.status?.toLowerCase()}`}>
    {order.status || "Pending"}
  </span>
</div>
     

            <button className="view-btn" onClick={() => navigate(`/view-order/${order._id}`)}>
              View
            </button>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default MyOrders;