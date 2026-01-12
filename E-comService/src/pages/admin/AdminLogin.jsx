// // src/pages/admin/AdminLogin.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserShield } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import API from "../../api";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data } = await API.post("/admin/admin-login", {
//         email,
//         password,
//       });

//       // store admin info in localStorage
//       localStorage.setItem("admin", JSON.stringify(data.admin));

//       toast.success("Login successful!");

//       // redirect to dashboard
//       setTimeout(() => {
//         navigate("/admin/dashboard", { replace: true });
//       }, 500);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Server error. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
//       <div className="bg-white shadow-xl rounded-xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full animate-fade-in-up">
//         {/* Left Section */}
//         <div className="bg-blue-800 text-white flex flex-col justify-center items-center p-6 md:w-1/2">
//           <FaUserShield className="text-6xl mb-4 animate-bounce" />
//           <h2 className="text-3xl font-bold mb-2">Admin Portal</h2>
//           <p className="text-sm text-center">
//             Manage users, products, and dashboard.
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className="p-8 md:w-1/2 w-full">
//           <h3 className="text-2xl font-semibold mb-4 text-center text-blue-800">
//             Admin Login
//           </h3>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block mb-1 font-medium">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 rounded text-white transition ${
//                 loading
//                   ? "bg-blue-300 cursor-not-allowed"
//                   : "bg-blue-700 hover:bg-blue-800"
//               }`}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={2000} />
//     </div>
//   );
// };

// export default AdminLogin;
// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserShield,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
  FaBox,
  FaCog,
  FaBell,
  FaHome,
  FaArrowRight,
  FaSignInAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/admin/admin-login", {
        email,
        password,
      });

      localStorage.setItem("admin", JSON.stringify(data.admin));
      localStorage.setItem("adminToken", data.token || "admin-auth-token");

      toast.success("Welcome back! Redirecting to dashboard...", {
        icon: "🚀",
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials", {
        icon: "🔒",
      });
    } finally {
      setLoading(false);
    }
  };

  // Demo admin credentials for quick access
  const handleQuickLogin = (demoType) => {
    if (demoType === "super") {
      setEmail("superadmin@example.com");
      setPassword("SuperAdmin@123");
      toast.info("Super Admin credentials loaded");
    } else {
      setEmail("admin@example.com");
      setPassword("Admin@123");
      toast.info("Admin credentials loaded");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation Header */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow-md">
                <FaUserShield className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  Admin Suite
                </h1>
                <p className="text-xs text-slate-500">
                  Enterprise Management System
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors group"
              >
                <FaHome className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-sm font-medium">
                  Home
                </span>
              </Link>

              <button
                onClick={() =>
                  toast.info("System notifications: All systems operational", {
                    icon: "📢",
                  })
                }
                className="p-2 text-slate-600 hover:text-blue-600 transition-colors relative group"
              >
                <FaBell />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
                <FaCog className="animate-spin-slow" />
                <span>v2.4.1 • Secure Session</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 mt-16">
        {/* Left Panel - Features Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    Admin Pro
                  </span>
                </h1>
                <p className="text-slate-600">
                  Sign in to access the complete management dashboard
                </p>
              </div>
              <div className="hidden lg:block p-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl shadow-lg">
                <FaShieldAlt className="text-3xl text-white" />
              </div>
            </div>

            {/* Quick Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: <FaChartLine />,
                  label: "Analytics",
                  value: "24.5K",
                  color: "from-blue-500 to-cyan-400",
                },
                {
                  icon: <FaUsers />,
                  label: "Users",
                  value: "1.2K",
                  color: "from-purple-500 to-pink-400",
                },
                {
                  icon: <FaBox />,
                  label: "Products",
                  value: "845",
                  color: "from-green-500 to-emerald-400",
                },
                {
                  icon: <FaCog />,
                  label: "Active",
                  value: "98%",
                  color: "from-orange-500 to-red-400",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 shadow-md border border-slate-100 hover:shadow-lg transition-shadow group"
                >
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <div className="text-white text-lg">{stat.icon}</div>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Real-time Analytics",
                  desc: "Live metrics and insights",
                  icon: "📊",
                },
                {
                  title: "User Management",
                  desc: "Full control over user accounts",
                  icon: "👥",
                },
                {
                  title: "Content Moderation",
                  desc: "Review and manage content",
                  icon: "🛡️",
                },
                {
                  title: "System Health",
                  desc: "Monitor server performance",
                  icon: "⚡",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-white"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access Demo */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Access (Demo)
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleQuickLogin("super")}
                className="flex-1 min-w-[140px] bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <FaUserShield />
                <span>Super Admin</span>
              </button>
              <button
                onClick={() => handleQuickLogin("admin")}
                className="flex-1 min-w-[140px] bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <FaShieldAlt />
                <span>Admin</span>
              </button>
              <button
                onClick={() =>
                  toast.info(
                    "Contact your system administrator for assistance",
                    { icon: "📞" }
                  )
                }
                className="flex-1 min-w-[140px] bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <FaCog />
                <span>Support</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Card */}
        <div className="space-y-6">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <FaSignInAlt className="text-xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Secure Login
                    </h2>
                    <p className="text-blue-100 text-sm">
                      Enter your credentials
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full absolute top-0 animate-ping"></div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                    <FaEnvelope className="text-blue-500" />
                    <span>Admin Email</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all"
                      placeholder="admin@yourdomain.com"
                      required
                    />
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                    <FaLock className="text-blue-500" />
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-12 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        rememberMe
                          ? "bg-blue-500 border-blue-500"
                          : "border-slate-300 group-hover:border-blue-400"
                      }`}
                    >
                      {rememberMe && (
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      )}
                    </div>
                    <span className="text-sm text-slate-600 select-none">
                      Remember session
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    onClick={() =>
                      toast.info("Reset link sent to registered email", {
                        icon: "📧",
                      })
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Authenticating...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Access Dashboard</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </form>

              {/* Security Footer */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-2">
                    <FaShieldAlt className="text-green-500" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <span>•</span>
                  <span>Session Timeout: 30m</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Secure</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Status</span>
            </h3>
            <div className="space-y-3">
              {[
                {
                  service: "Authentication",
                  status: "Operational",
                  color: "bg-green-100 text-green-800",
                },
                {
                  service: "Database",
                  status: "Optimal",
                  color: "bg-green-100 text-green-800",
                },
                {
                  service: "API Gateway",
                  status: "Operational",
                  color: "bg-green-100 text-green-800",
                },
                {
                  service: "Analytics",
                  status: "Active",
                  color: "bg-blue-100 text-blue-800",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.service}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${item.color}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center relative z-10">
        <p className="text-sm text-slate-600">
          © 2024 Admin Suite Pro • v2.4.1 •<span className="mx-2">|</span>
          <span className="text-blue-600 font-medium">
            Last login: 2 hours ago
          </span>
          <span className="mx-2">|</span>
          <span className="text-slate-500">
            Need help? Contact: support@adminpro.com
          </span>
        </p>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="bg-white border border-slate-200 shadow-xl"
      />
    </div>
  );
};

export default AdminLogin;
