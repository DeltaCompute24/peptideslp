import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

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

// Parse markdown-like formatting to simple HTML
function formatMessage(text) {
  return text
    // Completely remove protocol JSON blocks (closed or truncated/unclosed)
    .replace(/```protocol\s*\n?[\s\S]*?(```|$)/g, '')
    // Also remove bare JSON blocks that look like protocol data
    .replace(/```\s*\n?\s*\{[\s\S]*?"clientName"[\s\S]*?(```|$)/g, '')
    // Remove any remaining raw JSON protocol (no fences, closed or truncated)
    .replace(/\{\s*\n?\s*"clientName"[\s\S]*/g, '')
    .replace(/```[\s\S]*?```/g, (m) => `<pre>${m.slice(3, -3)}</pre>`)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

// Extract protocol JSON from message
function extractProtocol(text) {
  // Try fenced protocol block first (closed)
  const fenced = text.match(/```protocol\s*\n([\s\S]*?)\n```/);
  if (fenced) {
    try { return JSON.parse(fenced[1]); } catch {}
  }
  // Try fenced protocol block (unclosed / truncated)
  const unclosed = text.match(/```protocol\s*\n?([\s\S]*)/);
  if (unclosed) {
    try { return JSON.parse(unclosed[1].replace(/```\s*$/, '').trim()); } catch {}
  }
  // Try any fenced JSON block
  const anyFenced = text.match(/```\s*\n?\s*(\{[\s\S]*?"clientName"[\s\S]*?\})\s*\n?```/);
  if (anyFenced) {
    try { return JSON.parse(anyFenced[1]); } catch {}
  }
  // Try bare JSON with clientName
  const bare = text.match(/(\{\s*"clientName"[\s\S]*)/);
  if (bare) {
    let json = bare[1].replace(/```\s*$/, '').trim();
    try { return JSON.parse(json); } catch {}
  }
  return null;
}

export default function Wizard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [protocolData, setProtocolData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedUrl, setSavedUrl] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setStreamingText('');

    try {
      const res = await fetch('/api/wizard/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to get response');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                setStreamingText(fullText);
              }
              if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch (e) {
              if (e.message !== 'Unexpected end of JSON input') {
                // ignore parse errors from partial chunks
              }
            }
          }
        }
      }

      const assistantMsg = { role: 'assistant', content: fullText };
      setMessages([...newMessages, assistantMsg]);
      setStreamingText('');

      // Check if protocol was generated
      const protocol = extractProtocol(fullText);
      if (protocol) {
        setProtocolData(protocol);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errMsg = err.message || '';
      const userFriendly = errMsg.includes('credit balance') || errMsg.includes('billing') || errMsg.includes('429') || errMsg.includes('rate')
        ? 'Our protocol advisor is temporarily unavailable. Please try again in a few minutes, or contact us via WhatsApp for personalized recommendations.'
        : 'Something went wrong. Please try again.';
      setMessages([...newMessages, { role: 'assistant', content: userFriendly }]);
      setStreamingText('');
    }

    setLoading(false);
  };

  const handleSaveProtocol = async () => {
    if (!protocolData || saving) return;
    setSaving(true);

    try {
      const res = await fetch('/api/wizard/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ protocol: protocolData }),
      });

      if (!res.ok) throw new Error('Failed to save');
      const { slug, url } = await res.json();
      setSavedUrl(url);
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save protocol. Please try again.');
    }
    setSaving(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Head>
        <title>Protocol Wizard | BioSync Peptides</title>
        <meta name="description" content="Build your personalized peptide protocol with AI-powered guidance from BioSync Peptides." />
      </Head>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0c1929 0%, #122438 50%, #0c1929 100%)', fontFamily: '"DM Sans", sans-serif', display: 'flex', flexDirection: 'column' }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <Link href="/" style={{ textDecoration: 'none' }}><BioSyncLogo color="white" /></Link>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/products" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>Catalog</Link>
            <Link href="/ebook" style={{ color: '#8896a7', textDecoration: 'none', fontSize: '0.9rem' }}>E-Book</Link>
          </div>
        </nav>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 800, width: '100%', margin: '0 auto', padding: '0 1rem' }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 0' }}>
            {/* Welcome message */}
            {messages.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '1rem', background: 'rgba(13,148,136,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
                    <path d="M9 3v7l-4 9h14l-4-9V3M9 3h6"/>
                    <circle cx="12" cy="21" r="1" fill="#0d9488"/>
                  </svg>
                </div>
                <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', fontWeight: 700, color: '#fff', margin: '0 0 0.75rem' }}>
                  Protocol Wizard
                </h1>
                <p style={{ color: '#8896a7', fontSize: '1rem', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.7 }}>
                  Tell me your goals and I'll build a personalized peptide protocol. I know every product in our catalog, dosing protocols, and the latest research.
                </p>

                {/* Quick start suggestions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  {[
                    'I want to lose weight safely',
                    'I need a recovery protocol for a knee injury',
                    'I want an anti-aging stack',
                    'I have 5mg of BPC-157 — what should I do?',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => { setInput(suggestion); }}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#8896a7',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.target.style.background = 'rgba(13,148,136,0.1)'; e.target.style.borderColor = 'rgba(13,148,136,0.3)'; e.target.style.color = '#0d9488'; }}
                      onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = '#8896a7'; }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: 32, height: 32, borderRadius: '0.5rem', background: 'rgba(13,148,136,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 100 100">
                      <circle cx="48" cy="50" r="19" fill="#0d9488"/>
                      <circle cx="80" cy="24" r="6" fill="#0d9488"/>
                      <circle cx="84" cy="66" r="6" fill="#0d9488"/>
                    </svg>
                  </div>
                )}
                <div style={{
                  maxWidth: '85%',
                  padding: '1rem 1.25rem',
                  borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #0d9488, #10b981)' : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                }}>
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div
                      className="assistant-msg"
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Streaming text */}
            {streamingText && (
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 32, height: 32, borderRadius: '0.5rem', background: 'rgba(13,148,136,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                  <svg width="16" height="16" viewBox="0 0 100 100">
                    <circle cx="48" cy="50" r="19" fill="#0d9488"/>
                    <circle cx="80" cy="24" r="6" fill="#0d9488"/>
                    <circle cx="84" cy="66" r="6" fill="#0d9488"/>
                  </svg>
                </div>
                <div style={{
                  maxWidth: '85%',
                  padding: '1rem 1.25rem',
                  borderRadius: '1rem 1rem 1rem 0.25rem',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                }}>
                  <div className="assistant-msg" dangerouslySetInnerHTML={{ __html: formatMessage(streamingText) }} />
                  <span style={{ display: 'inline-block', width: 6, height: 16, background: '#0d9488', marginLeft: 2, animation: 'blink 1s infinite' }} />
                </div>
              </div>
            )}

            {/* Loading dots */}
            {loading && !streamingText && (
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 32, height: 32, borderRadius: '0.5rem', background: 'rgba(13,148,136,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 100 100">
                    <circle cx="48" cy="50" r="19" fill="#0d9488"/>
                    <circle cx="80" cy="24" r="6" fill="#0d9488"/>
                    <circle cx="84" cy="66" r="6" fill="#0d9488"/>
                  </svg>
                </div>
                <div style={{ padding: '1rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <span className="dot dot1" />
                  <span className="dot dot2" />
                  <span className="dot dot3" />
                </div>
              </div>
            )}

            {/* Protocol save banner */}
            {protocolData && !savedUrl && (
              <div style={{ margin: '1rem 0', padding: '1.25rem', background: 'rgba(13,148,136,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(13,148,136,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.95rem' }}>Protocol Ready</div>
                  <div style={{ color: '#8896a7', fontSize: '0.85rem' }}>
                    {protocolData.protocolName} for {protocolData.clientName}
                  </div>
                </div>
                <button
                  onClick={handleSaveProtocol}
                  disabled={saving}
                  style={{
                    background: saving ? '#1a3a4a' : 'linear-gradient(135deg, #0d9488, #10b981)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: saving ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {saving ? 'Saving...' : 'Generate Protocol Link'}
                  {!saving && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  )}
                </button>
              </div>
            )}

            {/* Saved URL banner */}
            {savedUrl && (
              <div style={{ margin: '1rem 0', padding: '1.25rem', background: 'rgba(16,185,129,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(16,185,129,0.25)' }}>
                <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  Protocol Saved!
                </div>
                <a
                  href={savedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#10b981',
                    fontSize: '0.95rem',
                    textDecoration: 'underline',
                    wordBreak: 'break-all',
                  }}
                >
                  biosyncpeptide.com{savedUrl}
                </a>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div style={{ padding: '1rem 0 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tell me your goals, or ask about any peptide..."
                rows={1}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 1rem',
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontFamily: '"DM Sans", sans-serif',
                  resize: 'none',
                  outline: 'none',
                  minHeight: 48,
                  maxHeight: 120,
                }}
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(13,148,136,0.5)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                style={{
                  background: (!input.trim() || loading) ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #0d9488, #10b981)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: (!input.trim() || loading) ? 'default' : 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <span style={{ color: '#3a4a5a', fontSize: '0.7rem' }}>
                For research and educational purposes only. Not medical advice.
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0d9488;
          animation: bounce 1.4s infinite ease-in-out;
        }
        .dot1 { animation-delay: 0s; }
        .dot2 { animation-delay: 0.2s; }
        .dot3 { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .assistant-msg h2, .assistant-msg h3, .assistant-msg h4 {
          margin: 0.75rem 0 0.25rem;
          color: #0d9488;
        }
        .assistant-msg h2 { font-size: 1.1rem; }
        .assistant-msg h3 { font-size: 1rem; }
        .assistant-msg h4 { font-size: 0.95rem; }
        .assistant-msg ul {
          padding-left: 1.25rem;
          margin: 0.25rem 0;
        }
        .assistant-msg li {
          margin: 0.15rem 0;
          color: #ccd6e0;
        }
        .assistant-msg strong { color: #fff; }
        .assistant-msg pre {
          background: rgba(0,0,0,0.3);
          border-radius: 0.5rem;
          padding: 0.75rem;
          overflow-x: auto;
          font-size: 0.8rem;
          margin: 0.5rem 0;
        }
        .assistant-msg .protocol-json {
          display: none;
        }
        textarea::placeholder {
          color: #5a6a7a;
        }
      `}</style>
    </>
  );
}
