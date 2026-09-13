import React from 'react';
import { Shield, Activity, DollarSign, Award, Clock } from 'lucide-react';

export default function Header({ metrics, activeMode }) {
  return (
    <header className="glass-panel" style={{ padding: '16px 24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        {/* Brand & Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #00b0ff 100%)',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 0 16px rgba(0, 176, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                LifeGuard Agent
              </h1>
              <span className="badge badge-medium" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span className="pulsing-dot"></span>
                AUTONOMOUS DAEMON ACTIVE
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Autonomous Household LifeOps &amp; Financial Safeguard • Powered by Strands Agents SDK &amp; Amazon Bedrock AgentCore
            </p>
          </div>
        </div>

        {/* Live Metrics Ticker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          {/* Total Annual Savings */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '8px 16px',
            borderRadius: '10px',
            textAlign: 'right'
          }}>
            <span style={{ fontSize: '11px', color: '#6ee7b7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Cumulative Reclaimed Capital
            </span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
              ${metrics?.total_saved_annual?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>/yr</span>
            </div>
          </div>

          {/* Pending Reviews Pill */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '8px 16px',
            borderRadius: '10px'
          }}>
            <span style={{ fontSize: '11px', color: '#fcd34d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Pending Human Authorizations
            </span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#fbbf24' }}>
              {metrics?.pending_reviews_count ?? 0}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
