import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("https://e-comservice.onrender.com/api/users/cart", {
        withCredentials: true,
      });
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Fetch cart failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, type) => {
    const updatedCart = cart.map((item) => {
      if (item.productId._id === productId) {
        const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    setCart(updatedCart);
    // Optional: Send to backend update
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`https://e-comservice.onrender.com/api/users/cart/${productId}`, {
        withCredentials: true,
      });
      setCart(cart.filter((item) => item.productId._id !== productId));
    } catch (err) {
      console.error("Remove failed:", err.message);
    }
  };

  const getSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  const shippingCost = 50; 

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 mt-20">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 md:flex gap-8">
        {/* Left: Cart Items */}
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
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId._id, "dec")
                            }
                            className="w-6 h-6 bg-gray-200 text-sm rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId._id, "inc")
                            }
                            className="w-6 h-6 bg-gray-200 text-sm rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">₹{item.productId.price}</td>
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

        {/* Right: Summary */}
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

            <div>
              <label htmlFor="promo" className="block mb-1 font-medium">
                Promo Code
              </label>
              <div className="flex">
                <input
                  id="promo"
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter your code"
                  className="flex-1 px-2 py-1 border rounded-l-md text-sm"
                />
                <button className="px-3 bg-red-500 text-white rounded-r-md hover:bg-red-600">
                  Apply
                </button>
              </div>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total Cost</span>
              <span>₹{(getSubtotal() + shippingCost).toFixed(2)}</span>
            </div>
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
