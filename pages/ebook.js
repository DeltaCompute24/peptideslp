import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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

const EvidenceBadge = ({ level }) => {
  const colors = {
    'Strong': { bg: '#dcfce7', text: '#166534', border: '#86efac' },
    'Moderate': { bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
    'Emerging': { bg: '#e0e7ff', text: '#3730a3', border: '#a5b4fc' },
    'Anecdotal': { bg: '#f3e8ff', text: '#6b21a8', border: '#c4b5fd' }
  };
  const key = level.split(' ')[0];
  const c = colors[key] || colors['Emerging'];
  return (
    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, background: c.bg, color: c.text, border: `1px solid ${c.border}`, letterSpacing: '0.03em' }}>
      {level}
    </span>
  );
};

const CategoryIcon = ({ category }) => {
  const iconMap = {
    'Weight Management': (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6v28M8 14h24M8 14l4 12h-8l4-12M32 14l4 12h-8l4-12"/>
      </svg>
    ),
    'Recovery & Healing': (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="24" height="12" rx="2"/><path d="M14 14v12M26 14v12M8 20h24"/>
      </svg>
    ),
    'Growth Hormone': (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 30c4-8 6-16 10-16s6 8 10 16"/><circle cx="20" cy="12" r="4"/>
      </svg>
    ),
    'Anti-Aging & Longevity': (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6h16M12 34h16M14 6c0 8 6 10 6 14s-6 6-6 14M26 6c0 8-6 10-6 14s6 6 6 14"/>
      </svg>
    ),
    'Cognitive & Neuroprotective': (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="18" r="12"/><path d="M14 30v4h12v-4"/><path d="M16 18c0-2 2-4 4-4s4 2 4 4"/>
      </svg>
    ),
    'Immune Support': (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4v8M20 28v8M4 20h8M28 20h8M9 9l6 6M25 25l6 6M9 31l6-6M25 15l6-6"/>
      </svg>
    ),
    'Sexual Health': (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 34s-12-8-12-16c0-4 3-8 8-8 3 0 4 2 4 2s1-2 4-2c5 0 8 4 8 8 0 8-12 16-12 16z"/>
      </svg>
    ),
    'Wellness': (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 32c0-16 8-24 24-24-4 16-12 24-24 24z"/><path d="M8 32c8-8 16-12 24-24"/>
      </svg>
    )
  };
  return iconMap[category] || iconMap['Wellness'];
};

