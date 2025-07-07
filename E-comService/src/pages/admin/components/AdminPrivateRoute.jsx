import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminPrivateRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState("checking"); // checking | authenticated | unauthenticated

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get(
          "https://e-comservice.onrender.com/api/admin/admin-profile",
          { withCredentials: true }
        );

        if (res.data && res.data.admin) {
          setAuthStatus("authenticated");
        } else {
          setAuthStatus("unauthenticated");
        }
      } catch (error) {
        setAuthStatus("unauthenticated");
      }
    };

    verifyAdmin();
  }, []);

  if (authStatus === "checking") {
    return (
      <div className="h-screen flex items-center justify-center text-indigo-600 font-semibold text-xl">
        Verifying Admin...
      </div>
    );
  }

  return authStatus === "authenticated" ? (
    children
  ) : (
    <Navigate to="/admin-login" replace />
  );
};

export default AdminPrivateRoute;
