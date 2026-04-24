// // // MyOrdersPageResponsive.jsx
// // import React, { useEffect, useState } from "react";
// // import API from "../api";
// // import { toast } from "react-toastify";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { FaBoxOpen, FaChevronDown, FaChevronUp } from "react-icons/fa";
// // import { useNavigate } from "react-router-dom";

// // const statusOrder = ["Processing", "Confirmed", "Delivered"];

// // const MyOrdersPageResponsive = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedOrderId, setSelectedOrderId] = useState(null);
// //   const navigate = useNavigate();

// //   const fetchOrders = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await API.get("/users/mine");
// //       setOrders(res.data.orders || []);
// //     } catch (err) {
// //       toast.error("❌ Failed to load orders");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   const handleCancel = async (orderId) => {
// //     try {
// //       const res = await API.put(`/users/update-status/${orderId}`, {
// //         status: "Cancelled",
// //       });
// //       toast.success(res.data.message || "✅ Order cancelled successfully");
// //       fetchOrders();
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "❌ Failed to cancel order");
// //     }
// //   };

// //   const toggleSelect = (orderId) => {
// //     setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
// //   };

// //   const renderTracking = (status) => (
// //     <div className="flex items-center justify-between mt-4">
// //       {statusOrder.map((stage, index) => {
// //         const currentIndex = statusOrder.indexOf(status);
// //         const isCompleted = currentIndex >= index;
// //         return (
// //           <div key={index} className="flex-1 relative text-center">
// //             <div
// //               className={`w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center ${
// //                 isCompleted
// //                   ? "bg-indigo-600 border-indigo-600 text-white"
// //                   : "bg-white border-gray-300 text-gray-400"
// //               }`}
// //             >
// //               {index + 1}
// //             </div>
// //             <p
// //               className={`mt-1 text-xs font-semibold ${
// //                 isCompleted ? "text-indigo-600" : "text-gray-400"
// //               }`}
// //             >
// //               {stage}
// //             </p>
// //             {index !== statusOrder.length - 1 && (
// //               <div
// //                 className={`absolute top-3 left-1/2 w-full h-1 -ml-1/2 z-0 ${
// //                   currentIndex > index ? "bg-indigo-600" : "bg-gray-300"
// //                 }`}
// //               />
// //             )}
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );

// //   const getPaymentBadge = (method) =>
// //     method === "Online" ? (
// //       <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm">
// //         Prepaid
// //       </span>
// //     ) : (
// //       <span className="bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded-full text-sm">
// //         Postpaid
// //       </span>
// //     );

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.4 }}
// //       className="min-h-screen mt-24 px-4 md:px-10 py-6 bg-gradient-to-br from-indigo-50 to-white font-inter"
// //     >
// //       <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-12 flex items-center justify-center">
// //         <FaBoxOpen className="inline-block mr-3 text-indigo-600" />
// //         My Orders
// //       </h2>

// //       {loading ? (
// //         <div className="text-center text-gray-500 text-xl py-10">
// //           Loading orders...
// //         </div>
// //       ) : orders.length === 0 ? (
// //         <div className="text-center text-gray-600 text-xl py-10">
// //           No orders found. Start shopping now!
// //           <div className="mt-6">
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               onClick={() => navigate("/shop")}
// //               className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-full mt-4"
// //             >
// //               🛍️ Continue Shopping
// //             </motion.button>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="flex flex-col lg:flex-row gap-6">
// //           {/* Card List */}
// //           <div className="flex-1 overflow-y-auto max-h-[80vh]">
// //             <div
// //               className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${
// //                 selectedOrderId ? "1" : "4"
// //               } gap-6`}
// //             >
// //               {orders.map((order) => (
// //                 <motion.div
// //                   key={order._id}
// //                   layout
// //                   animate={{
// //                     x: selectedOrderId === order._id ? -20 : 0,
// //                     scale: selectedOrderId === order._id ? 1.03 : 1,
// //                     zIndex: selectedOrderId === order._id ? 20 : 1,
// //                   }}
// //                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
// //                   className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
// //                   onClick={() => toggleSelect(order._id)}
// //                 >
// //                   {/* Card Header */}
// //                   <div className="p-6 flex justify-between items-center">
// //                     <div>
// //                       <h3 className="text-lg font-bold text-indigo-700 mb-1">
// //                         Order ID: {order._id.substring(0, 8)}...
// //                       </h3>
// //                       <p className="text-sm text-gray-600">
// //                         <span className="font-semibold">Customer:</span>{" "}
// //                         {order.fullName}
// //                       </p>
// //                       <p className="text-sm text-gray-500 mt-1">
// //                         <span className="font-semibold">Order Date:</span>{" "}
// //                         {new Date(order.createdAt).toLocaleDateString()}
// //                       </p>
// //                     </div>
// //                     <div className="flex items-center space-x-2">
// //                       <span
// //                         className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
// //                           order.status === "Cancelled"
// //                             ? "bg-red-100 text-red-600"
// //                             : "bg-green-100 text-green-700"
// //                         }`}
// //                       >
// //                         {order.status}
// //                       </span>
// //                       {selectedOrderId === order._id ? (
// //                         <FaChevronUp className="text-gray-500" />
// //                       ) : (
// //                         <FaChevronDown className="text-gray-500" />
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Mobile Expanded Details */}
// //                   <AnimatePresence initial={false}>
// //                     {selectedOrderId === order._id &&
// //                       window.innerWidth < 1024 && (
// //                         <motion.div
// //                           initial={{ opacity: 0, height: 0 }}
// //                           animate={{ opacity: 1, height: "auto" }}
// //                           exit={{ opacity: 0, height: 0 }}
// //                           transition={{ duration: 0.3 }}
// //                           className="px-6 pb-6 border-t border-gray-100 bg-gray-50"
// //                         >
// //                           <div className="text-sm text-gray-700 space-y-3 mt-4">
// //                             <p>
// //                               <span className="font-semibold text-gray-800">
// //                                 Contact:
// //                               </span>{" "}
// //                               {order.phone}
// //                             </p>
// //                             <p>
// //                               <span className="font-semibold text-gray-800">
// //                                 Address:
// //                               </span>{" "}
// //                               {order.address}, {order.pincode}
// //                             </p>
// //                             <p>
// //                               <span className="font-semibold text-gray-800">
// //                                 Payment Mode:
// //                               </span>{" "}
// //                               {getPaymentBadge(order.paymentMethod)}
// //                             </p>
// //                             {order.status !== "Cancelled" &&
// //                               renderTracking(order.status)}
// //                           </div>

