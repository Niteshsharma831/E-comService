import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://e-comservice.onrender.com/api/products/getallproducts"
      );
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(
        `https://e-comservice.onrender.com/api/products/deleteproducts/${id}`
      );
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const updateProduct = (id) => {
    window.location.href = `/admin/update/${id}`;
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen overflow-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Product Management
        </h2>

        {loading ? (
          <p className="text-gray-600 text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600 text-center">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-indigo-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Image</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Stock</th>
                  <th className="py-2 px-4 text-left">Discount</th>
                  <th className="py-2 px-4 text-left">Rating</th>
                  <th className="py-2 px-4 text-left">Brand</th>
                  <th className="py-2 px-4 text-left">SKU</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-contain"
                      />
                    </td>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4 text-green-700 font-medium">
                      ₹{product.price}
                    </td>
                    <td className="py-2 px-4 capitalize">{product.category}</td>
                    <td className="py-2 px-4">{product.stock}</td>
                    <td className="py-2 px-4 text-red-600">
                      {product.discount}%
                    </td>
                    <td className="py-2 px-4">{product.rating}</td>
                    <td className="py-2 px-4">{product.brand}</td>
                    <td className="py-2 px-4">{product.sku}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => updateProduct(product._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;
