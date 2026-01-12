// // CartPage.jsx
// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { toast } from "react-toastify";

// const CartPage = () => {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // ✅ Fetch Cart from backend
//   const fetchCart = async () => {
//     try {
//       const res = await API.get("/users/cart");
//       setCart(res.data.cart || []);
//     } catch (err) {
//       console.error("Fetch cart failed:", err.message);
//       toast.error("❌ Failed to fetch cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Update Quantity in backend
//   const updateQuantity = async (productId, type) => {
//     try {
//       const res = await API.put(`/users/cart/${productId}`, { type });
//       setCart(res.data.cart);
//     } catch (err) {
//       console.error("Quantity update failed:", err.message);
//       toast.error("❌ Failed to update quantity");
//     }
//   };

//   // ✅ Remove item from cart
//   const handleRemove = async (productId) => {
//     try {
//       const res = await API.delete(`/users/cart/${productId}`);
//       setCart(res.data.cart);
//       toast.success("✅ Item removed");
//     } catch (err) {
//       console.error("Remove failed:", err.message);
//       toast.error("❌ Failed to remove item");
//     }
//   };

//   // ✅ Subtotal Calculation
//   const getSubtotal = () => {
//     return cart.reduce(
//       (total, item) => total + item.productId.price * item.quantity,
//       0
//     );
//   };

//   const shippingCost = 50;

//   // ✅ Apply Promo Code
//   const applyPromo = () => {
//     if (promoCode.trim().toUpperCase() === "DISCOUNT10") {
//       setDiscount(0.1); // 10% discount
//       toast.success("✅ Promo applied! 10% off");
//     } else {
//       setDiscount(0);
//       toast.error("❌ Invalid promo code");
//     }
//   };

//   const totalCost = getSubtotal() + shippingCost - getSubtotal() * discount;

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 mt-20">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 md:flex gap-8">
//         {/* Left Section */}
//         <div className="md:w-2/3">
//           <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

//           {loading ? (
//             <p>Loading...</p>
//           ) : cart.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty.</p>
//           ) : (
//             <>
//               <table className="w-full text-left border-separate mb-6">
//                 <thead>
//                   <tr>
//                     <th className="pb-2">Product Details</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {cart.map((item) => (
//                     <tr key={item.productId._id} className="align-top border-b">
//                       {/* Product Info */}
//                       <td className="py-4">
//                         <div className="flex items-center gap-4">
//                           <img
//                             src={item.productId.image}
//                             alt={item.productId.name}
//                             className="w-16 h-16 object-contain border rounded"
//                           />
//                           <div>
//                             <p className="font-semibold">
//                               {item.productId.name}
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               {item.productId.category}
//                             </p>

//                             <button
//                               onClick={() => handleRemove(item.productId._id)}
//                               className="text-red-500 text-sm mt-1 hover:underline"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Quantity */}
//                       <td className="py-4">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() =>
//                               item.quantity > 1 &&
//                               updateQuantity(item.productId._id, "dec")
//                             }
//                             className={`w-6 h-6 bg-gray-200 text-sm rounded ${
//                               item.quantity === 1
//                                 ? "opacity-50 cursor-not-allowed"
//                                 : ""
//                             }`}
//                           >
//                             -
//                           </button>

//                           <span>{item.quantity}</span>

//                           <button
//                             onClick={() =>
//                               updateQuantity(item.productId._id, "inc")
//                             }
//                             className="w-6 h-6 bg-gray-200 text-sm rounded hover:cursor-pointer"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </td>

//                       {/* Price */}
//                       <td className="py-4">₹{item.productId.price}</td>

//                       {/* Total */}
//                       <td className="py-4 font-semibold">
//                         ₹{item.productId.price * item.quantity}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <a href="/" className="text-blue-600 text-sm hover:underline">
//                 ← Continue Shopping
//               </a>
//             </>
//           )}
//         </div>

//         {/* Right Summary */}
//         <div className="md:w-1/3 mt-10 md:mt-0">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//           <div className="space-y-4 text-sm">
//             <div className="flex justify-between">
//               <span>Items</span>
//               <span>₹{getSubtotal().toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span>₹{shippingCost.toFixed(2)}</span>
//             </div>

