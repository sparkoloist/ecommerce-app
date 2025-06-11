import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-700">
        🛒 OnlineShop
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link
          to="/cart"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Cart
        </Link>

        <Link
          to="/checkout"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Checkout
        </Link>

        {/*Show this only if user is admin */}
        {user?.role === "admin" && (
          <Link
            to="/admin/orders"
            className="text-purple-700 hover:text-purple-900 font-semibold"
          >
            Admin Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
