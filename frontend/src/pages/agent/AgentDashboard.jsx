import AgentNav from "../../components/agent/AgentNav"; // create a nav for agent similar to CustomerNav
import { useTickets } from "../../context/TicketsContext"; // assuming TicketsContext can fetch all tickets
import KpiCard from "../../components/KpiCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAgent } from "../../context/AgentContext";
import { api } from "../../services/api";

export default function AgentDashboard() {
  const { agent } = useAgent(); // get logged-in agent info
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({ total: 0, pending: 0, resolved: 0 });

  useEffect(() => {
    if (agent) fetchTickets();
  }, [agent]);

  const fetchTickets = async () => {
    try {
      const response = await api.get(`/agents/${agent.id}/tickets`);
      const data = response.data;
      setTickets(data);
      setKpis({
        total: data.length,
        pending: data.filter((t) => t.status !== "closed").length,
        resolved: data.filter((t) => t.status === "closed").length,
      });
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AgentNav />
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard title="Tickets Assigned" value={kpis.total} color="bg-blue-600" />
          <KpiCard title="Pending" value={kpis.pending} color="bg-yellow-600" />
          <KpiCard title="Resolved" value={kpis.resolved} color="bg-green-600" />
        </div>

        <div className="flex gap-4">
          <Link to="/agent/tickets" className="bg-gray-800 text-white px-4 py-2 rounded">
            View All Tickets
          </Link>
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-6 mb-2">Recent Tickets</h2>
          {loading ? (
            <div>Loading…</div>
          ) : tickets.length === 0 ? (
            <div className="text-gray-600">No tickets assigned yet.</div>
          ) : (
            <ul className="space-y-2">
              {tickets.slice(0, 5).map((t) => (
                <li key={t.id} className="p-3 border rounded flex justify-between">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-sm text-gray-600">#{t.id} • {t.status}</div>
                  </div>
                  <Link to={`/agent/tickets/${t.id}`} className="text-blue-600">
                    Open
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
