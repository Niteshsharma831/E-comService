import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { FaUsers, FaUserShield, FaBoxOpen, FaEnvelope } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      type: "spring",
      stiffness: 120,
    },
  }),
};

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [enquiry, setEnquiry] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const productRes = await axios.get(
          "https://e-comservice.onrender.com/api/products/count"
        );
        setProductCount(productRes.data.count);

        const userRes = await axios.get(
          "https://e-comservice.onrender.com/api/users/getallusers"
        );
        const users = userRes.data; // 👈 array expected

        setUserCount(users.length);

        const admins = users.filter((u) => u.role === "admin");
        setAdminCount(admins.length);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 bg-gradient-to-br from-slate-100 to-blue-100 min-h-screen">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center animate-fade-in">
          📊 Welcome to Admin Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Product Count */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <FaBoxOpen className="text-4xl mx-auto mb-3 text-indigo-500" />
            <h3 className="text-xl font-semibold text-gray-700">
              Total Products
            </h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {productCount}
            </p>
          </motion.div>

          {/* User Count */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <FaUsers className="text-4xl mx-auto mb-3 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {userCount}
            </p>
          </motion.div>

          {/* Admin Count */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <FaUserShield className="text-4xl mx-auto mb-3 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-700">
              Total Admins
            </h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{adminCount}</p>
          </motion.div>
        </div>

        {/* Message Box */}
        <motion.div
          className="mt-10 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-2xl text-indigo-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">
              Client Enquiry
            </h3>
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-none shadow-sm focus:ring focus:ring-indigo-300"
            rows={5}
            placeholder="Write client issues or inquiries here..."
            value={enquiry}
            onChange={(e) => setEnquiry(e.target.value)}
          />
          <button
            onClick={() => {
              if (enquiry.trim()) {
                alert("📩 Enquiry submitted:\n" + enquiry);
                setEnquiry("");
              }
            }}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Submit Enquiry
          </button>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
