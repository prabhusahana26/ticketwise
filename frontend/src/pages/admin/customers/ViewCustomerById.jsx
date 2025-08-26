// src/pages/admin/ViewCustomerById.jsx
import { useState } from "react";
import AdminNav from "../../../components/admin/AdminNav";
import { api } from "../../../services/api";

export default function ViewCustomerById() {
  const [customerId, setCustomerId] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCustomer(null);

    if (!customerId) return setError("Please enter a Customer ID");

    try {
      const res = await api.get(`/customers/${customerId}`); // GET /customers/{id}
      setCustomer(res.data);
    } catch (err) {
      setError("Customer not found");
      console.error(err);
    }
  };

  return (
    <div style={{ background:'var(--background-gray)', minHeight:'100vh' }}>
      <AdminNav />
      <div className="page-wrapper detail-shell">
        <div className="detail-header">
          <span className="detail-sub">Customer Lookup</span>
          <h1 className="detail-title">View Customer by ID</h1>
        </div>
        <form onSubmit={handleSubmit} className="detail-search" role="search" aria-label="Search customer by ID">
          <input
            type="number"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            aria-label="Customer ID"
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>
        {error && <div className="error-inline" role="alert">{error}</div> }
        {customer ? (
          <div className="detail-panel" aria-live="polite">
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'.75rem'}}>
              <h2 style={{fontSize:'1.05rem', fontWeight:600, color:'var(--dark-gray)', margin:0}}>{customer.name}<span className="data-badge">ID {customer.id}</span></h2>
              <span style={{fontSize:'.65rem', letterSpacing:'1px', fontWeight:600, color:'var(--medium-gray)', textTransform:'uppercase'}}>Customer Record</span>
            </div>
            <div className="detail-grid">
              <div className="kv"><span className="label">Email</span><span className="value">{customer.email}</span></div>
              <div className="kv"><span className="label">Phone</span><span className="value">{customer.phone || 'N/A'}</span></div>
              <div className="kv"><span className="label">Status</span><span className="value">Active</span></div>
            </div>
          </div>
        ) : (
          <div className="empty-state">Enter an ID above to retrieve customer details.</div>
        )}
      </div>
    </div>
  );
}
