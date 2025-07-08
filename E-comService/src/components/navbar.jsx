import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-blue-600 font-bold text-xl">
          Shopizo
        </Link>
        <form onSubmit={handleSearchSubmit} className="hidden md:block w-1/2">
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
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex justify-center space-x-6 py-2 font-medium">
        {[
          ["/", "Home"],
          ["/shop", "Shop"],
          ["/electronic", "Electronic"],
          ["/home&tv", "Home & TV"],
          ["/fashions", "Fashions"],
          ["/grocery", "Grocery"],
        ].map(([path, label], idx) => (
          <Link key={idx} to={path}>
            {label}
          </Link>
        ))}
        {user ? (
          <>
            <Link to="/account">My Account</Link>
            <Link to="/cart">My Cart</Link>
            <Link to="/my-orders">My Orders</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-white bg-blue-600 px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4">
          <ul className="space-y-2 font-medium text-gray-700">
            {[
              ["/", "Home"],
              ["/shop", "Shop"],
              ["/electronic", "Electronic"],
              ["/home&tv", "Home & TV"],
              ["/fashions", "Fashions"],
              ["/grocery", "Grocery"],
            ].map(([path, label], idx) => (
              <li key={idx}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2"
                >
                  {label}
                </Link>
              </li>
            ))}

            {user ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/account");
                    }}
                    className="flex items-center gap-2 w-full py-2"
                  >
                    <FaUser /> My Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/cart");
                    }}
                    className="flex items-center gap-2 w-full py-2"
                  >
                    <FaShoppingCart /> My Cart
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/my-orders");
                    }}
                    className="flex items-center gap-2 w-full py-2"
                  >
                    <FaBoxOpen /> My Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 text-red-600 w-full py-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
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
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </nav>
  );
};

export default Navbar;
