// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaBars,
//   FaTimes,
//   FaSearch,
//   FaUser,
//   FaShoppingCart,
//   FaBoxOpen,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import API from "../api";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef();
//   const navigate = useNavigate();

//   // Load user from localStorage and listen for login events
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));

//     const handleUserLogin = () => {
//       const updatedUser = localStorage.getItem("user");
//       if (updatedUser) setUser(JSON.parse(updatedUser));
//       else setUser(null);
//     };

//     window.addEventListener("user-logged-in", handleUserLogin);
//     return () => window.removeEventListener("user-logged-in", handleUserLogin);
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Replace the existing handleLogout with this:
//   const handleLogout = async () => {
//     try {
//       // Use centralized API instance
//       await API.post("/users/logout"); // withCredentials is already set in API

//       // Clear frontend session
//       localStorage.removeItem("user");
//       setUser(null);
//       setMenuOpen(false);
//       setShowDropdown(false);

//       // Trigger global login update
//       window.dispatchEvent(new Event("user-logged-in"));

//       toast.success("Logged out successfully!");
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);

//       if (err.response?.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("Logout failed. Please try again.");
//       }
//     }
//   };

//   // Search submit
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//     }
//   };

//   const menuLinks = [
//     ["/", "Home"],
//     ["/shop", "Shop"],
//     ["/electronic", "Electronic"],
//     ["/home&tv", "Home & TV"],
//     ["/fashions", "Fashions"],
//     ["/grocery", "Grocery"],
//   ];

//   return (
//     <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 py-4 md:py-2">
//       <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
//         <Link to="/" className="text-blue-600 font-bold text-xl">
//           🛍️ Shopizo
//         </Link>

//         <form onSubmit={handleSearchSubmit} className="hidden md:block w-1/2">
//           <div className="relative">
//             <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
//               <FaSearch />
//             </span>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//         </form>

//         <div className="flex items-center gap-4">
//           <button
//             className="md:hidden text-gray-700"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex justify-center space-x-6 py-2 font-medium">
//         {menuLinks.map(([path, label], idx) => (
//           <Link key={idx} to={path}>
//             {label}
//           </Link>
//         ))}

//         {user ? (
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="px-3 py-1 text-blue-600 hover:bg-blue-50 focus:outline-none"
//             >
//               Profile
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-md z-10">
//                 <Link
//                   to="/account"
//                   onClick={() => setShowDropdown(false)}
//                   className="block px-4 py-2 hover:bg-blue-50"
//                 >
//                   My Account
//                 </Link>
//                 <Link
//                   to="/cart"
//                   onClick={() => setShowDropdown(false)}
//                   className="block px-4 py-2 hover:bg-blue-50"
//                 >
//                   My Cart
//                 </Link>
//                 <Link
//                   to="/my-orders"
//                   onClick={() => setShowDropdown(false)}
//                   className="block px-4 py-2 hover:bg-blue-50"
//                 >
//                   My Orders
//                 </Link>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setShowDropdown(false);
//                   }}
//                   className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link
//             to="/login"
//             className="text-white bg-blue-600 px-3 py-1 rounded"
//           >
//             Login
//           </Link>
//         )}
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white shadow-md px-4 pb-4">
//           <ul className="space-y-2 font-medium text-gray-700">
//             {menuLinks.map(([path, label], idx) => (
//               <li key={idx}>
//                 <Link
//                   to={path}
//                   onClick={() => setMenuOpen(false)}
//                   className="block py-2"
//                 >
//                   {label}
//                 </Link>
//               </li>
//             ))}

