import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// Elegant line-art SVG icons
const icons = {
  // Peptide icons
  scale: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6v28M8 14h24M8 14l4 12h-8l4-12M32 14l4 12h-8l4-12"/>
    </svg>
  ),
  target: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="14"/><circle cx="20" cy="20" r="8"/><circle cx="20" cy="20" r="2"/>
    </svg>
  ),
  healing: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="14" width="24" height="12" rx="2"/><path d="M14 14v12M26 14v12M8 20h24"/>
    </svg>
  ),
  cell: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="12"/><circle cx="20" cy="20" r="4"/><path d="M20 8v4M20 28v4M8 20h4M28 20h4"/>
    </svg>
  ),
  hormone: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 30c4-8 6-16 10-16s6 8 10 16"/><circle cx="20" cy="12" r="4"/>
    </svg>
  ),
  youth: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="16" r="10"/><path d="M14 18a6 6 0 0012 0"/><circle cx="16" cy="14" r="1" fill="#0d9488"/><circle cx="24" cy="14" r="1" fill="#0d9488"/><path d="M12 26c2 6 6 8 8 8s6-2 8-8"/>
    </svg>
  ),
  flame: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6c-2 6-8 10-8 18a8 8 0 0016 0c0-8-6-12-8-18z"/><path d="M20 18c-1 3-3 5-3 8a3 3 0 006 0c0-3-2-5-3-8z"/>
    </svg>
  ),
  energy: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="8" width="16" height="24" rx="2"/><path d="M16 8v-2h8v2M18 16h4M18 20h4M18 24h4"/><path d="M20 28v4"/>
    </svg>
  ),
  heart: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 34s-12-8-12-16c0-4 3-8 8-8 3 0 4 2 4 2s1-2 4-2c5 0 8 4 8 8 0 8-12 16-12 16z"/>
    </svg>
  ),
  hourglass: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6h16M12 34h16M14 6c0 8 6 10 6 14s-6 6-6 14M26 6c0 8-6 10-6 14s6 6 6 14"/>
    </svg>
  ),
  copper: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="10"/><path d="M15 20h10M20 15v10"/><circle cx="20" cy="20" r="14"/>
    </svg>
  ),
  muscle: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 24c2-4 4-6 6-6 3 0 4 4 6 4s3-4 6-4c2 0 4 2 6 6"/><path d="M14 18c0-4 2-8 6-8s6 4 6 8"/>
    </svg>
  ),
  metabolism: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="12"/><path d="M14 20c2-4 4-6 6-6s4 2 6 6-4 6-6 6-4-2-6-6"/><circle cx="20" cy="20" r="2" fill="#0d9488"/>
    </svg>
  ),
  // Goal icons
  dumbbell: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 20h24"/><rect x="6" y="14" width="4" height="12" rx="1"/><rect x="30" y="14" width="4" height="12" rx="1"/><rect x="10" y="16" width="4" height="8" rx="1"/><rect x="26" y="16" width="4" height="8" rx="1"/>
    </svg>
  ),
  moon: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 22a10 10 0 11-10-10 8 8 0 0010 10z"/>
    </svg>
  ),
  lightning: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 6L12 22h8l-2 12 10-16h-8l2-12z"/>
    </svg>
  ),
  sparkle: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6v6M20 28v6M6 20h6M28 20h6M10 10l4 4M26 26l4 4M10 30l4-4M26 14l4-4"/>
    </svg>
  ),
  leaf: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 32c0-16 8-24 24-24-4 16-12 24-24 24z"/><path d="M8 32c8-8 16-12 24-24"/>
    </svg>
  ),
  mirror: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="20" cy="16" rx="10" ry="12"/><path d="M16 28v6h8v-6"/><path d="M14 34h12"/>
    </svg>
  ),
  // Benefit icons (use currentColor to inherit from parent)
  crosshair: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="10"/><path d="M20 6v8M20 26v8M6 20h8M26 20h8"/>
    </svg>
  ),
  leafBenefit: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 32c0-16 8-24 24-24-4 16-12 24-24 24z"/><path d="M8 32c8-8 16-12 24-24"/>
    </svg>
  ),
  chart: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 32h28"/><path d="M10 28V18M16 28V14M22 28V20M28 28V10"/>
    </svg>
  ),
  shield: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6l12 4v10c0 8-6 14-12 16-6-2-12-8-12-16V10l12-4z"/><path d="M15 20l3 3 7-7"/>
    </svg>
  ),
  sync: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 14a10 10 0 00-18-4M10 26a10 10 0 0018 4"/><path d="M30 14v-6h6M10 26v6h-6"/>
    </svg>
  ),
  bolt: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 6L12 22h8l-2 12 10-16h-8l2-12z"/>
    </svg>
  ),
};

