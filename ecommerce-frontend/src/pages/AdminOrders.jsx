import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🔐 Admin: All Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-xl shadow-sm p-4 bg-white"
            >
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-green-700">
                  Order #{order.id}
                </h2>
                <p className="text-sm text-gray-600">
                  👤 {order.name} — {order.email}
                  <br />
                  📞 {order.phone}
                  <br />
                  📍 {order.address}
                </p>
              </div>

              <div className="mb-2">
                <h3 className="font-semibold text-gray-700 mb-1">
                  🧾 Items Ordered:
                </h3>
                <ul className="space-y-1 text-sm text-gray-800">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span>
                        {item.Product?.name} × {item.quantity}
                      </span>
                      <span>
                        ₹
                        {(item.Product?.discountedPrice ||
                          item.Product?.price) * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-sm mt-2 flex justify-between items-center">
                <span className="text-gray-700 font-bold">
                  💰 Total: ₹{order.totalAmount}
                </span>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "shipped"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
