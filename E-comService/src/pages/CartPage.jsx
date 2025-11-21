// CartPage.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Fetch Cart from backend
  const fetchCart = async () => {
    try {
      const res = await API.get("/users/cart");
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Fetch cart failed:", err.message);
      toast.error("❌ Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Quantity in backend
  const updateQuantity = async (productId, type) => {
    try {
      const res = await API.put(`/users/cart/${productId}`, { type });
      setCart(res.data.cart);
    } catch (err) {
      console.error("Quantity update failed:", err.message);
      toast.error("❌ Failed to update quantity");
    }
  };

  // ✅ Remove item from cart
  const handleRemove = async (productId) => {
    try {
      const res = await API.delete(`/users/cart/${productId}`);
      setCart(res.data.cart);
      toast.success("✅ Item removed");
    } catch (err) {
      console.error("Remove failed:", err.message);
      toast.error("❌ Failed to remove item");
    }
  };

  // ✅ Subtotal Calculation
  const getSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  const shippingCost = 50;

  // ✅ Apply Promo Code
  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "DISCOUNT10") {
      setDiscount(0.1); // 10% discount
      toast.success("✅ Promo applied! 10% off");
    } else {
      setDiscount(0);
      toast.error("❌ Invalid promo code");
    }
  };

  const totalCost = getSubtotal() + shippingCost - getSubtotal() * discount;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 mt-20">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 md:flex gap-8">
        {/* Left Section */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

          {loading ? (
            <p>Loading...</p>
          ) : cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <table className="w-full text-left border-separate mb-6">
                <thead>
                  <tr>
                    <th className="pb-2">Product Details</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr key={item.productId._id} className="align-top border-b">
                      {/* Product Info */}
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.productId.image}
                            alt={item.productId.name}
                            className="w-16 h-16 object-contain border rounded"
                          />
                          <div>
                            <p className="font-semibold">
                              {item.productId.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {item.productId.category}
                            </p>

                            <button
                              onClick={() => handleRemove(item.productId._id)}
                              className="text-red-500 text-sm mt-1 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(item.productId._id, "dec")
                            }
                            className={`w-6 h-6 bg-gray-200 text-sm rounded ${
                              item.quantity === 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              updateQuantity(item.productId._id, "inc")
                            }
                            className="w-6 h-6 bg-gray-200 text-sm rounded hover:cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4">₹{item.productId.price}</td>

                      {/* Total */}
                      <td className="py-4 font-semibold">
                        ₹{item.productId.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <a href="/" className="text-blue-600 text-sm hover:underline">
                ← Continue Shopping
              </a>
            </>
          )}
        </div>

        {/* Right Summary */}
        <div className="md:w-1/3 mt-10 md:mt-0">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Items</span>
              <span>₹{getSubtotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shippingCost.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>-₹{(getSubtotal() * discount).toFixed(2)}</span>
              </div>
            )}

            <hr />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total Cost</span>
              <span>₹{totalCost.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={applyPromo}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Apply
            </button>
          </div>

          <button className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
