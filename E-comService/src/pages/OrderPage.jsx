import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaBoxOpen, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Added FaChevronUp for toggle icon

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Function to fetch orders from the API
  const fetchOrders = () => {
    setLoading(true); // Set loading to true while fetching data
    axios
      .get("https://e-comservice.onrender.com/api/users/mine", {
        withCredentials: true, // Send cookies with the request
      })
      .then((res) => {
        // Update the orders state with the fetched data
        setOrders(res.data.orders || []);
      })
      .catch(() => {
        // Show an error toast if fetching fails
        toast.error("❌ Failed to load orders");
      })
      .finally(() => setLoading(false)); // Set loading to false after fetch completes (whether success or error)
  };

  // useEffect hook to fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle order cancellation
  const handleCancel = async (orderId) => {
    try {
      // Send a PUT request to update the order status to "Cancelled"
      const res = await axios.put(
        `https://e-comservice.onrender.com/api/users/update-status/${orderId}`,
        { status: "Cancelled" }, // Payload to update status
        { withCredentials: true } // Send cookies with the request
      );
      // Show a success toast with the message from the response
      toast.success(res.data.message || "✅ Order cancelled successfully");
      fetchOrders(); // Re-fetch orders to update the UI
    } catch (err) {
      // Show an error toast if cancellation fails
      toast.error(err.response?.data?.message || "❌ Failed to cancel order");
    }
  };

  // Function to toggle the expansion of an order card
  const toggleExpand = (orderId) => {
    // If the clicked order is already expanded, collapse it; otherwise, expand it
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation to apply
      transition={{ duration: 0.4 }} // Transition duration
      className="min-h-screen mt-24 px-4 md:px-10 py-6 bg-gradient-to-br from-indigo-50 to-white font-inter" // Added font-inter
    >
      <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-12 flex items-center justify-center">
        <FaBoxOpen className="inline-block mr-3 text-indigo-600" />
        My Orders
      </h2>

      {loading ? (
        // Loading state
        <div className="text-center text-gray-500 text-xl py-10">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        // No orders found state
        <div className="text-center text-gray-600 text-xl py-10">
          No orders found. Start shopping now!
        </div>
      ) : (
        // Display orders in a responsive grid
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              layout // Enable layout animations for smooth transitions
              className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => toggleExpand(order._id)} // Toggle expansion on click
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-700 mb-1">
                      Order ID: {order._id.substring(0, 8)}...
                    </h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Customer:</span>{" "}
                      {order.fullName}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold">Order Date:</span>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                        order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    {expandedOrderId === order._id ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {expandedOrderId === order._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} // Initial animation state for expanded content
                    animate={{ opacity: 1, height: "auto" }} // Animation to apply
                    exit={{ opacity: 0, height: 0 }} // Animation when collapsing
                    transition={{ duration: 0.3 }} // Transition duration
                    className="px-6 pb-6 border-t border-gray-100 bg-gray-50"
                  >
                    <div className="text-sm text-gray-700 space-y-3 mt-4">
                      <p>
                        <span className="font-semibold text-gray-800">
                          Contact:
                        </span>{" "}
                        {order.phone}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-800">
                          Address:
                        </span>{" "}
                        {order.address}, {order.pincode}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-800">
                          Payment Method:
                        </span>{" "}
                        {order.paymentMethod}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-bold text-indigo-600 text-base mb-3">
                        Ordered Items:
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100"
                          >
                            <img
                              src={
                                item.productId?.image ||
                                "https://placehold.co/60x60/E0E0E0/666666?text=No+Image"
                              } // Placeholder for missing image
                              alt={item.productId?.name || "Product Image"}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200 mr-4"
                            />
                            <div className="flex-grow">
                              <p className="font-medium text-base text-gray-900">
                                {item.productId?.name || "Unknown Product"}
                              </p>
                              <p className="text-sm text-gray-600">
                                Quantity:{" "}
                                <span className="font-semibold">
                                  {item.quantity}
                                </span>
                              </p>
                              <p className="text-sm text-gray-700">
                                Price:{" "}
                                <span className="font-semibold">
                                  ₹{item.productId?.price?.toFixed(2) || "N/A"}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.status !== "Cancelled" && (
                      <div className="mt-6 text-right">
                        <motion.button
                          whileHover={{ scale: 1.05 }} // Scale effect on hover
                          whileTap={{ scale: 0.95 }} // Scale effect on tap
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card from collapsing when button is clicked
                            handleCancel(order._id);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                        >
                          Cancel Order
                        </motion.button>
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
