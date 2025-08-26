import { Navigate, useLocation } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

export default function RedirectIfLoggedIn({ children }) {
  const { customerId } = useCustomer();
  const location = useLocation();

  if (customerId) {
    // replace current history entry so forward/back doesn't allow login page
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
