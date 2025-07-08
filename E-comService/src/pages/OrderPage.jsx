import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get("https://e-comservice.onrender.com/api/users/mine", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data.orders || []);
      })
      .catch(() => {
        toast.error("❌ Failed to load orders");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      const res = await axios.put(
        `https://e-comservice.onrender.com/api/users/update-status/${orderId}`,
        { status: "Cancelled" },
        { withCredentials: true }
      );

      toast.success(res.data.message || "✅ Order cancelled successfully");
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Failed to cancel order");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen mt-24 px-4 md:px-10 py-6 bg-gradient-to-br from-indigo-50 to-white"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 text-center">
        📦 My Orders
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No orders found.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="w-full text-sm text-left bg-white rounded-xl">
            <thead className="bg-indigo-100 text-indigo-700 text-sm uppercase">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Items</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium">{order.fullName}</td>
                  <td className="p-4">{order.phone}</td>
                  <td className="p-4 max-w-xs">{order.address}</td>
                  <td className="p-4">{order.paymentMethod}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.name}
                          className="w-10 h-10 rounded object-cover border"
                        />
                        <div>
                          <p className="font-medium text-sm">
                            {item.productId?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    {order.status === "Cancelled" ? (
                      <span className="text-gray-400 text-xs">No Action</span>
                    ) : (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 text-xs transition"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MyOrdersPage;
