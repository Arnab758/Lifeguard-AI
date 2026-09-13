import React, { useState } from 'react';
import { DollarSign, CheckCircle2, ShieldCheck, Download, Copy, Check, Hash } from 'lucide-react';

export default function SavingsLedger({ ledger, totalAnnual, apiBase = 'http://127.0.0.1:8001' }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel" style={{ padding: '36px' }}>
      
      {/* Ledger Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '20px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.18)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={26} color="var(--neon-emerald)" />
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0, color: '#ffffff' }}>
              Verified Household Financial Recovery Ledger
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Permanent audit trail of all disputes authorized and dispatched by the principal.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            padding: '10px 18px',
            borderRadius: '12px',
            fontSize: '15px',
            color: '#34d399',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>Total Recovered:</span>
            <span className="terminal-font" style={{ fontSize: '20px' }}>+${totalAnnual?.toFixed(2)}/yr</span>
          </div>

          {ledger.length > 0 && (
            <a
              href={`${apiBase}/api/ledger/export`}
              download="lifeguard_recovered_savings.csv"
              className="btn-secondary"
              style={{ textDecoration: 'none', fontSize: '14px', padding: '10px 20px' }}
            >
              <Download size={16} /> Export CSV Audit Trail
            </a>
          )}
        </div>
      </div>

      {/* Ledger Records Table */}
      {ledger.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
          <ShieldCheck size={42} color="var(--text-dim)" style={{ margin: '0 auto 14px' }} />
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>No Resolutions Executed Yet</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px' }}>
            Authorize a pending decision card in the Action Gate to dispatch an executive dispute and record verified savings.
          </div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                <th style={{ padding: '14px 18px' }}>Date</th>
                <th style={{ padding: '14px 18px' }}>Provider</th>
                <th style={{ padding: '14px 18px' }}>Category</th>
                <th style={{ padding: '14px 18px' }}>Action Executed</th>
                <th style={{ padding: '14px 18px' }}>Annual Savings</th>
                <th style={{ padding: '14px 18px' }}>Confirmation Receipt</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((rec) => (
                <tr
                  key={rec.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td className="terminal-font" style={{ padding: '16px 18px', color: 'var(--text-muted)', fontSize: '14px' }}>
                    {rec.resolved_at ? rec.resolved_at.slice(0, 10) : 'Today'}
                  </td>

                  <td style={{ padding: '16px 18px', fontWeight: 700, color: '#ffffff', fontSize: '16px' }}>
                    {rec.provider}
                  </td>

                  <td style={{ padding: '16px 18px' }}>
                    <span className="badge badge-medium" style={{ fontSize: '12px', padding: '4px 10px' }}>
                      {rec.category}
                    </span>
                  </td>

                  <td style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>
                    {rec.action_type}
                  </td>

                  <td className="terminal-font" style={{ padding: '16px 18px', fontWeight: 800, color: '#34d399', fontSize: '17px' }}>
                    +${rec.amount_annual.toFixed(2)}/yr
                  </td>

                  <td style={{ padding: '16px 18px' }}>
                    <button
                      onClick={() => handleCopyCode(rec.confirmation_number)}
                      className="terminal-font btn-secondary"
                      style={{
                        padding: '6px 12px',
                        fontSize: '13px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer'
                      }}
                      title="Click to copy receipt code"
                    >
                      <Hash size={13} color="var(--neon-cyan)" />
                      <span>{rec.confirmation_number}</span>
                      {copiedId === rec.confirmation_number ? <Check size={13} color="#34d399" /> : <Copy size={13} color="var(--text-muted)" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
