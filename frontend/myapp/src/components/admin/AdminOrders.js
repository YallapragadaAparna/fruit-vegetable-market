// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./AdminOrder.css";

// // function AdminOrders() {

// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {

// //     const fetchOrders = async () => {

// //       try {

// //         const res = await axios.get(
// //           "http://localhost:5000/api/orders/admin-orders"
// //         );

// //         setOrders(res.data.orders);

// //       } catch (error) {
// //         console.log(error);
// //       }

// //     };

// //     fetchOrders();

// //   }, []);

// //   return (

// //     <div className="orders-container">

// //       <h2>All Customer Orders</h2>

// //       {orders.map((order) => (

// //         <div key={order._id} className="order-card">

// //           <div className="order-info">

// //             <p><b>Order ID:</b> {order._id}</p>
// //             <p><b>Name:</b> {order.name}</p>
// //             <p><b>Phone:</b> {order.phone}</p>
// //             <p><b>Address:</b> {order.address}</p>
// //             <p><b>City:</b> {order.city}</p>
// //             <p><b>Payment:</b> {order.payment}</p>
// //             <p><b>Total:</b> ₹{order.totalAmount}</p>

// //           </div>

// //           <h4>Ordered Items</h4>

// //           <table className="order-table">

// //             <thead>
// //               <tr>
// //                 <th>Product</th>
// //                 <th>Price</th>
// //                 <th>Qty</th>
// //                 <th>Total</th>
// //               </tr>
// //             </thead>

// //             <tbody>

// //               {order.items.map((item, index) => (

// //                 <tr key={index}>

// //                   <td>{item.name}</td>
// //                   <td>₹{item.price}</td>
// //                   <td>{item.quantity}</td>
// //                   <td>₹{item.price * item.quantity}</td>

// //                 </tr>

// //               ))}

// //             </tbody>

// //           </table>

// //         </div>

// //       ))}

// //     </div>

// //   );
// // }

// // export default AdminOrders;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminOrder.css";

// const AdminOrders = () => {

//   const [orders, setOrders] = useState([]);   // IMPORTANT

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {

//       const res = await axios.get("http://localhost:5000/api/orders/admin-orders");

//       console.log("Admin Orders:", res.data);

//       // Handle both response types
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

//   return (
//     <div className="admin-orders-container">

//       <h2>All Orders</h2>

//       {orders && orders.length === 0 ? (
//         <p>No Orders Found</p>
//       ) : (

//         orders && orders.map((order) => (
//           <div key={order._id} className="order-card">

//             <h3>Order ID: {order._id}</h3>

//             <p><b>Name:</b> {order.name}</p>
//             <p><b>Phone:</b> {order.phone}</p>
//             <p><b>Address:</b> {order.address}</p>
//             <p><b>City:</b> {order.city}</p>
//             <p><b>Payment:</b> {order.payment}</p>
//             <p><b>Total:</b> ₹{order.totalAmount}</p>

//             <h4>Items</h4>

//             <ul>
//               {order.items && order.items.map((item, index) => (
//                 <li key={index}>
//                   {item.name} - ₹{item.price} × {item.quantity}
//                 </li>
//               ))}
//             </ul>

//           </div>
//         ))

//       )}

//     </div>
//   );
// };

// export default AdminOrders;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrder.css";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/orders/admin-orders");

      console.log("Admin Orders:", res.data);

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

  return (
    <div className="admin-orders-container">

      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (

        orders.map((order) => (
          <div key={order._id} className="order-card">

            <h3>Order ID: {order._id}</h3>

            <p><b>Name:</b> {order.name}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>City:</b> {order.city}</p>
            <p><b>Payment:</b> {order.payment}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>

            <h4>Items</h4>

            <ul>
              {order.items && order.items.map((item, index) => (
                <li key={index}>
                  <b>{item.name}</b> | 
                  Weight: {item.weight ? item.weight : "N/A"} | 
                  Price: ₹{item.price} | 
                  Qty: {item.quantity} | 
                  Total: ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>

          </div>
        ))

      )}

    </div>
  );
};

export default AdminOrders;