// //                           <div className="mt-6">
// //                             <h4 className="font-bold text-indigo-600 text-base mb-3">
// //                               Ordered Items:
// //                             </h4>
// //                             <div className="space-y-4">
// //                               {order.items.map((item, index) => (
// //                                 <div
// //                                   key={index}
// //                                   className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100"
// //                                 >
// //                                   <img
// //                                     src={
// //                                       item.productId?.image ||
// //                                       "https://placehold.co/60x60/E0E0E0/666666?text=No+Image"
// //                                     }
// //                                     alt={
// //                                       item.productId?.name || "Product Image"
// //                                     }
// //                                     className="w-16 h-16 object-cover rounded-lg border border-gray-200 mr-4"
// //                                   />
// //                                   <div className="flex-grow">
// //                                     <p className="font-medium text-base text-gray-900">
// //                                       {item.productId?.name ||
// //                                         "Unknown Product"}
// //                                     </p>
// //                                     <p className="text-sm text-gray-600">
// //                                       Quantity:{" "}
// //                                       <span className="font-semibold">
// //                                         {item.quantity}
// //                                       </span>
// //                                     </p>
// //                                     <p className="text-sm text-gray-700">
// //                                       Price:{" "}
// //                                       <span className="font-semibold">
// //                                         ₹
// //                                         {item.productId?.price?.toFixed(2) ||
// //                                           "N/A"}
// //                                       </span>
// //                                     </p>
// //                                   </div>
// //                                 </div>
// //                               ))}
// //                             </div>
// //                           </div>

// //                           {order.status !== "Cancelled" && (
// //                             <div className="mt-6 text-right">
// //                               <motion.button
// //                                 whileHover={{ scale: 1.05 }}
// //                                 whileTap={{ scale: 0.95 }}
// //                                 onClick={(e) => {
// //                                   e.stopPropagation();
// //                                   handleCancel(order._id);
// //                                 }}
// //                                 className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
// //                               >
// //                                 Cancel Order
// //                               </motion.button>
// //                             </div>
// //                           )}
// //                         </motion.div>
// //                       )}
// //                   </AnimatePresence>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Desktop Details Panel */}
// //           {selectedOrderId && window.innerWidth >= 1024 && (
// //             <motion.div
// //               key={selectedOrderId}
// //               initial={{ opacity: 0, x: 50 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               exit={{ opacity: 0, x: 50 }}
// //               transition={{ duration: 0.3 }}
// //               className="w-full lg:w-1/2 bg-white rounded-3xl shadow-lg p-6 overflow-y-auto max-h-[80vh]"
// //             >
// //               {(() => {
// //                 const order = orders.find((o) => o._id === selectedOrderId);
// //                 if (!order) return null;
// //                 return (
// //                   <>
// //                     <div className="flex items-center mb-4">
// //                       <h3 className="text-xl font-bold text-indigo-700 mb-1">
// //                         Order ID: {order._id}
// //                       </h3>
// //                     </div>
// //                     <p>
// //                       <span className="font-semibold">Customer:</span>{" "}
// //                       {order.fullName}
// //                     </p>
// //                     <p>
// //                       <span className="font-semibold">Contact:</span>{" "}
// //                       {order.phone}
// //                     </p>
// //                     <p>
// //                       <span className="font-semibold">Address:</span>{" "}
// //                       {order.address}, {order.pincode}
// //                     </p>
// //                     <p>
// //                       <span className="font-semibold">Payment Mode:</span>{" "}
// //                       {getPaymentBadge(order.paymentMethod)}
// //                     </p>

