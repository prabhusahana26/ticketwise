// src/pages/admin/ViewAgentById.jsx
import { useState } from "react";
import AdminNav from "../../../components/admin/AdminNav";
import { api } from "../../../services/api";

export default function ViewAgentById() {
  const [agentId, setAgentId] = useState("");
  const [agent, setAgent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAgent(null);

    if (!agentId) return setError("Please enter an Agent ID");

    setLoading(true);
    try {
      const res = await api.get(`/agents/${agentId}`); // GET /agents/{id}
      setAgent(res.data);
    } catch (err) {
      setError("Agent not found");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <AdminNav />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          View Agent by ID
        </h1>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <input
            type="number"
            placeholder="Enter Agent ID"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="flex-1 border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-indigo-700 transition transform hover:scale-105 duration-200"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>}

        {agent && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 hover:shadow-indigo-300 transition transform hover:scale-105 duration-200">
            <h2 className="text-xl font-semibold mb-2">
              <span className="font-medium text-gray-600">Name: </span>
              {agent.name}
            </h2>
            <p className="mb-1">
              <span className="font-medium text-gray-600">Email: </span>
              {agent.email}
            </p>
            <p className="mb-1">
              <span className="font-medium text-gray-600">Phone: </span>
              {agent.phone || "N/A"}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              <span className="font-medium">ID: </span>{agent.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
