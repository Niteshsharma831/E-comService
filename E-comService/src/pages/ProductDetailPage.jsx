// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import API from "../api";
// import {
//   FaStar,
//   FaTags,
//   FaBoxOpen,
//   FaShoppingCart,
//   FaBolt,
// } from "react-icons/fa";

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await API.get(`/products/getproducts/${id}`);
//         setProduct(res.data.product);
//       } catch (err) {
//         console.error("Error loading product:", err);
//         toast.error("❌ Failed to load product details.");
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleBuyNow = () => {
//     if (!product) return;
//     const orderPayload = { productId: product._id, price: product.price };
//     navigate("/order", { state: { product, orderPayload } });
//   };

//   const handleAddToCart = async () => {
//     if (!product) return;

//     try {
//       await API.post("/users/cart/add", {
//         productId: product._id,
//         quantity: 1,
//       });
//       toast.success("🛒 Added to cart successfully!");
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.warning("⚠️ Please login to continue.");
//         navigate("/login");
//       } else {
//         toast.error("❌ Failed to add to cart.");
//       }
//     }
//   };

//   if (!product)
//     return <div className="text-center mt-20 text-gray-500">Loading...</div>;

//   return (
//     <div className="mt-30 min-h-screen bg-gray-100 px-3 md:px-6 py-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT IMAGE SECTION */}
//           <div className="w-full lg:w-1/2 flex flex-col items-center">
//             <div className="bg-white rounded-2xl shadow-lg p-4 h-[400px] w-full flex items-center justify-center overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="object-contain h-full w-full hover:scale-105 transition-transform duration-300"
//               />
//             </div>

//             {/* THUMBNAILS */}
//             <div className="flex gap-3 mt-4">
//               {[product.image, product.image, product.image].map(
//                 (img, index) => (
//                   <img
//                     key={index}
//                     src={img}
//                     className="h-16 w-16 rounded-xl p-1 bg-white shadow-md object-contain"
//                   />
//                 )
//               )}
//             </div>

//             {/* DESKTOP BUTTONS BELOW IMAGE */}
//             <div className="hidden lg:flex mt-6 gap-4 w-full">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-yellow-400 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
//               >
//                 <FaShoppingCart /> Add to Cart
//               </button>

//               <button
//                 onClick={handleBuyNow}
//                 className="flex-1 bg-orange-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
//               >
//                 <FaBolt /> Buy Now
//               </button>
//             </div>
//           </div>

//           {/* RIGHT SIDE DETAILS */}
//           <div className="w-full lg:w-1/2 flex flex-col">
//             <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

//             <p className="text-gray-600 mt-2 capitalize text-sm">
//               {product.category}
//             </p>

//             {/* Ratings */}
//             <div className="flex items-center gap-2 mt-3">
//               <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-lg flex items-center gap-1">
//                 <FaStar /> 4.3
//               </span>
//               <span className="text-gray-500 text-sm">8,475 Ratings</span>
//             </div>

//             {/* Price */}
//             <div className="mt-4 flex items-center gap-4">
//               <p className="text-4xl font-bold text-green-700">
//                 ₹{product.price}
//               </p>
//               <p className="text-gray-400 line-through text-sm">
//                 ₹{Math.round(product.price * 1.2)}
//               </p>
//               {product.discount && (
//                 <p className="text-green-600 text-sm font-medium">
//                   {product.discount}% Off
//                 </p>
//               )}
//             </div>

//             {/* Offers */}
//             <div className="mt-6 bg-blue-50 p-5 rounded-2xl shadow">
//               <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                 <FaTags /> Available Offers
//               </h3>
//               <ul className="text-sm text-gray-700 space-y-1 ml-4">
//                 <li>🔥 5% cashback on Flipkart Axis Bank Credit Card</li>
//                 <li>🔥 Flat ₹750 off on Axis Bank Debit Card</li>
//                 <li>🔥 ₹10 Cashback on Paytm UPI</li>
//               </ul>
//             </div>

//             {/* Description */}
//             <div className="mt-6">
//               <h3 className="font-semibold text-gray-800 text-lg mb-2">
//                 Description
//               </h3>
//               <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1">
//                 {(Array.isArray(product.description)
//                   ? product.description
//                   : [product.description]
//                 ).map((item, i) => (
//                   <li key={i}>{item}</li>
//                 ))}
//               </ul>
//             </div>

//             {/* Specifications */}
//             <div className="mt-8 bg-gray-50 p-5 rounded-2xl shadow-inner">
//               <h3 className="font-semibold text-gray-800 text-lg mb-3">
//                 Product Details
//               </h3>
//               <div className="grid grid-cols-2 gap-3 text-gray-600 text-sm">
//                 <p>
//                   <strong>Brand:</strong> {product.brand}
//                 </p>
//                 <p>
//                   <strong>Stock:</strong> {product.stock}
//                 </p>
//                 <p>
//                   <strong>SKU:</strong> {product.sku}
//                 </p>
//                 <p>
//                   <strong>Warranty:</strong> {product.warranty || "1 Year"}
//                 </p>
//                 <p>
//                   <strong>Color:</strong> {product.color || "Multiple"}
//                 </p>
//                 <p>
//                   <strong>Weight:</strong> {product.weight || "400g"}
//                 </p>
//                 <p>
//                   <strong>Material:</strong>{" "}
//                   {product.material || "Plastic / Metal"}
//                 </p>
//                 <p>
//                   <strong>Dimensions:</strong>{" "}
//                   {product.dimensions || "Standard"}
//                 </p>
//               </div>
//             </div>

//             {/* Delivery */}
//             <div className="mt-6 flex items-center gap-3 p-4 bg-white rounded-2xl shadow">
//               <FaBoxOpen className="text-indigo-600 text-2xl" />
//               <p className="text-gray-600 text-sm">
//                 Delivery in <strong>3–5 days</strong> • Free shipping over ₹499
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE ONLY BUTTONS */}
//       <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white p-3 shadow-2xl flex gap-3">
//         <button
//           onClick={handleAddToCart}
//           className="flex-1 bg-yellow-400 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
//         >
//           <FaShoppingCart /> Add to Cart
//         </button>

