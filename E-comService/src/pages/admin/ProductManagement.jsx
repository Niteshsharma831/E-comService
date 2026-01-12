// // src/pages/ProductManagement.jsx
// import React, { useEffect, useState } from "react";
// import AdminLayout from "./AdminLayout";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import API from "../../api"; // <-- import API instance

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await API.get("/products/getallproducts");
//       setProducts(res.data.products || []);
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?"))
//       return;
//     try {
//       await API.delete(`/products/deleteproducts/${id}`);
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//       toast.success("Product deleted");
//     } catch (err) {
//       console.error("Delete failed:", err);
//       toast.error("Failed to delete product");
//     }
//   };

//   const updateProduct = (id) => {
//     window.location.href = `/admin/update/${id}`;
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 bg-gray-100 min-h-screen">
//         <h2 className="text-2xl font-bold text-indigo-700 mb-4">
//           🛒 Product Management
//         </h2>

//         {loading ? (
//           <p className="text-gray-600 text-center">Loading products...</p>
//         ) : products.length === 0 ? (
//           <p className="text-gray-600 text-center">No products found.</p>
//         ) : (
//           <div className="overflow-auto rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200 bg-white">
//               <thead className="bg-indigo-700 text-white">
//                 <tr>
//                   <th className="py-2 px-4 text-left">Image</th>
//                   <th className="py-2 px-4 text-left">Name</th>
//                   <th className="py-2 px-4 text-left">Price</th>
//                   <th className="py-2 px-4 text-left">Category</th>
//                   <th className="py-2 px-4 text-left">Stock</th>
//                   <th className="py-2 px-4 text-left">Discount</th>
//                   <th className="py-2 px-4 text-left">Rating</th>
//                   <th className="py-2 px-4 text-left">Brand</th>
//                   <th className="py-2 px-4 text-left">SKU</th>
//                   <th className="py-2 px-4 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {products.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4">
//                       <img
//                         src={product.image || "https://via.placeholder.com/60"}
//                         alt={product.name}
//                         className="w-16 h-16 object-contain"
//                       />
//                     </td>
//                     <td className="py-2 px-4">{product.name}</td>
//                     <td className="py-2 px-4 text-green-700 font-medium">
//                       ₹{product.price}
//                     </td>
//                     <td className="py-2 px-4 capitalize">{product.category}</td>
//                     <td className="py-2 px-4">{product.stock}</td>
//                     <td className="py-2 px-4 text-red-600">
//                       {product.discount}%
//                     </td>
//                     <td className="py-2 px-4">{product.rating}</td>
//                     <td className="py-2 px-4">{product.brand}</td>
//                     <td className="py-2 px-4">{product.sku}</td>
//                     <td className="py-2 px-4 space-x-2">
//                       <button
//                         onClick={() => updateProduct(product._id)}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
//                       >
//                         Update
//                       </button>
//                       <button
//                         onClick={() => deleteProduct(product._id)}
//                         className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={2000} />
//     </AdminLayout>
//   );
// };

// export default ProductManagement;

