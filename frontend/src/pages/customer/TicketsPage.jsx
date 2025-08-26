import CustomerNav from "../../components/customer/CustomerNav";
import { useTickets } from "../../context/TicketsContext";
import TicketRow from "../../components/TicketRow";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../services/api";

export default function TicketsPage() {
  const { tickets, loading, fetchTickets, removeTicket } = useTickets();
  const location = useLocation();
  const [toast, setToast] = useState("");

  // Bulk delete states
  const [selectMode, setSelectMode] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);


// Auto-hide toast for 5 seconds whenever it changes
useEffect(() => {
  if (!toast) return; // do nothing if toast is empty
  const timer = setTimeout(() => setToast(""), 5000);
  return () => clearTimeout(timer); // cleanup if toast changes before 5s
}, [toast]);


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
        removeTicket(id);
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
      <CustomerNav />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Tickets</h1>
  
          {/* Show select/delete buttons only if there are tickets */}
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
        ) : tickets.length === 0 ? (
          <div className="text-gray-600">No tickets yet.</div>
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
                    {/* <TicketRow t={t} /> */}
                    <TicketRow t={t} basePath="/tickets" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
  
      {/* Bulk Delete Popup */}
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