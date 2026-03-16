import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./ViewOrder.css";

function ViewOrder() {

  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const res = await api.get(`/orders/${id}`);

        console.log("ORDER DATA:", res.data);

        setOrder(res.data);

      } catch (error) {

        console.log("Error fetching order:", error);

      }

    };

    fetchOrder();

  }, [id]);

  if (!order) {
    return <h2 style={{ textAlign: "center" }}>Loading Order...</h2>;
  }

  return (

    <div className="vieworder-container">

      <div className="vieworder-card">

        <h2>Order Details</h2>

        <p><b>Name:</b> {order.name}</p>
        <p><b>Phone:</b> {order.phone}</p>
        <p><b>Address:</b> {order.address}</p>
        <p><b>City:</b> {order.city}</p>
        <p><b>Payment:</b> {order.payment}</p>

        <h3>Ordered Items</h3>

        {order.items && order.items.length > 0 ? (

          <table className="items-table">

            <thead>
              <tr>
                <th>Product</th>
                <th>Weight</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>

              {order.items.map((item) => (

                <tr key={item._id || item.name}>

                  <td>{item.name}</td>
                  <td>{item.weight ? `${item.weight}` : "N/A"}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>

                </tr>

              ))}

            </tbody>

          </table>

        ) : (

          <p>No items found in this order</p>

        )}

        <h3 className="total">Total Amount: ₹{order.totalAmount}</h3>

      </div>

    </div>

  );

}

export default ViewOrder;