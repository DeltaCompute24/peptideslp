import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { peptideProducts } from '../data/peptideProducts';

// Selected products with unique photos
const BOOKLET_PRODUCT_IDS = [3, 13, 100, 101]; // BPC-157, MOTS-C, Recovery Blend, Growth Optimization Blend

const BioSyncLogo = ({ color = '#0d9488' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
    <svg width={38} height={38} viewBox="0 0 100 100" style={{ marginRight: '-2px' }}>
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
      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.4rem', fontWeight: 700, color }}>
        BioSync
      </div>
      <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.32em', color, marginTop: -1, textAlign: 'right', opacity: 0.8 }}>
        PEPTIDES
      </div>
    </div>
  </div>
);

export default function Booklet() {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const selectedProducts = BOOKLET_PRODUCT_IDS.map(id => peptideProducts.find(p => p.id === id)).filter(Boolean);

  const handleDownload = async () => {
    setGenerating(true);
    setDone(false);
    try {
      const { generateBookletPDF } = await import('../src/utils/generateBooklet');
      await generateBookletPDF(selectedProducts);
      setDone(true);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Error generating PDF. Please try again.');
    }
    setGenerating(false);
  };

  const categoryColors = {
    recovery: '#10b981',
    weight: '#0d9488',
    antiaging: '#6366f1',
    wellness: '#f59e0b'
  };

  return (
    <>
      <Head>
        <title>Sample Case Booklet | BioSync Peptides</title>
        <meta name="description" content="Download the BioSync Peptides sample case booklet for pharmacies and clinics." />
      </Head>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0c1929 0%, #122438 50%, #0c1929 100%)', fontFamily: '"DM Sans", sans-serif' }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <BioSyncLogo />
          </Link>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/products" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>Catalog</Link>
            <Link href="/ebook" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>E-Book</Link>
            <Link href="/booklet-pt" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>Portugues</Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ color: '#0d9488', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              SAMPLE CASE REFERENCE
            </div>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', margin: '0 0 1rem' }}>
              Product Booklet
            </h1>
            <p style={{ color: '#8896a7', fontSize: '1.05rem', maxWidth: 550, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Professional print-ready booklet for your sample case. Includes cover, peptide science overview, and detailed product sheets with photos, specifications, and dosing protocols.
            </p>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={generating}
              style={{
                background: generating ? '#1a3a4a' : 'linear-gradient(135deg, #0d9488, #10b981)',
                color: '#fff',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '0.75rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                cursor: generating ? 'wait' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
                boxShadow: generating ? 'none' : '0 4px 20px rgba(13,148,136,0.35)'
              }}
            >
              {generating ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="3" fill="none" strokeDasharray="31.4" strokeLinecap="round"/>
                  </svg>
                  Generating PDF...
                </>
              ) : done ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  Download Again
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Download Booklet PDF
                </>
              )}
            </button>

            {done && (
              <p style={{ color: '#10b981', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                PDF downloaded successfully!
              </p>
            )}
          </div>

          {/* Booklet Contents Preview */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              Booklet Contents
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {/* Cover */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '0.5rem', background: 'linear-gradient(135deg, #0c1929, #1a3a4a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>Cover Page</div>
                  <div style={{ color: '#8896a7', fontSize: '0.8rem' }}>BioSync branding, molecular design</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#5a6a7a', fontSize: '0.8rem' }}>Page 1</div>
              </div>

              {/* Science */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '0.5rem', background: 'linear-gradient(135deg, #0c1929, #1a3a4a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2"><path d="M9 3v7l-4 9h14l-4-9V3M9 3h6"/></svg>
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>The Science of Peptide Therapy</div>
                  <div style={{ color: '#8896a7', fontSize: '0.8rem' }}>Research frontiers, market data, key statistics</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#5a6a7a', fontSize: '0.8rem' }}>Page 2</div>
              </div>

              {/* Products */}
              {selectedProducts.map((product, i) => (
                <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, background: '#0c1929' }}>
                    {product.image && (
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{product.name}</div>
                    <div style={{ color: '#8896a7', fontSize: '0.8rem' }}>
                      {product.tagline} &middot;{' '}
                      <span style={{ color: categoryColors[product.category] || '#0d9488' }}>
                        {product.type === 'blend' ? 'Blend' : 'Single Peptide'}
                      </span>
                    </div>
                  </div>
                  <div style={{ color: '#5a6a7a', fontSize: '0.8rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    Pages {3 + i * 2}–{4 + i * 2}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Print specs */}
          <div style={{ padding: '1.5rem', background: 'rgba(13,148,136,0.08)', borderRadius: '0.75rem', border: '1px solid rgba(13,148,136,0.15)' }}>
            <h3 style={{ color: '#0d9488', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '0.05em' }}>PRINT SPECIFICATIONS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {[
                ['Format', 'A5 Portrait (14.8 x 21.0 cm)'],
                ['Pages', '10 pages (5 sheets, double-sided)'],
                ['Colors', 'Full color (CMYK compatible)'],
                ['Binding', 'Saddle-stitch or stapled'],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ color: '#8896a7', fontSize: '0.75rem', fontWeight: 600 }}>{label}</div>
                  <div style={{ color: '#fff', fontSize: '0.85rem' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(13,148,136,0.45) !important;
        }
      `}</style>
    </>
  );
}
