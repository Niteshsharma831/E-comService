// // src/pages/ProductPublish.jsx
// import React, { useState, useEffect } from "react";
// import AdminLayout from "./AdminLayout";
// import API from "../../api"; // centralized API instance

// const ProductPublish = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: [""],
//     price: "",
//     category: "",
//     imageURL: "",
//     imageFile: null,
//     stock: "",
//     brand: "",
//     rating: "",
//     tags: [""],
//     discount: "",
//     sku: "",
//   });

//   const [previewImage, setPreviewImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Update preview image when imageFile or imageURL changes
//   useEffect(() => {
//     if (formData.imageURL) {
//       setPreviewImage(formData.imageURL);
//     } else if (formData.imageFile) {
//       setPreviewImage(URL.createObjectURL(formData.imageFile));
//     } else {
//       setPreviewImage("");
//     }
//   }, [formData.imageURL, formData.imageFile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleArrayChange = (e, index, field) => {
//     const newArray = [...formData[field]];
//     newArray[index] = e.target.value;
//     setFormData((prev) => ({ ...prev, [field]: newArray }));
//   };

//   const addField = (field) => {
//     setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       imageFile: e.target.files[0],
//       imageURL: "",
//     }));
//   };

//   // Upload image to Cloudinary
//   const uploadImageToCloudinary = async () => {
//     if (!formData.imageFile) return formData.imageURL;

//     const uploadData = new FormData();
//     uploadData.append("file", formData.imageFile);
//     uploadData.append("upload_preset", "unsigned_upload");

//     try {
//       const res = await API.post(
//         "https://api.cloudinary.com/v1_1/dva8v7gxm/image/upload",
//         uploadData
//       );
//       return res.data.secure_url;
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       return "";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const image = await uploadImageToCloudinary();
//       const productData = {
//         ...formData,
//         image: image,
//         description: formData.description.filter((d) => d.trim() !== ""),
//         tags: formData.tags.filter((t) => t.trim() !== ""),
//       };

//       await API.post("/products/create", productData);
//       setMessage("✅ Product Published Successfully!");
//       setFormData({
//         name: "",
//         description: [""],
//         price: "",
//         category: "",
//         imageURL: "",
//         imageFile: null,
//         stock: "",
//         brand: "",
//         rating: "",
//         tags: [""],
//         discount: "",
//         sku: "",
//       });
//       setPreviewImage("");
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to publish product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 py-12 px-6">
//         <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
//           <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
//             Publish New Product
//           </h2>

//           {message && (
//             <div className="text-center mb-4 text-lg font-medium text-green-600 animate-fade-in-up">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
//             {/* Name */}
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Product Name"
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
//             />

//             {/* Price */}
//             <input
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               type="number"
//               placeholder="Price ₹"
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
//             />

//             {/* Category */}
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
//             >
//               <option value="">Select Category</option>
//               <option value="smartphone">Smartphone</option>
//               <option value="laptop">Laptop</option>
//               <option value="tab">Tab</option>
//               <option value="fashion">Fashion</option>
//               <option value="beauty">Beauty</option>
//               <option value="grocery">Grocery</option>
//               <option value="furniture">Furniture</option>
//               <option value="electronic">Electronic</option>
//               <option value="tv & appliances">TV & Appliances</option>
//               <option value="accessories">Accessories</option>
//             </select>

//             {/* Stock */}
//             <input
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//               type="number"
//               placeholder="Stock quantity"
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
//             />

//             {/* Brand */}
//             <input
//               name="brand"
//               value={formData.brand}
//               onChange={handleChange}
//               placeholder="Brand"
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
//             />

//             {/* Rating */}
//             <input
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//               type="number"
//               placeholder="Rating (1-5)"
//               min={1}
//               max={5}
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
//             />

//             {/* Discount */}
//             <input
//               name="discount"
//               value={formData.discount}
//               onChange={handleChange}
//               type="number"
//               placeholder="Discount (%)"
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
//             />

//             {/* SKU */}
//             <input
//               name="sku"
//               value={formData.sku}
//               onChange={handleChange}
//               placeholder="SKU"
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
//             />

