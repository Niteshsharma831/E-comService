import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await axios.get("https://e-comservice.onrender.com/api/orders/mine", {
          withCredentials: true,
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <div className="mt-24 px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">🧾 My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, i) => (
          <div
            key={order._id}
            className="mb-6 border p-4 rounded bg-white shadow"
          >
            <h2 className="font-semibold text-lg text-green-600">
              Order #{i + 1}
            </h2>
            <p>
              Status: <span className="text-blue-600">{order.status}</span>
            </p>
            <p>Payment: {order.paymentMethod}</p>
            <p>
              Address: {order.address}, {order.pincode}
            </p>
            <p>Ordered on: {new Date(order.createdAt).toLocaleString()}</p>

            <h3 className="mt-2 font-medium">Items:</h3>
            <ul className="list-disc ml-6">
              {order.items.map((item) => (
                <li key={item.productId?._id}>
                  {item.productId?.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
