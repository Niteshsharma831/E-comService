// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import API from "../api"; // ✅ Using API instance

// const LoginPages = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await API.post("/users/login", formData);

//       const user = res.data.user;
//       localStorage.setItem("user", JSON.stringify(user));
//       window.dispatchEvent(new Event("user-logged-in"));

//       toast.success("🟢 Login successful!");
//       navigate("/"); // 🔥 Instant redirect
//     } catch (err) {
//       console.error(err);
//       setError("Invalid email or password");
//       toast.error("❌ Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
//       {/* Left Image */}
//       <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
//         <img
//           src="https://graphicsfamily.com/wp-content/uploads/edd/2021/08/E-Commerce-Logo-Design-PNG.png"
//           alt="Logo"
//           className="w-64 h-auto object-contain"
//         />
//       </div>

//       {/* Login Card */}
//       <div className="md:w-1/2 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Login to Your Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none pr-10"
//                 required
//               />
//               <span
//                 className="absolute top-3 right-3 cursor-pointer text-gray-500"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           {/* Error */}
//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-md text-white transition ${
//               loading
//                 ? "bg-blue-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <div className="flex justify-between text-sm mt-4">
//             <Link
//               to="/forgot-password"
//               className="text-blue-500 hover:underline"
//             >
//               Forgot Password?
//             </Link>

//             <Link to="/register" className="text-blue-500 hover:underline">
//               Create an Account
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPages;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaUserPlus,
  FaArrowRight,
  FaGoogle,
  FaFacebookF,
  FaShoppingBag,
  FaShieldAlt,
  FaTruck,
  FaTag,
} from "react-icons/fa";
import API from "../api";

const LoginPages = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/users/login", formData);

      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      window.dispatchEvent(new Event("user-logged-in"));

      toast.success("🎉 Welcome back! Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
      toast.error("❌ Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Demo login for testing
  const handleDemoLogin = () => {
    setFormData({
      email: "demo@example.com",
      password: "demo123",
    });
  };

  // Check for remembered email
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4 md:p-8 mt-10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Left Side - Brand & Info */}
        <div className="hidden lg:flex flex-col justify-center p-8 md:p-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
              <FaShoppingBag className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                Shopizo
              </h1>
              <p className="text-sm text-amber-600 font-medium">
                Premium Shopping Experience
              </p>
            </div>
          </Link>

          <div className="space-y-6 mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Welcome Back
              <span className="block text-amber-600">to Your Account</span>
            </h2>
            <p className="text-lg text-gray-600">
              Login to access exclusive deals, track your orders, and manage
              your wishlist.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              {
                icon: <FaShieldAlt />,
                text: "Secure Login",
                color: "text-emerald-500",
              },
              {
                icon: <FaTruck />,
                text: "Fast Delivery",
                color: "text-blue-500",
              },
              {
                icon: <FaTag />,
                text: "Exclusive Deals",
                color: "text-purple-500",
              },
              {
                icon: <FaShoppingBag />,
                text: "Easy Returns",
                color: "text-rose-500",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl"
              >
                <div className={`text-xl ${feature.color}`}>{feature.icon}</div>
                <span className="text-sm font-medium text-gray-700">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-600">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">10K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Mobile Brand */}
            <div className="lg:hidden flex justify-center mb-8">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
                  <FaShoppingBag className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                    Shopizo
                  </h1>
                  <p className="text-xs text-amber-600 font-medium">
                    Premium Shopping
                  </p>
                </div>
              </Link>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm mb-4">
                <FaLock className="text-xs" />
                <span>Secure Login</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sign In to Your Account
              </h2>
              <p className="text-gray-600">
                Enter your credentials to continue shopping
              </p>
            </div>

            {/* Demo Button */}
            {/* <button
              onClick={handleDemoLogin}
              className="w-full mb-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-xl font-semibold hover:from-amber-200 hover:to-orange-200 transition-all duration-300 border border-amber-200"
            >
              Try Demo Account
            </button> */}

            {/* Social Login */}
            {/* <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">
                  Or continue with
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-300">
                  <FaGoogle className="text-red-500" />
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-300">
                  <FaFacebookF className="text-blue-600" />
                  <span className="text-sm font-medium">Facebook</span>
                </button>
              </div>
            </div> */}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded focus:ring-amber-300"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  loading
                    ? "bg-gradient-to-r from-amber-300 to-orange-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl"
                }`}
              >
                <span className="relative flex items-center justify-center gap-2 text-white">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-1 font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Sign up now
                  <FaUserPlus className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>

            {/* Terms & Privacy */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <Link to="/terms" className="text-amber-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-amber-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Decorative Footer */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-center">
            <p className="text-sm text-gray-600">
              🛡️ 256-bit SSL Encryption • 🔐 Secure Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
