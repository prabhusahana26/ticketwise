// src/pages/admin/DeleteAgentById.jsx
import { useState } from "react";
import AdminNav from "../../../components/admin/AdminNav";
import { api } from "../../../services/api"; // Use api directly

export default function DeleteAgentById() {
  const [agentId, setAgentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!agentId) return setError("Please enter an Agent ID");

    if (!confirm(`Are you sure you want to delete agent ID ${agentId}?`)) return;

    setLoading(true);
    try {
      // Use api.delete directly
      await api.delete(`/agents/${agentId}`);
  setMessage(`Agent ${agentId} deleted successfully.`);
      setAgentId("");
    } catch (err) {
  setError(err?.response?.data?.detail || "Failed to delete agent.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-pink-50">
      <AdminNav />
      <div className="flex justify-center items-center py-12 px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center text-red-600">
            Delete Agent
          </h1>

          <form onSubmit={handleDelete} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Agent ID *
              </label>
              <input
                type="number"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="Enter Agent ID"
                className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition transform hover:scale-105 duration-200"
            >
              {loading ? "Deleting..." : "Delete Agent"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-green-600 font-semibold text-center">{message}</p>
          )}
          {error && (
            <p className="mt-4 text-red-600 font-semibold text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
