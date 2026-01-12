// import React, { useEffect, useState } from "react";
// import AdminLayout from "./AdminLayout";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaUsers,
//   FaUserShield,
//   FaBoxOpen,
//   FaEnvelope,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import API from "../../api"; // ✅ centralized API

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.9, y: 20 },
//   visible: (i) => ({
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.2,
//       duration: 0.5,
//       type: "spring",
//       stiffness: 120,
//     },
//   }),
// };

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [productCount, setProductCount] = useState(0);
//   const [userCount, setUserCount] = useState(0);
//   const [adminCount, setAdminCount] = useState(0);
//   const [enquiry, setEnquiry] = useState("");

//   // Redirect if admin not logged in
//   useEffect(() => {
//     const admin = localStorage.getItem("admin");
//     if (!admin) navigate("/admin/login");
//   }, [navigate]);

//   // Fetch counts
//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const productRes = await API.get("/products/count");
//         setProductCount(productRes.data.count);

//         const userRes = await API.get("/users/getallusers");
//         const users = userRes.data;
//         setUserCount(users.length);

//         const admins = users.filter((u) => u?.role?.toLowerCase() === "admin");
//         setAdminCount(admins.length);
//       } catch (err) {
//         console.error("Error fetching counts:", err);
//       }
//     };

//     fetchCounts();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     navigate("/admin/login");
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 bg-gradient-to-br from-slate-100 to-blue-100 min-h-screen relative">
//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="absolute top-4 right-6 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
//         >
//           <FaSignOutAlt className="inline-block mr-2" />
//           Logout
//         </button>

//         <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center animate-fade-in">
//           📊 Welcome to Admin Dashboard
//         </h2>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           <motion.div
//             className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             custom={0}
//           >
//             <FaBoxOpen className="text-4xl mx-auto mb-3 text-indigo-500" />
//             <h3 className="text-xl font-semibold text-gray-700">
//               Total Products
//             </h3>
//             <p className="text-3xl font-bold text-indigo-600 mt-2">
//               {productCount}
//             </p>
//           </motion.div>

//           <motion.div
//             className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             custom={1}
//           >
//             <FaUsers className="text-4xl mx-auto mb-3 text-green-500" />
//             <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
//             <p className="text-3xl font-bold text-green-600 mt-2">
//               {userCount}
//             </p>
//           </motion.div>

//           <motion.div
//             className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             custom={2}
//           >
//             <FaUserShield className="text-4xl mx-auto mb-3 text-red-500" />
//             <h3 className="text-xl font-semibold text-gray-700">
//               Total Admins
//             </h3>
//             <p className="text-3xl font-bold text-red-600 mt-2">{adminCount}</p>
//           </motion.div>
//         </div>