//             {/* Image URL */}
//             <input
//               name="imageURL"
//               value={formData.imageURL}
//               onChange={handleChange}
//               placeholder="Image URL (optional)"
//               className="col-span-2 w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
//             />

//             {/* Image File */}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="col-span-2 w-full"
//             />

//             {/* Image Preview */}
//             {previewImage && (
//               <div className="col-span-2 text-center">
//                 <img
//                   src={previewImage}
//                   alt="Preview"
//                   className="w-40 h-40 object-contain inline-block border rounded-md shadow"
//                 />
//               </div>
//             )}

//             {/* Description */}
//             <div className="col-span-2">
//               <label className="font-medium mb-2 block">Description:</label>
//               {formData.description.map((desc, idx) => (
//                 <input
//                   key={idx}
//                   value={desc}
//                   onChange={(e) => handleArrayChange(e, idx, "description")}
//                   placeholder={`Point ${idx + 1}`}
//                   className="w-full border px-3 py-2 rounded-md mb-2 focus:ring focus:ring-indigo-300"
//                 />
//               ))}
//               <button
//                 type="button"
//                 onClick={() => addField("description")}
//                 className="text-sm text-blue-600 mt-1"
//               >
//                 + Add more
//               </button>
//             </div>

//             {/* Tags */}
//             <div className="col-span-2">
//               <label className="font-medium mb-2 block">Tags:</label>
//               {formData.tags.map((tag, idx) => (
//                 <input
//                   key={idx}
//                   value={tag}
//                   onChange={(e) => handleArrayChange(e, idx, "tags")}
//                   placeholder={`Tag ${idx + 1}`}
//                   className="w-full border px-3 py-2 rounded-md mb-2 focus:ring focus:ring-indigo-300"
//                 />
//               ))}
//               <button
//                 type="button"
//                 onClick={() => addField("tags")}
//                 className="text-sm text-blue-600 mt-1"
//               >
//                 + Add more
//               </button>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition"
//             >
//               {loading ? "Publishing..." : "Publish Product"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ProductPublish;

