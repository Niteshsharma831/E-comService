// src/pages/admin/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import API from "../../api"; // centralized API

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutAdmin = async () => {
      try {
        // Call logout endpoint
        await API.get("/admin/logout"); // Make sure backend route works with GET

        // Clear local storage
        localStorage.removeItem("admin");
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        // Redirect immediately
        navigate("/admin-login", { replace: true });
      }
    };

    logoutAdmin();
  }, [navigate]);

  return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Logging out...
        </p>
      </div>
    </AdminLayout>
  );
};

export default Logout;
