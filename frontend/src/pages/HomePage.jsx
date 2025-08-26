import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const portals = [
    {
      key: 'customer',
      title: 'Customer Portal',
      desc: 'Submit tickets, track issues, and receive support.',
      actions: [
        { label: 'Customer Login', type: 'primary', to: '/customer-login' },
        { label: 'Create Customer Account', type: 'secondary', to: '/customer-register' }
      ],
      icon: (
        <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      )
    },
    {
      key: 'agent',
      title: 'Agent Portal',
      desc: 'Work triage queues, resolve tickets, update statuses.',
      actions: [
        { label: 'Agent Login', type: 'primary', to: '/agent/login' }
      ],
      icon: (
        <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
      )
    },
    {
      key: 'admin',
      title: 'Admin Portal',
      desc: 'Configure platform, manage users & view analytics.',
      actions: [
        { label: 'Admin Login', type: 'primary', to: '/admin/login' },
        { label: 'Create Admin Account', type: 'secondary', to: '/admin/register' }
      ],
      icon: (
        <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      )
    }
  ];

  const features = [
    { key: 'fast', title: 'Fast Resolution', desc: 'Prioritised routing & swift assignment for rapid closure.', icon: (<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>) },
    { key: 'support', title: '24/7 Support', desc: 'Always-on availability to keep operations running.', icon: (<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>) },
    { key: 'analytics', title: 'Analytics', desc: 'Actionable metrics & trends for continuous improvement.', icon: (<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>) }
  ];

  return (
    <div style={{ backgroundColor: 'var(--background-gray)' }}>
      <header style={{ padding: '1.4rem 0 0.75rem' }}>
        <div className="page-wrapper" style={{ paddingTop: 0 }}>
          <h1 className="page-title" style={{ fontSize: 'clamp(1.9rem,3.2vw,2.6rem)', marginBottom: '.75rem', color: 'var(--dark-gray)' }}>Issue Tracking System</h1>
          <p className="subtitle" style={{ maxWidth: '60ch' }}>Unified platform for customer issues, agent workflows & administrative oversight.</p>
        </div>
      </header>
      <main className="page-wrapper" style={{ paddingTop: '1.5rem' }}>
        <section className="section">
          <div className="portal-grid">
            {portals.map(p => (
              <div key={p.key} className="portal-card" role="group" aria-labelledby={`portal-${p.key}`}> 
                <div className="portal-icon" aria-hidden>{p.icon}</div>
                <h3 id={`portal-${p.key}`}>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="portal-actions">
                  {p.actions.map(a => (
                    <button key={a.label} onClick={() => navigate(a.to)} className={`${a.type === 'primary' ? 'btn-primary' : 'btn-secondary'} w-full`}>{a.label}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="section" style={{ marginTop: '3.5rem' }}>
          <div className="stack-md" style={{ textAlign:'center', marginBottom: '2.2rem' }}>
            <h2 className="page-title" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', marginBottom: '.25rem' }}>Why Choose Our Platform</h2>
            <p className="subtitle">Operational clarity, faster resolution velocity, measurable outcomes.</p>
          </div>
          <div className="feature-grid">
            {features.map(f => (
              <div key={f.key} className="feature" role="article" aria-labelledby={`feature-${f.key}`}> 
                <div className="feature-icon" aria-hidden>{f.icon}</div>
                <h4 id={`feature-${f.key}`}>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer style={{ marginTop: '4rem', borderTop: '1px solid var(--light-gray)' }}>
        <div className="page-wrapper" style={{ paddingTop: '2.2rem', paddingBottom: '2.2rem', textAlign:'center' }}>
          <p className="subtitle" style={{ fontSize: '.7rem' }}>&copy; 2024 Issue Tracking System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

