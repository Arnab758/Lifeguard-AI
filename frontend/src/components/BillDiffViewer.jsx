import React from 'react';
import { ArrowRight, AlertTriangle, ShieldCheck, Scale, DollarSign, TrendingUp } from 'lucide-react';

export default function BillDiffViewer({ 
  provider = 'Comcast Xfinity',
  category = 'TELECOM',
  baselineAmount = 50.00,
  currentAmount = 84.99,
  annualImpact = 419.88,
  statutoryRule = 'FCC 47 C.F.R. § 8.1'
}) {
  const monthlyDrift = Math.max(0, currentAmount - baselineAmount);
  const percentageDrift = baselineAmount > 0 ? Math.round((monthlyDrift / baselineAmount) * 100) : 100;

  return (
    <div className="glass-panel" style={{
      padding: '28px',
      background: 'linear-gradient(135deg, rgba(14, 22, 40, 0.95) 0%, rgba(5, 9, 20, 0.98) 100%)',
      border: '1px solid rgba(244, 63, 94, 0.35)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(244, 63, 94, 0.12)',
      borderRadius: '18px',
      marginBottom: '24px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TrendingUp size={20} color="#f43f5e" />
          </div>
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
              Fine-Print Diff &amp; Capital Leakage Inspector
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Mathematical correlation of contracted baseline vs. inbound invoice drift
            </p>
          </div>
        </div>

        <span className="badge badge-high" style={{ fontSize: '12px', padding: '5px 12px' }}>
          +{percentageDrift}% STEALTH DRIFT DETECTED
        </span>
      </div>

      {/* Side-by-Side Visual Diff */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        
        {/* Left: Contracted Baseline */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.06)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '14px',
          padding: '20px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Contracted Baseline
            </span>
            <ShieldCheck size={18} color="#34d399" />
          </div>

          <div className="terminal-font" style={{ fontSize: '32px', fontWeight: 800, color: '#34d399', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            ${baselineAmount.toFixed(2)}
            <span style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: 600 }}>/mo</span>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
              <span>Contracted Plan:</span>
              <strong style={{ color: '#ffffff' }}>Performance Pro</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
              <span>Agreed Promotion:</span>
              <strong style={{ color: '#34d399' }}>Locked Rate ($50.00)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Unauthorized Fees:</span>
              <strong style={{ color: '#34d399' }}>$0.00</strong>
            </div>
          </div>
        </div>

        {/* Right: Predatory Statement */}
        <div style={{
          background: 'rgba(244, 63, 94, 0.08)',
          border: '1px solid rgba(244, 63, 94, 0.45)',
          borderRadius: '14px',
          padding: '20px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Inbound Predatory Invoice
            </span>
            <AlertTriangle size={18} color="#f43f5e" />
          </div>

          <div className="terminal-font" style={{ fontSize: '32px', fontWeight: 800, color: '#f43f5e', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            ${currentAmount.toFixed(2)}
            <span style={{ fontSize: '15px', color: '#fda4af', fontWeight: 600 }}>/mo</span>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
              <span>Base Rate Hike:</span>
              <strong style={{ color: '#fda4af' }}>+$24.99/mo</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
              <span>Stealth Surcharge:</span>
              <strong style={{ color: '#fda4af' }}>+$10.00/mo</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Notice to Consumer:</span>
              <strong style={{ color: '#f43f5e' }}>0 Days (Unannounced)</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Drift Bar */}
      <div style={{ marginTop: '20px', padding: '16px 20px', borderRadius: '12px', background: 'rgba(5, 9, 20, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Fee Creep Visual Ratio:</span>
          <span className="terminal-font" style={{ color: '#f43f5e', fontWeight: 800 }}>
            +${monthlyDrift.toFixed(2)}/mo ($+{annualImpact.toFixed(2)}/yr Loss)
          </span>
        </div>

        {/* Progress Comparison Bar */}
        <div style={{ height: '10px', width: '100%', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: `${Math.min(100, Math.round((baselineAmount / currentAmount) * 100))}%`, background: '#10b981' }} title="Contracted Baseline" />
          <div style={{ width: `${Math.round((monthlyDrift / currentAmount) * 100)}%`, background: '#f43f5e' }} title="Unlawful Fee Creep" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', fontSize: '12px' }}>
          <span style={{ color: '#34d399' }}>■ Contracted Baseline: ${baselineAmount.toFixed(2)}</span>
          <span style={{ color: '#f43f5e' }}>■ Unannounced Extraction: +${monthlyDrift.toFixed(2)} ({statutoryRule})</span>
        </div>
      </div>
    </div>
  );
}