// //                     {order.status !== "Cancelled" &&
// //                       renderTracking(order.status)}

// //                     <div className="mt-6">
// //                       <h4 className="font-bold text-indigo-600 text-base mb-3">
// //                         Ordered Items:
// //                       </h4>
// //                       <div className="space-y-4">
// //                         {order.items.map((item, index) => (
// //                           <div
// //                             key={index}
// //                             className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100"
// //                           >
// //                             <img
// //                               src={
// //                                 item.productId?.image ||
// //                                 "https://placehold.co/60x60/E0E0E0/666666?text=No+Image"
// //                               }
// //                               alt={item.productId?.name || "Product Image"}
// //                               className="w-16 h-16 object-cover rounded-lg border border-gray-200 mr-4"
// //                             />
// //                             <div className="flex-grow">
// //                               <p className="font-medium text-base text-gray-900">
// //                                 {item.productId?.name || "Unknown Product"}
// //                               </p>
// //                               <p className="text-sm text-gray-600">
// //                                 Quantity:{" "}
// //                                 <span className="font-semibold">
// //                                   {item.quantity}
// //                                 </span>
// //                               </p>
// //                               <p className="text-sm text-gray-700">
// //                                 Price:{" "}
// //                                 <span className="font-semibold">
// //                                   ₹{item.productId?.price?.toFixed(2) || "N/A"}
// //                                 </span>
// //                               </p>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     {order.status !== "Cancelled" && (
// //                       <div className="mt-6 text-right">
// //                         <motion.button
// //                           whileHover={{ scale: 1.05 }}
// //                           whileTap={{ scale: 0.95 }}
// //                           onClick={() => handleCancel(order._id)}
// //                           className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
// //                         >
// //                           Cancel Order
// //                         </motion.button>
// //                       </div>
// //                     )}
// //                   </>
// //                 );
// //               })()}
// //             </motion.div>
// //           )}
// //         </div>
// //       )}
// //     </motion.div>
// //   );
// // };

// // export default MyOrdersPageResponsive;
// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   FaBox,
//   FaTruck,
//   FaCheckCircle,
//   FaClock,
//   FaTimesCircle,
//   FaEye,
//   FaReceipt,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaUser,
//   FaCalendarAlt,
//   FaCreditCard,
//   FaShoppingBag,
//   FaRupeeSign,
//   FaTag,
//   FaChevronRight,
//   FaShoppingCart,
//   FaArrowLeft,
//   FaBoxOpen,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const MyOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("all");

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get("/users/mine");
//       setOrders(res.data.orders || []);
//     } catch (err) {
//       toast.error("Failed to load orders");
//     } finally {
//       setTimeout(() => setLoading(false), 600);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleCancel = async (orderId) => {
//     try {
//       const res = await API.put(`/users/update-status/${orderId}`, {
//         status: "Cancelled",
//       });
//       toast.success(res.data.message || "Order cancelled successfully");
//       fetchOrders();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to cancel order");
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Processing":
//         return <FaClock className="text-yellow-400" />;
//       case "Confirmed":
//         return <FaCheckCircle className="text-blue-400" />;
//       case "Delivered":
//         return <FaTruck className="text-emerald-400" />;
//       case "Cancelled":
//         return <FaTimesCircle className="text-red-400" />;
//       default:
//         return <FaBox className="text-gray-400" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Processing":
//         return "bg-gradient-to-r from-yellow-500 to-amber-500";
//       case "Confirmed":
//         return "bg-gradient-to-r from-blue-500 to-cyan-500";
//       case "Delivered":
//         return "bg-gradient-to-r from-emerald-500 to-green-500";
//       case "Cancelled":
//         return "bg-gradient-to-r from-red-500 to-pink-500";
//       default:
//         return "bg-gradient-to-r from-gray-500 to-gray-600";
//     }
//   };

//   const getFilteredOrders = () => {
//     if (activeFilter === "all") return orders;
//     return orders.filter((order) => order.status === activeFilter);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const truncateId = (id) => {
//     return id.substring(0, 8).toUpperCase();
//   };

//   const getPaymentBadge = (method) => {
//     return method === "Online" ? (
//       <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold shadow-md">
//         <FaCreditCard className="inline mr-1" /> Paid
//       </span>
//     ) : (
//       <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-xs font-bold shadow-md">
//         <FaCreditCard className="inline mr-1" /> COD
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-24 pb-12 px-4">
//       <ToastContainer position="top-right" theme="colored" />