export default function EBook() {
  const [activeSection, setActiveSection] = useState('toc');
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGlossary, setShowGlossary] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const { generateEbookPDF } = await import('../src/utils/generatePDF');
      const doc = generateEbookPDF(protocolDictionary, protocolCategories, reconstitutionGuide, peptideGlossary, 'en');
      doc.save('BioSync-Peptide-Protocol-Dictionary.pdf');
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Error generating PDF. Please try again.');
    }
    setIsGeneratingPDF(false);
  };

  const filteredProtocols = searchQuery
    ? protocolDictionary.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.class && p.class.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : activeCategory
      ? protocolDictionary.filter(p => {
          const cat = protocolCategories.find(c => c.id === activeCategory);
          return cat && cat.peptideIds.includes(p.id);
        })
      : [];

  const renderNav = () => (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(13,148,136,0.1)', padding: '0.75rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <Link href="/" style={{ textDecoration: 'none' }}><BioSyncLogo color="#0f766e" size="small" /></Link>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { id: 'toc', label: 'Contents' },
            { id: 'protocols', label: 'Protocols' },
            { id: 'reconstitution', label: 'How-To' },
            { id: 'glossary', label: 'Glossary' }
          ].map(s => (
            <button key={s.id} onClick={() => { setActiveSection(s.id); setSelectedProtocol(null); setActiveCategory(null); setSearchQuery(''); if (s.id === 'glossary') setShowGlossary(true); else setShowGlossary(false); }}
              style={{ padding: '6px 16px', borderRadius: '20px', border: activeSection === s.id ? '2px solid #0d9488' : '1px solid #e2e8f0', background: activeSection === s.id ? 'linear-gradient(135deg, #0f766e, #0d9488)' : 'white', color: activeSection === s.id ? 'white' : '#475569', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
              {s.label}
            </button>
          ))}
          <Link href="/products" style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}>
            Shop
          </Link>
          <button onClick={handleDownloadPDF} disabled={isGeneratingPDF}
            style={{ padding: '6px 16px', borderRadius: '20px', border: 'none', background: 'linear-gradient(135deg, #0f766e, #0d9488)', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: isGeneratingPDF ? 'wait' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem', opacity: isGeneratingPDF ? 0.7 : 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>
    </nav>
  );

  const renderTOC = () => (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0d9488', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>BioSync Peptide E-Book</div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, color: '#0c1929', lineHeight: 1.15, marginBottom: '1rem' }}>
          The Complete Peptide<br/>Protocol Dictionary
        </h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1.05rem', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          Evidence-based protocols, dosing guides, and scientific data for 27 peptides across 8 therapeutic categories. For educational and research purposes only.
        </p>
        <button onClick={handleDownloadPDF} disabled={isGeneratingPDF}
          style={{
            marginTop: '1.5rem', padding: '0.85rem 2rem', borderRadius: '50px', border: 'none',
            background: 'linear-gradient(135deg, #0f766e, #0d9488)', color: 'white',
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', fontWeight: 700,
            cursor: isGeneratingPDF ? 'wait' : 'pointer', transition: 'all 0.3s',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            boxShadow: '0 10px 30px -10px rgba(13,148,136,0.4)',
            opacity: isGeneratingPDF ? 0.7 : 1
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
          {isGeneratingPDF ? 'Generating PDF...' : 'Download Complete PDF'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {protocolCategories.map((cat, i) => (
          <button key={cat.id}
            onClick={() => { setActiveSection('protocols'); setActiveCategory(cat.id); }}
            className="card-hover"
            style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(13,148,136,0.12)', background: 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(13,148,136,0.08), rgba(13,148,136,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d9488', flexShrink: 0 }}>
              <CategoryIcon category={cat.name} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0d9488', opacity: 0.6 }}>CHAPTER {i + 1}</span>
              </div>
              <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#0c1929', marginBottom: '0.25rem' }}>{cat.name}</h3>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{cat.description}</p>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {cat.peptideIds.map(pid => {
                  const p = protocolDictionary.find(pr => pr.id === pid);
                  return p ? (
                    <span key={pid} style={{ padding: '2px 8px', borderRadius: '10px', background: 'rgba(13,148,136,0.06)', fontSize: '0.65rem', fontWeight: 600, color: '#0f766e' }}>{p.name.split(' (')[0].split(' —')[0]}</span>
                  ) : null;
                })}
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
          <button onClick={() => { setActiveSection('reconstitution'); setShowGlossary(false); }} className="card-hover"
            style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(13,148,136,0.12)', background: 'linear-gradient(135deg, rgba(13,148,136,0.03), rgba(13,148,136,0.08))', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0d9488', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>APPENDIX A</div>
            <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1rem', fontWeight: 700, color: '#0c1929', marginBottom: '0.25rem' }}>Reconstitution Guide</h3>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#64748b', margin: 0 }}>Step-by-step mixing, dosing formulas, syringe conversion, injection technique</p>
          </button>
          <button onClick={() => { setActiveSection('glossary'); setShowGlossary(true); }} className="card-hover"
            style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(13,148,136,0.12)', background: 'linear-gradient(135deg, rgba(13,148,136,0.03), rgba(13,148,136,0.08))', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0d9488', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>APPENDIX B</div>
            <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1rem', fontWeight: 700, color: '#0c1929', marginBottom: '0.25rem' }}>Glossary</h3>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#64748b', margin: 0 }}>26 key terms — from Amino Acid to Titration</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderProtocolDetail = (protocol) => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <button onClick={() => setSelectedProtocol(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#0d9488', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1.5rem', padding: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        Back to {activeCategory ? protocolCategories.find(c => c.id === activeCategory)?.name : 'results'}
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(13,148,136,0.08)', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e' }}>{protocol.category}</span>
          {protocol.class && <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{protocol.class}</span>}
        </div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0c1929', marginBottom: '0.5rem' }}>{protocol.name}</h1>
        {protocol.evidenceLevel && <EvidenceBadge level={protocol.evidenceLevel} />}
      </div>

      {/* Molecular Data */}
      {(protocol.casNumber || protocol.molecularFormula) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            protocol.casNumber && { label: 'CAS Number', value: protocol.casNumber },
            protocol.molecularFormula && { label: 'Formula', value: protocol.molecularFormula },
            protocol.molecularWeight && { label: 'Mol. Weight', value: protocol.molecularWeight }
          ].filter(Boolean).map((item, i) => (
            <div key={i} style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0c1929', marginTop: '2px', wordBreak: 'break-all' }}>{item.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Mechanism */}
      {protocol.mechanism && (
        <Section title="Mechanism of Action">
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#334155', lineHeight: 1.8 }}>{protocol.mechanism}</p>
        </Section>
      )}

      {/* Protocol */}
      {protocol.protocol && (
        <Section title="Dosing Protocol">
          <ProtocolDetails protocol={protocol.protocol} />
        </Section>
      )}

      {/* Research */}
      {protocol.researchHighlights && (
        <Section title="Research Highlights">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {protocol.researchHighlights.map((r, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: i < protocol.researchHighlights.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>{r}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Contraindications */}
      {protocol.contraindications && (
        <Section title="Contraindications" accent="#dc2626">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {protocol.contraindications.map((c, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.35rem 0', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#991b1b' }}>
                <span style={{ color: '#dc2626', fontWeight: 700 }}>-</span> {c}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Side Effects */}
      {protocol.sideEffects && (
        <Section title="Potential Side Effects">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {protocol.sideEffects.map((s, i) => (
              <span key={i} style={{ padding: '4px 12px', borderRadius: '20px', background: '#fef3c7', fontSize: '0.75rem', fontWeight: 600, color: '#92400e' }}>{s}</span>
            ))}
          </div>
        </Section>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '12px', background: '#fefce8', border: '1px solid #fde047' }}>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: '#854d0e', lineHeight: 1.6, margin: 0 }}>
          <strong>Disclaimer:</strong> This information is for educational and research purposes only. It is not medical advice. Always consult a qualified healthcare provider before starting any peptide therapy. Individual responses vary. Many peptides discussed here are not FDA-approved for the uses described.
        </p>
      </div>
    </div>
  );

  const renderProtocolsList = () => (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Search */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search peptides by name, category, or class..."
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setActiveCategory(null); }}
          style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '14px', border: '1.5px solid #e2e8f0', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', outline: 'none', transition: 'border 0.2s' }}
          onFocus={e => e.target.style.borderColor = '#0d9488'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {protocolCategories.map(cat => (
          <button key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
            style={{ padding: '6px 14px', borderRadius: '20px', border: activeCategory === cat.id ? '2px solid #0d9488' : '1px solid #e2e8f0', background: activeCategory === cat.id ? 'linear-gradient(135deg, #0f766e, #0d9488)' : 'white', color: activeCategory === cat.id ? 'white' : '#475569', fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Category header */}
      {activeCategory && !searchQuery && (() => {
        const cat = protocolCategories.find(c => c.id === activeCategory);
        return cat ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', fontWeight: 700, color: '#0c1929', marginBottom: '0.35rem' }}>{cat.name}</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>{cat.description}</p>
          </div>
        ) : null;
      })()}

      {searchQuery && (
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
          {filteredProtocols.length} result{filteredProtocols.length !== 1 ? 's' : ''} for "{searchQuery}"
        </p>
      )}

      {!activeCategory && !searchQuery && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem' }}>Select a category above or search to browse protocols</p>
        </div>
      )}

      {/* Protocol cards */}
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {filteredProtocols.map(protocol => (
          <button key={protocol.id}
            onClick={() => setSelectedProtocol(protocol)}
            className="card-hover"
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(13,148,136,0.1)', background: 'white', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.3s' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#0c1929', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{protocol.name}</h3>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {protocol.class && <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{protocol.class}</span>}
                {protocol.evidenceLevel && <EvidenceBadge level={protocol.evidenceLevel} />}
              </div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div>
    </div>
  );

  const renderReconstitution = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0d9488', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>APPENDIX A</div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0c1929', marginBottom: '0.5rem' }}>Reconstitution & Administration Guide</h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>How to properly reconstitute, dose, inject, and store peptides.</p>
      </div>

      {/* Supplies */}
      <Section title="Required Supplies">
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {reconstitutionGuide.supplies.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(13,148,136,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#0d9488', flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.88rem', color: '#334155' }}>{s}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section title="Reconstitution Steps">
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {reconstitutionGuide.steps.map((s) => (
            <div key={s.step} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderRadius: '12px', background: s.step === 6 ? '#fef3c7' : '#f8fafc', border: s.step === 6 ? '1px solid #fde047' : '1px solid #e2e8f0' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: s.step === 6 ? '#f59e0b' : '#0d9488', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.88rem', color: s.step === 6 ? '#92400e' : '#334155', lineHeight: 1.6, margin: 0 }}>{s.action}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Dosing Formula */}
      <Section title="Dosing Calculation">
        <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'linear-gradient(135deg, #0c1929, #1e3a5f)', color: 'white', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', opacity: 0.7, marginBottom: '0.75rem' }}>FORMULA</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 2 }}>
            <div>Concentration = Peptide Amount (mcg) / BAC Water (mL)</div>
            <div>Injection Vol = Target Dose (mcg) / Concentration (mcg/mL)</div>
          </div>
        </div>
        <div style={{ padding: '1rem', borderRadius: '12px', background: '#f0fdf4', border: '1px solid #86efac' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#166534', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>EXAMPLE</div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#166534', lineHeight: 1.8 }}>
            <div>5mg peptide + 2 mL BAC water = <strong>2,500 mcg/mL</strong></div>
            <div>Target dose: 500 mcg / 2,500 mcg/mL = <strong>0.2 mL (20 units)</strong></div>
          </div>
        </div>
      </Section>

      {/* Syringe Conversion */}
      <Section title="Syringe Conversion (U-100)">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #0d9488' }}>
                <th style={{ padding: '0.6rem', textAlign: 'left', color: '#0f766e', fontWeight: 700 }}>Units</th>
                <th style={{ padding: '0.6rem', textAlign: 'left', color: '#0f766e', fontWeight: 700 }}>mL</th>
                <th style={{ padding: '0.6rem', textAlign: 'left', color: '#0f766e', fontWeight: 700 }}>If 2,500 mcg/mL</th>
              </tr>
            </thead>
            <tbody>
              {reconstitutionGuide.syringeConversion.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.5rem 0.6rem', fontWeight: 600 }}>{row.units} units</td>
                  <td style={{ padding: '0.5rem 0.6rem' }}>{row.mL} mL</td>
                  <td style={{ padding: '0.5rem 0.6rem', color: '#0d9488', fontWeight: 600 }}>{(row.mL * 2500).toFixed(0)} mcg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Injection Sites */}
      <Section title="Injection Sites & Technique">
        <div style={{ marginBottom: '1rem' }}>
          {reconstitutionGuide.injectionSites.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#334155' }}>
              <span style={{ color: '#0d9488', fontWeight: 700 }}>-</span> {s}
            </div>
          ))}
        </div>
        <div style={{ padding: '1rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>INJECTION STEPS</div>
          {reconstitutionGuide.injectionTechnique.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.35rem 0', fontFamily: '"DM Sans", sans-serif', fontSize: '0.83rem', color: '#334155' }}>
              <span style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.75rem' }}>{i + 1}.</span> {t}
            </div>
          ))}
        </div>
      </Section>

      {/* Storage */}
      <Section title="Storage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {Object.entries(reconstitutionGuide.storage).map(([key, val]) => (
            <div key={key} style={{ padding: '1rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#0d9488', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{key}</div>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>{val}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  const renderGlossary = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0d9488', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>APPENDIX B</div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0c1929', marginBottom: '0.5rem' }}>Glossary</h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#64748b' }}>Key terms used throughout this protocol dictionary.</p>
      </div>
      <div style={{ display: 'grid', gap: '0' }}>
        {peptideGlossary.map((item, i) => (
          <div key={i} style={{ padding: '0.85rem 0', borderBottom: '1px solid #f1f5f9' }}>
            <dt style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#0f766e', marginBottom: '0.2rem' }}>{item.term}</dt>
            <dd style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.83rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.definition}</dd>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Peptide Protocol Dictionary | BioSync E-Book</title>
        <meta name="description" content="Complete evidence-based peptide protocol dictionary with dosing guides, reconstitution instructions, and scientific data for 27 peptides." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#fafbfc', fontFamily: '"DM Sans", sans-serif' }}>
        {renderNav()}

        {selectedProtocol
          ? renderProtocolDetail(selectedProtocol)
          : activeSection === 'toc'
            ? renderTOC()
            : activeSection === 'reconstitution'
              ? renderReconstitution()
              : activeSection === 'glossary' || showGlossary
                ? renderGlossary()
                : renderProtocolsList()
        }

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(13,148,136,0.1)', padding: '2rem 1.5rem', textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            This e-book is for educational and research purposes only. It does not constitute medical advice. Consult a qualified healthcare provider before starting any peptide therapy. BioSync Peptides does not claim to diagnose, treat, cure, or prevent any disease.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <BioSyncLogo color="#94a3b8" size="small" />
          </div>
        </footer>
      </div>
    </>
  );
}

// Reusable section wrapper
function Section({ title, accent = '#0d9488', children }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#0c1929', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: `2px solid ${accent}20` }}>{title}</h2>
      {children}
    </div>
  );
}

// Protocol details renderer
function ProtocolDetails({ protocol }) {
  const renderValue = (key, val) => {
    if (key === 'titration' && Array.isArray(val)) {
      return (
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          {val.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0.75rem', borderRadius: '8px', background: i % 2 === 0 ? '#f8fafc' : 'transparent' }}>
              <span style={{ fontWeight: 700, color: '#0d9488', fontSize: '0.78rem', minWidth: '90px' }}>{step.weeks || step.week}</span>
              <span style={{ fontSize: '0.85rem', color: '#334155' }}>{step.dose}{step.frequency ? `, ${step.frequency}` : ''}</span>
            </div>
          ))}
        </div>
      );
    }
    if (key === 'components' && Array.isArray(val)) {
      return (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {val.map((comp, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.75rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0c1929' }}>{comp.peptide}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', color: '#334155' }}>{comp.dose}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{comp.timing}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (key === 'expectedTimeline' && Array.isArray(val)) {
      return (
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          {val.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0.75rem', borderRadius: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <span style={{ fontWeight: 700, color: '#166534', fontSize: '0.78rem', minWidth: '80px' }}>Wk {t.weeks}</span>
              <span style={{ fontSize: '0.83rem', color: '#166534' }}>{t.effect}</span>
            </div>
          ))}
        </div>
      );
    }
    if (key === 'wellnessProtocol' && Array.isArray(val)) {
      return renderValue('titration', val);
    }
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      return (
        <div style={{ padding: '0.75rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0d9488', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{formatKey(key)}</div>
          {Object.entries(val).filter(([k]) => k !== 'label').map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{formatKey(k)}</span>
              <span style={{ fontSize: '0.8rem', color: '#334155', textAlign: 'right', maxWidth: '60%' }}>{String(v)}</span>
            </div>
          ))}
        </div>
      );
    }
    return <span style={{ fontSize: '0.85rem', color: '#334155' }}>{String(val)}</span>;
  };

  const simpleKeys = [];
  const complexKeys = [];

  Object.entries(protocol).forEach(([key, val]) => {
    if (typeof val === 'string' || typeof val === 'boolean') {
      simpleKeys.push([key, val]);
    } else {
      complexKeys.push([key, val]);
    }
  });

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {simpleKeys.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
          {simpleKeys.map(([key, val]) => (
            <div key={key} style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{formatKey(key)}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0c1929', marginTop: '2px' }}>{String(val)}</div>
            </div>
          ))}
        </div>
      )}
      {complexKeys.map(([key, val]) => (
        <div key={key}>
          {typeof val !== 'object' || Array.isArray(val) ? null : (
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{formatKey(key)}</div>
          )}
          {renderValue(key, val)}
        </div>
      ))}
    </div>
  );
}

function formatKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .replace(/([a-z])(\d)/g, '$1 $2')
    .replace(/^(Iv|Subq|SubQ)$/i, m => m.toUpperCase())
    .trim();
}
