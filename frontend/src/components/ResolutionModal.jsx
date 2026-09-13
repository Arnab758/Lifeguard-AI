import React, { useState } from 'react';
import { X, Copy, Check, Scale, FileText } from 'lucide-react';

export default function ResolutionModal({ card, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!card) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${card.drafted_subject}\n\n${card.drafted_body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 8, 16, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} color="var(--accent-cyan)" />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>
                Prepared Resolution Dossier
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Target: {card.provider} • Category: {card.category}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {/* Statutory Citation Box */}
          <div style={{
            background: 'rgba(0, 176, 255, 0.08)',
            border: '1px solid rgba(0, 176, 255, 0.25)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <Scale size={18} color="var(--accent-cyan)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div style={{ fontSize: '12px' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {card.policy_reference?.authority} ({card.policy_reference?.citation})
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                {card.policy_reference?.relevance}
              </p>
            </div>
          </div>

          {/* Subject Line */}
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Subject Line:
            </span>
            <div className="terminal-font" style={{
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '13px',
              color: 'var(--text-primary)',
              marginTop: '4px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              {card.drafted_subject}
            </div>
          </div>

          {/* Letter Body */}
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Official Dispute Text:
            </span>
            <pre className="terminal-font" style={{
              background: 'rgba(5, 8, 16, 0.9)',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#e2e8f0',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              marginTop: '4px',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {card.drafted_body}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Status: <strong>{card.status}</strong>
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard' : 'Copy Text'}
            </button>
            <button className="btn-primary" onClick={onClose}>
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
