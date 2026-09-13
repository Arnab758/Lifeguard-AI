import React from 'react';
import { 
  AlertTriangle, CheckCircle2, XCircle, FileText, Send, 
  Scale, ArrowRight, ShieldAlert, Sparkles, Building, ExternalLink, ShieldCheck
} from 'lucide-react';

export default function ActionCenter({ decisions, onApprove, onDismiss, onViewMemo }) {
  const pendingDecisions = decisions.filter(d => d.status === 'PENDING_APPROVAL');

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL': 
        return <span className="badge badge-critical">Critical Hazard</span>;
      case 'HIGH': 
        return <span className="badge badge-high">High Capital Leakage</span>;
      case 'MEDIUM': 
        return <span className="badge badge-medium">Moderate Leakage</span>;
      default: 
        return <span className="badge badge-low">Low Impact</span>;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', flex: 1, minWidth: '340px' }}>
      
      {/* Action Center Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '20px', 
        borderBottom: '1px solid var(--border-subtle)', 
        paddingBottom: '14px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={18} color="#f59e0b" />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Human-in-the-Loop Decision Gate
            </h2>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Surfaced <strong style={{ color: '#fff' }}>ONLY</strong> when high-stakes authorization is required. Zero routine noise.
          </p>
        </div>

        <span className={pendingDecisions.length > 0 ? "badge badge-high" : "badge badge-low"} style={{ fontSize: '11px', padding: '6px 12px' }}>
          {pendingDecisions.length === 0 
            ? '0 Pending Approvals' 
            : `${pendingDecisions.length} ${pendingDecisions.length === 1 ? 'Action' : 'Actions'} Awaiting Approval`}
        </span>
      </div>

      {/* Empty State: Majestic All-Clear Shield */}
      {pendingDecisions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.04) 0%, rgba(14, 21, 37, 0.4) 100%)',
          borderRadius: '12px',
          border: '1px dashed rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            boxShadow: '0 0 24px rgba(16, 185, 129, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <ShieldCheck size={32} color="#10b981" />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            All Clear — Autonomous Protection Active
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 20px', lineHeight: 1.5 }}>
            LifeGuard background daemon is actively monitoring your recurring accounts, subscriptions, and safety databases.
            Routine checks pass silently in the background.
          </p>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            💡 Try clicking <strong style={{ color: 'var(--neon-cyan)' }}>"Trigger Anomaly"</strong> in the Daemon Simulator above to inspect an incoming decision card.
          </div>
        </div>
      ) : (
        /* Surfaced Decision Cards */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {pendingDecisions.map((card) => (
            <div
              key={card.id}
              className="glass-panel-amber"
              style={{
                borderRadius: '12px',
                padding: '20px',
                position: 'relative'
              }}
            >
              {/* Card Header & Impact Ticker */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    {getSeverityBadge(card.severity)}
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Target: <span style={{ color: 'var(--text-primary)' }}>{card.provider}</span>
                    </span>
                    {card.category && (
                      <span className="badge badge-purple" style={{ fontSize: '10px' }}>
                        {card.category}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {card.title}
                  </h3>
                </div>

                {/* Big Capital at Risk Badge */}
                <div style={{
                  background: 'rgba(244, 63, 94, 0.12)',
                  border: '1px solid rgba(244, 63, 94, 0.35)',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  textAlign: 'right'
                }}>
                  <span style={{ fontSize: '10px', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    Annual Impact
                  </span>
                  <div className="terminal-font" style={{ fontSize: '20px', fontWeight: 800, color: '#f43f5e' }}>
                    ${card.annual_impact.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Grievance Narrative */}
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '14px' }}>
                {card.summary}
              </p>

              {/* Statutory Legal Authority Box */}
              <div style={{
                background: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.22)',
                borderRadius: '8px',
                padding: '12px 14px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <Scale size={18} color="var(--neon-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '12px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--neon-cyan)' }}>
                    Statutory Authority: {card.policy_reference?.authority}
                  </div>
                  <div style={{ color: 'var(--text-primary)', marginTop: '2px', fontWeight: 600 }}>
                    {card.policy_reference?.citation}
                  </div>
                  <div style={{ color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                    {card.policy_reference?.relevance}
                  </div>
                </div>
              </div>

              {/* Prepared Executive Dossier Preview Bar */}
              <div style={{
                background: 'rgba(5, 8, 17, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#cbd5e1',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                  <FileText size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                  <span className="terminal-font" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <strong>Drafted Dossier:</strong> {card.drafted_subject}
                  </span>
                </div>

                <button
                  onClick={() => onViewMemo(card)}
                  className="btn-secondary"
                  style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    color: 'var(--neon-cyan)',
                    borderColor: 'rgba(0, 240, 255, 0.3)',
                    background: 'rgba(0, 240, 255, 0.08)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Inspect Memo <ArrowRight size={12} />
                </button>
              </div>

              {/* Dual Action Execution Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  className="btn-secondary"
                  onClick={() => onDismiss(card.id)}
                  style={{ fontSize: '13px' }}
                >
                  <XCircle size={15} /> Dismiss
                </button>

                <button
                  className="btn-success"
                  onClick={() => onApprove(card.id)}
                  style={{ fontSize: '13px', padding: '10px 20px' }}
                >
                  <Send size={15} /> Authorize &amp; Dispatch Resolution
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
