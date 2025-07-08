import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

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

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen mt-24 px-4 md:px-10 py-6 bg-gray-50"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 text-center">
        📦 My Orders
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No orders found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition cursor-pointer"
              onClick={() => toggleExpand(order._id)}
              layout
            >
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-700">
                      {order.fullName}
                    </h3>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-sm mt-2 text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <AnimatePresence initial={false}>
                {expandedOrderId === order._id && (
                  <motion.div
                    className="px-4 pb-4"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p>
                        <strong>Payment:</strong> {order.paymentMethod}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2 text-indigo-600 text-sm">
                        Ordered Items:
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex gap-3 items-center">
                            <img
                              src={item.productId?.image}
                              alt={item.productId?.name}
                              className="w-12 h-12 object-cover rounded border"
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
                      </div>
                    </div>

                    {order.status !== "Cancelled" && (
                      <div className="mt-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent card toggle
                            handleCancel(order._id);
                          }}
                          className="bg-red-500 text-white text-xs px-4 py-1 rounded-full hover:bg-red-600"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyOrdersPage;
