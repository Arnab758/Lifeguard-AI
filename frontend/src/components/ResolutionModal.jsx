import React, { useState } from 'react';
import { 
  X, Copy, Check, Scale, FileText, Mail, 
  Download, ExternalLink, Building, MapPin, Send, ShieldAlert
} from 'lucide-react';

export default function ResolutionModal({ card, onClose, onApproveAndDispatch }) {
  const [copied, setCopied] = useState(false);

  if (!card) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${card.drafted_subject}\n\n${card.drafted_body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = `================================================================================
FORMAL CONSUMER DISPUTE & STATUTORY REMEDIATION NOTICE
Date: ${new Date().toLocaleDateString()}
To: ${card.provider} Executive Customer Advocacy
Governing Statutory Authority: ${card.policy_reference?.authority || 'Federal Trade Commission'}
Statutory Citation: ${card.policy_reference?.citation || '16 C.F.R. Part 425'}
Reference ID: ${card.id}
================================================================================

SUBJECT: ${card.drafted_subject}

${card.drafted_body}

================================================================================
Generated and verified by LifeGuard Consumer Protection Agent
Powered by Strands Agents SDK & Amazon Bedrock AgentCore
================================================================================
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
      background: 'rgba(3, 6, 14, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '780px',
        width: '100%',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 240, 255, 0.15)',
        border: '1px solid rgba(0, 240, 255, 0.3)'
      }}>
        
        {/* Modal Top Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.06) 0%, rgba(14, 21, 37, 0.6) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={20} color="var(--neon-cyan)" />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Formal Consumer Dispute Dossier
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                Target Provider: <strong style={{ color: '#fff' }}>{card.provider}</strong> • Capital at Stake: <strong style={{ color: '#f43f5e' }}>${card.annual_impact?.toFixed(2)}/yr</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '6px', borderRadius: '8px', border: 'none' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          
          {/* Executive Contact & Regulatory Portal Strip */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
            fontSize: '12px'
          }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                Executive Escalation Contact
              </div>
              <div className="terminal-font" style={{ color: 'var(--neon-cyan)', marginTop: '4px', fontWeight: 700, fontSize: '13px' }}>
                {recipientEmail}
              </div>
            </div>

            {card.portal_url && (
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                  Governing Regulatory Agency
                </div>
                <a
                  href={card.portal_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#34d399',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '4px',
                    fontWeight: 700,
                    fontSize: '13px'
                  }}
                >
                  {card.regulatory_agency || 'Official Filing Portal'} <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>

          {/* Statutory Legal Authority Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(14, 21, 37, 0.6) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <Scale size={22} color="var(--neon-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px' }}>
              <div style={{ fontWeight: 800, color: 'var(--neon-cyan)' }}>
                {card.policy_reference?.authority} ({card.policy_reference?.citation})
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                {card.policy_reference?.relevance}
              </p>
            </div>
          </div>

          {/* Subject Line Field */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
              Formal Notice Subject Line:
            </span>
            <div className="terminal-font" style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--text-primary)',
              marginTop: '6px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontWeight: 600
            }}>
              {card.drafted_subject}
            </div>
          </div>

          {/* Official Letter Body Preview */}
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
              Drafted Legal Brief (Ready for Executive Dispatch):
            </span>
            <pre className="terminal-font" style={{
              background: 'rgba(4, 7, 16, 0.9)',
              padding: '16px',
              borderRadius: '10px',
              fontSize: '12px',
              color: '#e2e8f0',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: '6px',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {card.drafted_body}
            </pre>
          </div>

        </div>

        {/* Modal Action Tools Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'rgba(10, 16, 30, 0.5)'
        }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={mailtoUrl}
              className="btn-primary"
              style={{ textDecoration: 'none', fontSize: '12px', padding: '9px 16px' }}
            >
              <Mail size={14} /> Open in Email (To: {recipientEmail.split('@')[0]}@...)
            </a>

            <button
              className="btn-secondary"
              onClick={handleDownload}
              style={{ fontSize: '12px', padding: '9px 14px' }}
            >
              <Download size={14} /> Download Notice (.txt)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              className="btn-secondary"
              onClick={handleCopy}
              style={{ fontSize: '12px', padding: '9px 14px' }}
            >
              {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Brief'}
            </button>

            {onApproveAndDispatch && (
              <button
                className="btn-success"
                onClick={() => onApproveAndDispatch(card.id)}
                style={{ fontSize: '12px', padding: '9px 16px' }}
              >
                <Send size={14} /> Authorize &amp; Dispatch Now
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
