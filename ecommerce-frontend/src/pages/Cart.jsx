import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Log only when cart updates
  useEffect(() => {
    console.log("🧺 Cart Items Updated:", cartItems);
  }, [cartItems]);

  const total = cartItems.reduce(
    (acc, item) => acc + (item.discountedPrice || item.price) * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty.{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 underline cursor-pointer"
          >
            Go shopping
          </span>
        </p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-4 rounded-xl shadow"
            >
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : "https://via.placeholder.com/100"
                }
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  ₹{item.discountedPrice || item.price} × {item.quantity}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-semibold mb-2">Total: ₹{total}</h3>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
