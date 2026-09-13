import React, { useState } from 'react';
import { 
  X, Copy, Check, Scale, FileText, Mail, 
  Download, ExternalLink, Building, MapPin, Send
} from 'lucide-react';

export default function ResolutionModal({ card, onClose, onApproveAndDispatch }) {
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  if (!card) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${card.drafted_subject}\n\n${card.drafted_body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = `================================================================================
FORMAL CONSUMER DISPUTE & REGULATORY REMEDIATION NOTICE
Date: ${new Date().toLocaleDateString()}
To: ${card.provider} Executive Customer Advocacy
Regulatory Authority: ${card.policy_reference?.authority || 'Federal Trade Commission'}
Statutory Citation: ${card.policy_reference?.citation || '16 C.F.R. Part 425'}
================================================================================

SUBJECT: ${card.drafted_subject}

${card.drafted_body}

================================================================================
Generated and verified by LifeGuard Consumer Protection Agent
Reference ID: ${card.id}
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Formal_Dispute_${card.provider.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const recipientEmail = card.executive_email || `executive-disputes@${card.provider.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.com`;
  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(card.drafted_subject)}&body=${encodeURIComponent(card.drafted_body)}`;

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
        maxWidth: '720px',
        width: '100%',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)'
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
                Formal Consumer Dispute Dossier
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Target: {card.provider} • Annual Impact: ${card.annual_impact?.toFixed(2)}/yr
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
          {/* Executive Contact Bar */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '12px 14px',
            marginBottom: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            fontSize: '12px'
          }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 }}>
                Executive Escalation Contact:
              </div>
              <div className="terminal-font" style={{ color: 'var(--accent-cyan)', marginTop: '2px', fontWeight: 600 }}>
                {recipientEmail}
              </div>
            </div>

            {card.portal_url && (
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 }}>
                  Regulatory Portal:
                </div>
                <a
                  href={card.portal_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#34d399', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px', fontWeight: 600 }}
                >
                  {card.regulatory_agency || 'Official Filing Portal'} <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>

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
              Official Dispute Text (Ready to Send or Print):
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
              maxHeight: '280px',
              overflowY: 'auto'
            }}>
              {card.drafted_body}
            </pre>
          </div>
        </div>

        {/* Modal Footer: Real-World Action Tools */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={mailtoUrl}
              className="btn-primary"
              style={{ textDecoration: 'none', fontSize: '12px', padding: '8px 14px' }}
            >
              <Mail size={14} /> Open in Email (To: {recipientEmail.split('@')[0]}@...)
            </a>
            <button
              className="btn-secondary"
              onClick={handleDownload}
              style={{ fontSize: '12px', padding: '8px 14px' }}
            >
              <Download size={14} /> Download Letter (.txt)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-secondary"
              onClick={handleCopy}
              style={{ fontSize: '12px', padding: '8px 14px' }}
            >
              {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              className="btn-primary"
              onClick={onClose}
              style={{ fontSize: '12px', padding: '8px 14px', background: 'rgba(255, 255, 255, 0.1)' }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
