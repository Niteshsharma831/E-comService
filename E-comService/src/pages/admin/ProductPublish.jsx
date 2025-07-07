import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

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
  const [message, setMessage] = useState("");

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

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
      imageURL: "",
    }));
  };

  const uploadImageToCloudinary = async () => {
    if (!formData.imageFile) return formData.imageURL;

    const uploadData = new FormData();
    uploadData.append("file", formData.imageFile);
    uploadData.append("upload_preset", "unsigned_upload");
    try {
      const res = await axios.post(
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
    setMessage("");

    try {
      const image = await uploadImageToCloudinary();
      const productData = {
        ...formData,
        image: image,
        description: formData.description.filter((d) => d.trim() !== ""),
        tags: formData.tags.filter((t) => t.trim() !== ""),
      };

      const res = await axios.post(
        "http://localhost:3000/api/products/create",
        productData
      );
      setMessage("✅ Product Published Successfully!");
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
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to publish product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Publish New Product
          </h2>

          {message && (
            <div className="text-center mb-4 text-lg font-medium text-green-600 animate-fade-in-up">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="input"
            />

            {/* Price */}
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              placeholder="Price ₹"
              className="input"
            />

            {/* Category (Dropdown) */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Category</option>
              <option value="smartphone">Smartphone</option>
              <option value="laptop">Laptop</option>
              <option value="tab">Tab</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="grocery">Grocery</option>
              <option value="furniture">Furniture</option>
              <option value="electronic">Electronic</option>
              <option value="tv & appliances">TV & Appliances</option>
              <option value="accessories">Accessories</option>
            </select>

            {/* Stock */}
            <input
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              type="number"
              placeholder="Stock quantity"
              className="input"
            />

            {/* Brand */}
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="input"
            />

            {/* Rating */}
            <input
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              type="number"
              placeholder="Rating (1-5)"
              min={1}
              max={5}
              className="input"
            />

            {/* Discount */}
            <input
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              type="number"
              placeholder="Discount (%)"
              className="input"
            />

            {/* SKU */}
            <input
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="SKU"
              className="input"
            />

            {/* Image URL */}
            <input
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              className="input col-span-2"
            />

            {/* OR File Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="input col-span-2"
            />

            {/* Preview */}
            {previewImage && (
              <div className="col-span-2 text-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-40 h-40 object-contain inline-block border rounded-md shadow"
                />
              </div>
            )}

            {/* Description */}
            <div className="col-span-2">
              <label className="font-medium mb-2 block">Description:</label>
              {formData.description.map((desc, idx) => (
                <input
                  key={idx}
                  value={desc}
                  onChange={(e) => handleArrayChange(e, idx, "description")}
                  placeholder={`Point ${idx + 1}`}
                  className="input mb-2"
                />
              ))}
              <button
                type="button"
                onClick={() => addField("description")}
                className="text-sm text-blue-600 mt-1"
              >
                + Add more
              </button>
            </div>

            {/* Tags */}
            <div className="col-span-2">
              <label className="font-medium mb-2 block">Tags:</label>
              {formData.tags.map((tag, idx) => (
                <input
                  key={idx}
                  value={tag}
                  onChange={(e) => handleArrayChange(e, idx, "tags")}
                  placeholder={`Tag ${idx + 1}`}
                  className="input mb-2"
                />
              ))}
              <button
                type="button"
                onClick={() => addField("tags")}
                className="text-sm text-blue-600 mt-1"
              >
                + Add more
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition"
            >
              {loading ? "Publishing..." : "Publish Product"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductPublish;
