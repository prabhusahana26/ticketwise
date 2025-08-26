import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function CustomerNav() {
  const { customerId, logoutCustomer } = useCustomer();
  const nav = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [initials, setInitials] = useState("U"); // default fallback
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Fetch customer name for initials
  useEffect(() => {
    if (!customerId) return;
    api.get(`/customers/${customerId}`)
      .then(res => {
        const name = res.data.name || "";
        const parts = name.trim().split(" ");
        let init = "";
        if (parts.length === 1) {
          init = parts[0][0];
        } else {
          init = parts[0][0] + parts[parts.length - 1][0];
        }
        setInitials(init.toUpperCase());
      })
      .catch(() => setInitials("U"));
  }, [customerId]);

  const handleLogout = () => {
    logoutCustomer();
  // logoutCustomer already navigates to home
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/customers/${customerId}`);
      logoutCustomer();
  // home redirect handled after logout
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="customer-nav" aria-label="Customer navigation">
        <div className="brand">Customer Portal</div>
        <ul className="customer-nav-links">
          <li><Link to={`/customer/${customerId || ''}`} className={isActive(`/customer/${customerId || ''}`) ? 'is-active' : ''}>Dashboard</Link></li>
          <li><Link to="/tickets" className={isActive('/tickets') ? 'is-active' : ''}>My Tickets</Link></li>
        </ul>
        {customerId ? (
          <div className="relative" style={{ position:'relative' }}>
            <button className="customer-avatar-btn" onClick={() => setOpenMenu(!openMenu)} aria-haspopup="true" aria-expanded={openMenu}>{initials}</button>
            {openMenu && (
              <div className="customer-menu" role="menu">
                <Link to="/customer/profile" role="menuitem" onClick={()=> setOpenMenu(false)}>Profile</Link>
                <button onClick={handleLogout} role="menuitem">Logout</button>
                <button className="danger" onClick={()=> { setOpenMenu(false); setShowDeletePopup(true); }} role="menuitem">Delete Account</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/customer-login" className="btn-secondary" style={{padding:'.55rem 1rem', fontSize:'.75rem'}}>Login</Link>
        )}
      </nav>
      {openMenu && <div onClick={()=> setOpenMenu(false)} style={{position:'fixed', inset:0, background:'transparent', zIndex:30}} aria-hidden />}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Delete your account?</h2>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={()=> setShowDeletePopup(false)}>Cancel</button>
              <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={handleDeleteAccount}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
