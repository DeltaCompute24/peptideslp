import React from 'react';
import Head from 'next/head';
import { list } from '@vercel/blob';

const BioSyncLogo = ({ color = '#1B5E20', size = 'default' }) => {
  const sizeMap = { small: { svg: 36, name: '1.3rem', sub: '0.55rem' }, default: { svg: 44, name: '1.6rem', sub: '0.65rem' }, sm: { svg: 36, name: '1.3rem', sub: '0.55rem' }, lg: { svg: 52, name: '2rem', sub: '0.7rem' } };
  const s = sizeMap[size] || sizeMap.default;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      <svg width={s.svg} height={s.svg} viewBox="0 0 100 100" style={{ marginRight: '-2px' }}>
        <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
          <line x1="48" y1="50" x2="80" y2="24"/>
          <line x1="48" y1="50" x2="84" y2="66"/>
          <line x1="48" y1="50" x2="20" y2="18"/>
          <line x1="48" y1="50" x2="14" y2="54"/>
          <line x1="48" y1="50" x2="28" y2="82"/>
        </g>
        <g fill={color}>
          <circle cx="48" cy="50" r="19"/>
          <circle cx="80" cy="24" r="8"/>
          <circle cx="84" cy="66" r="8"/>
          <circle cx="20" cy="18" r="7"/>
          <circle cx="14" cy="54" r="7"/>
          <circle cx="28" cy="82" r="8"/>
        </g>
      </svg>
      <div>
        <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: s.name, fontWeight: 700, color, letterSpacing: '0.01em', lineHeight: 1.1 }}>BioSync</div>
        <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: s.sub, fontWeight: 600, color, letterSpacing: '0.32em', lineHeight: 1.2, marginTop: '0px', opacity: 0.8, textAlign: 'right' }}>PEPTIDES</div>
      </div>
    </div>
  );
};

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayLabels = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' };

