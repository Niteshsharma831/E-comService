import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profilePic: file }));
    setPreviewImage(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, phone, gender, address } = formData;
    if (!name || !email || !password || !phone || !gender || !address) {
      toast.error("❌ All fields except profile picture are required");
      return;
    }

    try {
      let imageUrl = "";

      if (formData.profilePic) {
        const cloudForm = new FormData();
        cloudForm.append("file", formData.profilePic);
        cloudForm.append("upload_preset", UNSIGNED_PRESET);

        const { data: cloudData } = await axios.post(
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
      };

      const { data } = await axios.post(
        "https://e-comservice.onrender.com/api/admin/create-admin",
        payload
      );

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
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
            Create New Admin
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <Input
              label="Phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />

            {/* Gender */}
            <div>
              <Label text="Gender" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <Label text="Address" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Profile Picture (optional) */}
            <div className="md:col-span-2">
              <Label text="Profile Picture (optional)" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-4 w-24 h-24 rounded-full object-cover border shadow-md"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
              >
                Create Admin
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </AdminLayout>
  );
};

/* ---- Small Reusable Components ---- */

const Label = ({ text }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">{text}</label>
);

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) => (
  <div>
    <Label text={label} />
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

export default CreateAdmin;
