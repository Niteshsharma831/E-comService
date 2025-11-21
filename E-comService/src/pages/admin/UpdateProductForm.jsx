import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";
import API from "../../api"; // <-- your pre-configured axios instance

const UpdateProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/getproducts/${id}`);
        const data = res.data.product;
        setFormData({
          name: data.name || "",
          description: data.description || [""],
          price: data.price || "",
          category: data.category || "",
          imageURL: data.image || "",
          imageFile: null,
          stock: data.stock || "",
          brand: data.brand || "",
          rating: data.rating || "",
          tags: data.tags || [""],
          discount: data.discount || "",
          sku: data.sku || "",
        });
      } catch (err) {
        toast.error("❌ Failed to load product data");
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (formData.imageURL) setPreviewImage(formData.imageURL);
    else if (formData.imageFile)
      setPreviewImage(URL.createObjectURL(formData.imageFile));
    else setPreviewImage("");
  }, [formData.imageURL, formData.imageFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const arr = [...formData[field]];
    arr[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: arr }));
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
      const res = await API.post(
        "https://api.cloudinary.com/v1_1/dva8v7gxm/image/upload",
        uploadData
      );
      return res.data.secure_url;
    } catch (err) {
      toast.error("Image upload failed");
      return formData.imageURL;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const image = await uploadImageToCloudinary();
      const productData = {
        ...formData,
        image,
        description: formData.description.filter((d) => d.trim() !== ""),
        tags: formData.tags.filter((t) => t.trim() !== ""),
      };

      await API.put(`/products/updateproducts/${id}`, productData);

      toast.success("✅ Product updated successfully!");
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-100 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Update Product
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            {[
              { name: "name", label: "Product Name" },
              { name: "price", type: "number", label: "Price ₹" },
              { name: "category", label: "Category" },
              { name: "stock", type: "number", label: "Stock" },
              { name: "brand", label: "Brand" },
              { name: "rating", type: "number", label: "Rating (0-5)" },
              { name: "discount", type: "number", label: "Discount (%)" },
              { name: "sku", label: "SKU" },
            ].map(({ name, label, type = "text" }) => (
              <input
                key={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                className="input px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ))}

            <input
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="col-span-2"
            />

            {previewImage && (
              <div className="col-span-2 text-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-40 h-40 object-contain inline-block border rounded-md shadow"
                />
              </div>
            )}

            <div className="col-span-2">
              <label className="font-medium block mb-2">Description</label>
              {formData.description.map((desc, idx) => (
                <input
                  key={idx}
                  value={desc}
                  onChange={(e) => handleArrayChange(e, idx, "description")}
                  placeholder={`Point ${idx + 1}`}
                  className="input w-full mb-2 px-4 py-2 border border-gray-300 rounded"
                />
              ))}
              <button
                type="button"
                onClick={() => addField("description")}
                className="text-sm text-blue-600"
              >
                + Add more
              </button>
            </div>

            <div className="col-span-2">
              <label className="font-medium block mb-2">Tags</label>
              {formData.tags.map((tag, idx) => (
                <input
                  key={idx}
                  value={tag}
                  onChange={(e) => handleArrayChange(e, idx, "tags")}
                  placeholder={`Tag ${idx + 1}`}
                  className="input w-full mb-2 px-4 py-2 border border-gray-300 rounded"
                />
              ))}
              <button
                type="button"
                onClick={() => addField("tags")}
                className="text-sm text-blue-600"
              >
                + Add more
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProductForm;
