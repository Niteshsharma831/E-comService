import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔁 loader state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://e-comservice.onrender.com/api/admin/admin-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log("Login Response:", data);

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        setLoading(false);
      } else {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        toast.success("Login successful!");
        setTimeout(() => navigate("/admin/dashboard", { replace: true }), 1000);
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="bg-white shadow-xl rounded-xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full animate-fade-in-up">
        <div className="bg-blue-800 text-white flex flex-col justify-center items-center p-6 md:w-1/2">
          <FaUserShield className="text-6xl mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold mb-2">Admin Portal</h2>
          <p className="text-sm text-center">
            Manage users, products, and dashboard.
          </p>
        </div>

        <div className="p-8 md:w-1/2 w-full">
          <h3 className="text-2xl font-semibold mb-4 text-center text-blue-800">
            Admin Login
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AdminLogin;
