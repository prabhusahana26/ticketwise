// src/components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

export default function RequireAuth({ children }) {
  const { customerId } = useCustomer();
  const location = useLocation();

  if (!customerId) {
    // Redirect to login if not authenticated
  return <Navigate to="/customer-login" replace state={{ from: location }} />;
  }

  return children;
}
