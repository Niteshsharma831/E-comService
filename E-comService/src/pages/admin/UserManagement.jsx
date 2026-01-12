// import React, { useEffect, useState } from "react";
// import AdminLayout from "./AdminLayout";
// import { FaTrashAlt, FaEdit } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import API from "../../api"; // Axios instance

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Fetch all users
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get("/users/getallusers");
//       setUsers(res.data);
//     } catch (error) {
//       console.error("❌ Failed to fetch users:", error);
//       toast.error("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate initials if no profile picture
//   const getInitials = (name) => {
//     if (!name) return "U";
//     const parts = name.trim().split(" ");
//     const first = parts[0]?.charAt(0).toUpperCase() || "";
//     const last = parts[1]?.charAt(0).toUpperCase() || "";
//     return first + last;
//   };

//   // Delete user
//   const handleDelete = async (userId) => {
//     const confirmDelete = window.confirm(
//       "⚠️ Are you sure you want to delete this user?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await API.delete(`/users/delete/${userId}`);
//       toast.success("User deleted successfully");
//       fetchUsers();
//     } catch (error) {
//       console.error("❌ Failed to delete user:", error);
//       toast.error("Error deleting user");
//     }
//   };

//   // Edit user
//   const handleEdit = (userId) => {
//     navigate(`/admin/edit-user/${userId}`);
//   };

//   return (
//     <AdminLayout>
//       <ToastContainer position="top-right" autoClose={2000} />
//       <div className="p-6 bg-gray-100 min-h-screen">
//         <h2 className="text-2xl font-bold text-indigo-700 mb-6">
//           👥 User Management
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading users...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
//               <thead className="bg-indigo-100 text-gray-700">
//                 <tr>
//                   <th className="py-3 px-4 text-left">DP</th>
//                   <th className="py-3 px-4 text-left">Full Name</th>
//                   <th className="py-3 px-4 text-left">Email / Username</th>
//                   <th className="py-3 px-4 text-left">Role</th>
//                   <th className="py-3 px-4 text-left">Phone No.</th>
//                   <th className="py-3 px-4 text-left">Gender</th>
//                   <th className="py-3 px-4 text-left">Address</th>
//                   <th className="py-3 px-4 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="text-center py-6 text-gray-500">
//                       No users found.
//                     </td>
//                   </tr>
//                 ) : (
//                   users.map((user) => (
//                     <tr
//                       key={user._id}
//                       className="border-t hover:bg-gray-50 transition duration-200"
//                     >
//                       {/* Profile Picture */}
//                       <td className="py-3 px-4">
//                         {user.profile ? (
//                           <img
//                             src={user.profile}
//                             alt="Profile"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                                 user.name || "User"
//                               )}`;
//                             }}
//                             className="w-10 h-10 rounded-full object-cover border"
//                           />
//                         ) : (
//                           <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full font-bold">
//                             {getInitials(user.name || user.username || "")}
//                           </div>
//                         )}
//                       </td>

//                       {/* Name */}
//                       <td className="py-3 px-4">{user.name}</td>

//                       {/* Email / Username */}
//                       <td className="py-3 px-4">
//                         {user.username || user.email}
//                       </td>

//                       {/* Role */}
//                       <td className="py-3 px-4 capitalize">
//                         {user.role?.trim() || "user"}
//                       </td>

//                       {/* Phone */}
//                       <td className="py-3 px-4">{user.phone || "-"}</td>

//                       {/* Gender */}
//                       <td className="py-3 px-4">{user.gender || "-"}</td>

//                       {/* Address */}
//                       <td className="py-3 px-4">{user.address || "-"}</td>

//                       {/* Actions */}
//                       <td className="py-3 px-4 flex gap-3">
//                         <button
//                           onClick={() => handleEdit(user._id)}
//                           className="text-blue-600 hover:text-blue-800"
//                           title="Edit"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(user._id)}
//                           className="text-red-600 hover:text-red-800"
//                           title="Delete"
//                         >
//                           <FaTrashAlt />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// };

// export default UserManagement;

import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  FaTrashAlt,
  FaEdit,
  FaEye,
  FaSearch,
  FaFilter,
  FaUserPlus,
  FaDownload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedRole, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users/getallusers");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          (user.name && user.name.toLowerCase().includes(term)) ||
          (user.email && user.email.toLowerCase().includes(term)) ||
          (user.username && user.username.toLowerCase().includes(term)) ||
          (user.phone && user.phone.includes(term))
      );
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter(
        (user) => user.role && user.role.toLowerCase() === selectedRole
      );
    }

    setFilteredUsers(filtered);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const last = parts[1]?.charAt(0).toUpperCase() || "";
    return first + last;
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/users/delete/${userId}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("❌ Failed to delete user:", error);
      toast.error("Error deleting user");
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleView = (userId) => {
    navigate(`/admin/user/${userId}`);
  };

  const handleAddUser = () => {
    navigate("/admin/add-user");
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Email,Username,Role,Phone,Gender,Address\n" +
      filteredUsers
        .map(
          (user) =>
            `"${user.name || ""}","${user.email || ""}","${
              user.username || ""
            }","${user.role || ""}","${user.phone || ""}","${
              user.gender || ""
            }","${user.address || ""}"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.info("Users exported to CSV");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            👥 User Management
          </h1>
          <p className="text-gray-600">Manage and monitor all user accounts</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter by Role */}
              <div className="flex-1">
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaDownload />
                <span className="hidden md:inline">Export</span>
              </button>
              <button
                onClick={handleAddUser}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaUserPlus />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter((u) => u.status === "active").length}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter((u) => u.status === "inactive").length}
              </p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role & Status
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-12 text-center text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* User Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {user.profile ? (
                                <img
                                  src={user.profile}
                                  alt={user.name}
                                  className="h-10 w-10 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${getInitials(
                                      user.name || user.username || ""
                                    )}&background=random`;
                                  }}
                                />
                              ) : (
                                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                  {getInitials(
                                    user.name || user.username || ""
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name || "No Name"}
                              </div>
                              <div className="text-sm text-gray-500">
                                @{user.username || "No username"}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">
                            {user.email || "No email"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.phone || "No phone"}
                          </div>
                        </td>

                        {/* Role & Status */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {user.role || "user"}
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                user.status
                              )}`}
                            >
                              {user.status || "unknown"}
                            </span>
                          </div>
                        </td>

                        {/* Details */}
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">
                            <div className="mb-1">
                              <span className="font-medium">Gender:</span>{" "}
                              {user.gender || "Not specified"}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {user.address || "No address"}
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleView(user._id)}
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleEdit(user._id)}
                              className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit User"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination/Info */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{filteredUsers.length}</span> of{" "}
                  <span className="font-medium">{users.length}</span> users
                </div>
                {filteredUsers.length !== users.length && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedRole("all");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
