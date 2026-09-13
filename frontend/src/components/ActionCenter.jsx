import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, FileText, Send, Scale, ArrowRight, ShieldAlert } from 'lucide-react';

export default function ActionCenter({ decisions, onApprove, onDismiss, onViewMemo }) {
  const pendingDecisions = decisions.filter(d => d.status === 'PENDING_APPROVAL');
  const resolvedDecisions = decisions.filter(d => d.status === 'APPROVED');

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL': return <span className="badge badge-critical">Critical Risk</span>;
      case 'HIGH': return <span className="badge badge-high">High Financial Leakage</span>;
      case 'MEDIUM': return <span className="badge badge-medium">Moderate Leakage</span>;
      default: return <span className="badge badge-low">Low Impact</span>;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', flex: 1, minWidth: '320px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} color="var(--accent-amber)" />
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>
              Human-in-the-Loop Action Center
            </h2>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            The agent runs autonomously in the background. It only surfaces below when high-stakes authorization is required.
          </p>
        </div>
        <span className="badge badge-high" style={{ fontSize: '12px', padding: '4px 10px' }}>
          {pendingDecisions.length} Action{pendingDecisions.length === 1 ? '' : 's'} Awaiting Decision
        </span>
      </div>

      {pendingDecisions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '10px',
          border: '1px dashed var(--border-color)'
        }}>
          <CheckCircle size={36} color="var(--accent-emerald)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            All Clear — Zero Unresolved Leakage
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 16px' }}>
            LifeGuard background daemon is monitoring recurring accounts. Click any test scenario above to simulate an incoming billing anomaly.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {pendingDecisions.map((card) => (
            <div
              key={card.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderLeft: '4px solid #f59e0b',
                borderRadius: '10px',
                padding: '18px',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Header Info */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {getSeverityBadge(card.severity)}
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                      Account: {card.provider}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {card.title}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Annual Capital at Risk
                  </span>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#f43f5e' }}>
                    ${card.annual_impact.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                {card.summary}
              </p>

              {/* Legal Reference Box */}
              <div style={{
                background: 'rgba(0, 176, 255, 0.06)',
                border: '1px solid rgba(0, 176, 255, 0.2)',
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Scale size={18} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '12px' }}>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Governing Authority: </strong>
                  <span style={{ color: 'var(--text-primary)' }}>{card.policy_reference?.authority}</span>
                  <span style={{ color: 'var(--text-muted)' }}> ({card.policy_reference?.citation})</span>
                </div>
              </div>

              {/* Drafted Action Subject Preview */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                color: '#cbd5e1',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span className="terminal-font" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  📄 <strong>Prepared Dossier:</strong> {card.drafted_subject}
                </span>
                <button
                  onClick={() => onViewMemo(card)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-cyan)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    marginLeft: '8px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Inspect Memo
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
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
                  style={{ fontSize: '13px' }}
                >
                  <Send size={15} /> Approve &amp; Dispatch Resolution
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
