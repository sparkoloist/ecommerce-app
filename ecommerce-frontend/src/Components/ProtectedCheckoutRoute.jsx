import { Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProtectedCheckoutRoute({ children }) {
  const { cartItems } = useCart();

  // If cart is empty, redirect to home
  if (cartItems.length === 0) {
    return <Navigate to="/" replace />;
  }

  return children;
}