//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Enhanced Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-12"
//         >
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-4 mt-5">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-40"></div>
//                 <div className="relative p-4 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
//                   <FaShoppingBag className="text-3xl" />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
//                   My{" "}
//                   <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
//                     Orders
//                   </span>
//                 </h1>
//                 <p className="text-gray-600 text-lg">
//                   Track and manage all your purchases
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => window.history.back()}
//               className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 text-gray-700 hover:text-blue-600"
//             >
//               <FaArrowLeft />
//               <span className="hidden sm:inline">Back</span>
//             </button>
//           </div>

//           {/* Enhanced Stats Cards */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               {
//                 label: "Total Orders",
//                 value: orders.length,
//                 color: "from-blue-500 to-cyan-500",
//                 icon: <FaReceipt />,
//                 description: "All time",
//               },
//               {
//                 label: "Delivered",
//                 value: orders.filter((o) => o.status === "Delivered").length,
//                 color: "from-emerald-500 to-green-500",
//                 icon: <FaTruck />,
//                 description: "Completed",
//               },
//               {
//                 label: "Processing",
//                 value: orders.filter((o) => o.status === "Processing").length,
//                 color: "from-yellow-500 to-amber-500",
//                 icon: <FaClock />,
//                 description: "In progress",
//               },
//               {
//                 label: "Total Spent",
//                 value: `₹${orders.reduce(
//                   (sum, order) => sum + order.totalAmount,
//                   0
//                 )}`,
//                 color: "from-purple-500 to-pink-500",
//                 icon: <FaRupeeSign />,
//                 description: "Lifetime",
//               },
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="relative group"
//               >
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
//                 ></div>
//                 <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500">
//                   <div className="flex items-center justify-between mb-4">
//                     <div
//                       className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}
//                     >
//                       {stat.icon}
//                     </div>
//                     <FaChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" />
//                   </div>
//                   <div className="text-3xl font-bold text-gray-900 mb-1">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm font-medium text-gray-700">
//                     {stat.label}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">
//                     {stat.description}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Filter Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="mb-8"
//         >
//           <div className="flex flex-wrap gap-2">
//             {["all", "Processing", "Confirmed", "Delivered", "Cancelled"].map(
//               (filter) => (
//                 <button
//                   key={filter}
//                   onClick={() => setActiveFilter(filter)}
//                   className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
//                     activeFilter === filter
//                       ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg transform scale-105"
//                       : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200"
//                   }`}
//                 >
//                   {filter === "all" ? "All Orders" : filter}
//                 </button>
//               )
//             )}
//           </div>
//         </motion.div>

//         {loading ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100"
//           >
//             <div className="w-20 h-20 mx-auto mb-6 relative">
//               <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
//               <div className="absolute inset-4 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Loading Your Orders
//             </h3>
//             <p className="text-gray-500">Fetching your purchase history...</p>
//           </motion.div>
//         ) : getFilteredOrders().length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100"
//           >
//             <div className="w-40 h-40 mx-auto mb-8 relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
//               <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center">
//                 <div className="relative">
//                   <FaBoxOpen className="text-6xl text-gray-300" />
//                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
//                     <FaShoppingCart className="text-white text-sm" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">
//               No Orders Yet
//             </h3>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               Start your shopping journey and your orders will appear here
//             </p>
//             <a
//               href="/shop"
//               className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
//             >
//               <FaShoppingCart />
//               Explore Products
//             </a>
//           </motion.div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Orders List */}
//             <div className="lg:col-span-2 space-y-6">
//               <AnimatePresence>
//                 {getFilteredOrders().map((order, index) => (
//                   <motion.div
//                     key={order._id}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                     whileHover={{ y: -5 }}
//                     className="group"
//                   >
//                     <div className="relative">
//                       {/* Glow Effect */}
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                       {/* Main Order Card */}
//                       <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 overflow-hidden">
//                         {/* Corner Decoration */}
//                         <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>

