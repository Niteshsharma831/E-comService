// import React, { useEffect, useState } from "react";
// import AdminLayout from "./AdminLayout";
// import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
// import API from "../../api"; // ✅ use centralized API

// const AdminProfile = () => {
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//     const fetchAdmin = async () => {
//       try {
//         const { data } = await API.get("/admin/admin-profile"); // using centralized API
//         setAdmin(data.admin);
//       } catch (error) {
//         console.error("Error fetching admin:", error);
//       }
//     };

//     fetchAdmin();
//   }, []);

//   if (!admin) return <div className="p-6 text-center">Loading profile...</div>;

//   return (
//     <AdminLayout>
//       <div className="min-h-screen bg-gray-100 px-6 py-12">
//         <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
//           👤 Admin Profile
//         </h1>

//         <div className="flex justify-center">
//           <div className="bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
//             {/* Left Section */}
//             <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white p-10 md:w-1/3 flex flex-col justify-center items-center">
//               <img
//                 src={admin.profile || "https://via.placeholder.com/150"}
//                 alt="Admin"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-white mb-6 shadow-lg"
//               />
//               <h2 className="text-2xl font-bold">{admin.name}</h2>
//               <p className="text-sm mt-1">Admin</p>
//             </div>

//             {/* Right Section */}
//             <div className="p-10 md:w-2/3 flex flex-col justify-between">
//               <div className="space-y-6">
//                 <h3 className="text-gray-900 font-bold text-xl border-b pb-2">
//                   Information
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <Info label="Email" value={admin.email} />
//                   <Info label="Phone" value={admin.phone} />
//                   <Info label="Gender" value={admin.gender} />
//                   <Info label="Address" value={admin.address} />
//                 </div>

//                 <h3 className="text-gray-900 font-bold text-xl border-b pt-6 pb-2">
//                   Projects
//                 </h3>
//                 <div className="flex justify-between text-sm text-gray-700">
//                   <p>
//                     <strong>Recent:</strong> Sam Disuja
//                   </p>
//                   <p>
//                     <strong>Most Viewed:</strong> Dinoter Husainm
//                   </p>
//                 </div>
//               </div>

//               {/* Social Icons */}
//               <div className="mt-10 flex gap-6 text-blue-600 text-lg">
//                 <a href="#" className="hover:text-blue-800">
//                   <FaFacebookF />
//                 </a>
//                 <a href="#" className="hover:text-sky-500">
//                   <FaTwitter />
//                 </a>
//                 <a href="#" className="hover:text-pink-500">
//                   <FaInstagram />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// // Info sub-component
// const Info = ({ label, value }) => (
//   <div>
//     <p className="text-gray-500 text-xs uppercase">{label}</p>
//     <p className="text-base font-medium text-gray-800">{value || "N/A"}</p>
//   </div>
// );

// export default AdminProfile;