//             {user ? (
//               <>
//                 <li>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       navigate("/account");
//                     }}
//                     className="flex items-center gap-2 w-full py-2"
//                   >
//                     <FaUser /> My Account
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       navigate("/cart");
//                     }}
//                     className="flex items-center gap-2 w-full py-2"
//                   >
//                     <FaShoppingCart /> My Cart
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       navigate("/my-orders");
//                     }}
//                     className="flex items-center gap-2 w-full py-2"
//                   >
//                     <FaBoxOpen /> My Orders
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       handleLogout();
//                     }}
//                     className="flex items-center gap-2 text-red-600 w-full py-2"
//                   >
//                     <FaSignOutAlt /> Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li>
//                 <Link
//                   to="/login"
//                   onClick={() => setMenuOpen(false)}
//                   className="block bg-blue-600 text-white rounded px-3 py-1 w-fit"
//                 >
//                   Login
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
  FaChevronDown,
  FaHome,
  FaStore,
  FaTv,
  FaTshirt,
  FaAppleAlt,
  FaBolt,
  FaHeart,
  FaStar,
  FaCrown,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      console.log("Dark mode toggled to:", newMode); // Debug log
      return newMode;
    });
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleUserLogin = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) setUser(JSON.parse(updatedUser));
      else setUser(null);
    };

    window.addEventListener("user-logged-in", handleUserLogin);
    return () => window.removeEventListener("user-logged-in", handleUserLogin);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/users/logout");
      localStorage.removeItem("user");
      setUser(null);
      setMenuOpen(false);
      setShowDropdown(false);
      window.dispatchEvent(new Event("user-logged-in"));
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error(
        err.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const menuLinks = [
    { path: "/", label: "Home", icon: <FaHome className="w-4 h-4" /> },
    { path: "/shop", label: "Shop", icon: <FaStore className="w-4 h-4" /> },
    {
      path: "/electronic",
      label: "Electronic",
      icon: <FaBolt className="w-4 h-4" />,
    },
    {
      path: "/home&tv",
      label: "Home & TV",
      icon: <FaTv className="w-4 h-4" />,
    },
    {
      path: "/fashions",
      label: "Fashion",
      icon: <FaTshirt className="w-4 h-4" />,
    },
    {
      path: "/grocery",
      label: "Grocery",
      icon: <FaAppleAlt className="w-4 h-4" />,
    },
  ];

  // Theme-based styling
  const getNavbarClasses = () => {
    if (darkMode) {
      return isScrolled
        ? "bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl shadow-lg py-2 border-b border-gray-700/50"
        : "bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 py-3 shadow-sm";
    } else {
      return isScrolled
        ? "bg-gradient-to-r from-amber-50/90 via-orange-50/90 to-amber-50/90 backdrop-blur-xl shadow-lg py-2 border-b border-amber-200/50"
        : "bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 py-3 shadow-sm";
    }
  };

  const getTextColor = () => {
    if (darkMode) {
      return isScrolled ? "text-gray-100" : "text-white";
    }
    return isScrolled ? "text-amber-800" : "text-white";
  };

  const getLogoColor = () => {
    if (darkMode) {
      return isScrolled
        ? "bg-gradient-to-r from-amber-400 to-yellow-500"
        : "bg-gradient-to-br from-amber-400 to-amber-500";
    }
    return isScrolled
      ? "bg-gradient-to-br from-amber-400 to-amber-500"
      : "bg-gradient-to-br from-amber-400 to-amber-500";
  };

  const getLogoText = () => {
    if (darkMode) {
      return isScrolled
        ? "bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent"
        : "text-white drop-shadow-lg";
    }
    return isScrolled
      ? "bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent"
      : "text-white drop-shadow-lg";
  };

  const getSearchInputClasses = () => {
    if (darkMode) {
      return isScrolled
        ? "bg-gray-800/90 border-2 border-gray-700 focus:border-amber-400 focus:ring-amber-400/30 placeholder-gray-400 text-gray-100"
        : "bg-white/20 backdrop-blur-sm border border-amber-300/30 focus:border-amber-400 focus:ring-amber-400/30 placeholder-amber-100/70 text-white";
    }
    return isScrolled
      ? "bg-white/95 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-300 placeholder-amber-500/70"
      : "bg-white/20 backdrop-blur-sm border border-amber-300/30 focus:border-amber-400 focus:ring-amber-400/30 placeholder-amber-100/70 text-white";
  };

  const getSearchButtonClasses = () => {
    if (darkMode) {
      return isScrolled
        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
        : "bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:from-amber-500 hover:to-orange-500";
    }
    return isScrolled
      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
      : "bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:from-amber-500 hover:to-orange-500";
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${getNavbarClasses()}`}
      >
        {/* Top Announcement Bar */}
        {!isScrolled && (
          <div
            className={`${
              darkMode
                ? "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300"
                : "bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-900"
            } py-1.5 text-center text-sm font-medium`}
          >
            🎉 Free shipping on orders over $50 | 🏆 Premium Quality Guaranteed
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div
                  className={`p-2.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300 ${getLogoColor()}`}
                >
                  <span className="text-2xl">🛍️</span>
                </div>
                {!isScrolled && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="flex flex-col">
                <h1
                  className={`text-2xl font-bold tracking-tight transition-all duration-300 ${getLogoText()}`}
                >
                  Shopizo
                </h1>
                <p
                  className={`text-xs transition-all duration-300 ${
                    darkMode
                      ? isScrolled
                        ? "text-amber-300"
                        : "text-amber-200"
                      : isScrolled
                      ? "text-amber-600 font-medium"
                      : "text-amber-200"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <FaStar className="w-3 h-3" />
                    Premium Shopping
                    <FaStar className="w-3 h-3" />
                  </span>
                </p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex flex-1 max-w-2xl mx-8"
            >
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch
                    className={`transition-colors duration-300 ${
                      darkMode
                        ? "text-amber-400"
                        : isScrolled
                        ? "text-amber-500"
                        : "text-amber-300"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Discover amazing products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-24 py-3 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getSearchInputClasses()}`}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <span
                    className={`text-sm font-medium hidden xl:block transition-colors duration-300 ${
                      darkMode
                        ? "text-amber-300"
                        : isScrolled
                        ? "text-amber-600"
                        : "text-amber-100"
                    }`}
                  >
                    🔥 Trending: Phones
                  </span>
                  <button
                    type="submit"
                    className={`px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 font-medium ${getSearchButtonClasses()}`}
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? isScrolled
                      ? "text-yellow-400 hover:bg-gray-700"
                      : "text-yellow-300 hover:bg-white/10"
                    : isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-amber-100 hover:bg-white/10"
                }`}
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {darkMode ? (
                  <FaSun className="w-5 h-5" />
                ) : (
                  <FaMoon className="w-5 h-5" />
                )}
              </button>

              {/* Cart */}
              {/* <Link
                to="/cart"
                className={`p-2.5 rounded-xl transition-all duration-300 relative group ${
                  darkMode
                    ? isScrolled
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-amber-100 hover:bg-white/10"
                    : isScrolled
                    ? "text-amber-700 hover:bg-amber-100"
                    : "text-amber-100 hover:bg-white/10"
                }`}
              >
                <FaShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                  3
                </span>
              </Link> */}

              {/* User Actions */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-300 group border ${
                      darkMode
                        ? isScrolled
                          ? "bg-gray-800 hover:bg-gray-700 text-gray-100 border-gray-700"
                          : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                        : isScrolled
                        ? "bg-gradient-to-r from-amber-100 to-orange-50 hover:from-amber-200 hover:to-orange-100 text-amber-800 border-amber-200"
                        : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                        darkMode
                          ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900"
                          : isScrolled
                          ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                          : "bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-900"
                      }`}
                    >
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <span className="font-medium hidden md:block">
                      {user.name?.split(" ")[0] || "Account"}
                    </span>
                    <FaChevronDown
                      className={`w-3 h-3 transition-transform duration-300 ${
                        showDropdown ? "rotate-180" : ""
                      } ${
                        darkMode
                          ? "text-amber-300"
                          : isScrolled
                          ? "text-amber-700"
                          : "text-amber-100"
                      }`}
                    />
                  </button>

                  {showDropdown && (
                    <div
                      className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn ${
                        darkMode
                          ? "bg-gray-800 border border-gray-700"
                          : "bg-white border border-amber-100"
                      }`}
                    >
                      <div
                        className={`p-4 border-b ${
                          darkMode
                            ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700"
                            : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md ${
                              darkMode
                                ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900"
                                : "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                            }`}
                          >
                            {user.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <h3
                              className={`font-bold ${
                                darkMode ? "text-white" : "text-amber-900"
                              }`}
                            >
                              {user.name || "Welcome!"}
                            </h3>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-300" : "text-amber-600"
                              }`}
                            >
                              {user.email}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <FaCrown
                                className={`w-3 h-3 ${
                                  darkMode ? "text-amber-400" : "text-amber-500"
                                }`}
                              />
                              <span
                                className={`text-xs font-medium ${
                                  darkMode ? "text-amber-300" : "text-amber-600"
                                }`}
                              >
                                Premium Member
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`py-2 ${darkMode ? "bg-gray-800" : ""}`}>
                        <Link
                          to="/account"
                          onClick={() => setShowDropdown(false)}
                          className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 group/item ${
                            darkMode
                              ? "hover:bg-gray-700 text-gray-200"
                              : "hover:bg-amber-50 text-amber-800"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              darkMode
                                ? "bg-gray-700 group-hover/item:bg-gray-600"
                                : "bg-amber-100 group-hover/item:bg-amber-200"
                            }`}
                          >
                            <FaUser
                              className={
                                darkMode ? "text-amber-400" : "text-amber-600"
                              }
                            />
                          </div>
                          <div>
                            <span className="font-medium">My Account</span>
                            <p
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-amber-500"
                              }`}
                            >
                              Manage profile & settings
                            </p>
                          </div>
                        </Link>
                        <Link
                          to="/cart"
                          onClick={() => setShowDropdown(false)}
                          className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 group/item ${
                            darkMode
                              ? "hover:bg-gray-700 text-gray-200"
                              : "hover:bg-amber-50 text-amber-800"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              darkMode
                                ? "bg-gray-700 group-hover/item:bg-gray-600"
                                : "bg-orange-100 group-hover/item:bg-orange-200"
                            }`}
                          >
                            <FaShoppingCart
                              className={
                                darkMode ? "text-orange-400" : "text-orange-600"
                              }
                            />
                          </div>
                          <div>
                            <span className="font-medium">My Cart</span>
                            <p
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-amber-500"
                              }`}
                            >
                              3 items • $249.99
                            </p>
                          </div>
                        </Link>
                        <Link
                          to="/my-orders"
                          onClick={() => setShowDropdown(false)}
                          className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 group/item ${
                            darkMode
                              ? "hover:bg-gray-700 text-gray-200"
                              : "hover:bg-amber-50 text-amber-800"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              darkMode
                                ? "bg-gray-700 group-hover/item:bg-gray-600"
                                : "bg-yellow-100 group-hover/item:bg-yellow-200"
                            }`}
                          >
                            <FaBoxOpen
                              className={
                                darkMode ? "text-yellow-400" : "text-yellow-600"
                              }
                            />
                          </div>
                          <div>
                            <span className="font-medium">My Orders</span>
                            <p
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-amber-500"
                              }`}
                            >
                              Track & manage orders
                            </p>
                          </div>
                        </Link>
                      </div>

                      <div
                        className={`p-4 border-t ${
                          darkMode
                            ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700"
                            : "bg-gradient-to-r from-amber-50 to-white border-amber-100"
                        }`}
                      >
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-lg font-medium group"
                        >
                          <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                    darkMode
                      ? "bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 hover:from-amber-500 hover:to-orange-500"
                      : isScrolled
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                      : "bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-900 hover:from-amber-500 hover:to-amber-600"
                  }`}
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? isScrolled
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-white hover:bg-white/10"
                    : isScrolled
                    ? "text-amber-700 hover:bg-amber-100"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Menu Links */}
          <div
            className={`hidden lg:flex justify-center items-center space-x-1 py-4 transition-all duration-500 ${
              isScrolled ? "opacity-100" : "opacity-90"
            }`}
          >
            {menuLinks.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  darkMode
                    ? isScrolled
                      ? "text-gray-300 hover:text-amber-300 hover:bg-gradient-to-r hover:from-gray-800/80 hover:to-gray-700/80"
                      : "text-amber-100 hover:text-white hover:bg-white/15 backdrop-blur-sm"
                    : isScrolled
                    ? "text-amber-700 hover:text-orange-700 hover:bg-gradient-to-r hover:from-amber-100/80 hover:to-orange-100/80"
                    : "text-amber-100 hover:text-white hover:bg-white/15 backdrop-blur-sm"
                }`}
              >
                <div
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    darkMode
                      ? isScrolled
                        ? "text-amber-300"
                        : "text-amber-200"
                      : isScrolled
                      ? "text-amber-600"
                      : "text-amber-200"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="font-semibold">{item.label}</span>
                <div
                  className={`absolute bottom-0 left-0 w-0 h-1 rounded-full transition-all duration-500 group-hover:w-full ${
                    darkMode
                      ? "bg-gradient-to-r from-amber-400 to-amber-300"
                      : isScrolled
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : "bg-gradient-to-r from-amber-400 to-amber-300"
                  }`}
                ></div>
                {idx === 1 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-4 pb-4">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <input
              type="text"
              placeholder="🔍 Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-20 py-3 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getSearchInputClasses()}`}
            />
            <FaSearch
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                darkMode
                  ? "text-amber-400"
                  : isScrolled
                  ? "text-amber-500"
                  : "text-emerald-500"
              }`}
            />
            <button
              type="submit"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-md ${getSearchButtonClasses()}`}
            >
              Go
            </button>
          </form>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 backdrop-blur-md ${
              darkMode
                ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90"
                : "bg-gradient-to-br from-emerald-900/90 to-teal-900/90"
            }`}
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-80 shadow-2xl transform transition-transform duration-500 ${
              darkMode
                ? "bg-gradient-to-b from-gray-900 to-gray-800"
                : "bg-gradient-to-b from-emerald-900 to-teal-900"
            }`}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-2 rounded-xl">
                    <span className="text-2xl">🛍️</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Shopizo</h2>
                    <p className="text-sm text-amber-200">Premium Shopping</p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <FaTimes className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Dark Mode Toggle Mobile */}
              <button
                onClick={toggleDarkMode}
                className="mb-4 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
              >
                {darkMode ? (
                  <>
                    <FaSun className="text-yellow-300" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="text-gray-300" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              {/* User Info */}
              {user && (
                <div
                  className={`mb-6 p-4 rounded-2xl backdrop-blur-sm border ${
                    darkMode
                      ? "bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-700"
                      : "bg-gradient-to-r from-emerald-800/50 to-teal-800/50 border-emerald-700/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-emerald-900 font-bold text-lg">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{user.name}</h3>
                      <p className="text-sm text-emerald-200">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu Links */}
              <div className="flex-1 space-y-1 overflow-y-auto">
                {menuLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-4 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300 text-white group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-amber-500/20 group-hover:to-amber-400/20 transition-all duration-300">
                      {React.cloneElement(item.icon, {
                        className: "w-5 h-5 text-amber-200",
                      })}
                    </div>
                    <span className="font-medium text-lg">{item.label}</span>
                    {idx === 1 && (
                      <span className="ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        HOT
                      </span>
                    )}
                  </Link>
                ))}

                {/* User Actions */}
                <div className="pt-6 mt-6 border-t border-emerald-700/30">
                  {user ? (
                    <>
                      <Link
                        to="/account"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center space-x-4 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300 text-white mb-2"
                      >
                        <FaUser className="w-5 h-5 text-emerald-300" />
                        <span className="font-medium">My Account</span>
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center space-x-4 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300 text-white mb-2"
                      >
                        <FaShoppingCart className="w-5 h-5 text-amber-300" />
                        <span className="font-medium">My Cart</span>
                        <span className="ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                          3
                        </span>
                      </Link>
                      <Link
                        to="/my-orders"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center space-x-4 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300 text-white mb-6"
                      >
                        <FaBoxOpen className="w-5 h-5 text-teal-300" />
                        <span className="font-medium">My Orders</span>
                      </Link>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center justify-center space-x-3 w-full px-4 py-3.5 mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-medium"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center space-x-3 w-full px-4 py-3.5 mt-4 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-900 rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 font-bold"
                    >
                      <FaUser />
                      <span>Login / Register</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-emerald-700/30">
                <p className="text-center text-sm text-emerald-300">
                  🛡️ Secure Shopping | 📞 24/7 Support
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div
        className={`h-28 transition-all duration-500 ${
          isScrolled ? "lg:h-20" : "lg:h-24"
        }`}
      ></div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
};

export default Navbar;
