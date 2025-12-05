import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 bg-gray-100 min-h-screen mt-10">
      <ToastContainer />
      {/* Profile Card */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border shadow-md flex items-center justify-center bg-blue-50 text-blue-700 text-4xl font-bold">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // fallback to initials if image fails to load
                  e.target.onerror = null;
                  e.target.src = ""; // remove broken image
                }}
              />
            ) : (
              getInitials(user.name || "User")
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-medium text-gray-500">Full Name</p>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Phone</p>
                <p className="text-lg">{user.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Address</p>
                <p className="text-lg">{user.address || "Not provided"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Role</p>
                <p
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                    user.isAdmin ? "bg-green-600" : "bg-blue-500"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Gender</p>
                <p className="text-lg">{user.gender || "Not provided"}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow transition"
              >
                Back to Home
              </button>
              <button
                onClick={() => setShowEdit(true)}
                className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-50 transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-10">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Orders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((order) => (
            <div
              key={order}
              className="p-4 border rounded-lg shadow hover:shadow-md transition bg-gray-50"
            >
              <p className="text-gray-700 font-medium mb-1">
                Order #{Math.floor(Math.random() * 10000)}
              </p>
              <p className="text-gray-500 mb-2">Status: Delivered</p>
              <p className="text-gray-600 font-semibold">
                Total: ₹{Math.floor(Math.random() * 5000)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg animate-slide-in">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Edit Your Profile
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
