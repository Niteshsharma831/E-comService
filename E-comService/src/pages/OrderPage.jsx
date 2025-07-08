import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";

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
      className="min-h-screen mt-24 px-4 md:px-10 py-6 bg-gradient-to-br from-gray-100 to-white"
    >
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        <FaBoxOpen className="inline-block mr-2 mb-1" />
        My Orders
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No orders found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              layout
              className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300"
              onClick={() => toggleExpand(order._id)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-700">
                      {order.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">{order.phone}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {expandedOrderId === order._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <div className="text-sm text-gray-700 space-y-2">
                      <p>
                        <span className="font-semibold">Address:</span>{" "}
                        {order.address}
                      </p>
                      <p>
                        <span className="font-semibold">Payment:</span>{" "}
                        {order.paymentMethod}
                      </p>
                      <p>
                        <span className="font-semibold">Pincode:</span>{" "}
                        {order.pincode}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold text-indigo-600 text-sm mb-2">
                        Ordered Items:
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex gap-3 items-center">
                            <img
                              src={item.productId?.image}
                              alt={item.productId?.name}
                              className="w-14 h-14 object-cover rounded border"
                            />
                            <div>
                              <p className="font-medium text-sm">
                                {item.productId?.name || "Unknown"}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                              <p className="text-xs text-gray-600">
                                Price: ₹{item.productId?.price || "N/A"}
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
                            e.stopPropagation();
                            handleCancel(order._id);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-4 py-1 rounded-full transition"
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
