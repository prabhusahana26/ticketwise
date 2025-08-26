import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../services/api";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customerId, setCustomerId] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const location = useLocation();

  const [justLoggedIn, setJustLoggedIn] = useState(false); //new


    // ✅ Reset justLoggedIn after a short delay
    useEffect(() => {
      if (justLoggedIn) {
        const timer = setTimeout(() => setJustLoggedIn(false), 100);
        return () => clearTimeout(timer);
      }
    }, [justLoggedIn]);

  // Helper logout
  const logoutCustomer = () => {
    localStorage.removeItem("customerId");
    localStorage.removeItem("customerEmail");
    localStorage.removeItem("customerName");
    localStorage.removeItem("customerPhone");
    setCustomerId(null);
    setCustomerData(null);
    // Only redirect away if currently on a customer-facing route to avoid interfering with admin session
    const p = location.pathname;
    if (p.startsWith('/customer') || p.startsWith('/tickets') || p.startsWith('/products')) {
      nav('/', { replace: true });
    }
  };

  // Initial load: fetch user from saved ID
  useEffect(() => {
    const savedId = localStorage.getItem("customerId");
    if (savedId) {
      const id = parseInt(savedId, 10);
      api.get(`/customers/${id}`)
        .then(res => {
          if (res.data?.id) {
            setCustomerId(id);
            setCustomerData(res.data);

            // Save snapshot in localStorage
            localStorage.setItem("customerEmail", res.data.email);
            localStorage.setItem("customerName", res.data.name);
            localStorage.setItem("customerPhone", res.data.phone || "");
          } else {
            logoutCustomer();
          }
        })
        .catch(() => logoutCustomer())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Check profile changes on interaction and route changes
  useEffect(() => {
    if (!customerId || justLoggedIn) return; // skip immediately after login
    const checkProfile = async () => {
      // if (!customerId) return;
      

      try {
        const res = await api.get(`/customers/${customerId}`);
        const updated = res.data;

        const savedEmail = localStorage.getItem("customerEmail");
        const savedName = localStorage.getItem("customerName");
        const savedPhone = localStorage.getItem("customerPhone") || "";

        if (
          updated.email !== savedEmail ||
          updated.name !== savedName ||
          (updated.phone || "") !== savedPhone
        ) {
          logoutCustomer();
        } else {
          setCustomerData(updated); // update local state if nothing changed
        }
      } catch {
        logoutCustomer();
      }
    };



    // Run on clicks & keydowns
    window.addEventListener("click", checkProfile);
    window.addEventListener("keydown", checkProfile);

    // Run on route change (back/forward buttons)
    checkProfile(); // also check immediately on route change
  }, [customerId, location]);

  // Login function
  const loginAsCustomer = (customer) => {
    setCustomerId(customer.id);
    setCustomerData(customer);

    localStorage.setItem("customerId", customer.id);
    localStorage.setItem("customerEmail", customer.email);
    localStorage.setItem("customerName", customer.name);
    localStorage.setItem("customerPhone", customer.phone || "");

    setJustLoggedIn(true); // skip profile check for now //new
  };

  if (loading) return <div className="p-6 text-center">Checking session...</div>;

  return (
    <CustomerContext.Provider value={{ customerId, customerData, loginAsCustomer, logoutCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomer = () => useContext(CustomerContext);
