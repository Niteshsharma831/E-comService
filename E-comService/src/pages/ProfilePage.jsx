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
    if (!storedUser) {
      navigate("/login");
    } else {
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
      const res = await fetch("https://e-comservice.onrender.com/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

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
    <div className="pt-24 px-4 bg-gray-100 mt-20">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Picture or Initials */}
          <div className="w-32 h-32 rounded-full overflow-hidden border shadow-md">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "User"
                  )}&background=0D8ABC&color=fff`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-700 text-4xl font-bold">
                {getInitials(user.name || "User")}
              </div>
            )}
          </div>

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

            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
              >
                Back to Home
              </button>
              <button
                onClick={() => setShowEdit(true)}
                className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-50"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg">
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
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-md"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
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
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
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