const BioSync = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeGoal, setActiveGoal] = useState(null);
  const [filterMode, setFilterMode] = useState('category');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Outcome-based goals that map to peptides
  const goals = [
    { id: 'lose-weight', name: 'Lose Weight', icon: 'scale', peptideIds: [1, 2, 7, 13] },
    { id: 'build-muscle', name: 'Build Muscle', icon: 'dumbbell', peptideIds: [5, 6, 12] },
    { id: 'heal-faster', name: 'Heal Faster', icon: 'healing', peptideIds: [3, 4] },
    { id: 'sleep-better', name: 'Sleep Better', icon: 'moon', peptideIds: [5, 6, 10, 12] },
    { id: 'more-energy', name: 'More Energy', icon: 'lightning', peptideIds: [8, 5, 6, 13] },
    { id: 'look-younger', name: 'Look Younger', icon: 'sparkle', peptideIds: [6, 10, 5, 11] },
    { id: 'boost-libido', name: 'Boost Libido', icon: 'heart', peptideIds: [9] },
    { id: 'gut-health', name: 'Gut Health', icon: 'leaf', peptideIds: [3] },
    { id: 'skin-hair', name: 'Skin & Hair', icon: 'mirror', peptideIds: [11] },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Michael R.',
      location: 'Miami, FL',
      rating: 5,
      text: "After 3 months on Semaglutide, I've lost 35 lbs and my energy levels are through the roof. The BioSync team made the whole process seamless.",
      treatment: 'Semaglutide',
      result: 'Lost 35 lbs'
    },
    {
      name: 'Sarah T.',
      location: 'Austin, TX',
      rating: 5,
      text: "BPC-157 helped me recover from a shoulder injury that had been bothering me for years. Within 6 weeks, I was back to full training.",
      treatment: 'BPC-157',
      result: 'Full recovery'
    },
    {
      name: 'David K.',
      location: 'Los Angeles, CA',
      rating: 5,
      text: "The CJC/Ipamorelin stack has transformed my sleep and recovery. I'm 52 and feel like I'm in my 30s again. Highly recommend.",
      treatment: 'CJC-1295 + Ipamorelin',
      result: 'Better sleep & recovery'
    },
    {
      name: 'Jennifer M.',
      location: 'New York, NY',
      rating: 5,
      text: "I was skeptical at first, but the results speak for themselves. Down 28 lbs on Tirzepatide and my blood sugar is finally under control.",
      treatment: 'Tirzepatide',
      result: 'Lost 28 lbs'
    }
  ];

  const whatsappNumber = "18476823968";
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in learning more about peptide therapy at BioSync.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const categories = [
    { id: 'all', name: 'All Therapies' },
    { id: 'weight', name: 'Weight Loss' },
    { id: 'recovery', name: 'Recovery' },
    { id: 'antiaging', name: 'Anti-Aging' },
    { id: 'wellness', name: 'Wellness' }
  ];

  const peptides = [
    {
      id: 1,
      name: 'Semaglutide',
      category: 'weight',
      tagline: 'Revolutionary Weight Management',
      description: 'A GLP-1 receptor agonist that regulates appetite, slows gastric emptying, and promotes significant, sustainable weight loss. FDA-approved and clinically proven.',
      benefits: ['Appetite regulation', 'Blood sugar control', 'Cardiovascular benefits', 'Sustainable results'],
      icon: 'scale'
    },
    {
      id: 2,
      name: 'Tirzepatide',
      category: 'weight',
      tagline: 'Dual-Action Weight Loss',
      description: 'The most advanced weight loss peptide combining GLP-1 and GIP receptor activation for enhanced metabolic effects and superior fat reduction.',
      benefits: ['Dual hormone action', 'Enhanced metabolism', 'Improved insulin sensitivity', 'Greater efficacy'],
      icon: 'target'
    },
    {
      id: 3,
      name: 'BPC-157',
      category: 'recovery',
      tagline: 'The Wolverine Peptide',
      description: 'A naturally-derived gastric peptide renowned for accelerating tissue repair, reducing inflammation, and promoting healing of muscles, tendons, and gut lining.',
      benefits: ['Accelerated healing', 'Gut health restoration', 'Anti-inflammatory', 'Tendon & ligament repair'],
      icon: 'healing'
    },
    {
      id: 4,
      name: 'TB-500',
      category: 'recovery',
      tagline: 'Cellular Regeneration',
      description: 'Thymosin Beta-4 promotes cell migration, blood vessel formation, and collagen deposition for comprehensive tissue repair and enhanced flexibility.',
      benefits: ['Cell regeneration', 'Improved flexibility', 'Wound healing', 'Reduced scarring'],
      icon: 'cell'
    },
    {
      id: 5,
      name: 'CJC-1295 + Ipamorelin',
      category: 'antiaging',
      tagline: 'Growth Hormone Optimization',
      description: 'A synergistic combination that stimulates natural growth hormone release without appetite increase, supporting muscle growth, fat loss, and cellular repair.',
      benefits: ['Natural GH release', 'Improved sleep quality', 'Lean muscle gain', 'Fat metabolism'],
      icon: 'hormone'
    },
    {
      id: 6,
      name: 'Sermorelin',
      category: 'antiaging',
      tagline: 'Restore Your Youth',
      description: "Stimulates the pituitary gland to naturally produce growth hormone, working with your body's rhythm for safer, gradual anti-aging benefits.",
      benefits: ['Natural hormone production', 'Enhanced recovery', 'Mental clarity', 'Skin elasticity'],
      icon: 'youth'
    },
    {
      id: 7,
      name: 'AOD-9604',
      category: 'weight',
      tagline: 'Targeted Fat Burning',
      description: 'A modified growth hormone fragment that specifically targets fat metabolism without affecting blood sugar or promoting tissue growth.',
      benefits: ['Targeted fat loss', 'No blood sugar impact', 'Abdominal fat reduction', 'Cartilage repair'],
      icon: 'flame'
    },
    {
      id: 8,
      name: 'NAD+',
      category: 'wellness',
      tagline: 'Cellular Energy Revival',
      description: 'Essential coenzyme that powers cellular energy production, DNA repair, and metabolic function—declining with age but restorable through therapy.',
      benefits: ['Cellular rejuvenation', 'Mental clarity', 'Energy boost', 'DNA repair'],
      icon: 'energy'
    },
    {
      id: 9,
      name: 'PT-141',
      category: 'wellness',
      tagline: 'Sexual Wellness',
      description: 'Bremelanotide works directly on the nervous system to enhance libido and sexual function in both men and women, addressing desire at its source.',
      benefits: ['Enhanced libido', 'Works on desire', 'Fast-acting', 'Non-hormonal approach'],
      icon: 'heart'
    },
    {
      id: 10,
      name: 'Epithalon',
      category: 'antiaging',
      tagline: 'Longevity Peptide',
      description: 'Activates telomerase to protect and lengthen telomeres—the cellular markers of biological age—promoting longevity at the DNA level.',
      benefits: ['Telomere protection', 'Cellular longevity', 'Sleep improvement', 'Immune support'],
      icon: 'hourglass'
    },
    {
      id: 11,
      name: 'GHK-Cu',
      category: 'antiaging',
      tagline: 'The Blue Repair Peptide',
      description: 'Copper peptide that binds to copper ions to activate cellular regeneration, stimulating repair pathways that restore youthfulness and vitality from within.',
      benefits: ['Collagen & elastin boost', 'Skin repair & healing', 'Hair growth stimulation', 'Reduces fine lines'],
      icon: 'copper'
    },
    {
      id: 12,
      name: 'Ipamorelin',
      category: 'antiaging',
      tagline: 'Selective Growth Hormone Release',
      description: 'A selective growth hormone secretagogue that stimulates natural GH production without affecting cortisol or prolactin levels, ideal for anti-aging and muscle building.',
      benefits: ['Lean muscle growth', 'Improved sleep quality', 'Enhanced fat burning', 'Faster recovery'],
      icon: 'muscle'
    },
    {
      id: 13,
      name: 'MOTS-C',
      category: 'weight',
      tagline: 'Metabolic Optimizer',
      description: 'A mitochondrial-derived peptide that regulates metabolic homeostasis, enhances insulin sensitivity, and promotes fat oxidation for targeted weight management.',
      benefits: ['Accelerates metabolism', 'Targeted fat loss', 'Energy enhancement', 'Metabolic balance'],
      icon: 'metabolism'
    }
  ];

  const faqs = [
    {
      q: 'What is peptide therapy?',
      a: "Peptide therapy uses short chains of amino acids to send specific signals to cells, triggering targeted responses like healing, hormone production, or metabolism regulation. Unlike traditional medications, peptides work with your body's natural processes."
    },
    {
      q: 'How are peptides administered?',
      a: 'Most peptides are administered via subcutaneous injection using very small needles—similar to insulin injections. Some peptides are available as oral supplements or nasal sprays. Your treatment plan will specify the optimal method for your protocol.'
    },
    {
      q: 'How long until I see results?',
      a: "Results vary by peptide and individual. Some patients notice effects within days (BPC-157 for acute injuries), while others see gradual improvements over 8-12 weeks (growth hormone peptides). We'll set realistic expectations during your consultation."
    },
    {
      q: 'Are peptides safe?',
      a: 'When prescribed by qualified physicians and sourced from licensed compounding pharmacies, peptides have excellent safety profiles. All our peptides undergo rigorous quality testing, and we monitor your progress with regular lab work.'
    },
    {
      q: 'Can peptides be combined with other treatments?',
      a: 'Yes! Many peptides work synergistically together and can complement hormone replacement therapy, weight loss programs, and athletic performance protocols. We design comprehensive plans tailored to your goals.'
    }
  ];

  // Filter peptides based on active filter mode
  const filteredPeptides = filterMode === 'goal' && activeGoal
    ? peptides.filter(p => goals.find(g => g.id === activeGoal)?.peptideIds.includes(p.id))
    : activeCategory === 'all'
      ? peptides
      : peptides.filter(p => p.category === activeCategory);

  return (
    <>
      <Head>
        <title>BioSync - Advanced Peptide Therapy</title>
        <meta name="description" content="Experience precision medicine with physician-guided peptide protocols. From accelerated healing to optimized metabolism, we help you achieve measurable results backed by science." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        backgroundColor: '#fafbfc',
        color: '#1a2332',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
        {/* Navigation */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '1rem 2rem',
          transition: 'all 0.3s ease',
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: isScrolled ? '#0f766e' : 'white',
              letterSpacing: '-0.02em'
            }}>
              Bio<span style={{ color: '#14b8a6' }}>Sync</span>
            </div>
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
              {['Results', 'Therapies', 'Benefits', 'FAQ'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link"
                  style={{
                    color: isScrolled ? '#1a2332' : 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}
                >
                  {item}
                </a>
              ))}
              <a
                href="/products"
                className="nav-link"
                style={{
                  color: isScrolled ? '#1a2332' : 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em'
                }}
              >
                Catalog
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Start Consultation
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-gradient" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }} className="float" />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }} />

          {/* DNA Helix Pattern */}
          <div style={{
            position: 'absolute',
            right: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.1
          }}>
            <svg width="200" height="400" viewBox="0 0 200 400">
              {[...Array(20)].map((_, i) => (
                <g key={i}>
                  <circle cx={100 + Math.sin(i * 0.5) * 50} cy={i * 20} r="4" fill="#14b8a6"/>
                  <circle cx={100 - Math.sin(i * 0.5) * 50} cy={i * 20} r="4" fill="#14b8a6"/>
                  <line
                    x1={100 + Math.sin(i * 0.5) * 50}
                    y1={i * 20}
                    x2={100 - Math.sin(i * 0.5) * 50}
                    y2={i * 20}
                    stroke="#14b8a6"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </g>
              ))}
            </svg>
          </div>

          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '8rem 2rem 4rem',
            position: 'relative',
            zIndex: 1
          }}>
            <div className="animate-in" style={{ maxWidth: '800px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(20, 184, 166, 0.15)',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                border: '1px solid rgba(20, 184, 166, 0.3)'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: '#14b8a6',
                  borderRadius: '50%'
                }} className="pulse" />
                <span style={{
                  color: '#5eead4',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Advanced Peptide Therapy
                </span>
              </div>

              <h1 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 600,
                color: 'white',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>
                Unlock Your Body&apos;s
                <br />
                <span style={{ color: '#5eead4' }}>Full Potential</span>
              </h1>

              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '600px'
              }}>
                Experience precision medicine with physician-guided peptide protocols.
                From accelerated healing to optimized metabolism, we help you achieve
                measurable results backed by science.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn"
                  style={{
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Schedule Free Consultation
                </a>
                <a
                  href="#therapies"
                  style={{
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                  }}
                  onMouseOut={e => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                  }}
                >
                  Explore Therapies
                </a>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem',
              marginTop: '5rem',
              paddingTop: '3rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {[
                { value: '10+', label: 'Peptide Therapies' },
                { value: '98%', label: 'Patient Satisfaction' },
                { value: '5000+', label: 'Patients Treated' },
                { value: '24/7', label: 'Support Available' }
              ].map((stat, i) => (
                <div key={i} className="animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: '#5eead4',
                    fontFamily: '"DM Sans", sans-serif'
                  }}>{stat.value}</div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.9rem',
                    marginTop: '0.25rem'
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="results" style={{
          padding: '5rem 2rem',
          background: 'white'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{
                color: '#0d9488',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>Real Results</span>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: '#1a2332',
                marginTop: '0.5rem'
              }}>
                What Our <span className="gradient-text">Patients Say</span>
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="card-hover"
                  style={{
                    padding: '2rem',
                    background: '#f8fafc',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    position: 'relative'
                  }}
                >
                  {/* Quote mark */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.5rem',
                    fontSize: '4rem',
                    color: '#0d9488',
                    opacity: 0.1,
                    fontFamily: 'serif',
                    lineHeight: 1
                  }}>&quot;</div>

                  {/* Stars */}
                  <div style={{ marginBottom: '1rem' }}>
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <span key={j} style={{ color: '#fbbf24', fontSize: '1.1rem' }}>&#9733;</span>
                    ))}
                  </div>

                  <p style={{
                    color: '#475569',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                    fontStyle: 'italic'
                  }}>&quot;{testimonial.text}&quot;</p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '1rem'
                  }}>
                    <div>
                      <div style={{
                        fontWeight: 600,
                        color: '#1a2332',
                        fontSize: '1rem'
                      }}>{testimonial.name}</div>
                      <div style={{
                        color: '#64748b',
                        fontSize: '0.85rem'
                      }}>{testimonial.location}</div>
                    </div>
                    <div style={{
                      background: 'rgba(13, 148, 136, 0.1)',
                      color: '#0d9488',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>{testimonial.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose BioSync Section */}
        <section id="why-biosync" style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}>
              {/* Left side - Product Image */}
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)'
                }} />
                <img
                  src="/images/biosync-vials.png"
                  alt="BioSync Peptide Vials - Epithalon, BPC-157, TB-500"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: '20px'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Right side - Trust signals */}
              <div>
                <span style={{
                  color: '#0d9488',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>Why Choose BioSync</span>
                <h2 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: 600,
                  color: '#1a2332',
                  marginTop: '0.5rem',
                  marginBottom: '1.5rem',
                  lineHeight: 1.2
                }}>
                  Premium Quality,
                  <br />
                  <span className="gradient-text">Trusted Results</span>
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { icon: '✓', title: '99% Purity Guaranteed', desc: 'All peptides tested and verified for maximum potency' },
                    { icon: '✓', title: 'FDA-Registered Pharmacies', desc: 'Sourced exclusively from licensed US compounding pharmacies' },
                    { icon: '✓', title: 'Board-Certified Physicians', desc: 'Every protocol designed and monitored by specialists' },
                    { icon: '✓', title: 'Personalized Protocols', desc: 'Treatment plans tailored to your unique biology and goals' },
                    { icon: '✓', title: 'Ongoing Lab Monitoring', desc: 'Regular bloodwork to track progress and optimize results' },
                    { icon: '✓', title: 'Discreet Shipping', desc: 'Fast, private delivery directly to your door' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        flexShrink: 0
                      }}>{item.icon}</div>
                      <div>
                        <div style={{
                          fontWeight: 600,
                          color: '#1a2332',
                          fontSize: '1rem',
                          marginBottom: '0.25rem'
                        }}>{item.title}</div>
                        <div style={{
                          color: '#64748b',
                          fontSize: '0.9rem',
                          lineHeight: 1.5
                        }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '2rem',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Get Started Today
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Peptide Therapies Section */}
        <section id="therapies" style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{
                color: '#0d9488',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>Our Therapies</span>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: '#1a2332',
                marginTop: '0.5rem',
                marginBottom: '1rem'
              }}>
                Explore Peptide <span className="gradient-text">Solutions</span>
              </h2>
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                From weight management to cellular regeneration, discover the peptide
                therapy that aligns with your health goals.
              </p>
            </div>

            {/* Filter Mode Toggle */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <button
                onClick={() => { setFilterMode('category'); setActiveGoal(null); }}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: filterMode === 'category' ? '#1a2332' : '#e2e8f0',
                  color: filterMode === 'category' ? 'white' : '#64748b',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                By Category
              </button>
              <button
                onClick={() => { setFilterMode('goal'); setActiveCategory('all'); }}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: filterMode === 'goal' ? '#1a2332' : '#e2e8f0',
                  color: filterMode === 'goal' ? 'white' : '#64748b',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                By Goal
              </button>
            </div>

            {/* Category Filter */}
            {filterMode === 'category' && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '3rem',
                flexWrap: 'wrap'
              }}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '50px',
                      border: activeCategory === cat.id ? 'none' : '1px solid #e2e8f0',
                      background: activeCategory === cat.id ? '' : 'white',
                      color: activeCategory === cat.id ? 'white' : '#64748b',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            {/* Goal Filter */}
            {filterMode === 'goal' && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '3rem',
                flexWrap: 'wrap'
              }}>
                {goals.map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => setActiveGoal(activeGoal === goal.id ? null : goal.id)}
                    className={`category-btn ${activeGoal === goal.id ? 'active' : ''}`}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '50px',
                      border: activeGoal === goal.id ? 'none' : '1px solid #e2e8f0',
                      background: activeGoal === goal.id ? '' : 'white',
                      color: activeGoal === goal.id ? 'white' : '#64748b',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {React.cloneElement(icons[goal.icon], { width: 20, height: 20, stroke: activeGoal === goal.id ? 'white' : '#0d9488' })}
                    </span>
                    {goal.name}
                  </button>
                ))}
              </div>
            )}

            {/* Peptide Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredPeptides.map((peptide) => (
                <div
                  key={peptide.id}
                  className="card-hover glass"
                  style={{
                    padding: '2rem',
                    borderRadius: '20px',
                    background: 'white',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icons[peptide.icon]}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#0d9488',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      background: 'rgba(13, 148, 136, 0.1)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '50px'
                    }}>
                      {categories.find(c => c.id === peptide.category)?.name}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#1a2332',
                    marginBottom: '0.25rem'
                  }}>{peptide.name}</h3>

                  <p style={{
                    fontSize: '0.9rem',
                    color: '#0d9488',
                    fontWeight: 500,
                    marginBottom: '1rem'
                  }}>{peptide.tagline}</p>

                  <p style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem'
                  }}>{peptide.description}</p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {peptide.benefits.map((benefit, j) => (
                      <span
                        key={j}
                        style={{
                          fontSize: '0.8rem',
                          color: '#475569',
                          background: '#f1f5f9',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '50px'
                        }}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(135deg, #0c1929 0%, #1e3a5f 50%, #0f4c5c 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.5
          }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{
                color: '#5eead4',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>Benefits</span>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: 'white',
                marginTop: '0.5rem'
              }}>
                Why Choose <span style={{ color: '#5eead4' }}>Peptide Therapy?</span>
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {[
                {
                  icon: 'crosshair',
                  title: 'Targeted Action',
                  desc: 'Peptides work on specific cellular pathways, minimizing off-target effects unlike broad-spectrum medications.'
                },
                {
                  icon: 'leafBenefit',
                  title: 'Natural Approach',
                  desc: "Work with your body's existing systems to stimulate natural healing and hormone production."
                },
                {
                  icon: 'chart',
                  title: 'Measurable Results',
                  desc: 'Track progress through regular lab work and biomarker monitoring for data-driven optimization.'
                },
                {
                  icon: 'shield',
                  title: 'Excellent Safety',
                  desc: 'When properly prescribed, peptides have minimal side effects compared to synthetic alternatives.'
                },
                {
                  icon: 'sync',
                  title: 'Synergistic Effects',
                  desc: 'Combine multiple peptides strategically for enhanced, complementary benefits.'
                },
                {
                  icon: 'bolt',
                  title: 'Fast Acting',
                  desc: 'Many patients notice improvements within days to weeks, depending on the therapy.'
                }
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '2rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div style={{
                    marginBottom: '1rem',
                    color: '#5eead4'
                  }}>{icons[item.icon]}</div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: '0.75rem'
                  }}>{item.title}</h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.7
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" style={{
          padding: '6rem 2rem',
          background: 'white'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{
                color: '#0d9488',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>How It Works</span>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: '#1a2332',
                marginTop: '0.5rem'
              }}>
                Your Journey to <span className="gradient-text">Optimization</span>
              </h2>
            </div>

            <div style={{ position: 'relative' }}>
              {/* Vertical Line */}
              <div style={{
                position: 'absolute',
                left: '24px',
                top: '40px',
                bottom: '40px',
                width: '2px',
                background: 'linear-gradient(180deg, #14b8a6, #0f766e)',
                borderRadius: '2px'
              }} />

              {[
                {
                  step: '01',
                  title: 'Free Consultation',
                  desc: 'Connect with us via WhatsApp to discuss your health goals, medical history, and determine if peptide therapy is right for you.',
                  time: '15-30 minutes'
                },
                {
                  step: '02',
                  title: 'Comprehensive Lab Work',
                  desc: 'We order targeted bloodwork including hormone panels, metabolic markers, and relevant biomarkers to establish your baseline.',
                  time: '1-2 days'
                },
                {
                  step: '03',
                  title: 'Personalized Protocol',
                  desc: 'Your physician designs a custom peptide protocol based on your labs, goals, and lifestyle. We explain everything before you start.',
                  time: 'Same week'
                },
                {
                  step: '04',
                  title: 'Treatment & Monitoring',
                  desc: 'Receive your peptides with clear instructions. We schedule follow-up labs at 8-12 weeks and adjust your protocol as needed.',
                  time: 'Ongoing support'
                }
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '2rem',
                    marginBottom: i < 3 ? '3rem' : 0,
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    flexShrink: 0,
                    zIndex: 1
                  }}>
                    {item.step}
                  </div>
                  <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#1a2332'
                      }}>{item.title}</h3>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#0d9488',
                        background: 'rgba(13, 148, 136, 0.1)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '50px'
                      }}>{item.time}</span>
                    </div>
                    <p style={{
                      color: '#64748b',
                      lineHeight: 1.7
                    }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" style={{
          padding: '6rem 2rem',
          background: '#f8fafc'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{
                color: '#0d9488',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>FAQ</span>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: '#1a2332',
                marginTop: '0.5rem'
              }}>
                Common <span className="gradient-text">Questions</span>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="faq-item"
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#1a2332'
                    }}>{faq.q}</span>
                    <span style={{
                      color: '#0d9488',
                      fontSize: '1.5rem',
                      fontWeight: 300,
                      transition: 'transform 0.3s ease',
                      transform: expandedFaq === i ? 'rotate(45deg)' : 'none'
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: expandedFaq === i ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease'
                  }}>
                    <p style={{
                      padding: '0 1.5rem 1.5rem',
                      color: '#64748b',
                      lineHeight: 1.7
                    }}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Doctor Image */}
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'relative',
                maxWidth: '350px'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: '-10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  transform: 'rotate(-3deg)'
                }} />
                <img
                  src="/images/doctor.png"
                  alt="BioSync Medical Specialist"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
                  }}
                  onError={(e) => {
                    e.target.parentElement.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* CTA Content */}
            <div style={{ textAlign: 'left' }}>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 600,
                color: 'white',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}>
                Ready to Transform
                <br />Your Health?
              </h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Connect directly with our medical team on WhatsApp. Get personalized
                guidance and start your peptide therapy journey today.
              </p>

              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#5eead4', fontSize: '1.25rem' }}>&#10003;</span>
                  <span style={{ color: 'white', fontWeight: 500 }}>Free consultation - no obligation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#5eead4', fontSize: '1.25rem' }}>&#10003;</span>
                  <span style={{ color: 'white', fontWeight: 500 }}>Response within 2 hours</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: '#5eead4', fontSize: '1.25rem' }}>&#10003;</span>
                  <span style={{ color: 'white', fontWeight: 500 }}>Board-certified specialists</span>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 2.5rem',
                  background: 'white',
                  color: '#0f766e',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={e => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat with Us Now
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '3rem 2rem',
          background: '#0c1929',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center'
        }}>
          <div style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'white',
            marginBottom: '1rem'
          }}>
            Bio<span style={{ color: '#14b8a6' }}>Sync</span>
          </div>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            Precision Peptide Therapy - Physician-Guided Protocols
          </p>
          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            2026 BioSync Health. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            Disclaimer: The information provided is for educational purposes only and is not intended as
            medical advice. Consult with a qualified healthcare provider before starting any treatment.
          </p>
        </footer>

        {/* Desktop Floating WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp whatsapp-btn desktop-only-cta"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)'
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        {/* Mobile Sticky CTA Bar */}
        <div className="mobile-sticky-cta" style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
          padding: '1rem',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
          display: 'none'
        }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Get Free Consultation
          </a>
        </div>
      </div>
    </>
  );
};

export default BioSync;
