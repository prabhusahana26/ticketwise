// src/pages/admin/Agent.jsx
import { useNavigate } from "react-router-dom";
import AdminNav from "../../../components/admin/AdminNav";

export default function Agent() {
  const navigate = useNavigate();

  const options = [
    { key: 'create', title: "Create Agent", desc: "Add a new agent to the platform", path: "/admin/agents/create", tag: "Create" },
    { key: 'list', title: "View Agents", desc: "Browse all registered agents", path: "/admin/agents/view", tag: "Browse" },
    { key: 'view-one', title: "View Agent by ID", desc: "Lookup a specific agent record", path: "/admin/agents/view-by-id", tag: "Lookup" },
    { key: 'tickets', title: "View Agent Tickets by ID", desc: "Inspect tickets assigned to an agent", path: "/admin/agents/tickets", tag: "Tickets" },
    { key: 'delete', title: "Delete Agent by ID", desc: "Remove an agent account safely", path: "/admin/agents/delete", tag: "Delete" },
  ];

  return (
    <div>
      <AdminNav />
      <div className="page-wrapper">
        <div className="stack-md" style={{textAlign:'center'}}>
          <h1 className="page-title">Manage Agents</h1>
          <p className="subtitle">Administrative actions for agent lifecycle and workload visibility.</p>
        </div>
        <div className="manage-grid mt-8">
          {options.map((o) => (
            <div key={o.key} className="manage-card" onClick={() => navigate(o.path)} role="button" tabIndex={0} onKeyDown={(e) => e.key==='Enter' && navigate(o.path)}>
              <div className="manage-icon" aria-hidden>{o.tag.slice(0,2).toUpperCase()}</div>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <div className="manage-meta"><span>{o.tag}</span><span className="tag">GO</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
