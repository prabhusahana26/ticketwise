// src/pages/AgentTicketsPage.jsx
import AgentNav from "../../components/agent/AgentNav";
import { useAgent } from "../../context/AgentContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../services/api";
import TicketRow from "../../components/TicketRow"; // ✅ Reuse same component

export default function AgentTicketsPage() {
  const { agent } = useAgent();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  // Bulk delete
  const [selectMode, setSelectMode] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const location = useLocation();

  // Auto-hide toast after 5s
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Fetch tickets
  const fetchTickets = async () => {
    if (!agent?.id) return;
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/agents/${agent.id}/tickets`);
      setTickets(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    if (location.state?.toastMessage) {
      setToast(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.toastMessage]);

  const toggleSelectTicket = (id) => {
    setSelectedTickets((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    try {
      for (let id of selectedTickets) {
        await api.delete(`/tickets/${id}`);
        setTickets((prev) => prev.filter((t) => t.id !== id));
      }
      setToast(`${selectedTickets.length} ticket(s) deleted successfully`);
      setSelectedTickets([]);
      setShowDeletePopup(false);
      setSelectMode(false);
    } catch (err) {
      console.error(err);
      setToast("Failed to delete selected tickets");
    }
  };

  return (
    <div>
      <AgentNav />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Assigned Tickets</h1>

          {tickets.length > 0 && (
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setSelectMode(!selectMode)}
              >
                {selectMode ? "Cancel Selection" : "Select Ticket(s)"}
              </button>
              {selectMode && (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={() => setShowDeletePopup(true)}
                  disabled={selectedTickets.length === 0}
                >
                  Delete Ticket(s)
                </button>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div>Loading…</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : tickets.length === 0 ? (
          <div className="text-gray-600">No assigned tickets.</div>
        ) : (
          <ul className="space-y-4">
            {tickets.map((t) => (
              <li key={t.id} className="w-full">
                <div className="flex items-center gap-4 w-full">
                  {selectMode && (
                    <input
                      type="checkbox"
                      checked={selectedTickets.includes(t.id)}
                      onChange={() => toggleSelectTicket(t.id)}
                    />
                  )}
                  <div className="w-full">
                    {/* ✅ Same UI as customer */}
                    {/* <TicketRow t={t} /> */}
                    <TicketRow t={t} basePath="/agent/tickets" />

                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Do you want to delete the selected ticket(s)?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleBulkDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
