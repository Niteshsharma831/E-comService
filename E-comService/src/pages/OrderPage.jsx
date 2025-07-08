import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    axios
      .get("https://e-comservice.onrender.com/api/users/mine", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data.orders || []);
      })
      .catch(() => {
        toast.error("❌ Failed to load orders");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      await axios.put(
        `https://e-comservice.onrender.com/api/users/update-order-status/${orderId}`,
        { status: "Canceled" },
        { withCredentials: true }
      );
      toast.success("✅ Order canceled successfully");
      fetchOrders(); // Refresh orders
    } catch (err) {
      toast.error("❌ Failed to cancel order");
    }
  };

  return (
    <div className="min-h-screen mt-24 px-4 md:px-10 py-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">📦 My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border shadow-md bg-white">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Items</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{order.fullName}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">{order.paymentMethod}</td>
                  <td className="p-3 font-semibold text-sm">
                    {order.status === "Canceled" ? (
                      <span className="text-red-500">Canceled</span>
                    ) : (
                      <span className="text-green-600">Order Success</span>
                    )}
                  </td>
                  <td className="p-3 space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">
                            {item.productId?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {order.status === "Canceled" ? (
                      <span className="text-gray-400 text-xs">No Action</span>
                    ) : (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
