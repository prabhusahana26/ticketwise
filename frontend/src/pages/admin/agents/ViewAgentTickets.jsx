// src/pages/admin/ViewAgentTickets.jsx
import { useState } from "react";
import AdminNav from "../../../components/admin/AdminNav";
import { api } from "../../../services/api";

export default function ViewAgentTickets() {
  const [agentId, setAgentId] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTickets([]);

    if (!agentId) return setError("Please enter an Agent ID");

    setLoading(true);
    try {
      const res = await api.get(`/agents/${agentId}/tickets`); // GET tickets for agent
      setTickets(res.data);
      if (res.data.length === 0) setError("No tickets found for this agent");
    } catch (err) {
      setError("Failed to fetch tickets");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <AdminNav />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
          View Agent Tickets by ID
        </h1>

        {/* Agent ID Input */}
        <form onSubmit={handleSubmit} className="mb-6 flex gap-2 justify-center">
          <input
            type="number"
            placeholder="Enter Agent ID"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="flex-1 max-w-xs border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-indigo-700 transition transform hover:scale-105 duration-200"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-600 mb-6 text-center font-semibold">{error}</p>}

        {/* Tickets Grid */}
        {tickets.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-3xl shadow-2xl p-6 hover:shadow-indigo-300 transition transform hover:scale-105 duration-200"
              >
                <h2 className="text-xl font-semibold mb-2 text-indigo-600">
                  <span>Title: </span>{ticket.title || "Untitled Ticket"}
                </h2>
                <p className="mb-1">
                  <span className="font-medium text-gray-600">Ticket Decription: </span>
                  {ticket.description}
                </p>
                <p className="mb-1">
                  <span className="font-medium text-gray-600">Ticket ID: </span>
                  {ticket.id}
                </p>
                <p className="mb-1">
                  <span className="font-medium text-gray-600">Status: </span>
                  <span
                    className={`font-semibold ${
                      ticket.status === "open"
                        ? "text-green-600"
                        : ticket.status === "in-progress"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </p>
                <p className="mb-1">
                  <span className="font-medium text-gray-600">Priority: </span>
                  {ticket.priority || "N/A"}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  <span className="font-medium">Created At: </span>
                  {new Date(ticket.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
