import React from 'react';
import { DollarSign, CheckCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function SavingsLedger({ ledger, totalAnnual }) {
  return (
    <div className="glass-panel" style={{ padding: '20px', marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} color="var(--accent-emerald)" />
          <h2 style={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Verified Household Financial Ledger &amp; Resolution Audit
          </h2>
        </div>
        <div style={{ fontSize: '13px', color: '#34d399', fontWeight: 700 }}>
          Total Recovered Capital: ${totalAnnual?.toFixed(2)}/yr
        </div>
      </div>

      {ledger.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
          No actions executed yet. Authorize pending actions above to log verified financial recoveries.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 12px' }}>Timestamp</th>
                <th style={{ padding: '8px 12px' }}>Provider</th>
                <th style={{ padding: '8px 12px' }}>Category</th>
                <th style={{ padding: '8px 12px' }}>Action Executed</th>
                <th style={{ padding: '8px 12px' }}>Annual Savings</th>
                <th style={{ padding: '8px 12px' }}>Confirmation #</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((rec) => (
                <tr key={rec.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>
                    {rec.resolved_at ? rec.resolved_at.slice(0, 10) : 'Today'}
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {rec.provider}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span className="badge badge-medium" style={{ fontSize: '10px' }}>
                      {rec.category}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>
                    {rec.action_type}
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#34d399' }}>
                    +${rec.amount_annual.toFixed(2)}/yr
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span className="terminal-font" style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                      {rec.confirmation_number}
                    </span>
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
