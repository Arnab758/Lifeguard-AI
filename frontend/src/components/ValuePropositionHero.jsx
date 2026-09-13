import React, { useState } from 'react';
import { 
  Shield, Scale, Zap, DollarSign, CheckCircle2, 
  XCircle, ChevronDown, ChevronUp, ArrowRight, Sparkles, HelpCircle, Lock
} from 'lucide-react';

export default function ValuePropositionHero({ onConnectClick, onRunComcastDemo }) {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="glass-panel" style={{
      padding: '32px',
      marginBottom: '28px',
      background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(14, 165, 233, 0.08) 100%)',
      border: '1px solid rgba(0, 240, 255, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '260px',
        height: '260px',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Top Value Headline */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
        <div style={{ maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', marginBottom: '14px' }}>
            <Sparkles size={15} color="#f59e0b" />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#fcd34d', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              The Silent Corporate Tax Problem
            </span>
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.25 }}>
            Stop Losing <span style={{ color: '#34d399' }}>$1,800/Year</span> to Corporate Fine Print &amp; Stealth Fee Creep
          </h2>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            Telecoms quietly hike rates after promotions expire. Subscriptions trap you in cancellation mazes. Clinics send unlawful balance bills.
            <strong style={{ color: '#ffffff' }}> Everyday humans don't have time to fight fine print and wait on hold. </strong>
            LifeGuard runs silently in the background of your life, audits routine expenses, and surfaces only when real money is taken.
          </p>
        </div>

        {/* Quick Connect & Video CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '220px' }}>
          <button
            onClick={onConnectClick}
            className="btn-primary"
            style={{
              fontSize: '15px',
              padding: '14px 22px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <Lock size={16} />
            <span>Connect My Household</span>
          </button>

          <button
            onClick={() => setShowComparison(!showComparison)}
            className="btn-secondary"
            style={{
              fontSize: '14px',
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: 'var(--text-secondary)'
            }}
          >
            <HelpCircle size={15} color="var(--neon-cyan)" />
            <span>{showComparison ? 'Hide Comparison' : 'Why LifeGuard vs Other Apps'}</span>
            {showComparison ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* 3 Core Value Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '18px',
        marginTop: '12px'
      }}>
        {/* Pillar 1 */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '20px 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Shield size={20} color="#34d399" />
            </div>
            <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              1. 95% Silent Background Pass
            </h4>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
            Normal bills (Spotify $11.99, Netflix $15.49, power) are audited against contracts in 15ms. Zero spam. Zero notifications.
          </p>
        </div>

        {/* Pillar 2 */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '20px 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Scale size={20} color="var(--neon-cyan)" />
            </div>
            <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              2. Statutory Legal Muscle
            </h4>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
            Cross-references federal regulations (FCC Truth-in-Billing, FTC Click-to-Cancel, No Surprises Act) and drafts formal demand briefs.
          </p>
        </div>

        {/* Pillar 3 */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '20px 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={20} color="#fbbf24" />
            </div>
            <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              3. 1-Click Human Execution
            </h4>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
            Surfaces a single high-impact decision card. You tap once to dispatch pre-filled executive disputes and recover money into your ledger.
          </p>
        </div>
      </div>

      {/* Expandable Comparison Matrix */}
      {showComparison && (
        <div style={{
          marginTop: '24px',
          padding: '24px',
          borderRadius: '14px',
          background: 'rgba(5, 9, 20, 0.9)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          animation: 'fadeIn 0.25s ease'
        }}>
          <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>How LifeGuard AI Compares to Traditional Tools</span>
          </h4>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 16px' }}>Capability</th>
                  <th style={{ padding: '12px 16px', color: '#fda4af' }}>Rocket Money / Mint</th>
                  <th style={{ padding: '12px 16px', color: '#fcd34d' }}>ChatGPT / Claude</th>
                  <th style={{ padding: '12px 16px', color: '#34d399', fontWeight: 800 }}>LifeGuard AI (Autonomous Daemon)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#ffffff' }}>Routine Ingestion</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>Bank feed only, misses fine print PDFs</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>Requires manual document upload</td>
                  <td style={{ padding: '14px 16px', color: '#34d399', fontWeight: 700 }}>Autonomous background daemon (inbox + webhooks)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#ffffff' }}>Noise &amp; Notifications</td>
                  <td style={{ padding: '14px 16px', color: '#fda4af' }}>Constant push notifications &amp; upsells</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>You must remember to ask it</td>
                  <td style={{ padding: '14px 16px', color: '#34d399', fontWeight: 700 }}>95% silent pass. Surfaces ONLY for real decisions</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#ffffff' }}>Federal Legal Citations</td>
                  <td style={{ padding: '14px 16px', color: '#fda4af' }}>None (generic advice)</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>Hallucinates or lacks statutory CFR codes</td>
                  <td style={{ padding: '14px 16px', color: '#34d399', fontWeight: 700 }}>Exact FCC, FTC, CFPB, and No Surprises Act codes</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#ffffff' }}>Action Execution</td>
                  <td style={{ padding: '14px 16px', color: '#fda4af' }}>Tells you to call company yourself or takes 40% fee</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>Generates text you must manually copy/paste</td>
                  <td style={{ padding: '14px 16px', color: '#34d399', fontWeight: 700 }}>1-Click executive mailto dispatch + tracking ledger</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
