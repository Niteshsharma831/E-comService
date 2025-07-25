import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPages = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://e-comservice.onrender.com/api/users/login",
        formData,
        { withCredentials: true }
      );

      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("user-logged-in"));

      toast.success("🟢 Login successful!", {
        onClose: () => navigate("/"),
        autoClose: 1500,
      });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
      toast.error("❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      {/* Left Side – Logo/Image */}
      <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
        <img
          src="https://graphicsfamily.com/wp-content/uploads/edd/2021/08/E-Commerce-Logo-Design-PNG.png"
          alt="Logo"
          className="w-64 h-auto object-contain"
        />
      </div>

      {/* Right Side – Login Form */}
      <div className="md:w-1/2 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password with Eye Toggle */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10"
                required
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm mt-4">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
            <Link to="/register" className="text-blue-500 hover:underline">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPages;
