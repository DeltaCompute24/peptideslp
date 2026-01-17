import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { peptideProducts } from '../data/peptideProducts';

const ProductCatalog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'weight', name: 'Weight Loss' },
    { id: 'recovery', name: 'Recovery' },
    { id: 'antiaging', name: 'Anti-Aging' },
    { id: 'wellness', name: 'Wellness' }
  ];

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'single', name: 'Single Peptides' },
    { id: 'blend', name: 'Peptide Blends' }
  ];

  // Filter products
  const filteredProducts = peptideProducts.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesType = activeType === 'all' || product.type === activeType;
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesType && matchesSearch;
  });

  const whatsappNumber = "18476823968";
  const getWhatsappLink = (productName) => {
    const message = encodeURIComponent(`Hi! I'm interested in learning more about ${productName} from BioSync.`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <>
      <Head>
        <title>Product Catalog - BioSync Peptide Therapy</title>
        <meta name="description" content="Browse our comprehensive catalog of pharmaceutical-grade peptide therapies. Research-grade peptides with 99% purity, complete specifications, and detailed documentation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        .vial-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .vial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .blend-badge {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .stock-badge {
          background: #10b981;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow-y: auto;
        }
        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        @media (max-width: 768px) {
          .modal-content {
            max-height: 95vh;
            margin: 1rem;
          }
        }
      `}</style>

      <div style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        backgroundColor: '#fafbfc',
        minHeight: '100vh'
      }}>
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '1rem 2rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link href="/" style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: '#0f766e',
              textDecoration: 'none',
              letterSpacing: '-0.02em'
            }}>
              Bio<span style={{ color: '#14b8a6' }}>Sync</span>
            </Link>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link href="/" style={{
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'color 0.3s ease'
              }}>
                Home
              </Link>
              <Link href="/products" style={{
                color: '#0f766e',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 600
              }}>
                Products
              </Link>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section style={{
          background: 'linear-gradient(135deg, #0c1929 0%, #134e4a 50%, #0f766e 100%)',
          padding: '4rem 2rem 3rem',
          color: 'white'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Product <span style={{ color: '#5eead4' }}>Catalog</span>
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '700px',
              lineHeight: 1.7
            }}>
              Pharmaceutical-grade peptide therapies with complete specifications,
              batch documentation, and 99% purity guarantee. All products are for research use only.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section style={{
          padding: '2rem',
          background: 'white',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Search */}
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="Search peptides by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1.25rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Category Filters */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Category
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: '50px',
                      border: activeCategory === cat.id ? 'none' : '2px solid #e2e8f0',
                      background: activeCategory === cat.id ? 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)' : 'white',
                      color: activeCategory === cat.id ? 'white' : '#64748b',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filters */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Type
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {types.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: '50px',
                      border: activeType === type.id ? 'none' : '2px solid #e2e8f0',
                      background: activeType === type.id ? 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)' : 'white',
                      color: activeType === type.id ? 'white' : '#64748b',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div style={{
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: '#64748b'
            }}>
              Showing <strong style={{ color: '#0f766e' }}>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="vial-card"
                onClick={() => setSelectedProduct(product)}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '2px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Header Badges */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.type === 'blend' && (
                      <span className="blend-badge">BLEND</span>
                    )}
                    {product.inStock && (
                      <span className="stock-badge">In Stock</span>
                    )}
                  </div>
                  {product.featured && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="#f59e0b">
                      <path d="M10 1l2.5 6.5L19 8l-5 4.5L15.5 19 10 15l-5.5 4L6 12.5 1 8l6.5-.5L10 1z"/>
                    </svg>
                  )}
                </div>

                {/* Vial Image (if available) */}
                {product.image && (
                  <div style={{
                    marginBottom: '1rem',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#f8fafc',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <img
                      src={product.image}
                      alt={`${product.name} vial`}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: '250px',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Product Name & Batch */}
                <div style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginBottom: '1rem',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Logo */}
                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    opacity: 0.7,
                    letterSpacing: '0.05em'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }}>
                      <path d="M10 2L2 6v6c0 5 4 8 8 8s8-3 8-8V6l-8-4z"/>
                    </svg>
                    BioSync Peptide
                  </div>

                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '0.25rem',
                    color: 'white'
                  }}>{product.name}</h3>

                  <div style={{
                    fontSize: '0.75rem',
                    opacity: 0.7,
                    marginBottom: '0.5rem'
                  }}>
                    Batch: {product.batchNumber}
                  </div>

                  {/* Purity & Amount */}
                  {product.specifications && (
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '0.8rem',
                      marginTop: '0.75rem'
                    }}>
                      <div>
                        <div style={{ opacity: 0.6, fontSize: '0.7rem' }}>Purity</div>
                        <div style={{ fontWeight: 700 }}>{product.specifications.purity}</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.6, fontSize: '0.7rem' }}>Amount</div>
                        <div style={{ fontWeight: 700 }}>
                          {product.type === 'blend'
                            ? product.specifications.totalAmount
                            : product.specifications.concentration}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tagline */}
                <p style={{
                  fontSize: '0.9rem',
                  color: '#0d9488',
                  fontWeight: 600,
                  marginBottom: '0.75rem'
                }}>{product.tagline}</p>

                {/* Description */}
                <p style={{
                  fontSize: '0.9rem',
                  color: '#64748b',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>{product.description}</p>

                {/* Composition (for blends) */}
                {product.composition && (
                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ fontWeight: 600, color: '#1a2332', marginBottom: '0.5rem' }}>
                      Composition:
                    </div>
                    {product.composition.map((comp, i) => (
                      <div key={i} style={{ color: '#64748b', marginBottom: '0.25rem' }}>
                        • {comp.name} {comp.dosage}
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1.25rem',
                      background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                      color: 'white',
                      borderRadius: '50px',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    View Details & Inquire
                  </button>
                </div>

                {/* Research Use Only */}
                {product.researchUseOnly && (
                  <div style={{
                    marginTop: '1rem',
                    fontSize: '0.7rem',
                    color: '#94a3b8',
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>
                    Research use only • Not for human or veterinary use
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#64748b'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a2332' }}>
                No products found
              </h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </section>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: '#64748b',
                  zIndex: 1,
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#e2e8f0';
                  e.target.style.color = '#1a2332';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#f1f5f9';
                  e.target.style.color = '#64748b';
                }}
              >
                ×
              </button>

              {/* Modal Header */}
              <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                padding: '2.5rem 2rem',
                color: 'white'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {selectedProduct.type === 'blend' && (
                    <span className="blend-badge">BLEND</span>
                  )}
                  {selectedProduct.inStock && (
                    <span className="stock-badge">In Stock</span>
                  )}
                  {selectedProduct.featured && (
                    <span style={{
                      background: '#f59e0b',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}>FEATURED</span>
                  )}
                </div>

                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>{selectedProduct.name}</h2>

                <p style={{
                  fontSize: '1.1rem',
                  color: '#5eead4',
                  fontWeight: 600,
                  marginBottom: '1rem'
                }}>{selectedProduct.tagline}</p>

                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  fontSize: '0.9rem',
                  opacity: 0.8
                }}>
                  <div>
                    <span style={{ opacity: 0.7 }}>Batch:</span>{' '}
                    <strong>{selectedProduct.batchNumber}</strong>
                  </div>
                  <div>
                    <span style={{ opacity: 0.7 }}>Cat:</span>{' '}
                    <strong>{categories.find(c => c.id === selectedProduct.category)?.name}</strong>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '2rem' }}>
                {/* Description */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1a2332',
                    marginBottom: '0.75rem'
                  }}>Description</h3>
                  <p style={{
                    color: '#64748b',
                    lineHeight: 1.8,
                    fontSize: '1rem'
                  }}>{selectedProduct.description}</p>
                </div>

                {/* Benefits */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1a2332',
                    marginBottom: '0.75rem'
                  }}>Key Benefits</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {selectedProduct.benefits.map((benefit, i) => (
                      <div key={i} style={{
                        background: '#f8fafc',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: '#475569'
                      }}>
                        <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Composition (for blends) */}
                {selectedProduct.composition && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1a2332',
                      marginBottom: '0.75rem'
                    }}>Composition</h3>
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      border: '2px solid #e2e8f0'
                    }}>
                      {selectedProduct.composition.map((comp, i) => (
                        <div key={i} style={{
                          marginBottom: i < selectedProduct.composition.length - 1 ? '1.5rem' : 0,
                          paddingBottom: i < selectedProduct.composition.length - 1 ? '1.5rem' : 0,
                          borderBottom: i < selectedProduct.composition.length - 1 ? '1px solid #e2e8f0' : 'none'
                        }}>
                          <div style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#0f766e',
                            marginBottom: '0.5rem'
                          }}>
                            {comp.name} - {comp.dosage}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            <div>CAS: {comp.casNumber}</div>
                            <div>Formula: {comp.molecularFormula}</div>
                            <div>MW: {comp.molecularWeight}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {selectedProduct.specifications && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1a2332',
                      marginBottom: '0.75rem'
                    }}>Specifications</h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '1rem'
                    }}>
                      {!selectedProduct.composition && selectedProduct.specifications.casNumber && (
                        <div style={{
                          background: '#f8fafc',
                          padding: '1rem',
                          borderRadius: '8px'
                        }}>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            CAS Number
                          </div>
                          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1a2332' }}>
                            {selectedProduct.specifications.casNumber}
                          </div>
                        </div>
                      )}
                      {!selectedProduct.composition && selectedProduct.specifications.molecularFormula && (
                        <div style={{
                          background: '#f8fafc',
                          padding: '1rem',
                          borderRadius: '8px'
                        }}>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Molecular Formula
                          </div>
                          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1a2332', fontFamily: 'monospace' }}>
                            {selectedProduct.specifications.molecularFormula}
                          </div>
                        </div>
                      )}
                      {!selectedProduct.composition && selectedProduct.specifications.molecularWeight && (
                        <div style={{
                          background: '#f8fafc',
                          padding: '1rem',
                          borderRadius: '8px'
                        }}>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Molecular Weight
                          </div>
                          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1a2332' }}>
                            {selectedProduct.specifications.molecularWeight}
                          </div>
                        </div>
                      )}
                      <div style={{
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '8px'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Purity
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>
                          {selectedProduct.specifications.purity}
                        </div>
                      </div>
                      <div style={{
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '8px'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {selectedProduct.type === 'blend' ? 'Total Amount' : 'Concentration'}
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1a2332' }}>
                          {selectedProduct.type === 'blend'
                            ? selectedProduct.specifications.totalAmount
                            : selectedProduct.specifications.concentration}
                        </div>
                      </div>
                      <div style={{
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '8px'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Appearance
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1a2332' }}>
                          {selectedProduct.specifications.appearance}
                        </div>
                      </div>
                      <div style={{
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '8px'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Storage
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1a2332' }}>
                          {selectedProduct.specifications.storage}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dosage Information */}
                {selectedProduct.dosage && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1a2332',
                      marginBottom: '0.75rem'
                    }}>Dosage Guidelines</h3>
                    <div style={{
                      background: '#fef3c7',
                      border: '2px solid #fbbf24',
                      borderRadius: '12px',
                      padding: '1.5rem'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        fontSize: '0.9rem',
                        color: '#78350f'
                      }}>
                        {selectedProduct.dosage.typical && (
                          <div>
                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                              Typical Dose:
                            </strong>
                            {selectedProduct.dosage.typical}
                          </div>
                        )}
                        {selectedProduct.dosage.starting && (
                          <div>
                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                              Starting Dose:
                            </strong>
                            {selectedProduct.dosage.starting}
                          </div>
                        )}
                        {selectedProduct.dosage.administration && (
                          <div>
                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                              Administration:
                            </strong>
                            {selectedProduct.dosage.administration}
                          </div>
                        )}
                        {selectedProduct.dosage.duration && (
                          <div>
                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                              Duration:
                            </strong>
                            {selectedProduct.dosage.duration}
                          </div>
                        )}
                      </div>
                      {(selectedProduct.dosage.protocol || selectedProduct.dosage.frequency || selectedProduct.dosage.timing) && (
                        <div style={{
                          marginTop: '1rem',
                          paddingTop: '1rem',
                          borderTop: '1px solid #fbbf24'
                        }}>
                          {selectedProduct.dosage.protocol && <div style={{ marginBottom: '0.5rem' }}><strong>Protocol:</strong> {selectedProduct.dosage.protocol}</div>}
                          {selectedProduct.dosage.frequency && <div style={{ marginBottom: '0.5rem' }}><strong>Frequency:</strong> {selectedProduct.dosage.frequency}</div>}
                          {selectedProduct.dosage.timing && <div><strong>Timing:</strong> {selectedProduct.dosage.timing}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Research Data */}
                {selectedProduct.researchData && selectedProduct.researchData.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1a2332',
                      marginBottom: '0.75rem'
                    }}>Research Highlights</h3>
                    <div style={{
                      background: '#eff6ff',
                      border: '2px solid #3b82f6',
                      borderRadius: '12px',
                      padding: '1.5rem'
                    }}>
                      {selectedProduct.researchData.map((item, i) => (
                        <div key={i} style={{
                          color: '#1e40af',
                          marginBottom: i < selectedProduct.researchData.length - 1 ? '0.75rem' : 0,
                          display: 'flex',
                          gap: '0.75rem',
                          fontSize: '0.95rem',
                          lineHeight: 1.6
                        }}>
                          <span style={{ color: '#3b82f6', flexShrink: 0 }}>•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contraindications */}
                {selectedProduct.contraindications && selectedProduct.contraindications.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1a2332',
                      marginBottom: '0.75rem'
                    }}>Contraindications</h3>
                    <div style={{
                      background: '#fee2e2',
                      border: '2px solid #ef4444',
                      borderRadius: '12px',
                      padding: '1.5rem'
                    }}>
                      {selectedProduct.contraindications.map((item, i) => (
                        <div key={i} style={{
                          color: '#7f1d1d',
                          marginBottom: i < selectedProduct.contraindications.length - 1 ? '0.75rem' : 0,
                          display: 'flex',
                          gap: '0.75rem',
                          fontSize: '0.95rem',
                          lineHeight: 1.6
                        }}>
                          <span style={{ color: '#ef4444', flexShrink: 0 }}>⚠</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Consultation CTA */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '1.1rem',
                    color: '#1a2332',
                    marginBottom: '1.5rem',
                    fontWeight: 600
                  }}>
                    Interested in {selectedProduct.name}?
                  </div>
                  <a
                    href={getWhatsappLink(selectedProduct.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 2rem',
                      background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                      color: 'white',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Contact Us for Pricing & Availability
                  </a>
                </div>

                {/* Disclaimer */}
                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: '#fafbfc',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  color: '#64748b',
                  lineHeight: 1.6,
                  fontStyle: 'italic'
                }}>
                  <strong style={{ color: '#1a2332', fontStyle: 'normal' }}>Disclaimer:</strong> This product is for research use only and is not intended for human or veterinary use. The information provided is for educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider before starting any treatment.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCatalog;
