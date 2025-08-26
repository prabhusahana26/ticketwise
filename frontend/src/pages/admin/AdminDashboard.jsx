// src/pages/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const cards = [
    { key: 'products', title: 'Products', desc: 'Create, update, and manage products', path: '/admin/products', tag: 'Manage' },
    { key: 'customers', title: 'Customers', desc: 'View and manage customer accounts', path: '/admin/customers', tag: 'Accounts' },
    { key: 'agents', title: 'Agents', desc: 'Add and manage support agents', path: '/admin/agents', tag: 'Staff' },
    { key: 'tickets', title: 'Tickets', desc: 'Monitor and manage all tickets', path: '/admin/tickets', tag: 'Queue' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--background-gray)', minHeight: '100vh' }}>
      <AdminNav />
      <div className="page-wrapper">
        <header className="stack-md" style={{textAlign:'center'}}>
          <h1 className="page-title" style={{ color: 'var(--dark-gray)' }}>Admin Dashboard</h1>
          <p className="subtitle" style={{ maxWidth: '60ch', marginInline:'auto' }}>Central operations overview. Use the modules below to administer catalogue, users, workforce and ticket flow.</p>
        </header>
        <section className="section">
          <div className="manage-grid">
            {cards.map(c => (
              <div key={c.key} className="manage-card" role="button" tabIndex={0} onClick={()=> navigate(c.path)} onKeyDown={(e)=> e.key==='Enter' && navigate(c.path)}>
                <div className="manage-icon" aria-hidden>{c.tag.slice(0,2).toUpperCase()}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="manage-meta"><span>{c.tag}</span><span className="tag">GO</span></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
