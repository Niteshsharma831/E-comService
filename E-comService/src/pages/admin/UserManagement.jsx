import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/users/getallusers"
      );
      setUsers(res.data);
      console.log("Fetched Users:", res.data);
    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
    }
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
      await axios.delete(`http://localhost:3000/api/users/delete/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("❌ Failed to delete user:", error);
      alert("Error deleting user.");
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          👥 User Management
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
            <thead className="bg-indigo-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">DP</th>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Email / Username</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Phone No.</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition duration-200"
                  >
                    {/* Profile Picture */}
                    <td className="py-3 px-4">
                      {user.profile ? (
                        <img
                          src={user.profile}
                          alt="Profile"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name || "User"
                            )}`;
                          }}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full font-bold">
                          {getInitials(user.name || user.username || "")}
                        </div>
                      )}
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">{user.name}</td>

                    {/* Email / Username */}
                    <td className="py-3 px-4">{user.username || user.email}</td>

                    {/* Role */}
                    <td className="py-3 px-4 capitalize">
                      {user.role?.trim() || "user"}
                    </td>

                    {/* Phone */}
                    <td className="py-3 px-4">{user.phone || "-"}</td>

                    {/* Gender */}
                    <td className="py-3 px-4">{user.gender || "-"}</td>

                    {/* Address */}
                    <td className="py-3 px-4">{user.address || "-"}</td>

                    {/* Actions */}
                    <td className="py-3 px-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
