import React from 'react';
import { 
  AlertTriangle, CheckCircle2, XCircle, FileText, Send, 
  Scale, ArrowRight, ShieldAlert, Sparkles, Building, ExternalLink, ShieldCheck, Zap
} from 'lucide-react';

export default function ActionCenter({ decisions, onApprove, onDismiss, onViewMemo, onTriggerDemo }) {
  const pendingDecisions = decisions.filter(d => d.status === 'PENDING_APPROVAL');

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL': 
        return <span className="badge badge-critical" style={{ fontSize: '13px', padding: '6px 14px' }}>Critical Risk</span>;
      case 'HIGH': 
        return <span className="badge badge-high" style={{ fontSize: '13px', padding: '6px 14px' }}>High Capital Leakage</span>;
      case 'MEDIUM': 
        return <span className="badge badge-medium" style={{ fontSize: '13px', padding: '6px 14px' }}>Moderate Leakage</span>;
      default: 
        return <span className="badge badge-low" style={{ fontSize: '13px', padding: '6px 14px' }}>Low Impact</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Overview Banner */}
      <div className="glass-panel" style={{ padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.18)',
                border: '1px solid rgba(245, 158, 11, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldAlert size={22} color="#f59e0b" />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Human-in-the-Loop Action Gate
              </h2>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              The background daemon runs silently. It halts autonomous execution and surfaces below <strong style={{ color: '#ffffff' }}>ONLY</strong> when high-stakes human authorization is needed.
            </p>
          </div>

          <span className={pendingDecisions.length > 0 ? "badge badge-high" : "badge badge-low"} style={{ fontSize: '14px', padding: '8px 18px' }}>
            {pendingDecisions.length === 0 
              ? '0 Decisions Required' 
              : `${pendingDecisions.length} ${pendingDecisions.length === 1 ? 'Decision' : 'Decisions'} Awaiting Authorization`}
          </span>
        </div>
      </div>

      {/* Empty State: Calm, Reassuring Protection */}
      {pendingDecisions.length === 0 ? (
        <div className="glass-panel" style={{
          textAlign: 'center',
          padding: '64px 32px',
          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(14, 22, 40, 0.6) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 0 32px rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <ShieldCheck size={42} color="#10b981" />
          </div>
          
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            All 18 Monitored Accounts Within Normal Baselines
          </h3>
          
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            LifeGuard's background daemon is handling routine chores silently. 
            Zero stealth rate hikes, cancellation traps, or safety recalls detected.
          </p>

          {onTriggerDemo && (
            <button
              onClick={onTriggerDemo}
              className="btn-secondary"
              style={{ fontSize: '15px', padding: '12px 24px' }}
            >
              <Zap size={16} color="var(--neon-cyan)" />
              <span>Simulate Inbound Rate Hike Anomaly (Test Flow)</span>
            </button>
          )}
        </div>
      ) : (
        /* Surfaced Decision Cards - Spacious, Bold, High Readability */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {pendingDecisions.map((card) => (
            <div
              key={card.id}
              className="glass-panel-amber"
              style={{
                borderRadius: '16px',
                padding: '32px',
                position: 'relative'
              }}
            >
              {/* Header Row: Provider, Category & Big Annual Impact */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '18px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {getSeverityBadge(card.severity)}
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Service Provider: <strong style={{ color: '#ffffff' }}>{card.provider}</strong>
                    </span>
                    {card.category && (
                      <span className="badge badge-purple" style={{ fontSize: '12px' }}>
                        {card.category}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                    {card.title}
                  </h3>
                </div>

                {/* Big Capital at Risk Callout */}
                <div style={{
                  background: 'rgba(244, 63, 94, 0.14)',
                  border: '1px solid rgba(244, 63, 94, 0.45)',
                  borderRadius: '14px',
                  padding: '12px 22px',
                  textAlign: 'right'
                }}>
                  <span style={{ fontSize: '12px', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    Annual Impact
                  </span>
                  <div className="terminal-font" style={{ fontSize: '28px', fontWeight: 800, color: '#f43f5e', letterSpacing: '-0.02em' }}>
                    ${card.annual_impact.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Grievance Narrative */}
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '20px' }}>
                {card.summary}
              </p>

              {/* Statutory Legal Authority Box */}
              <div style={{
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.28)',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}>
                <Scale size={24} color="var(--neon-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '14px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--neon-cyan)', fontSize: '15px' }}>
                    Statutory Authority: {card.policy_reference?.authority}
                  </div>
                  <div style={{ color: '#ffffff', marginTop: '3px', fontWeight: 700 }}>
                    {card.policy_reference?.citation}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                    {card.policy_reference?.relevance}
                  </div>
                </div>
              </div>

              {/* Prepared Executive Dossier Bar */}
              <div style={{
                background: 'rgba(5, 9, 20, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '14px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#cbd5e1',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <FileText size={18} color="#38bdf8" style={{ flexShrink: 0 }} />
                  <span className="terminal-font" style={{ fontSize: '14px' }}>
                    <strong>Drafted Dossier:</strong> {card.drafted_subject}
                  </span>
                </div>

                <button
                  onClick={() => onViewMemo(card)}
                  className="btn-secondary"
                  style={{
                    fontSize: '13px',
                    padding: '8px 16px',
                    color: 'var(--neon-cyan)',
                    borderColor: 'rgba(0, 240, 255, 0.4)',
                    background: 'rgba(0, 240, 255, 0.1)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Inspect Full Brief <ArrowRight size={14} />
                </button>
              </div>

              {/* High-Impact Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  className="btn-secondary"
                  onClick={() => onDismiss(card.id)}
                  style={{ fontSize: '15px', padding: '13px 24px' }}
                >
                  <XCircle size={17} /> Dismiss
                </button>

                <button
                  className="btn-success"
                  onClick={() => onApprove(card.id)}
                  style={{ fontSize: '15px', padding: '13px 30px' }}
                >
                  <Send size={17} /> Authorize &amp; Dispatch Resolution
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