import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";
import {
  FaTrashAlt,
  FaEdit,
  FaEye,
  FaSearch,
  FaFilter,
  FaBox,
  FaPlus,
  FaDownload,
  FaBoxOpen,
  FaTags,
  FaWarehouse,
  FaPercent,
  FaStar,
  FaShoppingCart,
  FaTimes, // This is correct - FaX doesn't exist
  FaChevronRight,
  FaChevronLeft,
  // Remove FaCalendarAlt, FaCheck if they're not used in your code
} from "react-icons/fa";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [viewProductModal, setViewProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, selectedBrand, products]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/getallproducts");
      const productsData = res.data.products || [];
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          (product.name && product.name.toLowerCase().includes(term)) ||
          (product.brand && product.brand.toLowerCase().includes(term)) ||
          (product.category && product.category.toLowerCase().includes(term)) ||
          (product.sku && product.sku.toLowerCase().includes(term))
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedBrand !== "all") {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await API.delete(`/products/deleteproducts/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete product");
    }
  };

  const updateProduct = (id) => {
    window.location.href = `/admin/update/${id}`;
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setViewProductModal(true);
  };

  const addProduct = () => {
    window.location.href = "/admin/products/add";
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,SKU,Brand,Category,Price,Stock,Discount,Ratings\n" +
      filteredProducts
        .map(
          (product) =>
            `"${product.name || ""}","${product.sku || ""}","${
              product.brand || ""
            }","${product.category || ""}",${product.price || 0},${
              product.stock || 0
            },${product.discount || 0},${product.rating || 0}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.info("Products exported to CSV");
  };

  const getCategories = () => {
    const categories = [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];
    return categories;
  };

  const getBrands = () => {
    const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
    return brands;
  };

  const getStockStatus = (stock) => {
    if (stock > 50)
      return { text: "In Stock", color: "bg-green-100 text-green-800" };
    if (stock > 10)
      return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { text: "Out of Stock", color: "bg-red-100 text-red-800" };
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrand("all");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Product View Modal */}
      {viewProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                Product Details
              </h3>
              <button
                onClick={() => setViewProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="lg:w-1/3">
                  <img
                    src={
                      selectedProduct.image || "https://via.placeholder.com/300"
                    }
                    alt={selectedProduct.name}
                    className="w-full h-64 object-contain rounded-lg border"
                  />
                </div>

                {/* Product Details */}
                <div className="lg:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedProduct.name}
                  </h2>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="font-medium">
                        {selectedProduct.rating || "0.0"}
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">
                      SKU: {selectedProduct.sku || "N/A"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900">
                      ₹{selectedProduct.price?.toLocaleString() || "0"}
                    </div>
                    {selectedProduct.discount > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg text-gray-500 line-through">
                          ₹
                          {Math.round(
                            selectedProduct.price /
                              (1 - selectedProduct.discount / 100)
                          ).toLocaleString()}
                        </span>
                        <span className="px-2 py-1 bg-red-100 text-red-800 font-medium rounded">
                          {selectedProduct.discount}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-sm text-gray-500">Brand</label>
                      <p className="font-medium">
                        {selectedProduct.brand || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Category</label>
                      <p className="font-medium capitalize">
                        {selectedProduct.category || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Stock</label>
                      <p
                        className={`font-medium ${
                          selectedProduct.stock > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedProduct.stock || 0} units
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <p className="font-medium">
                        {selectedProduct.stock > 0
                          ? "Available"
                          : "Out of Stock"}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {selectedProduct.description && (
                    <div className="mb-6">
                      <label className="text-sm text-gray-500 block mb-2">
                        Description
                      </label>
                      <p className="text-gray-700">
                        {selectedProduct.description}
                      </p>
                    </div>
                  )}

                  {/* Features/Specifications */}
                  {selectedProduct.features && (
                    <div className="mb-6">
                      <label className="text-sm text-gray-500 block mb-2">
                        Features
                      </label>
                      <ul className="list-disc list-inside text-gray-700">
                        {Array.isArray(selectedProduct.features) ? (
                          selectedProduct.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))
                        ) : (
                          <li>{selectedProduct.features}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50 rounded-b-xl">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setViewProductModal(false);
                    updateProduct(selectedProduct._id);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaEdit className="inline mr-2" />
                  Edit Product
                </button>
                <button
                  onClick={() => setViewProductModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🛒 Product Management
          </h1>
          <p className="text-gray-600">
            Manage your product inventory and listings
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name, SKU, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex-1">
                <div className="relative">
                  <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="all">All Categories</option>
                    {getCategories().map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="flex-1">
                <div className="relative">
                  <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="all">All Brands</option>
                    {getBrands().map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
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
                <span className="hidden lg:inline">Export</span>
              </button>
              <button
                onClick={addProduct}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm ||
            selectedCategory !== "all" ||
            selectedBrand !== "all") && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaBoxOpen className="text-blue-600" />
                <p className="text-sm text-gray-600">Total Products</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {products.length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaWarehouse className="text-green-600" />
                <p className="text-sm text-gray-600">In Stock</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {products.filter((p) => p.stock > 0).length}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaPercent className="text-purple-600" />
                <p className="text-sm text-gray-600">On Discount</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {products.filter((p) => p.discount > 0).length}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaShoppingCart className="text-orange-600" />
                <p className="text-sm text-gray-600">Categories</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {getCategories().length}
              </p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pricing
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <tr
                        key={product._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Product Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16">
                              <img
                                src={
                                  product.image ||
                                  "https://via.placeholder.com/60"
                                }
                                alt={product.name}
                                className="h-16 w-16 object-contain rounded-lg border border-gray-200"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                SKU: {product.sku || "N/A"}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <FaStar className="text-yellow-500 text-xs" />
                                <span className="text-xs text-gray-600">
                                  {product.rating || "0.0"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Details */}
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">
                            <div className="mb-1">
                              <span className="font-medium">Brand:</span>{" "}
                              {product.brand || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">Category:</span>{" "}
                              {product.category || "N/A"}
                            </div>
                          </div>
                        </td>

                        {/* Pricing */}
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            <div className="text-lg font-bold text-gray-900">
                              ₹{product.price?.toLocaleString() || "0"}
                            </div>
                            {product.discount > 0 && (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-red-600 line-through">
                                  ₹
                                  {Math.round(
                                    product.price / (1 - product.discount / 100)
                                  ).toLocaleString()}
                                </span>
                                <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded">
                                  {product.discount}% OFF
                                </span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-2">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                            >
                              {stockStatus.text}
                            </span>
                            <div className="text-sm text-gray-600">
                              Stock: {product.stock || 0}
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewProduct(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Product"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => updateProduct(product._id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteProduct(product._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <FaChevronLeft />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;
