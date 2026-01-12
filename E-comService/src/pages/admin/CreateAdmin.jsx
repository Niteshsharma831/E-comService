//

import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";
import {
  FaUserShield,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaVenusMars,
  FaMapMarkerAlt,
  FaCamera,
  FaUpload,
  FaCheckCircle,
} from "react-icons/fa";

const CLOUD_NAME = "dva8v7gxm";
const UNSIGNED_PRESET = "admin_dp";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    address: "",
    profilePic: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }
    setFormData((prev) => ({ ...prev, profilePic: file }));
    setPreviewImage(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, phone, gender, address } = formData;
    if (!name || !email || !password || !phone || !gender || !address) {
      toast.error("All fields except profile picture are required");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = "";

      if (formData.profilePic) {
        const cloudForm = new FormData();
        cloudForm.append("file", formData.profilePic);
        cloudForm.append("upload_preset", UNSIGNED_PRESET);

        const { data: cloudData } = await API.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          cloudForm
        );
        imageUrl = cloudData.secure_url;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
        address: formData.address,
        profile: imageUrl,
        role: "admin",
      };

      await API.post("/admin/create-admin", payload);

      toast.success("✅ Admin created successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        address: "",
        profilePic: null,
      });
      setPreviewImage("");
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
              <FaUserShield className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create New Admin
            </h1>
            <p className="text-gray-600">
              Add a new administrator to manage your platform
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <FaUserShield />
                Admin Registration Form
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <FaUser className="text-blue-500" />
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <FaEnvelope className="text-green-500" />
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <FaLock className="text-red-500" />
                    Password *
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <FaPhone className="text-purple-500" />
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <FaVenusMars className="text-pink-500" />
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-orange-500" />
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete address"
                    rows={3}
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Profile Picture */}
                <div className="md:col-span-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2 mb-4">
                    <FaCamera className="text-blue-500" />
                    Profile Picture (Optional)
                  </label>

                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Upload Area */}
                    <div className="flex-1">
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
                        <FaUpload className="text-3xl text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-3">
                          Drag & drop your image here, or click to browse
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="profileUpload"
                        />
                        <label
                          htmlFor="profileUpload"
                          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                        >
                          Choose Image
                        </label>
                        <p className="text-sm text-gray-500 mt-2">
                          JPG, PNG up to 5MB
                        </p>
                      </div>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 text-center">
                      <div className="relative inline-block">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
                          />
                        ) : (
                          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-white shadow-xl flex items-center justify-center">
                            <FaUser className="text-4xl text-gray-400" />
                          </div>
                        )}
                        {previewImage && (
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <FaCheckCircle className="text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-3">
                        {previewImage ? "Image selected" : "No image selected"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                  } text-white flex items-center justify-center gap-3`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Admin...
                    </>
                  ) : (
                    <>
                      <FaUserShield />
                      Create Admin Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Information Card */}
          <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <FaUserShield />
              Admin Privileges
            </h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Full access to all admin features</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Can manage users, products, and orders</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Access to analytics and reports</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>System configuration privileges</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateAdmin;
