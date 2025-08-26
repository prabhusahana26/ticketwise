import CustomerNav from "../../components/customer/CustomerNav";
import { useTickets } from "../../context/TicketsContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function CustomerDashboard() {
  const { kpis, tickets, loading, fetchTickets } = useTickets();

  useEffect(() => { fetchTickets(); }, []);

  const safeKpis = { total: kpis?.total || 0, pending: kpis?.pending || 0, resolved: kpis?.resolved || 0 };
  const recent = tickets.slice(0,5);

  return (
    <div style={{ background:'var(--background-gray)', minHeight:'100vh' }}>
      <CustomerNav />
      <div className="page-wrapper" style={{ paddingTop:'2rem' }}>
        <header style={{ textAlign:'center', maxWidth:'720px', margin:'0 auto 1.2rem' }} className="stack-md">
          <h1 className="page-title" style={{ marginBottom: '.35rem' }}>Customer Dashboard</h1>
          <p className="subtitle" style={{ maxWidth:'56ch', marginInline:'auto' }}>Track your tickets, raise new issues and monitor resolution progress.</p>
        </header>

        {/* KPI Cards */}
        <div className="kpi-grid">
          <div className="kpi-card"><span className="label">Tickets Raised</span><span className="value">{safeKpis.total}</span></div>
          <div className="kpi-card"><span className="label">Pending</span><span className="value">{safeKpis.pending}</span></div>
            <div className="kpi-card"><span className="label">Resolved</span><span className="value">{safeKpis.resolved}</span></div>
        </div>

        {/* Actions */}
        <div className="actions-row">
          <button onClick={()=> window.location.href='/tickets/new'} className="action-btn primary">Raise New Ticket</button>
          <button onClick={()=> window.location.href='/tickets'} className="action-btn secondary">View All My Tickets</button>
          <button onClick={()=> window.location.href='/products'} className="action-btn secondary" style={{flexBasis:'100%'}}>Browse Products</button>
        </div>

        {/* Recent Tickets */}
        <div className="recent-panel">
          <header>
            <h2 style={{fontSize:'1.05rem', fontWeight:600, color:'var(--dark-gray)', margin:0}}>Recent Tickets</h2>
            <Link to="/tickets" className="btn-secondary" style={{padding:'.45rem .9rem', fontSize:'.7rem'}}>View All</Link>
          </header>
          {loading ? (
            <div className="ticket-list">
              {[...Array(3)].map((_,i)=>(<div key={i} className="skeleton" />))}
            </div>
          ) : recent.length === 0 ? (
            <div className="empty-mini">No tickets yet. Use "Raise New Ticket" to create your first.</div>
          ) : (
            <ul className="ticket-list">
              {recent.map(t => {
                const statusClass = t.status === 'open' ? 'status-open' : t.status === 'closed' ? 'status-closed' : 'status-pending';
                return (
                  <li key={t.id} className="ticket-item">
                    <div style={{flex:1}}>
                      <div style={{display:'flex', alignItems:'center', gap:'.55rem', flexWrap:'wrap'}}>
                        <span className="ticket-meta"># {t.id}</span>
                        <span className={`status-pill ${statusClass}`}>{t.status}</span>
                      </div>
                      <div style={{fontWeight:600, fontSize:'.9rem', marginTop:'.35rem', color:'var(--dark-gray)'}}>{t.title || 'Untitled Ticket'}</div>
                      <div style={{fontSize:'.65rem', letterSpacing:'.5px', marginTop:'.3rem', color:'var(--medium-gray)'}}>Priority: {t.priority || 'normal'}</div>
                    </div>
                    <Link to={`/tickets/${t.id}`} className="btn-primary" style={{padding:'.55rem .9rem', fontSize:'.65rem'}}>Open</Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
