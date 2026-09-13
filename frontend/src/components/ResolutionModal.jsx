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
      background: 'rgba(3, 6, 14, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '860px',
        width: '100%',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 240, 255, 0.2)',
        border: '1px solid rgba(0, 240, 255, 0.35)'
      }}>
        
        {/* Modal Top Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.08) 0%, rgba(14, 22, 40, 0.7) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(0, 240, 255, 0.18)',
              border: '1px solid rgba(0, 240, 255, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={24} color="var(--neon-cyan)" />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Formal Consumer Dispute Dossier
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                Target: <strong style={{ color: '#ffffff' }}>{card.provider}</strong> • Capital at Stake: <strong style={{ color: '#f43f5e' }}>${card.annual_impact?.toFixed(2)}/yr</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '8px', borderRadius: '10px', border: 'none' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
          
          {/* Executive Contact & Regulatory Agency */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '18px 24px',
            marginBottom: '22px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px',
            fontSize: '14px'
          }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                Executive Escalation Contact
              </div>
              <div className="terminal-font" style={{ color: 'var(--neon-cyan)', marginTop: '4px', fontWeight: 700, fontSize: '15px' }}>
                {recipientEmail}
              </div>
            </div>

            {card.portal_url && (
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
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
                    gap: '6px',
                    marginTop: '4px',
                    fontWeight: 700,
                    fontSize: '15px'
                  }}
                >
                  {card.regulatory_agency || 'Official Filing Portal'} <ExternalLink size={15} />
                </a>
              </div>
            )}
          </div>

          {/* Statutory Legal Authority Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.09) 0%, rgba(14, 22, 40, 0.7) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            borderRadius: '12px',
            padding: '18px 22px',
            marginBottom: '22px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px'
          }}>
            <Scale size={26} color="var(--neon-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '15px' }}>
              <div style={{ fontWeight: 800, color: 'var(--neon-cyan)', fontSize: '16px' }}>
                {card.policy_reference?.authority} ({card.policy_reference?.citation})
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.55 }}>
                {card.policy_reference?.relevance}
              </p>
            </div>
          </div>

          {/* Subject Line Field */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
              Formal Notice Subject Line:
            </span>
            <div className="terminal-font" style={{
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '12px 18px',
              borderRadius: '10px',
              fontSize: '15px',
              color: '#ffffff',
              marginTop: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontWeight: 600
            }}>
              {card.drafted_subject}
            </div>
          </div>

          {/* Official Letter Body Preview */}
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
              Drafted Legal Brief (Ready for Executive Dispatch):
            </span>
            <pre className="terminal-font" style={{
              background: 'rgba(4, 7, 16, 0.95)',
              padding: '20px',
              borderRadius: '12px',
              fontSize: '13px',
              color: '#e2e8f0',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginTop: '8px',
              maxHeight: '340px',
              overflowY: 'auto'
            }}>
              {card.drafted_body}
            </pre>
          </div>

        </div>

        {/* Modal Action Tools Footer */}
        <div style={{
          padding: '20px 32px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          background: 'rgba(10, 16, 30, 0.6)'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={mailtoUrl}
              className="btn-primary"
              style={{ textDecoration: 'none', fontSize: '14px', padding: '11px 20px' }}
            >
              <Mail size={16} /> Open in Email (To: {recipientEmail.split('@')[0]}@...)
            </a>

            <button
              className="btn-secondary"
              onClick={handleDownload}
              style={{ fontSize: '14px', padding: '11px 18px' }}
            >
              <Download size={16} /> Download Notice (.txt)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              className="btn-secondary"
              onClick={handleCopy}
              style={{ fontSize: '14px', padding: '11px 18px' }}
            >
              {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy Brief'}
            </button>

            {onApproveAndDispatch && (
              <button
                className="btn-success"
                onClick={() => onApproveAndDispatch(card.id)}
                style={{ fontSize: '14px', padding: '11px 24px' }}
              >
                <Send size={16} /> Authorize &amp; Dispatch Now
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
