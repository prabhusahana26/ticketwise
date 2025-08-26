// src/pages/admin/Customer.jsx
import { useNavigate } from "react-router-dom";
import AdminNav from "../../../components/admin/AdminNav";

export default function Customer() {
  const navigate = useNavigate();

  const options = [
    { key:'list', title: "View Customers", desc: "Browse all customer accounts", path: "/admin/customers/view", tag: "Browse" },
    { key:'view-one', title: "View Customer by ID", desc: "Lookup a specific customer record", path: "/admin/customers/view-by-id", tag: "Lookup" },
    { key:'delete', title: "Delete Customer by ID", desc: "Remove a customer record when required", path: "/admin/customers/delete", tag: "Delete" },
  ];

  return (
    <div>
      <AdminNav />
      <div className="page-wrapper">
        <div className="stack-md" style={{textAlign:'center'}}>
          <h1 className="page-title">Manage Customers</h1>
          <p className="subtitle">Customer catalogue access and individual record administration.</p>
        </div>
        <div className="manage-grid mt-8">
          {options.map(o => (
            <div key={o.key} className="manage-card" onClick={() => navigate(o.path)} role="button" tabIndex={0} onKeyDown={(e)=> e.key==='Enter' && navigate(o.path)}>
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
