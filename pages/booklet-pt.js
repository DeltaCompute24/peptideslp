import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { peptideProducts } from '../data/peptideProducts';

// Selected products with unique photos
const BOOKLET_PRODUCT_IDS = [3, 13, 100, 101]; // BPC-157, MOTS-C, Recovery Blend, Growth Optimization Blend

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
        <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: titleSize, fontWeight: 700, color, letterSpacing: '0.01em', lineHeight: 1.1 }}>
          BioSync
        </div>
        <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: subSize, fontWeight: 600, color, letterSpacing: '0.32em', lineHeight: 1.2, marginTop: '0px', opacity: 0.8, textAlign: 'right' }}>
          PEPTIDES
        </div>
      </div>
    </div>
  );
};

// PT product name overrides for display
const ptTaglines = {
  3: 'O Peptideo Wolverine',
  13: 'Otimizador Metabolico',
  100: 'O Stack de Cicatrizacao Definitivo',
  101: 'Amplificacao Natural do GH'
};

export default function BookletPT() {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const selectedProducts = BOOKLET_PRODUCT_IDS.map(id => peptideProducts.find(p => p.id === id)).filter(Boolean);

  const handleDownload = async () => {
    setGenerating(true);
    setDone(false);
    try {
      const { generateBookletPDF } = await import('../src/utils/generateBooklet');
      await generateBookletPDF(selectedProducts, 'pt');
      setDone(true);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
    setGenerating(false);
  };

  const categoryColors = {
    recovery: '#10b981',
    weight: '#0d9488',
    antiaging: '#6366f1',
    wellness: '#f59e0b'
  };

  const categoryNamesPT = {
    recovery: 'Recuperacao',
    weight: 'Controle de Peso',
    antiaging: 'Anti-Envelhecimento',
    wellness: 'Bem-Estar'
  };

  return (
    <>
      <Head>
        <title>Catalogo de Amostras | BioSync Peptides</title>
        <meta name="description" content="Baixe o catalogo de amostras BioSync Peptides para farmacias e clinicas." />
      </Head>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0c1929 0%, #122438 50%, #0c1929 100%)', fontFamily: '"DM Sans", sans-serif' }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <BioSyncLogo color="white" />
          </Link>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/products" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>Catalogo</Link>
            <Link href="/ebook-pt" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>E-Book</Link>
            <Link href="/wizard" style={{ color: '#0d9488', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Protocol Wizard</Link>
            <Link href="/booklet" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>English</Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ color: '#0d9488', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              REFERENCIA DO KIT DE AMOSTRAS
            </div>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', margin: '0 0 1rem' }}>
              Catalogo de Produtos
            </h1>
            <p style={{ color: '#8896a7', fontSize: '1.05rem', maxWidth: 550, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Catalogo profissional pronto para impressao para seu kit de amostras. Inclui capa, visao geral da ciencia dos peptideos e fichas detalhadas de produtos com fotos, especificacoes e protocolos de dosagem.
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
                  Gerando PDF...
                </>
              ) : done ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  Baixar Novamente
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Baixar Catalogo PDF
                </>
              )}
            </button>

            {done && (
              <p style={{ color: '#10b981', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                PDF baixado com sucesso!
              </p>
            )}
          </div>

          {/* Booklet Contents Preview */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              Conteudo do Catalogo
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {/* Cover */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '0.5rem', background: 'linear-gradient(135deg, #0c1929, #1a3a4a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>Capa</div>
                  <div style={{ color: '#8896a7', fontSize: '0.8rem' }}>Marca BioSync, design molecular</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#5a6a7a', fontSize: '0.8rem' }}>Pagina 1</div>
              </div>

              {/* Science */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '0.5rem', background: 'linear-gradient(135deg, #0c1929, #1a3a4a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2"><path d="M9 3v7l-4 9h14l-4-9V3M9 3h6"/></svg>
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>A Ciencia da Terapia Peptidica</div>
                  <div style={{ color: '#8896a7', fontSize: '0.8rem' }}>Fronteiras da pesquisa, dados de mercado, estatisticas</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#5a6a7a', fontSize: '0.8rem' }}>Pagina 2</div>
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
                      {ptTaglines[product.id] || product.tagline} &middot;{' '}
                      <span style={{ color: categoryColors[product.category] || '#0d9488' }}>
                        {product.type === 'blend' ? 'Blend' : 'Peptideo Individual'}
                      </span>
                    </div>
                  </div>
                  <div style={{ color: '#5a6a7a', fontSize: '0.8rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    Paginas {3 + i * 2}–{4 + i * 2}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Print specs */}
          <div style={{ padding: '1.5rem', background: 'rgba(13,148,136,0.08)', borderRadius: '0.75rem', border: '1px solid rgba(13,148,136,0.15)' }}>
            <h3 style={{ color: '#0d9488', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '0.05em' }}>ESPECIFICACOES DE IMPRESSAO</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {[
                ['Formato', 'A5 Retrato (14,8 x 21,0 cm)'],
                ['Paginas', '10 paginas (5 folhas, frente e verso)'],
                ['Cores', 'Policromia (compativel CMYK)'],
                ['Encadernacao', 'Grampeado ou costurado'],
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
