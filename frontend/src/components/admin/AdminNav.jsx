// src/components/AdminNav.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useState ,useEffect} from "react";
import { api } from "../../services/api";

export default function AdminNav() {
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Products", path: "/admin/products" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Agents", path: "/admin/agents" },
    { name: "Tickets", path: "/admin/tickets" },
  ];

  const { admin, logout } = useAdminAuth();
  const nav = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [initials, setInitials] = useState("A");

  useEffect(() => {
    if (!admin?.id) return;
    api.get(`/admins/${admin.id}`)
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
      .catch(() => setInitials("A"));
  }, [admin]);

  const handleLogout = () => {
    logout();
    nav("/admin/login");
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/admins/${admin.id}`);
      logout();
      nav("/admin/login");
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <nav className="admin-nav sticky-nav" role="navigation" aria-label="Admin navigation">
      <div className="brand">
        <span>Admin Panel</span>
        <span className="accent">ITS</span>
      </div>
      <ul className="nav-links" role="menubar">
        {navItems.map(item => (
          <li key={item.path} role="none">
            <NavLink
              to={item.path}
              role="menuitem"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'is-active' : ''}`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {admin && (
        <div className="admin-nav-actions relative">
          <button
            className="admin-avatar-btn"
            aria-haspopup="true"
            aria-expanded={openMenu}
            onClick={() => setOpenMenu(o => !o)}
          >
            {initials}
          </button>
          {openMenu && (
            <div className="admin-menu" role="menu">
              <NavLink
                to="/admin/profile"
                role="menuitem"
                onClick={() => setOpenMenu(false)}
              >
                Update Profile
              </NavLink>
              <button onClick={handleLogout} role="menuitem">Logout</button>
              <button
                className="danger"
                role="menuitem"
                onClick={() => { setOpenMenu(false); setShowDeletePopup(true); }}
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      )}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="card p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--dark-gray)' }}>
              Do you want to delete your account?
            </h2>
            <div className="flex justify-center space-x-4">
              <button className="btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleDeleteAccount}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
