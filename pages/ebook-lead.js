import React, { useState } from 'react';
import Head from 'next/head';
import { protocolDictionary, protocolCategories, reconstitutionGuide, peptideGlossary } from '../data/protocolDictionary';

const BioSyncLogo = ({ color = '#1B5E20', size = 'default' }) => {
  const iconSize = size === 'small' ? 36 : 44;
  const titleSize = size === 'small' ? '1.3rem' : '1.6rem';
  const subSize = size === 'small' ? '0.55rem' : '0.65rem';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" style={{ marginRight: '-2px' }}>
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
        <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: titleSize, fontWeight: 700, color, letterSpacing: '0.01em', lineHeight: 1.1 }}>BioSync</div>
        <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: subSize, fontWeight: 600, color, letterSpacing: '0.32em', lineHeight: 1.2, marginTop: '0px', opacity: 0.8, textAlign: 'right' }}>PEPTIDES</div>
      </div>
    </div>
  );
};

export default function EbookLead() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      // Log the lead
      await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          source: 'instagram-ebook-lead',
          lang: 'en',
        }),
      });

      // Generate and download the PDF
      const { generateEbookPDF } = await import('../src/utils/generatePDF');
      const doc = generateEbookPDF(protocolDictionary, protocolCategories, reconstitutionGuide, peptideGlossary, 'en');
      doc.save('BioSync-Peptide-Protocol-Dictionary.pdf');

      setDownloaded(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Free Peptide Protocol E-Book | BioSync Peptides</title>
        <meta name="description" content="Download the complete BioSync Peptide Protocol Dictionary — 29 peptides, 8 categories, evidence-based protocols and dosing guides. Free PDF." />
        <meta property="og:title" content="Free Peptide Protocol E-Book | BioSync Peptides" />
        <meta property="og:description" content="29 peptides, 8 categories, evidence-based protocols. Download the free PDF now." />
        <meta property="og:type" content="website" />
      </Head>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0c1929 0%, #122438 50%, #0c1929 100%)', fontFamily: '"DM Sans", sans-serif', display: 'flex', flexDirection: 'column' }}>
        {/* Minimal header */}
        <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center' }}>
          <BioSyncLogo color="white" />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
          <div style={{ maxWidth: 480, width: '100%' }}>

            {!downloaded ? (
              <>
                {/* Ebook preview */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  {/* Book mockup */}
                  <div style={{
                    width: 200, height: 260, margin: '0 auto 1.5rem',
                    background: 'linear-gradient(135deg, #0c1929, #1a3a4a)',
                    borderRadius: '0.5rem 1rem 1rem 0.5rem',
                    border: '1px solid rgba(13,148,136,0.3)',
                    boxShadow: '8px 8px 30px rgba(0,0,0,0.4), -2px 0 8px rgba(0,0,0,0.2)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* Spine shadow */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: 'linear-gradient(90deg, rgba(0,0,0,0.3), transparent)' }} />
                    {/* Decorative circle */}
                    <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(13,148,136,0.08)' }} />

                    <div style={{ color: '#0d9488', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '0.75rem' }}>BIOSYNC PEPTIDES</div>
                    <div style={{ fontFamily: '"Playfair Display", serif', color: '#fff', fontSize: '1.05rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.3 }}>
                      The Complete Peptide Protocol Dictionary
                    </div>
                    <div style={{ width: 30, height: 2, background: '#0d9488', margin: '0.75rem 0', borderRadius: 2 }} />
                    <div style={{ color: '#8896a7', fontSize: '0.55rem', textAlign: 'center', lineHeight: 1.5 }}>
                      29 Peptides | 8 Categories<br />Evidence-Based Protocols
                    </div>
                  </div>

                  <div style={{ color: '#0d9488', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                    FREE DOWNLOAD
                  </div>
                  <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', fontWeight: 700, color: '#fff', margin: '0 0 0.75rem', lineHeight: 1.3 }}>
                    The Complete Peptide Protocol Dictionary
                  </h1>
                  <p style={{ color: '#8896a7', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 0.5rem' }}>
                    Evidence-based protocols, dosing guides, and scientific data for 29 peptides across 8 therapeutic categories.
                  </p>
                </div>

                {/* What's inside */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {[
                    ['29 Peptides', 'Full protocols & dosing'],
                    ['8 Categories', 'Weight, recovery, anti-aging...'],
                    ['100+ Studies', 'Evidence-based research'],
                    ['Dosing Guide', 'Reconstitution & injection'],
                  ].map(([title, desc]) => (
                    <div key={title} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ color: '#0d9488', fontSize: '0.8rem', fontWeight: 700 }}>{title}</div>
                      <div style={{ color: '#8896a7', fontSize: '0.7rem', marginTop: '0.15rem' }}>{desc}</div>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '1.5rem',
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#ccd6e0', marginBottom: '0.35rem' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      style={{
                        width: '100%', padding: '0.75rem 1rem',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '0.5rem', color: '#fff', fontSize: '0.95rem',
                        outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#ccd6e0', marginBottom: '0.35rem' }}>
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      required
                      style={{
                        width: '100%', padding: '0.75rem 1rem',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '0.5rem', color: '#fff', fontSize: '0.95rem',
                        outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {error && (
                    <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%', padding: '0.9rem',
                      background: submitting ? '#1a3a4a' : 'linear-gradient(135deg, #0d9488, #10b981)',
                      color: '#fff', border: 'none', borderRadius: '0.75rem',
                      fontSize: '1rem', fontWeight: 700, cursor: submitting ? 'wait' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      boxShadow: submitting ? 'none' : '0 4px 20px rgba(13,148,136,0.35)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {submitting ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="3" fill="none" strokeDasharray="31.4" strokeLinecap="round"/>
                        </svg>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                        Download Free E-Book
                      </>
                    )}
                  </button>

                  <p style={{ color: '#5a6a7a', fontSize: '0.7rem', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.5 }}>
                    We'll send you protocol updates and tips via WhatsApp. No spam.
                  </p>
                </form>
              </>
            ) : (
              /* Success state */
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', margin: '0 auto 1.5rem',
                  background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>

                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', fontWeight: 700, color: '#fff', margin: '0 0 0.75rem' }}>
                  Your E-Book is Downloading!
                </h2>
                <p style={{ color: '#8896a7', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Check your downloads folder for<br />
                  <strong style={{ color: '#fff' }}>BioSync-Peptide-Protocol-Dictionary.pdf</strong>
                </p>

                {/* Next steps */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)', borderRadius: '1rem',
                  border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem',
                  textAlign: 'left', marginBottom: '1.5rem',
                }}>
                  <div style={{ color: '#0d9488', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    WHAT'S NEXT
                  </div>

                  <a
                    href="/wizard"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1rem', background: 'rgba(13,148,136,0.08)',
                      borderRadius: '0.75rem', border: '1px solid rgba(13,148,136,0.2)',
                      textDecoration: 'none', marginBottom: '0.75rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: '0.5rem',
                      background: 'linear-gradient(135deg, #0d9488, #10b981)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>Get Your Free Protocol</div>
                      <div style={{ color: '#8896a7', fontSize: '0.8rem' }}>AI-powered personalized peptide protocol</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a6a7a" strokeWidth="2" style={{ marginLeft: 'auto', flexShrink: 0 }}><path d="M9 18l6-6-6-6"/></svg>
                  </a>

                  <a
                    href="/products"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1rem', background: 'rgba(255,255,255,0.03)',
                      borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: '0.5rem',
                      background: 'rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8896a7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>Browse Product Catalog</div>
                      <div style={{ color: '#8896a7', fontSize: '0.8rem' }}>View all 17 peptide products</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a6a7a" strokeWidth="2" style={{ marginLeft: 'auto', flexShrink: 0 }}><path d="M9 18l6-6-6-6"/></svg>
                  </a>
                </div>

                <a
                  href={`https://wa.me/13124781662?text=${encodeURIComponent("Hi! I just downloaded the BioSync Peptide Protocol E-Book. I'd like to learn more.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.75rem 1.5rem', background: '#25D366', color: '#fff',
                    borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.614-1.47A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.16 0-4.16-.678-5.803-1.834l-.416-.27-2.738.872.728-2.673-.295-.439A9.71 9.71 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
                  Chat with Us on WhatsApp
                </a>
              </div>
            )}

            {/* Trust signals */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                ['99%+', 'Purity'],
                ['17', 'Products'],
                ['Research', 'Grade'],
              ].map(([val, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ color: '#0d9488', fontSize: '1.1rem', fontWeight: 700 }}>{val}</div>
                  <div style={{ color: '#5a6a7a', fontSize: '0.7rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal footer */}
        <div style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p style={{ color: '#3a4a5a', fontSize: '0.7rem', margin: 0 }}>
            For research and educational purposes only. Not medical advice.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 25px rgba(13,148,136,0.45) !important;
        }
        input:focus {
          border-color: rgba(13,148,136,0.5) !important;
          box-shadow: 0 0 0 2px rgba(13,148,136,0.15);
        }
        input::placeholder {
          color: #5a6a7a;
        }
      `}</style>
    </>
  );
}