//         {/* Enquiry Box */}
//         <motion.div
//           className="mt-10 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           <div className="flex items-center mb-4">
//             <FaEnvelope className="text-2xl text-indigo-600 mr-2" />
//             <h3 className="text-xl font-semibold text-gray-800">
//               Client Enquiry
//             </h3>
//           </div>
//           <textarea
//             className="w-full p-3 border border-gray-300 rounded-md resize-none shadow-sm focus:ring focus:ring-indigo-300"
//             rows={5}
//             placeholder="Write client issues or inquiries here..."
//             value={enquiry}
//             onChange={(e) => setEnquiry(e.target.value)}
//           />
//           <button
//             onClick={() => {
//               if (enquiry.trim()) {
//                 alert("📩 Enquiry submitted:\n" + enquiry);
//                 setEnquiry("");
//               }
//             }}
//             className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//           >
//             Submit Enquiry
//           </button>
//         </motion.div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserShield,
  FaBoxOpen,
  FaEnvelope,
  FaSignOutAlt,
  FaShoppingCart,
  FaPlus,
  FaArrowUp,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaDownload,
  FaSearch,
  FaChevronRight,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 120,
    },
  }),
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [enquiry, setEnquiry] = useState("");
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) navigate("/admin/login");
  }, [navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const productRes = await API.get("/products/count");
        setProductCount(productRes.data.count);

        const userRes = await API.get("/users/getallusers");
        const users = userRes.data;
        setUserCount(users.length);

        const admins = users.filter((u) => u?.role?.toLowerCase() === "admin");
        setAdminCount(admins.length);

        setRecentUsers(
          users.slice(0, 5).map((user) => ({
            ...user,
            status: Math.random() > 0.5 ? "active" : "inactive",
            joinDate: new Date().toLocaleDateString(),
          }))
        );
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "addProduct":
        navigate("/admin/products/add");
        break;
      case "addUser":
        navigate("/admin/users/add");
        break;
      case "viewAllUsers":
        navigate("/admin/users");
        break;
      case "viewAllProducts":
        navigate("/admin/products");
        break;
    }
  };

  // User Action Functions
  const handleViewUser = (userId) => {
    navigate(`/admin/user/${userId}`);
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/users/delete/${userId}`);
      toast.success("User deleted successfully");

      // Refresh the users list
      const userRes = await API.get("/users/getallusers");
      const users = userRes.data;
      setUserCount(users.length);

      const admins = users.filter((u) => u?.role?.toLowerCase() === "admin");
      setAdminCount(admins.length);

      setRecentUsers(
        users.slice(0, 5).map((user) => ({
          ...user,
          status: Math.random() > 0.5 ? "active" : "inactive",
          joinDate: new Date().toLocaleDateString(),
        }))
      );
    } catch (error) {
      console.error("❌ Failed to delete user:", error);
      toast.error("Error deleting user");
    }
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const last = parts[1]?.charAt(0).toUpperCase() || "";
    return first + last;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors mt-4 md:mt-0"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaBoxOpen className="text-2xl text-blue-600" />
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <FaArrowUp />
                <span className="ml-1">+12%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{productCount}</h3>
            <p className="text-gray-600 mt-1">Total Products</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaUsers className="text-2xl text-green-600" />
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <FaArrowUp />
                <span className="ml-1">+8%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{userCount}</h3>
            <p className="text-gray-600 mt-1">Total Users</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaUserShield className="text-2xl text-purple-600" />
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <FaArrowUp />
                <span className="ml-1">+2%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{adminCount}</h3>
            <p className="text-gray-600 mt-1">Total Admins</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FaShoppingCart className="text-2xl text-orange-600" />
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <FaArrowUp />
                <span className="ml-1">+23%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">1,234</h3>
            <p className="text-gray-600 mt-1">Monthly Orders</p>
          </motion.div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
              <p className="text-sm text-gray-500 mt-1">
                Latest registered users
              </p>
            </div>
            <button
              onClick={() => handleQuickAction("viewAllUsers")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors group"
            >
              View All
              <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">
                    User
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {user.profile ? (
                          <img
                            src={user.profile}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name || "User"
                              )}`;
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                            {getInitials(user.name || user.username || "")}
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-800 block">
                            {user.name || "Unknown"}
                          </span>
                          <span className="text-xs text-gray-500">
                            @{user.username || "username"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-600">
                        {user.email || "No email"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.phone || "-"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewUser(user._id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEditUser(user._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">
                    Active:{" "}
                    {recentUsers.filter((u) => u.status === "active").length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm text-gray-600">
                    Inactive:{" "}
                    {recentUsers.filter((u) => u.status !== "active").length}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Showing {recentUsers.length} of {userCount} users
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Enquiry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleQuickAction("addProduct")}
                className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <div className="p-3 bg-blue-100 rounded-lg mb-3">
                  <FaPlus className="text-xl text-blue-600" />
                </div>
                <span className="font-medium text-gray-800">Add Product</span>
              </button>

              <button
                onClick={() => handleQuickAction("addUser")}
                className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
              >
                <div className="p-3 bg-green-100 rounded-lg mb-3">
                  <FaPlus className="text-xl text-green-600" />
                </div>
                <span className="font-medium text-gray-800">Add User</span>
              </button>

              <button
                onClick={() => handleQuickAction("viewAllProducts")}
                className="flex flex-col items-center justify-center p-6 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
              >
                <div className="p-3 bg-purple-100 rounded-lg mb-3">
                  <FaBoxOpen className="text-xl text-purple-600" />
                </div>
                <span className="font-medium text-gray-800">View Products</span>
              </button>

              <button
                onClick={() => handleQuickAction("viewAllUsers")}
                className="flex flex-col items-center justify-center p-6 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
              >
                <div className="p-3 bg-orange-100 rounded-lg mb-3">
                  <FaUsers className="text-xl text-orange-600" />
                </div>
                <span className="font-medium text-gray-800">View Users</span>
              </button>
            </div>
          </div>

          {/* Enquiry Box */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FaEnvelope className="text-xl text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Client Enquiry
                </h2>
                <p className="text-gray-600 text-sm">
                  Send message to support team
                </p>
              </div>
            </div>

            <textarea
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              placeholder="Write client issues or inquiries here..."
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
            />

            <button
              onClick={() => {
                if (enquiry.trim()) {
                  toast.success("Enquiry submitted successfully!");
                  setEnquiry("");
                }
              }}
              disabled={!enquiry.trim()}
              className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-colors ${
                !enquiry.trim()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Submit Enquiry
            </button>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