//                         <div className="flex flex-col lg:flex-row gap-8">
//                           {/* Order Header */}
//                           <div className="flex-1">
//                             <div className="flex items-start justify-between mb-6">
//                               <div className="flex items-center gap-4">
//                                 <div
//                                   className={`p-3 rounded-2xl ${getStatusColor(
//                                     order.status
//                                   )} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
//                                 >
//                                   {getStatusIcon(order.status)}
//                                 </div>
//                                 <div>
//                                   <div className="flex items-center gap-3 mb-2">
//                                     <h3 className="text-xl font-bold text-gray-900">
//                                       Order #{truncateId(order._id)}
//                                     </h3>
//                                     {getPaymentBadge(order.paymentMethod)}
//                                   </div>
//                                   <div className="flex items-center gap-4 text-sm">
//                                     <span className="text-gray-500 flex items-center gap-1">
//                                       <FaCalendarAlt className="w-3 h-3" />
//                                       {formatDate(order.createdAt)}
//                                     </span>
//                                     <span className="text-gray-500 flex items-center gap-1">
//                                       <FaTag className="w-3 h-3" />
//                                       {order.items.length} items
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="text-right">
//                                 <div className="text-3xl font-bold text-gray-900 mb-2">
//                                   ₹{order.totalAmount}
//                                 </div>
//                                 <div
//                                   className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${getStatusColor(
//                                     order.status
//                                   )} shadow-md`}
//                                 >
//                                   {order.status}
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Items Preview with Hover Effects */}
//                             <div className="mb-6">
//                               <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
//                                 <FaBoxOpen className="text-blue-500" />
//                                 Order Items
//                               </h4>
//                               <div className="flex items-center gap-4">
//                                 {order.items.slice(0, 4).map((item, idx) => (
//                                   <div
//                                     key={idx}
//                                     className="relative group/item flex-shrink-0"
//                                   >
//                                     <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-2 flex items-center justify-center group-hover/item:border-blue-300 transition-all duration-300">
//                                       <img
//                                         src={
//                                           item.productId?.image ||
//                                           "https://via.placeholder.com/50"
//                                         }
//                                         alt={item.productId?.name}
//                                         className="w-12 h-12 object-contain group-hover/item:scale-110 transition-transform duration-300"
//                                       />
//                                     </div>
//                                     <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
//                                       {item.productId?.name?.substring(0, 12)}
//                                       ...
//                                     </div>
//                                   </div>
//                                 ))}
//                                 {order.items.length > 4 && (
//                                   <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
//                                     +{order.items.length - 4}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>

//                             {/* Customer Info Mini */}
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                               <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
//                                 <div className="p-2 bg-white rounded-lg">
//                                   <FaUser className="text-blue-600" />
//                                 </div>
//                                 <div>
//                                   <p className="text-xs text-gray-500">
//                                     Customer
//                                   </p>
//                                   <p className="font-medium text-sm">
//                                     {order.fullName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
//                                 <div className="p-2 bg-white rounded-lg">
//                                   <FaPhone className="text-emerald-600" />
//                                 </div>
//                                 <div>
//                                   <p className="text-xs text-gray-500">
//                                     Contact
//                                   </p>
//                                   <p className="font-medium text-sm">
//                                     {order.phone}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
//                                 <div className="p-2 bg-white rounded-lg">
//                                   <FaMapMarkerAlt className="text-amber-600" />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                   <p className="text-xs text-gray-500">
//                                     Location
//                                   </p>
//                                   <p className="font-medium text-sm truncate">
//                                     {order.pincode}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Action Buttons */}
//                           <div className="flex lg:flex-col gap-3">
//                             <button
//                               onClick={() =>
//                                 setSelectedOrder(
//                                   selectedOrder?._id === order._id
//                                     ? null
//                                     : order
//                                 )
//                               }
//                               className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-xl hover:from-blue-100 hover:to-cyan-100 hover:text-blue-700 transition-all duration-300 group/btn font-medium shadow-sm"
//                             >
//                               <FaEye className="group-hover/btn:scale-110 transition-transform" />
//                               <span>Details</span>
//                             </button>

//                             {order.status !== "Cancelled" &&
//                               order.status !== "Delivered" && (
//                                 <button
//                                   onClick={() => handleCancel(order._id)}
//                                   className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-xl hover:from-red-100 hover:to-pink-100 hover:text-red-700 transition-all duration-300 font-medium shadow-sm"
//                                 >
//                                   Cancel
//                                 </button>
//                               )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>

//             {/* Enhanced Order Details Panel */}
//             <AnimatePresence>
//               {selectedOrder && (
//                 <motion.div
//                   key="details-panel"
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ type: "spring", stiffness: 100, damping: 20 }}
//                   className="lg:col-span-1"
//                 >
//                   <div className="sticky top-24">
//                     {/* Glow Effect */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>

//                     {/* Panel Content */}
//                     <div className="relative bg-white rounded-3xl shadow-2xl border border-blue-100 p-6 overflow-hidden">
//                       {/* Decorative Elements */}
//                       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
//                       <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full translate-y-12 -translate-x-12 opacity-60"></div>

//                       {/* Close Button */}
//                       <button
//                         onClick={() => setSelectedOrder(null)}
//                         className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center z-10"
//                       >
//                         ×
//                       </button>

//                       {/* Panel Header */}
//                       <div className="relative z-10 mb-8">
//                         <div className="flex items-center gap-3 mb-4">
//                           <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg">
//                             <FaReceipt className="text-xl" />
//                           </div>
//                           <div>
//                             <h3 className="text-xl font-bold text-gray-900">
//                               Order Details
//                             </h3>
//                             <p className="text-sm text-blue-600">
//                               #{truncateId(selectedOrder._id)}
//                             </p>
//                           </div>
//                         </div>

