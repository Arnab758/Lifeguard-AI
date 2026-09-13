import React, { useState } from 'react';
import { DollarSign, CheckCircle2, ShieldCheck, Download, Copy, Check, Hash } from 'lucide-react';

export default function SavingsLedger({ ledger, totalAnnual, apiBase = 'http://127.0.0.1:8000' }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', marginTop: '24px' }}>
      
      {/* Ledger Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '14px',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={20} color="var(--neon-emerald)" />
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0 }}>
              Verified Household Financial Ledger &amp; Resolution Records
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Cryptographically verified record of all autonomous disputes approved and dispatched by the principal.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#34d399',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>Total Recovered:</span>
            <span className="terminal-font" style={{ fontSize: '15px' }}>+${totalAnnual?.toFixed(2)}/yr</span>
          </div>

          {ledger.length > 0 && (
            <a
              href={`${apiBase}/api/ledger/export`}
              download="lifeguard_recovered_savings.csv"
              className="btn-secondary"
              style={{ textDecoration: 'none', fontSize: '12px', padding: '6px 14px' }}
            >
              <Download size={14} /> Export CSV Audit Trail
            </a>
          )}
        </div>
      </div>

      {/* Ledger Records Table */}
      {ledger.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>
          <ShieldCheck size={32} color="var(--text-dim)" style={{ margin: '0 auto 10px' }} />
          <div>No resolutions executed yet.</div>
          <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '4px' }}>
            Authorize a pending decision card above to dispatch executive remediation and record permanent recovered capital.
          </div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                <th style={{ padding: '10px 14px' }}>Date</th>
                <th style={{ padding: '10px 14px' }}>Provider</th>
                <th style={{ padding: '10px 14px' }}>Category</th>
                <th style={{ padding: '10px 14px' }}>Action Executed</th>
                <th style={{ padding: '10px 14px' }}>Annual Savings</th>
                <th style={{ padding: '10px 14px' }}>Confirmation Receipt</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((rec) => (
                <tr
                  key={rec.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td className="terminal-font" style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    {rec.resolved_at ? rec.resolved_at.slice(0, 10) : 'Today'}
                  </td>

                  <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {rec.provider}
                  </td>

                  <td style={{ padding: '12px 14px' }}>
                    <span className="badge badge-medium" style={{ fontSize: '10px' }}>
                      {rec.category}
                    </span>
                  </td>

                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>
                    {rec.action_type}
                  </td>

                  <td className="terminal-font" style={{ padding: '12px 14px', fontWeight: 800, color: '#34d399', fontSize: '14px' }}>
                    +${rec.amount_annual.toFixed(2)}/yr
                  </td>

                  <td style={{ padding: '12px 14px' }}>
                    <button
                      onClick={() => handleCopyCode(rec.confirmation_number)}
                      className="terminal-font btn-secondary"
                      style={{
                        padding: '3px 8px',
                        fontSize: '11px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer'
                      }}
                      title="Click to copy receipt code"
                    >
                      <Hash size={11} color="var(--neon-cyan)" />
                      <span>{rec.confirmation_number}</span>
                      {copiedId === rec.confirmation_number ? <Check size={11} color="#34d399" /> : <Copy size={11} color="var(--text-muted)" />}
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
