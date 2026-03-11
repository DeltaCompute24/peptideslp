import React, { useState } from 'react';
import Head from 'next/head';

export default function AdminLeads() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError('Invalid password');
        setLoading(false);
        return;
      }

      const data = await res.json();
      setLeads(data.leads);
      setTotal(data.total);
      setAuthenticated(true);
    } catch (err) {
      setError('Failed to connect');
    }
    setLoading(false);
  };

  const filteredLeads = filter === 'all'
    ? leads
    : leads.filter(l => l.lang === filter || l.source?.includes(filter));

  const exportCSV = () => {
    const headers = ['Name', 'WhatsApp', 'Source', 'Language', 'Date'];
    const rows = filteredLeads.map(l => [
      l.name,
      l.whatsapp,
      l.source || '',
      l.lang || '',
      new Date(l.capturedAt).toLocaleString(),
    ]);

    const csv = [headers, ...rows].map(r => r.map(c => `"${(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biosync-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: leads.length,
    today: leads.filter(l => l.capturedAt?.startsWith(new Date().toISOString().split('T')[0])).length,
    pt: leads.filter(l => l.lang === 'pt').length,
    en: leads.filter(l => l.lang === 'en').length,
  };

  return (
    <>
      <Head>
        <title>Lead Admin | BioSync</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: '"DM Sans", sans-serif', color: '#e2e8f0' }}>
        {!authenticated ? (
          /* Login */
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <form onSubmit={handleLogin} style={{ width: 340, padding: '2rem', background: 'rgba(255,255,255,0.04)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ color: '#0d9488', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>BIOSYNC ADMIN</div>
                <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Lead Dashboard</h1>
              </div>

              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                style={{
                  width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '0.5rem', color: '#fff', fontSize: '0.95rem',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />

              {error && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{error}</div>}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '0.75rem',
                  background: 'linear-gradient(135deg, #0d9488, #10b981)',
                  color: '#fff', border: 'none', borderRadius: '0.5rem',
                  fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
                }}
              >
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard */
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ color: '#0d9488', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em' }}>BIOSYNC ADMIN</div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.25rem 0 0' }}>Lead Dashboard</h1>
              </div>
              <button
                onClick={exportCSV}
                style={{
                  padding: '0.6rem 1.25rem', background: 'rgba(13,148,136,0.15)',
                  border: '1px solid rgba(13,148,136,0.3)', borderRadius: '0.5rem',
                  color: '#0d9488', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Export CSV
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                ['Total Leads', stats.total, '#0d9488'],
                ['Today', stats.today, '#10b981'],
                ['Portuguese', stats.pt, '#6366f1'],
                ['English', stats.en, '#f59e0b'],
              ].map(([label, count, color]) => (
                <div key={label} style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ color: '#5a6a7a', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.25rem' }}>{label}</div>
                  <div style={{ color, fontSize: '1.5rem', fontWeight: 700 }}>{count}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {[
                ['all', 'All'],
                ['pt', 'Portuguese'],
                ['en', 'English'],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  style={{
                    padding: '0.4rem 0.85rem', borderRadius: '2rem', border: 'none',
                    background: filter === val ? '#0d9488' : 'rgba(255,255,255,0.06)',
                    color: filter === val ? '#fff' : '#8896a7',
                    fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {label} {val !== 'all' && `(${leads.filter(l => l.lang === val).length})`}
                </button>
              ))}
            </div>

            {/* Table */}
            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {['#', 'Name', 'WhatsApp', 'Source', 'Lang', 'Date'].map(h => (
                        <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#5a6a7a', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#5a6a7a' }}>
                          No leads yet. Share your link to start capturing!
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', color: '#5a6a7a' }}>{i + 1}</td>
                          <td style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', fontWeight: 600 }}>{lead.name}</td>
                          <td style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                            <a
                              href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#25D366', textDecoration: 'none' }}
                            >
                              {lead.whatsapp}
                            </a>
                          </td>
                          <td style={{ padding: '0.6rem 1rem', fontSize: '0.75rem', color: '#8896a7' }}>{lead.source || '-'}</td>
                          <td style={{ padding: '0.6rem 1rem' }}>
                            <span style={{
                              fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: '1rem',
                              background: lead.lang === 'pt' ? 'rgba(99,102,241,0.15)' : 'rgba(245,158,11,0.15)',
                              color: lead.lang === 'pt' ? '#818cf8' : '#fbbf24',
                            }}>
                              {lead.lang === 'pt' ? 'PT' : 'EN'}
                            </span>
                          </td>
                          <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', color: '#8896a7', whiteSpace: 'nowrap' }}>
                            {lead.capturedAt ? new Date(lead.capturedAt).toLocaleString() : '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem', color: '#3a4a5a', fontSize: '0.75rem' }}>
              Showing {filteredLeads.length} of {total} leads
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        input:focus {
          border-color: rgba(13,148,136,0.5) !important;
        }
        input::placeholder {
          color: #5a6a7a;
        }
        tr:hover {
          background: rgba(255,255,255,0.02);
        }
      `}</style>
    </>
  );
}
