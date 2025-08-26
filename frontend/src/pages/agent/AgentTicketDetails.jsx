import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { api } from "../../services/api";
import AgentNav from "../../components/agent/AgentNav";
import { useTickets } from "../../context/TicketsContext";

export default function AgentTicketDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const { removeTicket } = useTickets();

  const [ticket, setTicket] = useState(null);
  const [err, setErr] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [toast, setToast] = useState("");

  // Handle toast passed from navigation
  useEffect(() => {
    if (location.state?.toastMessage) {
      setToast(location.state.toastMessage);
      window.history.replaceState({}, document.title); // prevent repeat on refresh
      const timer = setTimeout(() => setToast(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.toastMessage]);

  // Fetch ticket details
  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then(res => setTicket(res.data))
      .catch(e => setErr(e?.response?.data?.detail || "Failed to load ticket"));
  }, [id]);

  // Delete handler
  const handleDelete = async () => {
    try {
      await api.delete(`/tickets/${id}`);
      removeTicket(id);
      nav("/agent/tickets", { state: { toastMessage: `Ticket #${id} deleted successfully` } });
    } catch (err) {
      console.error(err);
      alert("Failed to delete ticket. Try again.");
    }
  };

  // Resolve handler
  const handleResolve = async () => {
    try {
      const res = await api.put(`/tickets/${id}`, {
        ...ticket,
        status: "pending_customer",
      });
      setTicket(res.data);
      setToast(`Ticket #${id} resolved successfully`);
      setTimeout(() => setToast(""), 5000);
    } catch (err) {
      console.error(err);
      alert("Failed to resolve ticket. Try again.");
    }
  };

  if (err) return <div className="p-6 text-red-600">{err}</div>;
  if (!ticket) return <div className="p-6">Loading…</div>;

  return (
    <div>
      <AgentNav />
      <div className="p-6 max-w-3xl mx-auto">
        <button className="mb-3 text-blue-600" onClick={() => nav(-1)}>← Back</button>
        <h1 className="text-2xl font-bold">{ticket.title}</h1>
        <div className="text-sm text-gray-600">#{ticket.id} • {ticket.status} • Priority: {ticket.priority}</div>
        <p className="mt-4">{ticket.description}</p>
        <div className="mt-2 text-sm text-gray-600">
          Product ID: {ticket.product_id} • Customer: {ticket.customer_id}
        </div>

        <div className="mt-4 flex gap-3">
          {/* Resolve Ticket Button */}
          <button
            className={`px-4 py-2 rounded text-white ${ticket.status !== "closed" ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
            onClick={handleResolve}
            disabled={ticket.status === "closed"}
          >
            {ticket.status === "closed" ? "Ticket Resolved" : "Resolve Ticket"}
          </button>

          {/* Delete Ticket Button */}
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setShowDeletePopup(true)}
          >
            Delete Ticket
          </button>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Do you want to delete this ticket?</h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
