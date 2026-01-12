// import React from "react";
// import Sidebar from "./components/Sidebar";

// const AdminLayout = ({ children }) => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="ml-64 h-screen overflow-y-auto p-6 bg-gray-100 w-full">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar onToggle={(isOpen) => setSidebarOpen(isOpen)} />
      <main
        className={`h-screen overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
        style={{
          width: sidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 5rem)",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
