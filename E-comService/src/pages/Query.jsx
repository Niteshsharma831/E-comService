// src/pages/Query.jsx
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import API from "../api";

function Query() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/query", formData);

      if (res.status === 200 || res.status === 201) {
        toast.success("✅ Your query has been submitted!", {
          position: "top-center",
          autoClose: 3000,
        });
        setFormData({ name: "", email: "", category: "", message: "" });
      } else {
        toast.error(`❌ ${res.data.message || "Something went wrong!"}`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      toast.error("❌ Network error. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4 py-10 mt-10">
      <div className="flex flex-col md:flex-row-reverse bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-6xl">
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            💬 Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                <FaUser className="inline mr-2 text-blue-500" /> Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                <FaEnvelope className="inline mr-2 text-blue-500" /> Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                🗂️ Category
              </label>
              <select
                name="category"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="smartphone">Smartphone</option>
                <option value="laptop">Laptop</option>
                <option value="tab">Tab</option>
                <option value="fashion">Fashion</option>
                <option value="beauty">Beauty</option>
                <option value="grocery">Grocery</option>
                <option value="furniture">Furniture</option>
                <option value="electronic">Electronic</option>
                <option value="tv & appliances">TV & Appliances</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                <FaCommentDots className="inline mr-2 text-blue-500" /> Message
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              🚀 Submit Query
            </button>
          </form>
        </div>

        {/* Left Side - Image and Banner */}
        <div className="w-full md:w-1/2 bg-blue-100 flex items-center justify-center p-6">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3094/3094830.png"
              alt="Support"
              className="w-72 mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-purple-700">
              We're here to help!
            </h3>
            <p className="text-gray-600 mt-2">
              Submit your query and our team will reach out shortly.
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Query;