//         <button
//           onClick={handleBuyNow}
//           className="flex-1 bg-orange-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
//         >
//           <FaBolt /> Buy Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api";
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaTruck,
  FaShieldAlt,
  FaArrowLeft,
  FaHeart,
  FaShareAlt,
  FaCheckCircle,
  FaChevronRight,
  FaCheck,
  FaTags,
  FaFire,
  FaPercent,
  FaCrown,
  FaGift,
  FaGem,
  FaStopwatch,
  FaExpand,
  FaCompress,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/getproducts/${id}`);
        const productData = res.data.product;
        setProduct(productData);

        // Use only images from database
        if (productData.images && productData.images.length > 0) {
          setImages(productData.images);
        } else {
          // Fallback to main image if no additional images
          setImages([productData.image]);
        }
      } catch (err) {
        console.error("Error loading product:", err);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    if (!product) return;
    const orderPayload = {
      productId: product._id,
      price: product.price,
      quantity: quantity,
    };
    navigate("/order", { state: { product, orderPayload } });
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await API.post("/users/cart/add", {
        productId: product._id,
        quantity: quantity,
      });
      toast.success("🎉 Added to cart!");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warning("Please login to continue");
        navigate("/login");
      } else {
        toast.error("Failed to add to cart");
      }
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist!"
    );
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Calculate real discount
  const calculateDiscount = () => {
    if (product?.originalPrice && product.price) {
      const discount =
        ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return Math.round(discount);
    }
    return Math.floor(Math.random() * 30) + 10;
  };

  // Get real stock status
  const getStockStatus = () => {
    if (!product?.stock)
      return {
        text: "In Stock",
        color: "from-emerald-500 to-green-500",
        icon: "✅",
      };

    if (product.stock === 0) {
      return {
        text: "Out of Stock",
        color: "from-red-500 to-pink-500",
        icon: "❌",
      };
    } else if (product.stock < 10) {
      return {
        text: "Low Stock",
        color: "from-amber-500 to-orange-500",
        icon: "⚠️",
      };
    } else {
      return {
        text: "In Stock",
        color: "from-emerald-500 to-green-500",
        icon: "✅",
      };
    }
  };

  // Get category-specific badges
  const getCategoryBadges = () => {
    const category = product?.category?.toLowerCase() || "";
    const badges = [];

    const discount = calculateDiscount();
    if (discount > 0) {
      badges.push({
        text: `${discount}% OFF`,
        color: "bg-gradient-to-br from-red-500 to-red-600",
        icon: <FaPercent className="inline mr-1" />,
      });
    }

    if (discount > 20) {
      badges.push({
        text: "DEAL OF THE DAY",
        color: "bg-gradient-to-br from-orange-500 to-red-500",
        icon: <FaFire className="inline mr-1" />,
      });
    }

    if (product?.rating > 4) {
      badges.push({
        text: "TOP RATED",
        color: "bg-gradient-to-br from-yellow-500 to-orange-500",
        icon: <FaStar className="inline mr-1" />,
      });
    }

    return badges;
  };

  // Get time-limited offers
  const getTimeLimitedOffers = () => {
    const offers = [
      {
        id: 1,
        title: "Limited Time Deal",
        description: "Sale ends in 02:48:12",
        color: "bg-gradient-to-r from-red-50 to-orange-50",
        border: "border-red-200",
        icon: <FaStopwatch className="text-red-500" />,
      },
      {
        id: 2,
        title: "Special Price",
        description: "Extra ₹500 off with SBI Credit Card",
        color: "bg-gradient-to-r from-blue-50 to-cyan-50",
        border: "border-blue-200",
        icon: <FaGem className="text-blue-500" />,
      },
      {
        id: 3,
        title: "Free Delivery",
        description: "Get it by Tomorrow, 9 AM",
        color: "bg-gradient-to-r from-green-50 to-emerald-50",
        border: "border-green-200",
        icon: <FaTruck className="text-green-500" />,
      },
    ];
    return offers;
  };

  // Get product highlights
  const getProductHighlights = () => {
    const highlights = [];

    if (product?.category?.toLowerCase().includes("electronics")) {
      highlights.push(
        "1 Year Manufacturer Warranty",
        "Free Installation Available",
        "30 Days Replacement Policy",
        "Top Brand"
      );
    } else if (product?.category?.toLowerCase().includes("fashion")) {
      highlights.push(
        "Premium Quality Fabric",
        "Machine Washable",
        "Easy Returns Available",
        "Latest Trend"
      );
    } else {
      highlights.push(
        "High Quality Product",
        "Easy Returns",
        "Authentic Product",
        "Best Seller"
      );
    }

    return highlights;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h3>
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <FaArrowLeft />
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount();
  const mrp =
    product.originalPrice || Math.round(product.price * (1 + discount / 100));
  const badges = getCategoryBadges();
  const timeOffers = getTimeLimitedOffers();
  const highlights = getProductHighlights();
  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <ToastContainer position="top-right" />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 group text-sm"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to results</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          Home / {product.category} /{" "}
          <span className="text-gray-900">{product.brand || "Brand"}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Image Gallery & Related Content */}
          <div className="space-y-6">
            {/* Main Image Container */}
            <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Discount Badges */}
              {badges.length > 0 && (
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                  {badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${badge.color} text-white px-3 py-1.5 rounded-lg font-bold shadow-lg flex items-center gap-1 text-sm`}
                    >
                      {badge.icon}
                      {badge.text}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Stock Status Badge */}
              <div
                className={`absolute top-3 right-3 z-10 bg-gradient-to-r ${stockStatus.color} text-white px-3 py-1.5 rounded-lg font-bold shadow-lg`}
              >
                {stockStatus.icon} {stockStatus.text}
              </div>

              {/* Main Image */}
              <div className="w-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center p-4 sm:p-8">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className={`max-h-[300px] sm:max-h-[400px] max-w-full object-contain transition-transform duration-300 ${
                      isZoomed
                        ? "scale-150 cursor-zoom-out"
                        : "hover:scale-105 cursor-zoom-in"
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                      >
                        <FaAngleLeft className="text-gray-700 text-sm sm:text-base" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                      >
                        <FaAngleRight className="text-gray-700 text-sm sm:text-base" />
                      </button>
                    </>
                  )}

                  {/* Zoom Button */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute bottom-2 right-2 bg-white/80 hover:bg-white w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                  >
                    {isZoomed ? (
                      <FaCompress className="text-gray-700 text-sm sm:text-base" />
                    ) : (
                      <FaExpand className="text-gray-700 text-sm sm:text-base" />
                    )}
                  </button>
                </div>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs sm:text-sm">
                {selectedImage + 1} / {images.length}
              </div>

              {/* Share & Wishlist Buttons */}
              <div className="absolute bottom-16 right-2 sm:bottom-20 sm:right-4 flex gap-2">
                <button
                  onClick={toggleWishlist}
                  className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <FaHeart
                    className={isWishlisted ? "text-red-500" : "text-gray-600"}
                  />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Product link copied!");
                  }}
                  className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <FaShareAlt className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 p-2 sm:p-4 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Additional Content for Left Side to Balance Layout */}
            <div className="space-y-6">
              {/* Time-Limited Offers */}
              <div className="space-y-3">
                {timeOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`${offer.color} ${offer.border} rounded-lg p-3 border`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{offer.icon}</div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {offer.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {offer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bank Offers */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <FaCrown className="text-purple-500" />
                  <span className="font-semibold text-gray-900">
                    Bank Offers
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    "10% Instant Discount on ICICI Bank Credit Cards",
                    "5% Unlimited Cashback on Flipkart Axis Bank Credit Card",
                    "No Cost EMI on Bajaj Finserv",
                  ].map((offer, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{offer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Description (Left Side) */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Quick Specifications
                </h3>
                <div className="space-y-2">
                  {(Array.isArray(product.description)
                    ? product.description
                    : [product.description]
                  ).map((para, idx) => (
                    <p key={idx} className="text-gray-700 text-sm">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Add to Cart & Buy Now Buttons (Left Side) */}
              <div className="sticky top-4 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-4 font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 rounded-lg ${
                    product.stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-lg"
                  }`}
                >
                  <FaShoppingCart className="text-xl" />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`w-full py-4 font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 rounded-lg ${
                    product.stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg"
                  }`}
                >
                  <FaBolt className="text-xl" />
                  Buy Now
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-blue-600 font-semibold ml-1">
                    {product.rating || 4.8}
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">87,456 Ratings</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">12,489 Reviews</span>
                <span className="text-gray-500">•</span>
                <span className="text-green-700 font-semibold">
                  ⭐⭐⭐⭐⭐ {product.rating || 4.8}
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="border-b pb-4">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₹{mrp.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-green-700">
                  {discount}% off
                </span>
              </div>
              <p className="text-gray-600">
                Inclusive of all taxes • EMI starts at ₹
                {Math.round(product.price / 12)}/month
              </p>
            </div>

            {/* Product Highlights */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Offers Section */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <FaTags className="text-blue-600" />
                Special Offers
              </h3>
              <div className="space-y-2">
                {[
                  "Extra ₹500 off on SBI Credit Card & EMI",
                  "Get Google Nest Mini at ₹1,999",
                  "Save extra with No Cost EMI",
                  "Free ₹500 Gift Card with HDFC Bank",
                  "Special PriceGet extra 10% off up to ₹500",
                ].map((offer, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <FaGift className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-700">{offer}</span>
                      <button className="text-blue-600 text-sm ml-2 hover:underline">
                        Show more
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={product.stock === 0 || quantity >= product.stock}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock || "Limited"} units available
                </span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Delivery</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <FaTruck className="text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Free Delivery</p>
                    <p className="text-sm text-gray-600">
                      Delivery by Tomorrow • Free • Shipping charge of ₹49 on
                      orders below ₹499
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <FaShieldAlt className="text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Easy Returns</p>
                    <p className="text-sm text-gray-600">
                      7 Days Return Policy • Change of mind applicable
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warranty & Services */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Warranty & Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-gray-900">1 Year Warranty</p>
                  <p className="text-sm text-gray-600">Manufacturer warranty</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-gray-900">Support</p>
                  <p className="text-sm text-gray-600">24x7 Customer Support</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-gray-900">Installation</p>
                  <p className="text-sm text-gray-600">
                    Free installation available
                  </p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-gray-900">Returns</p>
                  <p className="text-sm text-gray-600">30 Days Return Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Detailed Specifications Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Detailed Specifications
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <tbody>
                  {[
                    { label: "Brand", value: product.brand || "Premium" },
                    { label: "Model", value: product.model || "Latest" },
                    { label: "Color", value: product.color || "Multiple" },
                    {
                      label: "Material",
                      value: product.material || "Premium",
                    },
                    {
                      label: "Dimensions",
                      value: product.dimensions || "Standard",
                    },
                    { label: "Weight", value: product.weight || "Regular" },
                    { label: "Warranty", value: "1 Year Manufacturer" },
                    { label: "Country of Origin", value: "India" },
                    {
                      label: "In the Box",
                      value:
                        product.inTheBox || "Product, Manual, Warranty Card",
                    },
                    {
                      label: "Model Number",
                      value: product.modelNumber || "XYZ123",
                    },
                    {
                      label: "Model Name",
                      value: product.modelName || product.name,
                    },
                    {
                      label: "Sales Package",
                      value: product.salesPackage || "1 Unit",
                    },
                  ].map((spec, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 font-medium text-gray-700 border-r border-gray-200">
                        <div className="flex items-center">
                          <div className="w-1 h-4 bg-blue-500 rounded-full mr-3"></div>
                          <span>{spec.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        <div className="pl-4">{spec.value}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-4 z-40">
        <div className="flex gap-3">
          <button
            onClick={toggleWishlist}
            className={`p-4 rounded-xl ${
              isWishlisted
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <FaHeart />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 rounded-xl py-4 font-bold flex items-center justify-center gap-2 ${
              product.stock === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
            }`}
          >
            <FaShoppingCart />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className={`flex-1 rounded-xl py-4 font-bold flex items-center justify-center gap-2 ${
              product.stock === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-gradient-to-r from-orange-500 to-red-600 text-white"
            }`}
          >
            <FaBolt />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
