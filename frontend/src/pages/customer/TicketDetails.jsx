import { useEffect, useState } from "react";
import { api } from "../../services/api";
import CustomerNav from"../../components/customer/CustomerNav";
import { useTickets } from "../../context/TicketsContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function TicketDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { removeTicket } = useTickets();
  const [ticket, setTicket] = useState(null);
  const [err, setErr] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [toast, setToast] = useState("");
  const location = useLocation(); // ✅ Add this


  // Handle toast from navigation (update/delete)
useEffect(() => {
  if (location.state?.toastMessage) {
    setToast(location.state.toastMessage);
 // Clear navigation state so toast does not reappear on refresh
 window.history.replaceState({}, document.title);
    const timer = setTimeout(() => setToast(""), 5000);
    return () => clearTimeout(timer);
  }
 
}, [location.state?.toastMessage]);

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then(res => setTicket(res.data))
      .catch(e => setErr(e?.response?.data?.detail || "Failed to load ticket"));
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/tickets/${id}`);
      removeTicket(id);

      // ✅ Redirect immediately with toast message via state
      nav("/tickets", { state: { toastMessage: `Ticket #${id} deleted successfully` } });

    } catch (err) {
      console.error(err);
      alert("Failed to delete ticket. Try again."); // fallback toast
    }
  };


  // Add this function inside your TicketDetails component
const handleApprove = async () => {
  try {
    const res = await api.put(`/tickets/${id}`, {
      ...ticket,
      status: "closed",
    });
    setTicket(res.data); // update local state
    setToast(`Ticket #${id} approved and closed successfully`);

    // Hide toast after 5 seconds
    setTimeout(() => setToast(""), 5000);
  } catch (err) {
    console.error(err);
    alert("Failed to approve ticket. Try again.");
  }
};

  const handleUpdate = () => {
    nav(`/tickets/new`, { state: { ticket } });
  };

  if (err) return <div className="p-6 text-red-600">{err}</div>;
  if (!ticket) return <div className="p-6">Loading…</div>;


  return (
    <div>
      <CustomerNav />
      <div className="p-6 max-w-3xl mx-auto">
        <button className="mb-3 text-blue-600" onClick={() => nav(-1)}>← Back</button>
        <h1 className="text-2xl font-bold">{ticket.title}</h1>
        <div className="text-sm text-gray-600">#{ticket.id} • {ticket.status} • Priority: {ticket.priority}</div>
        <p className="mt-4">{ticket.description}</p>
        <div className="mt-2 text-sm text-gray-600">
          Product ID: {ticket.product_id} • Agent: {ticket.agent_id ?? "TBD"}
        </div>
  
        <div className="mt-4 flex gap-3">
          {(ticket.status === "assigned" || ticket.status === "in_progress") && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleUpdate}
            >
              Update Ticket
            </button>
          )}
          {(["assigned", "in_progress", "closed","pending_customer"].includes(ticket.status)) && (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={() => setShowDeletePopup(true)}
            >
              Delete Ticket
            </button>
          )}

            {/* ✅ Approve Ticket Button */}
  <button
    className={`px-4 py-2 rounded text-white ${ticket.status === "pending_customer" ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
    onClick={handleApprove}
    disabled={ticket.status !== "pending_customer"}
  >
    {ticket.status === "closed" ? "Ticket Approved" : "Approve Ticket"}
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
  
      {/* ✅ Toast Message */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
