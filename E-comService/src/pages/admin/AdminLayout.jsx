import React from "react";
import Sidebar from "./components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 h-screen overflow-y-auto p-6 bg-gray-100 w-full">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
