// AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();

  if (loading) return <div>Loading...</div>; // wait until context is ready
  if (!admin) return <Navigate to="/admin/login" />; // redirect if not logged in

  return children;
}