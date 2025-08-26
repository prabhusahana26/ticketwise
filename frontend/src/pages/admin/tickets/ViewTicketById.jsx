// src/pages/admin/ViewTicketById.jsx
import { useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function ViewTicketById() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTicket = async (e) => {
    if (e) e.preventDefault();
    if (!ticketId.trim()) {
      setError("Please enter a Ticket ID");
      return;
    }
    setLoading(true);
    setError("");
    setTicket(null);
    try {
      const res = await api.get(`/tickets/${ticketId}`);
      setTicket(res.data);
    } catch (err) {
      setError("Ticket not found");
    } finally {
      setLoading(false);
    }
  };

  // Utility badge classes
  const statusClass = (s) => {
    switch (s) {
      case 'open': return 'bg-amber-200 text-amber-900';
      case 'in_progress': return 'bg-sky-200 text-sky-900';
      case 'resolved': return 'bg-emerald-200 text-emerald-900';
      case 'closed': return 'bg-gray-300 text-gray-800';
      default: return 'bg-neutral-200 text-neutral-800';
    }
  };
  const priorityClass = (p) => {
    switch (p) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-200 text-orange-900';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-neutral-200 text-neutral-800';
    }
  };

  return (
    <div style={{ background:'var(--background-gray)', minHeight:'100vh' }}>
      <AdminNav />
      <div className="page-wrapper detail-shell">
        <div className="detail-header">
          <span className="detail-sub">Ticket Lookup</span>
          <h1 className="detail-title">View Ticket by ID</h1>
        </div>
        <form onSubmit={fetchTicket} className="detail-search" role="search" aria-label="Search ticket by ID">
          <input
            type="number"
            placeholder="Enter Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            aria-label="Ticket ID"
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>
        {loading && <div className="info-inline" aria-live="polite">Searching ticket...</div>}
        {error && !loading && <div className="error-inline" role="alert">{error}</div>}
        {ticket ? (
          <div className="detail-panel" aria-live="polite">
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'.75rem'}}>
              <h2 style={{fontSize:'1.05rem', fontWeight:600, color:'var(--dark-gray)', margin:0}}>{ticket.title}<span className="data-badge">ID {ticket.id}</span></h2>
              <span style={{fontSize:'.65rem', letterSpacing:'1px', fontWeight:600, color:'var(--medium-gray)', textTransform:'uppercase'}}>Ticket Record</span>
            </div>
            <div className="detail-grid" style={{marginTop:'.75rem'}}>
              <div className="kv"><span className="label">Status</span><span className="value"><span className={`status-pill ${statusClass(ticket.status)}`}>{ticket.status}</span></span></div>
              <div className="kv"><span className="label">Priority</span><span className="value"><span className={`status-pill ${priorityClass(ticket.priority)}`}>{ticket.priority}</span></span></div>
              <div className="kv"><span className="label">Customer ID</span><span className="value">{ticket.customer_id}</span></div>
              <div className="kv"><span className="label">Product ID</span><span className="value">{ticket.product_id}</span></div>
              <div className="kv"><span className="label">Created</span><span className="value">{new Date(ticket.created_at).toLocaleString()}</span></div>
              <div className="kv"><span className="label">Updated</span><span className="value">{new Date(ticket.updated_at).toLocaleString()}</span></div>
            </div>
            <div style={{marginTop:'1.25rem'}}>
              <h3 style={{fontSize:'.75rem', fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', color:'var(--medium-gray)', marginBottom:'.35rem'}}>Description</h3>
              <p style={{fontSize:'.8rem', lineHeight:1.4, color:'var(--dark-gray)', background:'var(--light-gray)', padding:'.75rem .9rem', borderRadius:'.6rem'}}>{ticket.description || 'No description provided.'}</p>
            </div>
          </div>
        ) : (!loading && !error) ? (
          <div className="empty-state">Enter an ID above to retrieve ticket details.</div>
        ) : null}
      </div>
    </div>
  );
}
