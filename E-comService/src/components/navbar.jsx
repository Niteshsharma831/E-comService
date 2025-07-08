import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
        setDropdownOpen(false);
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
      setUser(null);
      setMenuOpen(false);
      setDropdownOpen(false);
      window.dispatchEvent(new Event("user-logged-in"));
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Electronic", path: "/electronic" },
    { label: "Home & TV", path: "/home&tv" },
    { label: "Fashions", path: "/fashions" },
    { label: "Grocery", path: "/grocery" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Shopizo
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative w-1/2 max-w-lg"
        >
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </form>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="hover:text-indigo-600 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUser /> {getFirstName(user.name)}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded z-50">
                  <Link
                    to="/account"
                    className="block px-4 py-2 hover:bg-indigo-50"
                    onClick={() => {
                      setMenuOpen(false);
                      setDropdownOpen(false);
                    }}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-4 py-2 hover:bg-indigo-50"
                    onClick={() => {
                      setMenuOpen(false);
                      setDropdownOpen(false);
                    }}
                  >
                    My Cart
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-indigo-50"
                    onClick={() => {
                      setMenuOpen(false);
                      setDropdownOpen(false);
                    }}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Login
            </Link>
          )}

          <button
            className="md:hidden text-xl text-indigo-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md space-y-2">
          <form onSubmit={handleSearchSubmit} className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </form>

          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-2 hover:bg-gray-100 rounded"
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 hover:bg-gray-100 rounded"
              >
                My Account
              </Link>
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 hover:bg-gray-100 rounded"
              >
                My Cart
              </Link>
              <Link
                to="/my-orders"
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 hover:bg-gray-100 rounded"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-2 py-2 text-red-600 hover:bg-red-100 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-2 bg-indigo-600 text-white rounded text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </nav>
  );
};

export default Navbar;
