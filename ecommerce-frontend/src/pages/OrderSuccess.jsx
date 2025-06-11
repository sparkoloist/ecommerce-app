import { useSearchParams, Link } from "react-router-dom";

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed!
      </h1>
      <p className="text-gray-700 mb-4">
        Thank you for shopping with us. Your order has been placed successfully.
      </p>

      {orderId && (
        <p className="text-sm text-gray-500 mb-6">
          Your order ID is{" "}
          <span className="font-mono text-blue-700">{orderId}</span>
        </p>
      )}

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </Link>
      <Link
        to="/admin/orders"
        className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 mt-4"
      >
        View Admin Orders
      </Link>
    </div>
  );
}
