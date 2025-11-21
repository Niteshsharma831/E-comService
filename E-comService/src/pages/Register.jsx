import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api"; // 🔥 IMPORTANT

const CLOUD_NAME = "dva8v7gxm";
const UNSIGNED_PRESET = "admin_dp";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    gender: "",
    profilePic: null,
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name required";
    if (!formData.email) newErrors.email = "Email required";
    if (!formData.password) newErrors.password = "Password required";
    if (!formData.address) newErrors.address = "Address required";
    if (!formData.phone) newErrors.phone = "Phone required";
    if (!formData.gender) newErrors.gender = "Gender required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePic: file });
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      let imageUrl = "";

      if (formData.profilePic) {
        const form = new FormData();
        form.append("file", formData.profilePic);
        form.append("upload_preset", UNSIGNED_PRESET);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: form }
        );

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
        gender: formData.gender,
        profile: imageUrl,
      };

      // 💥 FIXED — USE API, NOT DIRECT AXIOS
      await API.post("/users/create", payload);

      toast.success("Registration Successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("User already exists!");
      } else {
        toast.error("Registration failed!");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-10">
      <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
        <img
          src="https://graphicsfamily.com/wp-content/uploads/edd/2021/08/E-Commerce-Logo-Design-PNG.png"
          alt="Logo"
          className="w-64 h-auto object-contain"
        />
      </div>

      <div className="md:w-1/2 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"
        >
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Nitesh Kumar Sharma"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Rajkot"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="9572861917"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-600">{errors.gender}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">
              Profile Picture (optional)
            </label>
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
                className="mt-3 w-24 h-24 rounded-full object-cover border"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>

            <p className="text-sm text-center mt-4">
              Already registered?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
