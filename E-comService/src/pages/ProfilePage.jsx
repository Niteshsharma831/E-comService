// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) navigate("/login");
//     else {
//       const userData = JSON.parse(storedUser);
//       setUser(userData);
//       setFormData({
//         name: userData.name || "",
//         email: userData.email || "",
//         phone: userData.phone || "",
//         address: userData.address || "",
//         gender: userData.gender || "",
//       });
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(
//         "https://e-comservice.onrender.com/api/users/update",
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!res.ok) throw new Error("Update failed");

//       const result = await res.json();
//       localStorage.setItem("user", JSON.stringify(result.user));
//       setUser(result.user);
//       toast.success(result.message || "✅ Profile updated successfully");
//       setShowEdit(false);
//     } catch (err) {
//       toast.error("❌ Update failed: " + err.message);
//       console.error("Update error:", err);
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return "U";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   if (!user) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600 text-lg">Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-24 px-4 bg-gray-100 min-h-screen mt-10">
//       <ToastContainer />
//       {/* Profile Card */}
//       <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mb-10">
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           {/* Avatar */}
//           <div className="w-32 h-32 rounded-full overflow-hidden border shadow-md flex items-center justify-center bg-blue-50 text-blue-700 text-4xl font-bold">
//             {user.profilePicture ? (
//               <img
//                 src={user.profilePicture}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   // fallback to initials if image fails to load
//                   e.target.onerror = null;
//                   e.target.src = ""; // remove broken image
//                 }}
//               />
//             ) : (
//               getInitials(user.name || "User")
//             )}
//           </div>

//           {/* User Info */}
//           <div className="flex-1 space-y-4">
//             <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//               <div>
//                 <p className="font-medium text-gray-500">Full Name</p>
//                 <p className="text-lg">{user.name}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-500">Email</p>
//                 <p className="text-lg">{user.email}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-500">Phone</p>
//                 <p className="text-lg">{user.phone || "Not provided"}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-500">Address</p>
//                 <p className="text-lg">{user.address || "Not provided"}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-500">Role</p>
//                 <p
//                   className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
//                     user.isAdmin ? "bg-green-600" : "bg-blue-500"
//                   }`}
//                 >
//                   {user.isAdmin ? "Admin" : "User"}
//                 </p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-500">Gender</p>
//                 <p className="text-lg">{user.gender || "Not provided"}</p>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-6 flex flex-col md:flex-row gap-4">
//               <button
//                 onClick={() => navigate("/")}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow transition"
//               >
//                 Back to Home
//               </button>
//               <button
//                 onClick={() => setShowEdit(true)}
//                 className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-50 transition"
//               >
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders Section */}
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-10">
//         <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Orders</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3].map((order) => (
//             <div
//               key={order}
//               className="p-4 border rounded-lg shadow hover:shadow-md transition bg-gray-50"
//             >
//               <p className="text-gray-700 font-medium mb-1">
//                 Order #{Math.floor(Math.random() * 10000)}
//               </p>
//               <p className="text-gray-500 mb-2">Status: Delivered</p>
//               <p className="text-gray-600 font-semibold">
//                 Total: ₹{Math.floor(Math.random() * 5000)}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEdit && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
//           <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg animate-slide-in">
//             <h2 className="text-xl font-bold mb-4 text-blue-600">
//               Edit Your Profile
//             </h2>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="Address"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>

//               <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowEdit(false)}
//                   className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEdit,
  FaHome,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
  FaShieldAlt,
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
} from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) navigate("/login");
    else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        gender: userData.gender || "",
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://e-comservice.onrender.com/api/users/update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const result = await res.json();
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      toast.success(result.message || "✅ Profile updated successfully");
      setShowEdit(false);
    } catch (err) {
      toast.error("❌ Update failed: " + err.message);
      console.error("Update error:", err);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 pt-20 mt-20">
      <ToastContainer position="top-right" theme="colored" />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Account
            </span>
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 text-gray-700 hover:text-blue-600"
          >
            <FaHome />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Main Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {getInitials(user.name || "User")}
                </div>
                {user.isAdmin && (
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                    ADMIN
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {user.name}
                    </h2>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => setShowEdit(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <FaEdit />
                    <span>Edit Profile</span>
                  </button>
                </div>

                {/* User Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <FaUser />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                      <FaVenusMars />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">
                        {user.gender || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {user.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-gradient-to-br from-blue-900 to-gray-900 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 rounded-lg">
                <FaShieldAlt className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Account Status</h3>
                <p className="text-sm text-blue-200">Premium Member</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Member Since</span>
                <span className="font-medium">2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Account Type</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    user.isAdmin ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  {user.isAdmin ? "Administrator" : "Standard User"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Email Verified</span>
                <span className="text-green-400 flex items-center gap-1">
                  <FaCheckCircle /> Verified
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Phone Verified</span>
                <span
                  className={
                    user.phone
                      ? "text-green-400 flex items-center gap-1"
                      : "text-amber-400 flex items-center gap-1"
                  }
                >
                  {user.phone ? <FaCheckCircle /> : <FaTimesCircle />}
                  {user.phone ? "Verified" : "Pending"}
                </span>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 font-medium">
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              View All Orders
              <FaArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((order) => (
              <div
                key={order}
                className="group border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FaBox className="text-blue-600" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Delivered
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Order #{1000 + order}
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  Jan {15 + order}, 2024
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{1299 + order * 500}
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-8">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-slideUp">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Edit Profile
                </h3>
                <button
                  onClick={() => setShowEdit(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
