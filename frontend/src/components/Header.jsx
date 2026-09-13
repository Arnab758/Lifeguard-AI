import React from 'react';
import { Shield, Activity, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Header({ metrics, activeTab, onTabChange }) {
  const totalSaved = metrics?.total_saved_annual || 0;
  const pendingCount = metrics?.pending_reviews_count || 0;

  const navItems = [
    { id: 'decisions', label: 'Action Gate', badge: pendingCount > 0 ? `${pendingCount} Required` : 'All Clear', badgeType: pendingCount > 0 ? 'amber' : 'green' },
    { id: 'daemon', label: 'Background Sentinel', badge: 'Live', badgeType: 'cyan' },
    { id: 'telemetry', label: 'Agent Reasoning', badge: 'SSE Stream', badgeType: 'purple' },
    { id: 'sandbox', label: 'Audit Sandbox', badge: 'Upload / Test', badgeType: 'neutral' },
    { id: 'ledger', label: 'Financial Ledger', badge: `$${totalSaved.toFixed(0)}/yr`, badgeType: 'green' }
  ];

  return (
    <header className="glass-panel" style={{ padding: '24px 32px', marginBottom: '28px' }}>
      
      {/* Top Row: Brand & Live Metric Counters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '22px' }}>
        
        {/* Brand Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(14, 165, 233, 0.45) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.5)',
            boxShadow: '0 0 24px rgba(0, 240, 255, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Shield size={32} color="#00f0ff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: '#ffffff' }}>
                LifeGuard <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>Daemon</span>
              </h1>
              
              <div className="badge badge-low" style={{ fontSize: '13px', padding: '6px 12px' }}>
                <span className="pulsing-dot-emerald"></span>
                <span>AUTONOMOUS BACKGROUND LIFE-OPS</span>
              </div>
            </div>

            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Handles routine chores silently in the background • Surfaces only for real decisions • Powered by Strands SDK &amp; Bedrock
            </p>
          </div>
        </div>

        {/* Big Financial Metric Highlights */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          
          {/* Reclaimed Capital */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(5, 150, 105, 0.08) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 6px 24px -6px rgba(16, 185, 129, 0.3)',
            padding: '12px 22px',
            borderRadius: '14px',
            textAlign: 'right',
            minWidth: '220px'
          }}>
            <div style={{ fontSize: '12px', color: '#6ee7b7', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '2px' }}>
              Cumulative Capital Reclaimed
            </div>
            <div className="terminal-font" style={{ fontSize: '28px', fontWeight: 800, color: '#34d399', letterSpacing: '-0.02em' }}>
              ${totalSaved.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '4px' }}>/yr</span>
            </div>
          </div>

          {/* Pending Authorizations */}
          <div style={{
            background: pendingCount > 0 
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)'
              : 'rgba(255, 255, 255, 0.04)',
            border: pendingCount > 0 
              ? '1px solid rgba(245, 158, 11, 0.5)' 
              : '1px solid var(--border-subtle)',
            boxShadow: pendingCount > 0 ? '0 6px 24px -6px rgba(245, 158, 11, 0.35)' : 'none',
            padding: '12px 22px',
            borderRadius: '14px',
            minWidth: '180px'
          }}>
            <div style={{ fontSize: '12px', color: pendingCount > 0 ? '#fcd34d' : 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '2px' }}>
              Decisions Required
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="terminal-font" style={{ fontSize: '28px', fontWeight: 800, color: pendingCount > 0 ? '#fbbf24' : 'var(--text-primary)' }}>
                {pendingCount}
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {pendingCount === 1 ? 'Action Pending' : pendingCount > 1 ? 'Actions Pending' : 'All Clear'}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row: Clear, Prominent Navigation Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '18px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                background: isActive ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.18) 0%, rgba(14, 165, 233, 0.12) 100%)' : 'rgba(255, 255, 255, 0.04)',
                border: isActive ? '1px solid var(--neon-cyan)' : '1px solid var(--border-subtle)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                padding: '12px 22px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 18px rgba(0, 240, 255, 0.25)' : 'none'
              }}
            >
              <span>{item.label}</span>
              <span style={{
                fontSize: '12px',
                fontWeight: 800,
                padding: '3px 9px',
                borderRadius: '6px',
                background: item.badgeType === 'amber' && pendingCount > 0 
                  ? 'rgba(245, 158, 11, 0.3)' 
                  : item.badgeType === 'green' 
                    ? 'rgba(16, 185, 129, 0.25)' 
                    : item.badgeType === 'cyan' 
                      ? 'rgba(0, 240, 255, 0.25)' 
                      : 'rgba(255, 255, 255, 0.1)',
                color: item.badgeType === 'amber' && pendingCount > 0 
                  ? '#fbbf24' 
                  : item.badgeType === 'green' 
                    ? '#34d399' 
                    : item.badgeType === 'cyan' 
                      ? '#38bdf8' 
                      : 'var(--text-muted)'
              }}>
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

    </header>
  );
}
