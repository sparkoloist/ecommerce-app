import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute({ children }) {
  const { user } = useUser();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