import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import API from "../../api";
import {
  FaUpload,
  FaImage,
  FaTag,
  FaList,
  FaDollarSign,
  FaBox,
  FaWarehouse,
  FaStar,
  FaPercent,
  FaBarcode,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const ProductPublish = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: [""],
    price: "",
    category: "",
    imageURL: "",
    imageFile: null,
    stock: "",
    brand: "",
    rating: "",
    tags: [""],
    discount: "",
    sku: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeStep, setActiveStep] = useState(1);

  const categories = [
    "smartphone",
    "laptop",
    "tablet",
    "fashion",
    "beauty",
    "grocery",
    "furniture",
    "electronic",
    "tv & appliances",
    "accessories",
    "sports",
    "books",
    "toys",
    "health",
    "automotive",
  ];

  useEffect(() => {
    if (formData.imageURL) {
      setPreviewImage(formData.imageURL);
    } else if (formData.imageFile) {
      setPreviewImage(URL.createObjectURL(formData.imageFile));
    } else {
      setPreviewImage("");
    }
  }, [formData.imageURL, formData.imageFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "File size should be less than 5MB" });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imageURL: "",
    }));
  };

  const uploadImageToCloudinary = async () => {
    if (!formData.imageFile) return formData.imageURL;

    const uploadData = new FormData();
    uploadData.append("file", formData.imageFile);
    uploadData.append("upload_preset", "unsigned_upload");

    try {
      const res = await API.post(
        "https://api.cloudinary.com/v1_1/dva8v7gxm/image/upload",
        uploadData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Image upload failed:", err);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validation
    if (!formData.name || !formData.price || !formData.category) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      setLoading(false);
      return;
    }

    try {
      const image = await uploadImageToCloudinary();
      if (!image && !formData.imageURL) {
        setMessage({
          type: "error",
          text: "Please upload or provide an image URL",
        });
        setLoading(false);
        return;
      }

      const productData = {
        ...formData,
        image: image || formData.imageURL,
        description: formData.description.filter((d) => d.trim() !== ""),
        tags: formData.tags.filter((t) => t.trim() !== ""),
      };

      await API.post("/products/create", productData);

      setMessage({
        type: "success",
        text: "✅ Product Published Successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        description: [""],
        price: "",
        category: "",
        imageURL: "",
        imageFile: null,
        stock: "",
        brand: "",
        rating: "",
        tags: [""],
        discount: "",
        sku: "",
      });
      setPreviewImage("");
      setActiveStep(1);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "❌ Failed to publish product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Publish New Product
            </h1>
            <p className="text-gray-600">
              Fill in the details below to add a new product to your catalog
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step === activeStep
                        ? "bg-blue-600 text-white scale-110"
                        : step < activeStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step < activeStep ? <FaCheckCircle /> : step}
                  </div>
                  <span className="text-sm mt-2 text-gray-600">
                    {step === 1
                      ? "Basic Info"
                      : step === 2
                      ? "Media"
                      : "Details"}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {message.type === "success" ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaTimesCircle className="text-red-500" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {activeStep === 1 && (
                <div className="p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaBox className="text-blue-500" />
                    Basic Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700 flex items-center gap-2">
                        Product Name *
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700 flex items-center gap-2">
                        <FaDollarSign className="text-green-500" />
                        Price (₹) *
                      </label>
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        type="number"
                        placeholder="0.00"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700 flex items-center gap-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Brand */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700">Brand</label>
                      <input
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Enter brand name"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* SKU */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700 flex items-center gap-2">
                        <FaBarcode className="text-purple-500" />
                        SKU Code
                      </label>
                      <input
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        placeholder="Enter SKU code"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Stock */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700 flex items-center gap-2">
                        <FaWarehouse className="text-orange-500" />
                        Stock Quantity
                      </label>
                      <input
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        type="number"
                        placeholder="0"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Media & Images */}
              {activeStep === 2 && (
                <div className="p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaImage className="text-blue-500" />
                    Product Media
                  </h2>

                  <div className="space-y-6">
                    {/* Image Upload Box */}
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                      <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        Drag & drop product image here, or click to browse
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer transition-colors"
                      >
                        Choose File
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        Supports JPG, PNG up to 5MB
                      </p>
                    </div>

                    {/* Or Image URL */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700">
                        Or Enter Image URL
                      </label>
                      <input
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Preview */}
                    {previewImage && (
                      <div className="space-y-2">
                        <label className="font-medium text-gray-700">
                          Preview
                        </label>
                        <div className="border border-gray-200 rounded-xl p-4">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="max-h-64 mx-auto object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Details & Tags */}
              {activeStep === 3 && (
                <div className="p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaList className="text-blue-500" />
                    Additional Details
                  </h2>

                  <div className="space-y-6">
                    {/* Rating */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700 flex items-center gap-2">
                        <FaStar className="text-yellow-500" />
                        Rating (1-5)
                      </label>
                      <input
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        type="number"
                        min={1}
                        max={5}
                        step={0.1}
                        placeholder="4.5"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Discount */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700 flex items-center gap-2">
                        <FaPercent className="text-red-500" />
                        Discount (%)
                      </label>
                      <input
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        type="number"
                        min={0}
                        max={100}
                        placeholder="0"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700">
                        Description
                      </label>
                      <div className="space-y-3">
                        {formData.description.map((desc, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              value={desc}
                              onChange={(e) =>
                                handleArrayChange(e, idx, "description")
                              }
                              placeholder={`Description point ${idx + 1}`}
                              className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formData.description.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeField("description", idx)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addField("description")}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <FaPlus />
                          Add Description Point
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700 flex items-center gap-2">
                        <FaTag className="text-purple-500" />
                        Tags
                      </label>
                      <div className="space-y-3">
                        {formData.tags.map((tag, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              value={tag}
                              onChange={(e) =>
                                handleArrayChange(e, idx, "tags")
                              }
                              placeholder={`Tag ${idx + 1}`}
                              className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formData.tags.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeField("tags", idx)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addField("tags")}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <FaPlus />
                          Add Tag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between">
                  {activeStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {activeStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <FaUpload />
                          Publish Product
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">
              💡 Tips for better products:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use high-quality images (minimum 800x800 pixels)</li>
              <li>• Provide detailed descriptions with key features</li>
              <li>• Set appropriate stock levels to avoid overselling</li>
              <li>• Add relevant tags for better searchability</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductPublish;
