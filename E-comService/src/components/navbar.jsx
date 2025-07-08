import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleUserLogin = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) setUser(JSON.parse(updatedUser));
    };

    window.addEventListener("user-logged-in", handleUserLogin);
    return () => window.removeEventListener("user-logged-in", handleUserLogin);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFirstName = (name) => name?.split(" ")[0];

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://e-comservice.onrender.com/api/users/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("user-logged-in"));
      setUser(null);
      setMenuOpen(false);
      setShowDropdown(false);
      toast.success("\ud83d\udfe2 Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("\u274c Logout failed. Please try again.");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 p-1">
      <div className="max-w-screen-xl mx-auto px-4 space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="w-full md:w-auto">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center text-blue-600 font-bold text-xl"
            >
              \ud83d\udecd\ufe0f Shopizo
            </Link>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
          <div className="rounded overflow-hidden">
            <marquee
              behavior="scroll"
              direction="left"
              scrollAmount="5"
              className="text-sm text-gray-800 font-medium"
            >
              \ud83c\udf89 Big Discounts This Week! | \ud83d\ude9a Free Shipping
              on All Orders | \ud83d\udcb3 Pay on Delivery | \ud83d\udd25 New
              Offers Every Day!
            </marquee>
          </div>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="w-full md:w-1/2 mt-2 md:mt-0"
        >
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>

        {user && (
          <div className="hidden md:block text-sm font-semibold text-gray-600 whitespace-nowrap">
            \ud83d\udc4b Welcome,{" "}
            <span className="text-blue-700">{getFirstName(user.name)}</span>
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        <ul className="hidden md:flex space-x-6 items-center font-medium w-full justify-center">
          {[
            "/",
            "/shop",
            "/electronic",
            "/home&tv",
            "/fashions",
            "/grocery",
          ].map((path, idx) => (
            <li key={idx}>
              <Link to={path}>
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").replace("&", " & ")}
              </Link>
            </li>
          ))}
          {user ? (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-3 py-1 text-blue-600 hover:bg-blue-50 focus:outline-none"
              >
                Profile
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-md z-10">
                  {[
                    ["/account", "My Account"],
                    ["/cart", "My Cart"],
                    ["/my-orders", "My Orders"],
                  ].map(([path, label], i) => (
                    <Link
                      key={i}
                      to={path}
                      className="block px-4 py-2 hover:bg-blue-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      {label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 font-medium bg-white shadow-md">
          {[
            "/",
            "/shop",
            "/electronic",
            "/home&tv",
            "/fashions",
            "/grocery",
          ].map((path, idx) => (
            <li key={idx}>
              <Link to={path} onClick={() => setMenuOpen(false)}>
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").replace("&", " & ")}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              <li>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="block w-full text-left px-3 py-2 bg-gray-100 rounded"
                >
                  \ud83d\udc64 Profile
                </button>
              </li>
              {showDropdown && (
                <div className="ml-4 mt-1 space-y-1">
                  {["/account", "/cart", "/my-orders"].map((path, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setShowDropdown(false);
                        setMenuOpen(false);
                        setTimeout(() => navigate(path), 100);
                      }}
                      className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                    >
                      {path === "/account"
                        ? "My Account"
                        : path === "/cart"
                        ? "My Cart"
                        : "My Orders"}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-blue-600 text-white rounded px-3 py-1 w-fit"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </nav>
  );
};

export default Navbar;
