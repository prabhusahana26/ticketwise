// src/pages/admin/Tickets.jsx
import { useNavigate } from "react-router-dom";
import AdminNav from "../../../components/admin/AdminNav";

export default function Tickets() {
  const navigate = useNavigate();
  const options = [
    { key:'all', title: "View All Tickets", desc: "Browse, filter and review all tickets", path: "/admin/view-tickets", tag: "Browse" },
    { key:'by-id', title: "View Ticket by ID", desc: "Quickly locate a specific ticket", path: "/admin/view-ticket-by-id", tag: "Lookup" },
  ];

  return (
    <div>
      <AdminNav />
      <div className="page-wrapper">
        <div className="stack-md" style={{textAlign:'center'}}>
          <h1 className="page-title">Ticket Management</h1>
          <p className="subtitle">Access system-wide ticket queues and direct lookup utilities.</p>
        </div>
        <div className="manage-grid mt-8">
          {options.map(o => (
            <div key={o.key} className="manage-card" onClick={()=> navigate(o.path)} role="button" tabIndex={0} onKeyDown={(e)=> e.key==='Enter' && navigate(o.path)}>
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