export default function ProtocolPage({ protocol, error }) {
  if (error) {
    return (
      <>
        <Head><title>Protocol Not Found | BioSync Peptides</title></Head>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0c1929 0%, #122438 50%, #0c1929 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif' }}>
          <div style={{ textAlign: 'center' }}>
            <BioSyncLogo color="white" size="lg" />
            <h1 style={{ color: '#fff', fontSize: '1.8rem', marginTop: '2rem' }}>Protocol Not Found</h1>
            <p style={{ color: '#8896a7', marginTop: '0.5rem' }}>This protocol link may have expired or doesn't exist.</p>
            <a href="/wizard" style={{ display: 'inline-block', marginTop: '2rem', padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #0d9488, #10b981)', color: '#fff', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 700 }}>
              Create a Protocol
            </a>
          </div>
        </div>
      </>
    );
  }

  const p = protocol;
  const createdDate = p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <>
      <Head>
        <title>{p.protocolName} | BioSync Peptides</title>
        <meta name="description" content={`Personalized peptide protocol for ${p.clientName} — ${p.protocolName}`} />
      </Head>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0c1929 0%, #122438 50%, #0c1929 100%)', fontFamily: '"DM Sans", sans-serif' }}>
        {/* Header */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <a href="/" style={{ textDecoration: 'none' }}><BioSyncLogo color="white" /></a>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/products" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>Catalog</a>
            <a href="/wizard" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>Protocol Wizard</a>
          </div>
        </nav>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          {/* Protocol Header Card */}
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)', padding: '2.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ color: '#0d9488', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>PERSONALIZED PROTOCOL</div>
                <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', fontWeight: 700, color: '#fff', margin: 0 }}>{p.protocolName}</h1>
                <p style={{ color: '#8896a7', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                  Prepared for <strong style={{ color: '#fff' }}>{p.clientName}</strong>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <BioSyncLogo color="white" size="sm" />
                <div style={{ color: '#5a6a7a', fontSize: '0.75rem', marginTop: '0.5rem' }}>{createdDate}</div>
              </div>
            </div>

            {/* Goals */}
            {p.goals && p.goals.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                {p.goals.map((goal, i) => (
                  <span key={i} style={{ background: 'rgba(13,148,136,0.15)', color: '#0d9488', fontSize: '0.8rem', fontWeight: 600, padding: '0.35rem 0.85rem', borderRadius: '2rem', border: '1px solid rgba(13,148,136,0.25)' }}>
                    {goal}
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ color: '#5a6a7a', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em' }}>DURATION</div>
                <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>{p.duration}</div>
              </div>
              <div>
                <div style={{ color: '#5a6a7a', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em' }}>PRODUCTS</div>
                <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>{p.products?.length || 0}</div>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            Protocol Details
          </h2>

          <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            {(p.products || []).map((prod, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{prod.name}</h3>
                  <span style={{ background: 'rgba(13,148,136,0.12)', color: '#0d9488', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: '0.4rem' }}>
                    {prod.route || 'SubQ'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div>
                    <div style={{ color: '#5a6a7a', fontSize: '0.7rem', fontWeight: 600 }}>DOSAGE</div>
                    <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>{prod.dosage}</div>
                  </div>
                  <div>
                    <div style={{ color: '#5a6a7a', fontSize: '0.7rem', fontWeight: 600 }}>FREQUENCY</div>
                    <div style={{ color: '#fff', fontSize: '0.95rem' }}>{prod.frequency}</div>
                  </div>
                  <div>
                    <div style={{ color: '#5a6a7a', fontSize: '0.7rem', fontWeight: 600 }}>TIMING</div>
                    <div style={{ color: '#fff', fontSize: '0.95rem' }}>{prod.timing}</div>
                  </div>
                  <div>
                    <div style={{ color: '#5a6a7a', fontSize: '0.7rem', fontWeight: 600 }}>DURATION</div>
                    <div style={{ color: '#fff', fontSize: '0.95rem' }}>{prod.duration}</div>
                  </div>
                </div>

                {prod.reconstitution && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(13,148,136,0.06)', borderRadius: '0.5rem', border: '1px solid rgba(13,148,136,0.12)' }}>
                    <div style={{ color: '#0d9488', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.25rem' }}>RECONSTITUTION</div>
                    <div style={{ color: '#8896a7', fontSize: '0.85rem' }}>{prod.reconstitution}</div>
                  </div>
                )}

                {prod.notes && (
                  <div style={{ color: '#8896a7', fontSize: '0.85rem', marginTop: '0.75rem', fontStyle: 'italic' }}>{prod.notes}</div>
                )}
              </div>
            ))}
          </div>

          {/* Weekly Schedule */}
          {p.weeklySchedule && (
            <>
              <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                Weekly Schedule
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.5rem', marginBottom: '2rem' }}>
                {dayOrder.map(day => {
                  const items = p.weeklySchedule[day];
                  if (!items || items.length === 0) return (
                    <div key={day} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.04)', opacity: 0.4 }}>
                      <div style={{ color: '#5a6a7a', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.25rem' }}>{dayLabels[day]}</div>
                      <div style={{ color: '#5a6a7a', fontSize: '0.75rem' }}>Rest</div>
                    </div>
                  );
                  return (
                    <div key={day} style={{ background: 'rgba(13,148,136,0.06)', borderRadius: '0.5rem', padding: '0.75rem', border: '1px solid rgba(13,148,136,0.12)' }}>
                      <div style={{ color: '#0d9488', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.5rem' }}>{dayLabels[day]}</div>
                      {items.map((item, j) => (
                        <div key={j} style={{ color: '#ccd6e0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{item}</div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Important Notes */}
          {p.importantNotes && p.importantNotes.length > 0 && (
            <>
              <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                Important Notes
              </h2>
              <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '2rem' }}>
                {p.importantNotes.map((note, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.75rem 1rem', background: 'rgba(245,158,11,0.06)', borderRadius: '0.5rem', border: '1px solid rgba(245,158,11,0.12)' }}>
                    <span style={{ color: '#f59e0b', fontSize: '0.9rem', flexShrink: 0 }}>*</span>
                    <span style={{ color: '#ccd6e0', fontSize: '0.9rem' }}>{note}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Disclaimer */}
          <div style={{ padding: '1.25rem', background: 'rgba(239,68,68,0.06)', borderRadius: '0.75rem', border: '1px solid rgba(239,68,68,0.15)', marginBottom: '2rem' }}>
            <div style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>DISCLAIMER</div>
            <p style={{ color: '#8896a7', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
              {p.disclaimer || 'This protocol is for research and educational purposes only. These products are not intended for human or veterinary use. Always consult with a qualified healthcare provider before beginning any peptide therapy protocol.'}
            </p>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', padding: '1.5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <BioSyncLogo color="white" size="sm" />
            <p style={{ color: '#5a6a7a', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              biosyncpeptide.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    // Find the blob by prefix
    const { blobs } = await list({ prefix: `protocols/${slug}.json`, limit: 1 });

    if (!blobs || blobs.length === 0) {
      return { props: { protocol: null, error: 'Protocol not found' } };
    }

    // Fetch the JSON content from the blob URL
    const response = await fetch(blobs[0].url);
    if (!response.ok) {
      return { props: { protocol: null, error: 'Protocol not found' } };
    }

    const protocol = await response.json();
    return { props: { protocol, error: null } };
  } catch (err) {
    console.error('Error fetching protocol:', err);
    return { props: { protocol: null, error: 'Failed to load protocol' } };
  }
}
