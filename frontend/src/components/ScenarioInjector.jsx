import React, { useState } from 'react';
import { Wifi, Dumbbell, Coffee, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

const SCENARIOS = [
  {
    key: 'comcast',
    title: 'Comcast Xfinity',
    category: 'Telecom Stealth Hike',
    impact: '+$270/yr',
    description: 'Promotional rate expired. $22.50/mo stealth increase + new $7.50 infrastructure surcharge.',
    icon: Wifi,
    color: '#00b0ff'
  },
  {
    key: 'gym',
    title: 'Apex Fitness Club',
    category: 'Zombie Subscription Trap',
    impact: '+$600/yr',
    description: '12-mo contract ended 6 mos ago. Still auto-debiting $49.99/mo with in-person cancel barrier.',
    icon: Dumbbell,
    color: '#f59e0b'
  },
  {
    key: 'warranty',
    title: 'Breville Espresso Machine',
    category: 'Expiring Warranty & Recall',
    impact: '$899.95 Value',
    description: 'Warranty expires in 5 days. Matches active CPSC safety recall on boiler pressure relief valve.',
    icon: Coffee,
    color: '#8b5cf6'
  },
  {
    key: 'medical',
    title: 'Quest Diagnostics',
    category: 'Surprise Medical Overbill',
    impact: '$335 Saved',
    description: '$420 out-of-network balance bill for in-network routine lab work violating No Surprises Act.',
    icon: HeartPulse,
    color: '#f43f5e'
  }
];

export default function ScenarioInjector({ onInject, loadingKey }) {
  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Interactive Scenario Simulation (Judge Testing Suite)
          </h2>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Click any event below to simulate an incoming household document
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
        {SCENARIOS.map((sc) => {
          const Icon = sc.icon;
          const isLoading = loadingKey === sc.key;
          return (
            <div
              key={sc.key}
              onClick={() => !isLoading && onInject(sc.key)}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '14px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = sc.color;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    background: `${sc.color}20`,
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={18} color={sc.color} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {sc.title}
                    </h3>
                    <span style={{ fontSize: '11px', color: sc.color, fontWeight: 600 }}>
                      {sc.category}
                    </span>
                  </div>
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#34d399',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {sc.impact}
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '10px' }}>
                {sc.description}
              </p>

              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '12px', padding: '6px 12px' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Evaluating via Strands Agents...</span>
                ) : (
                  <>
                    <Sparkles size={14} /> Inject &amp; Audit Document
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
