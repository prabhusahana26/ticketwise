import { Link, useNavigate } from "react-router-dom";
import { useAgent } from "../../context/AgentContext";   // 👈 similar to CustomerContext
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function AgentNav() {
  const { agent, logoutAgent } = useAgent();  // 👈 assumes agent object has id + name
  const nav = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [initials, setInitials] = useState("A"); // default fallback
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Fetch agent name for initials
  useEffect(() => {
    if (!agent?.id) return;
    api.get(`/agents/${agent.id}`)
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
  }, [agent]);

  const handleLogout = () => {
    logoutAgent();
    nav("/agent/login");
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/agents/${agent.id}`);
      logoutAgent();
      nav("/agent/login");
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 p-4">
        <div className="space-x-4">
          <Link to="/agent/dashboard" className="font-semibold">Dashboard</Link>
          <Link to="/agent/tickets" className="text-blue-600">View Tickets</Link>
        </div>

        {agent ? (
          <div className="relative">
            <button
              className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {initials}
            </button>
            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded border z-10">
                <Link
                  to="/agent/profile/"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpenMenu(false)}
                >
                  Update Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setOpenMenu(false);
                    setShowDeletePopup(true);
                  }}
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/agent/login"
            className="bg-black text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Do you want to delete your account?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={handleDeleteAccount}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
