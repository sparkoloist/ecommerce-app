import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.discountedPrice || item.price),
    0
  );

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/orders", {
        name: customer.name,
        email: customer.email,
        address: customer.address,
        phone: customer.phone,
        cartItems: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      //  Navigate to success page with orderId
      navigate(`/order-success?orderId=${res.data.orderId}`);
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">
        🧾 Checkout
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={customer.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={customer.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          value={customer.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={customer.address}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="font-semibold mb-2">🛒 Your Cart:</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹{(item.discountedPrice || item.price) * item.quantity}
              </span>
            </div>
          ))}
          <div className="font-bold mt-2 text-right">Total: ₹{total}</div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