import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaMapMarkerAlt,
  FaUserShield,
  FaEdit,
  FaChartLine,
  FaCalendarAlt,
  FaShieldAlt,
  FaCog,
  FaBell,
  FaKey,
  FaIdCard,
  FaGlobe,
} from "react-icons/fa";
import API from "../../api";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await API.get("/admin/admin-profile");
        setAdmin(data.admin);
      } catch (error) {
        console.error("Error fetching admin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!admin) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl text-gray-600">Admin profile not found</h2>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      icon: <FaUserShield />,
      color: "bg-blue-500",
    },
    {
      label: "Products",
      value: "845",
      icon: <FaChartLine />,
      color: "bg-green-500",
    },
    {
      label: "Orders",
      value: "3,456",
      icon: <FaBell />,
      color: "bg-purple-500",
    },
    {
      label: "Revenue",
      value: "₹2.4L",
      icon: <FaShieldAlt />,
      color: "bg-orange-500",
    },
  ];

  const activityLogs = [
    { action: "Updated user permissions", time: "10:30 AM", date: "Today" },
    { action: "Published new product", time: "09:15 AM", date: "Today" },
    { action: "Processed 23 orders", time: "Yesterday", date: "Dec 12" },
    { action: "System maintenance", time: "Dec 10", date: "2 days ago" },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            👤 Admin Profile
          </h1>
          <p className="text-gray-600">
            Manage your profile and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                <div className="relative inline-block">
                  <img
                    src={admin.profile || "https://via.placeholder.com/150"}
                    alt="Admin"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h2 className="text-xl font-bold text-white mt-4">
                  {admin.name}
                </h2>
                <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <FaUserShield className="text-white text-sm" />
                  <span className="text-white text-sm font-medium">
                    Super Admin
                  </span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <div className="space-y-4">
                  <InfoItem
                    icon={<FaEnvelope className="text-blue-500" />}
                    label="Email"
                    value={admin.email}
                  />
                  <InfoItem
                    icon={<FaPhone className="text-green-500" />}
                    label="Phone"
                    value={admin.phone || "Not provided"}
                  />
                  <InfoItem
                    icon={<FaVenusMars className="text-pink-500" />}
                    label="Gender"
                    value={admin.gender || "Not specified"}
                  />
                  <InfoItem
                    icon={<FaMapMarkerAlt className="text-orange-500" />}
                    label="Address"
                    value={admin.address || "Not provided"}
                  />
                  <InfoItem
                    icon={<FaCalendarAlt className="text-purple-500" />}
                    label="Member Since"
                    value="December 2024"
                  />
                  <InfoItem
                    icon={<FaIdCard className="text-teal-500" />}
                    label="Admin ID"
                    value="ADM-001"
                  />
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-700 mb-4">Connect</h4>
                  <div className="flex justify-center gap-4">
                    <a
                      href="#"
                      className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-sky-100 text-sky-600 rounded-xl hover:bg-sky-200 transition-colors"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-pink-100 text-pink-600 rounded-xl hover:bg-pink-200 transition-colors"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 ${stat.color} rounded-lg text-white`}
                      >
                        {stat.icon}
                      </div>
                      <span className="font-medium text-gray-700">
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  {["overview", "activity", "security", "settings"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                          activeTab === tab
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Welcome Back, {admin.name?.split(" ")[0]}!
                      </h3>
                      <p className="text-gray-600">
                        You have full administrative privileges. Manage users,
                        products, orders, and system settings from this
                        dashboard.
                      </p>
                    </div>

                    {/* Admin Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FaUserShield className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              Manage Users
                            </h4>
                            <p className="text-sm text-gray-600">
                              View all users
                            </p>
                          </div>
                        </div>
                        <FaEdit className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <FaChartLine className="text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              Analytics
                            </h4>
                            <p className="text-sm text-gray-600">
                              View reports
                            </p>
                          </div>
                        </div>
                        <FaEdit className="text-green-600 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* System Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaShieldAlt className="text-blue-500" />
                        System Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            Platform Version
                          </p>
                          <p className="font-medium">v2.4.1</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Login</p>
                          <p className="font-medium">Today, 09:30 AM</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Session Duration
                          </p>
                          <p className="font-medium">2 hours 15 min</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Security Status
                          </p>
                          <p className="font-medium text-green-600">Active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "activity" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {activityLogs.map((log, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {log.action}
                              </p>
                              <p className="text-sm text-gray-600">
                                {log.date} • {log.time}
                              </p>
                            </div>
                          </div>
                          <FaGlobe className="text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Security Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FaKey className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              Password
                            </h4>
                            <p className="text-sm text-gray-600">
                              Last changed 30 days ago
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Change
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <FaBell className="text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              Two-Factor Authentication
                            </h4>
                            <p className="text-sm text-gray-600">
                              Add an extra layer of security
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Account Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <FaCog className="text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              Email Notifications
                            </h4>
                            <p className="text-sm text-gray-600">
                              Receive updates about your account
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <FaGlobe className="text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              Language & Region
                            </h4>
                            <p className="text-sm text-gray-600">
                              English (US) • IST Timezone
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-800">
                    Want to update your profile?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Keep your information up to date
                  </p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                  <FaEdit />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    {icon}
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default AdminProfile;