//                         <div
//                           className={`px-4 py-2 rounded-xl ${getStatusColor(
//                             selectedOrder.status
//                           )} text-white font-bold text-center shadow-md`}
//                         >
//                           {getStatusIcon(selectedOrder.status)}{" "}
//                           {selectedOrder.status}
//                         </div>
//                       </div>

//                       {/* Order Summary */}
//                       <div className="space-y-4 mb-8 relative z-10">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="bg-gray-50 p-3 rounded-lg">
//                             <p className="text-xs text-gray-500 mb-1">
//                               Order Date
//                             </p>
//                             <p className="font-medium">
//                               {formatDate(selectedOrder.createdAt)}
//                             </p>
//                           </div>
//                           <div className="bg-gray-50 p-3 rounded-lg">
//                             <p className="text-xs text-gray-500 mb-1">
//                               Payment
//                             </p>
//                             <p className="font-medium">
//                               {selectedOrder.paymentMethod}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
//                           <div className="flex justify-between items-center">
//                             <div>
//                               <p className="text-sm text-gray-600">
//                                 Total Amount
//                               </p>
//                               <p className="text-3xl font-bold text-gray-900">
//                                 ₹{selectedOrder.totalAmount}
//                               </p>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm text-gray-600">Items</p>
//                               <p className="text-2xl font-bold text-gray-900">
//                                 {selectedOrder.items.length}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Items List */}
//                       <div className="mb-8 relative z-10">
//                         <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
//                           <FaBoxOpen className="text-blue-500" />
//                           Ordered Items
//                         </h4>
//                         <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
//                           {selectedOrder.items.map((item, index) => (
//                             <motion.div
//                               key={index}
//                               initial={{ opacity: 0, x: -20 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: index * 0.05 }}
//                               className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all duration-300"
//                             >
//                               <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 flex items-center justify-center">
//                                 <img
//                                   src={
//                                     item.productId?.image ||
//                                     "https://via.placeholder.com/40"
//                                   }
//                                   alt={item.productId?.name}
//                                   className="w-10 h-10 object-contain"
//                                 />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="font-medium text-gray-900 text-sm truncate">
//                                   {item.productId?.name}
//                                 </p>
//                                 <div className="flex items-center gap-3 mt-1">
//                                   <p className="text-xs text-gray-500">
//                                     Qty: {item.quantity}
//                                   </p>
//                                   <p className="text-xs text-blue-600 font-medium">
//                                     ₹{item.productId?.price} each
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-bold text-gray-900">
//                                   ₹{item.productId?.price * item.quantity}
//                                 </p>
//                               </div>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Customer Info */}
//                       <div className="relative z-10">
//                         <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
//                           <FaUser className="text-blue-500" />
//                           Delivery Information
//                         </h4>
//                         <div className="space-y-3">
//                           <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
//                             <FaUser className="text-blue-600" />
//                             <div>
//                               <p className="text-sm text-gray-600">
//                                 Customer Name
//                               </p>
//                               <p className="font-medium">
//                                 {selectedOrder.fullName}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
//                             <FaPhone className="text-emerald-600" />
//                             <div>
//                               <p className="text-sm text-gray-600">
//                                 Contact Number
//                               </p>
//                               <p className="font-medium">
//                                 {selectedOrder.phone}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
//                             <FaMapMarkerAlt className="text-amber-600 mt-1" />
//                             <div className="flex-1">
//                               <p className="text-sm text-gray-600">
//                                 Delivery Address
//                               </p>
//                               <p className="font-medium">
//                                 {selectedOrder.address}
//                               </p>
//                               <p className="text-sm text-gray-500 mt-1">
//                                 PIN: {selectedOrder.pincode}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>

//       {/* CSS Animation for Gradient Text */}
//       <style jsx>{`
//         @keyframes gradient {
//           0%,
//           100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MyOrdersPage;



