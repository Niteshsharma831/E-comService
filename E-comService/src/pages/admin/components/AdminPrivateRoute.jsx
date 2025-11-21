import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../../../api"; // ✅ use centralized API

const AdminPrivateRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await API.get("/admin/admin-profile"); // centralized API
        if (res.data?.admin) setAuthStatus("authenticated");
        else setAuthStatus("unauthenticated");
      } catch (err) {
        setAuthStatus("unauthenticated");
      }
    };
    verifyAdmin();
  }, []);

  if (authStatus === "checking") {
    return (
      <div className="text-center mt-10 text-blue-600 text-lg font-semibold">
        Verifying...
      </div>
    );
  }

  return authStatus === "authenticated" ? (
    children
  ) : (
    <Navigate to="/admin-login" />
  );
};

export default AdminPrivateRoute;
