import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaPlusSquare,
  FaBoxOpen,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      path: "/admin/users",
      label: "User Management",
      icon: <FaUsers />,
    },
    {
      path: "/admin/create-admin",
      label: "Admin Management", // or use "Create Admin"
      icon: <FaUserShield />,
    },
    {
      path: "/admin/publish",
      label: "Product Publish",
      icon: <FaPlusSquare />,
    },
    {
      path: "/admin/products",
      label: "Product Management",
      icon: <FaBoxOpen />,
    },
    {
      path: "/admin/profile",
      label: "Admin Profile",
      icon: <FaUserShield />, // change if needed
    },
    {
      path: "/admin/logout",
      label: "Logout",
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <div
      className={`bg-blue-900 text-white fixed top-0 left-0 h-screen z-50 ${
        open ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-700">
        {open && <h1 className="text-xl font-bold">Admin</h1>}
        <FaBars
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-xl ml-auto"
        />
      </div>

      {/* Navigation */}
      <ul className="flex-1 mt-4 space-y-1">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              title={!open ? item.label : ""}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-md transition duration-200 ${
                location.pathname === item.path ? "bg-blue-700" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span
                className={`text-sm font-medium transition-all duration-300 ease-in-out ${
                  open ? "opacity-100 ml-1" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="text-xs text-center p-3 border-t border-blue-700">
        {open && <span>© 2025 Admin Panel</span>}
      </div>
    </div>
  );
};

export default Sidebar;
