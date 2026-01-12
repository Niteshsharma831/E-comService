// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import API from "../api"; // 🔥 IMPORTANT

// const CLOUD_NAME = "dva8v7gxm";
// const UNSIGNED_PRESET = "admin_dp";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     phone: "",
//     gender: "",
//     profilePic: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [previewImage, setPreviewImage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name) newErrors.name = "Name required";
//     if (!formData.email) newErrors.email = "Email required";
//     if (!formData.password) newErrors.password = "Password required";
//     if (!formData.address) newErrors.address = "Address required";
//     if (!formData.phone) newErrors.phone = "Phone required";
//     if (!formData.gender) newErrors.gender = "Gender required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, profilePic: file });
//     if (file) setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     try {
//       setLoading(true);

//       let imageUrl = "";

//       if (formData.profilePic) {
//         const form = new FormData();
//         form.append("file", formData.profilePic);
//         form.append("upload_preset", UNSIGNED_PRESET);

//         const uploadRes = await fetch(
//           `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//           { method: "POST", body: form }
//         );

//         const uploadData = await uploadRes.json();
//         imageUrl = uploadData.secure_url;
//       }

//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         address: formData.address,
//         phone: formData.phone,
//         gender: formData.gender,
//         profile: imageUrl,
//       };

//       // 💥 FIXED — USE API, NOT DIRECT AXIOS
//       await API.post("/users/create", payload);

//       toast.success("Registration Successful!");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (error) {
//       if (error.response?.status === 409) {
//         toast.error("User already exists!");
//       } else {
//         toast.error("Registration failed!");
//       }
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-10">
//       <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
//         <img
//           src="https://graphicsfamily.com/wp-content/uploads/edd/2021/08/E-Commerce-Logo-Design-PNG.png"
//           alt="Logo"
//           className="w-64 h-auto object-contain"
//         />
//       </div>

//       <div className="md:w-1/2 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Register
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"
//         >
//           <div>
//             <label className="text-sm font-medium">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Nitesh Kumar Sharma"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             {errors.name && (
//               <p className="text-sm text-red-600">{errors.name}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             {errors.email && (
//               <p className="text-sm text-red-600">{errors.email}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-sm font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             {errors.password && (
//               <p className="text-sm text-red-600">{errors.password}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-sm font-medium">Address</label>
//             <input
//               type="text"
//               name="address"
//               placeholder="Rajkot"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             {errors.address && (
//               <p className="text-sm text-red-600">{errors.address}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-sm font-medium">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="9572861917"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             {errors.phone && (
//               <p className="text-sm text-red-600">{errors.phone}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-sm font-medium">Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//             {errors.gender && (
//               <p className="text-sm text-red-600">{errors.gender}</p>
//             )}
//           </div>

//           <div className="md:col-span-2">
//             <label className="text-sm font-medium">
//               Profile Picture (optional)
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-700"
//             />
//             {previewImage && (
//               <img
//                 src={previewImage}
//                 alt="Preview"
//                 className="mt-3 w-24 h-24 rounded-full object-cover border"
//               />
//             )}
//           </div>

//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="animate-spin h-5 w-5 mr-2 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v8H4z"
//                     />
//                   </svg>
//                   Registering...
//                 </>
//               ) : (
//                 "Register"
//               )}
//             </button>

//             <p className="text-sm text-center mt-4">
//               Already registered?{" "}
//               <Link to="/login" className="text-blue-500 hover:underline">
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Register;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaVenusMars,
  FaCamera,
  FaArrowRight,
  FaShoppingBag,
  FaShieldAlt,
  FaTruck,
  FaTag,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import API from "../api";

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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Clear errors when user starts typing
    const timer = setTimeout(() => {
      setErrors({});
    }, 3000);
    return () => clearTimeout(timer);
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name is too short";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Invalid phone number (10 digits)";

    if (!formData.gender) newErrors.gender = "Please select gender";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

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

        if (!uploadRes.ok) throw new Error("Image upload failed");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        gender: formData.gender,
        profile: imageUrl,
      };

      await API.post("/users/create", payload);

      toast.success("🎉 Registration Successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.status === 409) {
        toast.error("❌ User with this email already exists!");
      } else if (error.response?.status === 400) {
        toast.error("❌ Invalid form data. Please check your inputs.");
      } else {
        toast.error("❌ Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
              Join Our Community
              <span className="block text-amber-600">Create Your Account</span>
            </h2>
            <p className="text-lg text-gray-600">
              Register to unlock exclusive deals, personalized recommendations,
              and faster checkout experience.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              {
                icon: <FaShieldAlt />,
                text: "Secure Registration",
                color: "text-emerald-500",
              },
              {
                icon: <FaTruck />,
                text: "Fast Delivery",
                color: "text-blue-500",
              },
              {
                icon: <FaTag />,
                text: "Member Discounts",
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

        {/* Right Side - Registration Form */}
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
                <FaUser className="text-xs" />
                <span>Create Account</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Register New Account
              </h2>
              <p className="text-gray-600">
                Fill in your details to get started
              </p>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-white shadow-lg flex items-center justify-center">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-amber-600 text-3xl" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 rounded-full cursor-pointer hover:scale-105 transition-transform shadow-md">
                  <FaCamera className="text-sm" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 ${
                        errors.name ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 outline-none transition-colors`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

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
                      className={`w-full pl-10 pr-4 py-3 border-2 ${
                        errors.email ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 outline-none transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
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
                      className={`w-full pl-10 pr-12 py-3 border-2 ${
                        errors.password ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 outline-none transition-colors`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 ${
                        errors.phone ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaVenusMars className="text-gray-400" />
                    </div>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 ${
                        errors.gender ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 outline-none transition-colors appearance-none`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {errors.gender && (
                    <p className="text-sm text-red-600 mt-1">{errors.gender}</p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 ${
                        errors.address ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 outline-none transition-colors`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-1 font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Sign in here
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>

            {/* Terms & Privacy */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By registering, you agree to our{" "}
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
              🛡️ 256-bit SSL Encryption • 🔐 Secure Registration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