//             {discount > 0 && (
//               <div className="flex justify-between text-green-600">
//                 <span>Discount (10%)</span>
//                 <span>-₹{(getSubtotal() * discount).toFixed(2)}</span>
//               </div>
//             )}

//             <hr />

//             <div className="flex justify-between font-semibold text-lg">
//               <span>Total Cost</span>
//               <span>₹{totalCost.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* Promo Code */}
//           <div className="mt-6">
//             <input
//               type="text"
//               value={promoCode}
//               onChange={(e) => setPromoCode(e.target.value)}
//               placeholder="Promo code"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={applyPromo}
//               className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//             >
//               Apply
//             </button>
//           </div>

//           <button className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
//             CHECKOUT
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
import React, { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { FaShoppingCart, FaTrash, FaArrowLeft, FaTag, FaTruck, FaCreditCard, FaPlus, FaMinus } from "react-icons/fa";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/users/cart");
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Fetch cart failed:", err.message);
      toast.error("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, type) => {
    try {
      const res = await API.put(`/users/cart/${productId}`, { type });
      setCart(res.data.cart);
      toast.success("Quantity updated");
    } catch (err) {
      console.error("Quantity update failed:", err.message);
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await API.delete(`/users/cart/${productId}`);
      setCart(res.data.cart);
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Remove failed:", err.message);
      toast.error("Failed to remove item");
    }
  };

  const getSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "DISCOUNT10") {
      setDiscount(0.1);
      toast.success("🎉 10% discount applied!");
    } else {
      setDiscount(0);
      toast.error("Invalid promo code");
    }
  };

  const shippingCost = cart.length > 0 ? 50 : 0;
  const totalCost = getSubtotal() + shippingCost - getSubtotal() * discount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl">
              <FaShoppingCart className="text-xl" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Shopping <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Cart</span>
              </h1>
              <p className="text-gray-600 mt-1">Review your items and proceed to checkout</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FaArrowLeft />
              Continue Shopping
            </a>
            <span className="text-sm text-gray-500">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your cart...</p>
              </div>
            ) : cart.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <FaShoppingCart className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add items to get started</p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  <FaArrowLeft />
                  Start Shopping
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.productId._id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 flex items-center justify-center">
                          <img
                            src={item.productId.image}
                            alt={item.productId.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.productId.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.productId.category}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemove(item.productId._id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{item.productId.price}
                            </span>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1">
                              <button
                                onClick={() =>
                                  item.quantity > 1 &&
                                  updateQuantity(item.productId._id, "dec")
                                }
                                className={`p-1 rounded ${
                                  item.quantity === 1
                                    ? "opacity-40 cursor-not-allowed"
                                    : "hover:bg-gray-200"
                                }`}
                              >
                                <FaMinus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId._id, "inc")
                                }
                                className="p-1 rounded hover:bg-gray-200"
                              >
                                <FaPlus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Total</p>
                            <p className="text-xl font-bold text-gray-900">
                              ₹{item.productId.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{getSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaTruck className="w-4 h-4" />
                    <span>Shipping</span>
                  </div>
                  <span className="font-medium">₹{shippingCost.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <div className="flex items-center gap-2">
                      <FaTag className="w-4 h-4" />
                      <span>Discount (10%)</span>
                    </div>
                    <span className="font-medium">-₹{(getSubtotal() * discount).toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{totalCost.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Including all taxes</p>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Try <code className="bg-gray-100 px-2 py-1 rounded">DISCOUNT10</code> for 10% off
                </p>
              </div>

              {/* Checkout Button */}
              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mb-4">
                <FaCreditCard />
                <span>Proceed to Checkout</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Secure payment · 30-day returns · Free shipping over ₹499
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">🔒</div>
                    <div className="text-xs text-gray-600 mt-1">Secure</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">🚚</div>
                    <div className="text-xs text-gray-600 mt-1">Free Delivery</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">🔄</div>
                    <div className="text-xs text-gray-600 mt-1">Easy Returns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;