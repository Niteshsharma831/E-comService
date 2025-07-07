import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(
          "https://e-comservice.onrender.com/api/admin/admin-profile",
          { withCredentials: true }
        );
        setAdmin(res.data.admin);
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };

    fetchAdmin();
  }, []);

  if (!admin) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 px-6 py-12">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
          👤 Admin Profile
        </h1>

        {/* Profile Card */}
        <div className="flex justify-center">
          <div className="bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
            {/* Left Section */}
            <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white p-10 md:w-1/3 flex flex-col justify-center items-center">
              <img
                src={admin.profile || "https://via.placeholder.com/150"}
                alt="Admin"
                className="w-32 h-32 rounded-full object-cover border-4 border-white mb-6 shadow-lg"
              />
              <h2 className="text-2xl font-bold">{admin.name}</h2>
              <p className="text-sm mt-1">Admin</p>
            </div>

            {/* Right Section */}
            <div className="p-10 md:w-2/3 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-gray-900 font-bold text-xl border-b pb-2">
                  Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Info label="Email" value={admin.email} />
                  <Info label="Phone" value={admin.phone} />
                  <Info label="Gender" value={admin.gender} />
                  <Info label="Address" value={admin.address} />
                </div>

                <h3 className="text-gray-900 font-bold text-xl border-b pt-6 pb-2">
                  Projects
                </h3>
                <div className="flex justify-between text-sm text-gray-700">
                  <p>
                    <strong>Recent:</strong> Sam Disuja
                  </p>
                  <p>
                    <strong>Most Viewed:</strong> Dinoter Husainm
                  </p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-10 flex gap-6 text-blue-600 text-lg">
                <a href="#" className="hover:text-blue-800">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-sky-500">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-pink-500">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Info sub-component
const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-xs uppercase">{label}</p>
    <p className="text-base font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);

export default AdminProfile;
