import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutAdmin = async () => {
      try {
        await axios.get("http://localhost:3000/api/admin/logout", {
          withCredentials: true, // so the cookie is included
        });
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        setTimeout(() => {
          navigate("/admin-login");
        }, 1000);
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
