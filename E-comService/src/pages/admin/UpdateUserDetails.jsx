import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./AdminLayout";
import API from "../../api"; // Axios instance

const UpdateUserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await API.put(`/users/update/${userId}`, formData);
      toast.success("✅ User updated successfully");
      setTimeout(() => navigate("/admin/dashboard"), 2000);
    } catch (err) {
      toast.error("❌ Update failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${userId}`);
        const { name, email, address, phone } = res.data;
        setFormData({ name, email, address, phone });
      } catch (error) {
        toast.error("❌ Failed to load user");
        console.error("Error loading user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="h-screen flex items-center justify-center bg-blue-100 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Update User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
            {["name", "email", "address", "phone"].map((field) => (
              <div key={field}>
                <label className="capitalize">{field}</label>
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors[field] && (
                  <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-semibold transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUserDetails;