import React, { useEffect, useState } from "react";
import API from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaReceipt,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaCalendarAlt,
  FaCreditCard,
  FaShoppingBag,
  FaRupeeSign,
  FaTag,
  FaChevronRight,
  FaShoppingCart,
  FaArrowLeft,
  FaBoxOpen,
  FaDownload,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import InvoiceModal from "./InvoiceModal";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users/mine");
      setOrders(res.data.orders || []);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      const res = await API.put(`/users/update-status/${orderId}`, {
        status: "Cancelled",
      });
      toast.success(res.data.message || "Order cancelled successfully");
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    }
  };

  const handleDownloadInvoice = (order) => {
    setInvoiceOrder(order);
    setShowInvoice(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <FaClock className="text-yellow-400" />;
      case "Confirmed":
        return <FaCheckCircle className="text-blue-400" />;
      case "Delivered":
        return <FaTruck className="text-emerald-400" />;
      case "Cancelled":
        return <FaTimesCircle className="text-red-400" />;
      default:
        return <FaBox className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-gradient-to-r from-yellow-500 to-amber-500";
      case "Confirmed":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Delivered":
        return "bg-gradient-to-r from-emerald-500 to-green-500";
      case "Cancelled":
        return "bg-gradient-to-r from-red-500 to-pink-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getFilteredOrders = () => {
    if (activeFilter === "all") return orders;
    return orders.filter((order) => order.status === activeFilter);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const truncateId = (id) => {
    return id.substring(0, 8).toUpperCase();
  };

  const getPaymentBadge = (method) => {
    return method === "Online" ? (
      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold shadow-md">
        <FaCreditCard className="inline mr-1" /> Paid
      </span>
    ) : (
      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-xs font-bold shadow-md">
        <FaCreditCard className="inline mr-1" /> COD
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-24 pb-12 px-4">
      <ToastContainer position="top-right" theme="colored" />

      {/* Invoice Modal */}
      {showInvoice && invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          onClose={() => setShowInvoice(false)}
        />
      )}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 mt-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-40"></div>
                <div className="relative p-4 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
                  <FaShoppingBag className="text-3xl" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  My{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Orders
                  </span>
                </h1>
                <p className="text-gray-600 text-lg">
                  Track and manage all your purchases
                </p>
              </div>
            </div>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 text-gray-700 hover:text-blue-600"
            >
              <FaArrowLeft />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Total Orders",
                value: orders.length,
                color: "from-blue-500 to-cyan-500",
                icon: <FaReceipt />,
                description: "All time",
              },
              {
                label: "Delivered",
                value: orders.filter((o) => o.status === "Delivered").length,
                color: "from-emerald-500 to-green-500",
                icon: <FaTruck />,
                description: "Completed",
              },
              {
                label: "Processing",
                value: orders.filter((o) => o.status === "Processing").length,
                color: "from-yellow-500 to-amber-500",
                icon: <FaClock />,
                description: "In progress",
              },
              {
                label: "Total Spent",
                value: `₹${orders.reduce(
                  (sum, order) => sum + order.totalAmount,
                  0
                )}`,
                color: "from-purple-500 to-pink-500",
                icon: <FaRupeeSign />,
                description: "Lifetime",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                ></div>
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}
                    >
                      {stat.icon}
                    </div>
                    <FaChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {["all", "Processing", "Confirmed", "Delivered", "Cancelled"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200"
                  }`}
                >
                  {filter === "all" ? "All Orders" : filter}
                </button>
              )
            )}
          </div>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100"
          >
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-4 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Your Orders
            </h3>
            <p className="text-gray-500">Fetching your purchase history...</p>
          </motion.div>
        ) : getFilteredOrders().length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100"
          >
            <div className="w-40 h-40 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center">
                <div className="relative">
                  <FaBoxOpen className="text-6xl text-gray-300" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <FaShoppingCart className="text-white text-sm" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Orders Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your shopping journey and your orders will appear here
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <FaShoppingCart />
              Explore Products
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {getFilteredOrders().map((order, index) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Main Order Card */}
                      <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 overflow-hidden">
                        {/* Corner Decoration */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>

                        <div className="flex flex-col lg:flex-row gap-8">
                          {/* Order Header */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <div
                                  className={`p-3 rounded-2xl ${getStatusColor(
                                    order.status
                                  )} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                >
                                  {getStatusIcon(order.status)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">
                                      Order #{truncateId(order._id)}
                                    </h3>
                                    {getPaymentBadge(order.paymentMethod)}
                                  </div>
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="text-gray-500 flex items-center gap-1">
                                      <FaCalendarAlt className="w-3 h-3" />
                                      {formatDate(order.createdAt)}
                                    </span>
                                    <span className="text-gray-500 flex items-center gap-1">
                                      <FaTag className="w-3 h-3" />
                                      {order.items.length} items
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-3xl font-bold text-gray-900 mb-2">
                                  ₹{order.totalAmount}
                                </div>
                                <div
                                  className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${getStatusColor(
                                    order.status
                                  )} shadow-md`}
                                >
                                  {order.status}
                                </div>
                              </div>
                            </div>

                            {/* Items Preview with Hover Effects */}
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <FaBoxOpen className="text-blue-500" />
                                Order Items
                              </h4>
                              <div className="flex items-center gap-4">
                                {order.items.slice(0, 4).map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="relative group/item flex-shrink-0"
                                  >
                                    <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-2 flex items-center justify-center group-hover/item:border-blue-300 transition-all duration-300">
                                      <img
                                        src={
                                          item.productId?.image ||
                                          "https://via.placeholder.com/50"
                                        }
                                        alt={item.productId?.name}
                                        className="w-12 h-12 object-contain group-hover/item:scale-110 transition-transform duration-300"
                                      />
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                      {item.productId?.name?.substring(0, 12)}
                                      ...
                                    </div>
                                  </div>
                                ))}
                                {order.items.length > 4 && (
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                                    +{order.items.length - 4}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Customer Info Mini */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                                <div className="p-2 bg-white rounded-lg">
                                  <FaUser className="text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Customer
                                  </p>
                                  <p className="font-medium text-sm">
                                    {order.fullName}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
                                <div className="p-2 bg-white rounded-lg">
                                  <FaPhone className="text-emerald-600" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Contact
                                  </p>
                                  <p className="font-medium text-sm">
                                    {order.phone}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                                <div className="p-2 bg-white rounded-lg">
                                  <FaMapMarkerAlt className="text-amber-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-gray-500">
                                    Location
                                  </p>
                                  <p className="font-medium text-sm truncate">
                                    {order.pincode}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex lg:flex-col gap-3">
                            <button
                              onClick={() =>
                                setSelectedOrder(
                                  selectedOrder?._id === order._id
                                    ? null
                                    : order
                                )
                              }
                              className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-xl hover:from-blue-100 hover:to-cyan-100 hover:text-blue-700 transition-all duration-300 group/btn font-medium shadow-sm"
                            >
                              <FaEye className="group-hover/btn:scale-110 transition-transform" />
                              <span>Details</span>
                            </button>

                            <button
                              onClick={() => handleDownloadInvoice(order)}
                              className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 rounded-xl hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-300 group/btn font-medium shadow-sm"
                            >
                              <FaDownload className="group-hover/btn:scale-110 transition-transform" />
                              <span>Invoice</span>
                            </button>

                            {order.status !== "Cancelled" &&
                              order.status !== "Delivered" && (
                                <button
                                  onClick={() => handleCancel(order._id)}
                                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-xl hover:from-red-100 hover:to-pink-100 hover:text-red-700 transition-all duration-300 font-medium shadow-sm"
                                >
                                  Cancel
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Enhanced Order Details Panel */}
            <AnimatePresence>
              {selectedOrder && (
                <motion.div
                  key="details-panel"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="lg:col-span-1"
                >
                  <div className="sticky top-24">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>

                    {/* Panel Content */}
                    <div className="relative bg-white rounded-3xl shadow-2xl border border-blue-100 p-6 overflow-hidden">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full translate-y-12 -translate-x-12 opacity-60"></div>

                      {/* Close Button */}
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center z-10"
                      >
                        ×
                      </button>

                      {/* Panel Header */}
                      <div className="relative z-10 mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg">
                              <FaReceipt className="text-xl" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                Order Details
                              </h3>
                              <p className="text-sm text-blue-600">
                                #{truncateId(selectedOrder._id)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownloadInvoice(selectedOrder)}
                            className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                          >
                            <FaDownload />
                            Invoice
                          </button>
                        </div>

                        <div
                          className={`px-4 py-2 rounded-xl ${getStatusColor(
                            selectedOrder.status
                          )} text-white font-bold text-center shadow-md`}
                        >
                          {getStatusIcon(selectedOrder.status)}{" "}
                          {selectedOrder.status}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="space-y-4 mb-8 relative z-10">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">
                              Order Date
                            </p>
                            <p className="font-medium">
                              {formatDate(selectedOrder.createdAt)}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">
                              Payment
                            </p>
                            <p className="font-medium">
                              {selectedOrder.paymentMethod}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">
                                Total Amount
                              </p>
                              <p className="text-3xl font-bold text-gray-900">
                                ₹{selectedOrder.totalAmount}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Items</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {selectedOrder.items.length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="mb-8 relative z-10">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <FaBoxOpen className="text-blue-500" />
                          Ordered Items
                        </h4>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                          {selectedOrder.items.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all duration-300"
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 flex items-center justify-center">
                                <img
                                  src={
                                    item.productId?.image ||
                                    "https://via.placeholder.com/40"
                                  }
                                  alt={item.productId?.name}
                                  className="w-10 h-10 object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">
                                  {item.productId?.name}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                  <p className="text-xs text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                  <p className="text-xs text-blue-600 font-medium">
                                    ₹{item.productId?.price} each
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-900">
                                  ₹{item.productId?.price * item.quantity}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="relative z-10">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <FaUser className="text-blue-500" />
                          Delivery Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                            <FaUser className="text-blue-600" />
                            <div>
                              <p className="text-sm text-gray-600">
                                Customer Name
                              </p>
                              <p className="font-medium">
                                {selectedOrder.fullName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                            <FaPhone className="text-emerald-600" />
                            <div>
                              <p className="text-sm text-gray-600">
                                Contact Number
                              </p>
                              <p className="font-medium">
                                {selectedOrder.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                            <FaMapMarkerAlt className="text-amber-600 mt-1" />
                            <div className="flex-1">
                              <p className="text-sm text-gray-600">
                                Delivery Address
                              </p>
                              <p className="font-medium">
                                {selectedOrder.address}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                PIN: {selectedOrder.pincode}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* CSS Animation for Gradient Text */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default MyOrdersPage;