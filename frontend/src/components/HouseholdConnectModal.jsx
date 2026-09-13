import React, { useState } from 'react';
import { 
  X, Mail, Copy, Check, ShieldCheck, 
  ArrowRight, Folder, Lock, CheckCircle2, Sparkles, ExternalLink
} from 'lucide-react';

export default function HouseholdConnectModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeClient, setActiveClient] = useState('gmail');

  if (!isOpen) return null;

  const forwardingEmail = 'protect+household@lifeguard.ai';

  const handleCopy = () => {
    navigator.clipboard.writeText(forwardingEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      zIndex: 1100,
      padding: '24px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '760px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid rgba(0, 240, 255, 0.4)',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 240, 255, 0.25)',
        borderRadius: '20px'
      }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '28px 32px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.08) 0%, rgba(14, 22, 40, 0.8) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(0, 240, 255, 0.18)',
              border: '1px solid rgba(0, 240, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Mail size={26} color="var(--neon-cyan)" />
            </div>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Connect Your Household in 30 Seconds
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                How real users deploy LifeGuard AI tomorrow • Zero app management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '32px' }}>
          
          {/* Dedicated Forwarding Address Box */}
          <div style={{
            background: 'rgba(0, 240, 255, 0.06)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '28px'
          }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--neon-cyan)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
              Your Household's Ambient Forwarding Ingestion Address
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              background: 'rgba(5, 9, 20, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '12px 20px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={20} color="#38bdf8" />
                <span className="terminal-font" style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                  {forwardingEmail}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="btn-secondary"
                style={{
                  fontSize: '14px',
                  padding: '8px 18px',
                  color: copied ? '#34d399' : 'var(--neon-cyan)',
                  borderColor: copied ? '#34d399' : 'rgba(0, 240, 255, 0.4)'
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Address'}</span>
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '12px 0 0 0' }}>
              💡 Any billing statement, invoice, or rate increase notice forwarded to this address is automatically ingested and audited by LifeGuard in under 2 seconds.
            </p>
          </div>

          {/* 3 Step Setup Guide */}
          <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Zero-Friction Everyday Setup:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
            
            {/* Step 1 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0, 240, 255, 0.2)',
                border: '1px solid var(--neon-cyan)',
                color: 'var(--neon-cyan)',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '15px'
              }}>
                1
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  Set up an Auto-Forward Filter in Your Email
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  In Gmail, Outlook, or Apple Mail, create a simple filter: <br />
                  <code className="terminal-font" style={{ color: 'var(--neon-cyan)', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '4px' }}>
                    from:(comcast OR verizon OR planetfitness OR netflix OR health)
                  </code>
                  {' → Forward to '}
                  <strong style={{ color: '#ffffff' }}>protect+household@lifeguard.ai</strong>.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10b981',
                color: '#34d399',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '15px'
              }}>
                2
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  LifeGuard Audits Silently in the Background
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  You never have to open or manage another dashboard. Routine on-contract bills pass with 0 notifications. LifeGuard preserves your time and peace of mind.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid #f59e0b',
                color: '#fbbf24',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '15px'
              }}>
                3
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  Surfaces Only for High-Stakes Decisions
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  When an unlawful price increase, cancellation trap, or medical billing violation is caught, LifeGuard drafts the exact legal brief and surfaces a 1-click decision card.
                </p>
              </div>
            </div>

          </div>

          {/* Privacy & Safety Guarantee */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '14px',
            padding: '18px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <ShieldCheck size={28} color="#10b981" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>
              <strong style={{ color: '#34d399' }}>Human-in-the-Loop Principal Guarantee:</strong> LifeGuard can NEVER send an external email, dispute, or payment without your explicit 1-click human authorization.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '20px 32px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgba(10, 16, 30, 0.6)'
        }}>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ fontSize: '15px', padding: '12px 28px' }}
          >
            I Understand — Back to Guardian
          </button>
        </div>

      </div>
    </div>
  );
}
