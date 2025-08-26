// src/pages/admin/ViewTickets.jsx
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";
import { motion } from "framer-motion";

export default function ViewTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await api.get("/tickets");
        setTickets(res.data || []);
      } catch (err) {
  setError("Failed to fetch tickets.");
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          All Tickets
        </h1>

        {loading ? (
          <div className="text-center text-lg text-gray-500 animate-pulse">
            Loading tickets...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : tickets.length === 0 ? (
          <div className="text-center text-gray-600">No tickets found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition"
              >
                <div className="flex justify-between items-center mb-4">
                    
                  <span className="text-sm font-mono text-gray-500">
                  Ticket ID: #{t.id}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      t.status === "open"
                        ? "bg-green-100 text-green-700"
                        : t.status === "closed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Title: {t.title || "Untitled Ticket"}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  <span>Description: </span>{t.description || "No description provided."}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                  <p>
                    <span className="font-semibold">Customer:</span>{" "}
                    {t.customer_id || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Agent:</span>{" "}
                    {t.agent_id || "Unassigned"}
                  </p>
                  <p>
                    <span className="font-semibold">Priority:</span>{" "}
                    <span
                      className={`font-bold ${
                        t.priority === "high"
                          ? "text-red-600"
                          : t.priority === "medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {t.priority || "Normal"}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Created:</span>{" "}
                    {new Date(t.created_at).toLocaleDateString()}
                  </p>
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
