// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminOrder.css";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [expandedOrderId, setExpandedOrderId] = useState(null);
//   const [statusUpdates, setStatusUpdates] = useState({});
//   const [updatingStatusId, setUpdatingStatusId] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/orders/admin-orders"
//       );

//       if (Array.isArray(res.data)) {
//         setOrders(res.data);
//       } else {
//         setOrders(res.data.orders || []);
//       }
//     } catch (error) {
//       console.log("Error fetching orders:", error);
//       setOrders([]);
//     }
//   };

//   const toggleViewItems = (orderId) => {
//     setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
//   };

//   const handleSelectChange = (orderId, newStatus) => {
//     setStatusUpdates((prev) => ({
//       ...prev,
//       [orderId]: newStatus,
//     }));
//   };

//   const handleUpdateStatus = async (orderId) => {
//     const newStatus = statusUpdates[orderId];

//     if (!newStatus) {
//       alert("Please select a status");
//       return;
//     }

//     const confirmUpdate = window.confirm(
//       "Are you sure you want to update the order status?"
//     );

//     if (!confirmUpdate) return;

//     try {
//       setUpdatingStatusId(orderId);

//       await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
//         status: newStatus,
//       });

//       alert("Order status updated successfully!");

//       // Update UI immediately
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );

//       // Clear temporary status
//       setStatusUpdates((prev) => ({
//         ...prev,
//         [orderId]: "",
//       }));
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Failed to update order status");
//     } finally {
//       setUpdatingStatusId(null);
//     }
//   };

//   return (
//     <div className="admin-orders-container">
//       <h2>All Orders</h2>
     
//   <div className="orders-grid">
//       {orders.length === 0 ? (
//         <p>No Orders Found</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id} className="order-card">
//             <h3>Order ID: {order._id}</h3>

//             <p>
//               <b>Name:</b> {order.name}
//             </p>

//             <p>
//               <b>Total:</b> ₹{order.totalAmount}
//             </p>

//             <p>
//               <b>Status:</b>{" "}
//               <select
//                 value={statusUpdates[order._id] || order.status}
//                 onChange={(e) =>
//                   handleSelectChange(order._id, e.target.value)
//                 }
//                 disabled={updatingStatusId === order._id}
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Accepted">Accepted</option>
//                 <option value="Declined">Declined</option>
//                 <option value="Delivered">Delivered</option>
//               </select>

//               <button
//                 className="update-status-btn"
//                 onClick={() => handleUpdateStatus(order._id)}
//                 disabled={updatingStatusId === order._id}
//               >
//                 {updatingStatusId === order._id ? "Updating..." : "Update"}
//               </button>
//             </p>

//             <button className="view-items-btn" onClick={() => toggleViewItems(order._id)}>
//               {expandedOrderId === order._id ? "Hide Items" : "View Items"}
//             </button>

//             {expandedOrderId === order._id && (
//               <div className="order-items-section">
//                 <p>
//                   <b>Phone:</b> {order.phone}
//                 </p>

//                 <p>
//                   <b>Address:</b> {order.address}
//                 </p>

//                 <p>
//                   <b>City:</b> {order.city}
//                 </p>

//                 <p>
//                   <b>Payment:</b> {order.payment}
//                 </p>

//                 <h4>Items</h4>

//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Product</th>
//                       <th>Weight</th>
//                       <th>Price</th>
//                       <th>Qty</th>
//                       <th>Total</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {order.items &&
//                       order.items.map((item, index) => (
//                         <tr key={index}>
//                           <td>{item.name}</td>
//                           <td>{item.weight || "N/A"}</td>
//                           <td>₹{item.price}</td>
//                           <td>{item.quantity}</td>
//                           <td>₹{item.price * item.quantity}</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   </div>
//   );
// };

// export default AdminOrders;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrder.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/admin-orders"
      );

      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders(res.data.orders || []);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
      setOrders([]);
    }
  };

  // Toggle view items
  const toggleViewItems = (orderId) => {
    setExpandedOrderId((prev) =>
      prev === orderId ? null : orderId
    );
  };

  // Handle status dropdown change
  const handleSelectChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  // Update order status
  const handleUpdateStatus = async (orderId) => {
    const newStatus = statusUpdates[orderId];

    if (!newStatus) {
      alert("Please select a status");
      return;
    }

    const confirmUpdate = window.confirm(
      "Are you sure you want to update the order status?"
    );

    if (!confirmUpdate) return;

    try {
      setUpdatingStatusId(orderId);

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus }
      );

      alert("Order status updated successfully!");

      // Update UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      setStatusUpdates((prev) => ({
        ...prev,
        [orderId]: "",
      }));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update order status");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  return (
    <div className="admin-orders-container">
      <h2>All Orders</h2>

      <div className="orders-grid">
        {orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>

              <p>
                <b>Name:</b> {order.name}
              </p>

              <p>
                <b>Total:</b> ₹{order.totalAmount}
              </p>

              <p>
                <b>Status:</b>{" "}
                <select
                  value={statusUpdates[order._id] || order.status}
                  onChange={(e) =>
                    handleSelectChange(order._id, e.target.value)
                  }
                  disabled={updatingStatusId === order._id}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <button
                  className="update-status-btn"
                  onClick={() => handleUpdateStatus(order._id)}
                  disabled={updatingStatusId === order._id}
                >
                  {updatingStatusId === order._id
                    ? "Updating..."
                    : "Update"}
                </button>
              </p>

              <button
                className="view-items-btn"
                onClick={() => toggleViewItems(order._id)}
              >
                {expandedOrderId === order._id
                  ? "Hide Items"
                  : "View Items"}
              </button>

              {expandedOrderId === order._id && (
                <div className="order-items-section">
                  <p>
                    <b>Phone:</b> {order.phone}
                  </p>

                  <p>
                    <b>Address:</b> {order.address}
                  </p>

                  <p>
                    <b>City:</b> {order.city}
                  </p>

                  <p>
                    <b>Payment:</b> {order.payment}
                  </p>

                  <h4>Items</h4>

                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Weight</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.items &&
                        order.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.weight || "N/A"}</td>
                            <td>₹{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                              ₹{item.price * item.quantity}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;