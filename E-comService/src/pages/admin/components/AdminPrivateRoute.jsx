import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminPrivateRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get(
          "https://e-comservice.onrender.com/api/admin/admin-profile",
          { withCredentials: true }
        );
        if (res.data?.admin) setAuthStatus("authenticated");
        else setAuthStatus("unauthenticated");
      } catch (err) {
        setAuthStatus("unauthenticated");
      }
    };
    verifyAdmin();
  }, []);

  if (authStatus === "checking") {
    return <div className="text-center mt-10 text-blue-600">Verifying...</div>;
  }

  return authStatus === "authenticated" ? (
    children
  ) : (
    <Navigate to="/admin-login" />
  );
};

export default AdminPrivateRoute;
