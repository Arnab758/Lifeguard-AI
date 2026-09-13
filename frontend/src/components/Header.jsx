import React from 'react';
import { Shield, Radio, Activity, Sparkles, Lock, Cpu, ArrowUpRight, CheckCircle2, Bell } from 'lucide-react';

export default function Header({ metrics }) {
  const totalSaved = metrics?.total_saved_annual || 0;
  const pendingCount = metrics?.pending_reviews_count || 0;

  return (
    <header className="glass-panel" style={{ padding: '20px 28px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        
        {/* Left: Brand Identity & Autonomous Mission */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {/* Glowing Cyber Shield */}
          <div style={{
            position: 'relative',
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(14, 165, 233, 0.4) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 0 24px rgba(0, 240, 255, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Shield size={28} color="#00f0ff" />
            <div style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981',
              border: '2px solid #050811'
            }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
                LifeGuard <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>Daemon</span>
              </h1>
              
              <div className="badge badge-low" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span className="pulsing-dot-emerald"></span>
                <span>AUTONOMOUS SENTINEL LIVE</span>
              </div>

              <div className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Cpu size={12} />
                <span>Strands SDK • Amazon Bedrock</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Autonomous Background LifeOps &amp; Consumer Protection</span>
              <span style={{ color: 'var(--text-dim)' }}>•</span>
              <span style={{ color: 'var(--text-muted)' }}>Handles 95% routine chores silently — Surfaces only for real decisions</span>
            </p>
          </div>
        </div>

        {/* Right: Real-Time Financial & Governance Ticker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          
          {/* Reclaimed Capital Ticker */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.06) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            boxShadow: '0 4px 20px -5px rgba(16, 185, 129, 0.25)',
            padding: '10px 18px',
            borderRadius: '12px',
            textAlign: 'right',
            minWidth: '190px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginBottom: '2px' }}>
              <span style={{ fontSize: '10px', color: '#6ee7b7', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Reclaimed Capital
              </span>
              <CheckCircle2 size={12} color="#34d399" />
            </div>
            <div className="terminal-font" style={{ fontSize: '22px', fontWeight: 800, color: '#34d399', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '3px' }}>
              ${totalSaved.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>/yr</span>
            </div>
          </div>

          {/* Pending Human Authorizations */}
          <div style={{
            background: pendingCount > 0 
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(217, 119, 6, 0.08) 100%)'
              : 'rgba(255, 255, 255, 0.03)',
            border: pendingCount > 0 
              ? '1px solid rgba(245, 158, 11, 0.45)' 
              : '1px solid var(--border-subtle)',
            boxShadow: pendingCount > 0 ? '0 4px 20px -5px rgba(245, 158, 11, 0.3)' : 'none',
            padding: '10px 18px',
            borderRadius: '12px',
            minWidth: '160px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{
                fontSize: '10px', 
                color: pendingCount > 0 ? '#fcd34d' : 'var(--text-muted)', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.6px'
              }}>
                Action Gating
              </span>
              {pendingCount > 0 && <span className="pulsing-dot-amber" style={{ width: '6px', height: '6px' }}></span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="terminal-font" style={{ fontSize: '22px', fontWeight: 800, color: pendingCount > 0 ? '#fbbf24' : 'var(--text-primary)' }}>
                {pendingCount}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.2 }}>
                {pendingCount === 1 ? 'Decision Awaiting Approval' : 'Decisions Awaiting Approval'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
