import React, { useState } from 'react';
import { 
  Play, Sparkles, Wifi, Dumbbell, HeartPulse, 
  Coffee, RotateCcw, Zap, CheckCircle2, ArrowRight, ShieldAlert
} from 'lucide-react';

export default function DemoController({ onInjectScenario, onResetAll, loadingKey, activeTab, onTabChange }) {
  const [tourStep, setTourStep] = useState(null); // null | 1 | 2 | 3 | 4
  const [isTourRunning, setIsTourRunning] = useState(false);

  const scenarios = [
    {
      key: 'comcast',
      title: 'Comcast Internet Hike',
      amount: '+$419.88/yr',
      statute: 'FCC 47 C.F.R. § 8.1',
      icon: Wifi,
      color: '#00f0ff',
      badgeClass: 'badge-cyan'
    },
    {
      key: 'gym',
      title: 'Planet Fitness Trap',
      amount: '+$359.88/yr',
      statute: 'FTC Click-to-Cancel',
      icon: Dumbbell,
      color: '#f59e0b',
      badgeClass: 'badge-amber'
    },
    {
      key: 'medical',
      title: 'Surprise Hospital Bill',
      amount: '$420.00 Saved',
      statute: 'No Surprises Act',
      icon: HeartPulse,
      color: '#f43f5e',
      badgeClass: 'badge-high'
    },
    {
      key: 'warranty',
      title: 'Breville Fire Recall',
      amount: '$899.95 Value',
      statute: 'CPSC Safety Recall',
      icon: Coffee,
      color: '#a855f7',
      badgeClass: 'badge-purple'
    }
  ];

  // 20-Second Autopilot Guided Tour for Hackathon Judges
  const runAutopilotTour = async () => {
    if (isTourRunning) return;
    setIsTourRunning(true);

    try {
      // Step 1: Switch to Daemon Monitor (ambient scan)
      setTourStep(1);
      onTabChange('daemon');
      await new Promise(r => setTimeout(r, 2200));

      // Step 2: Inject scenario & switch to Agent Reasoning
      setTourStep(2);
      await onInjectScenario('comcast', false); // inject without auto-switching tab immediately
      onTabChange('telemetry');
      await new Promise(r => setTimeout(r, 2800));

      // Step 3: Switch to Action Gate (Decision Surfaced)
      setTourStep(3);
      onTabChange('decisions');
      await new Promise(r => setTimeout(r, 3200));

      // Step 4: Tour completed
      setTourStep(4);
      setTimeout(() => {
        setTourStep(null);
        setIsTourRunning(false);
      }, 3500);

    } catch (err) {
      console.error('Autopilot error:', err);
      setIsTourRunning(false);
      setTourStep(null);
    }
  };

  return (
    <div className="glass-panel" style={{
      padding: '20px 28px',
      marginBottom: '24px',
      background: 'linear-gradient(90deg, rgba(14, 22, 40, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
      border: '1px solid rgba(0, 240, 255, 0.35)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.12)',
      borderRadius: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
        
        {/* Title & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #0ea5e9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0, 240, 255, 0.5)'
          }}>
            <Zap size={20} color="#050914" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.01em' }}>
                🏆 Grand Prize Interactive Demo Suite
              </h3>
              <span className="badge badge-cyan" style={{ fontSize: '12px', padding: '4px 10px' }}>
                1-CLICK EVALUATION
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Click any real-world scenario below to watch the Strands Agents background scan, federal reasoning, and 1-click recovery.
            </p>
          </div>
        </div>

        {/* Autopilot & Reset Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={runAutopilotTour}
            disabled={isTourRunning}
            className="btn-primary"
            style={{
              fontSize: '14px',
              padding: '10px 18px',
              background: isTourRunning ? 'rgba(0, 240, 255, 0.2)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderColor: '#10b981',
              boxShadow: isTourRunning ? 'none' : '0 0 20px rgba(16, 185, 129, 0.4)',
              cursor: isTourRunning ? 'not-allowed' : 'pointer'
            }}
          >
            <Play size={16} fill="currentColor" />
            <span>{isTourRunning ? `Running Autopilot Tour (Stage ${tourStep}/4)...` : '▶ Run 20s Autopilot Tour'}</span>
          </button>

          {onResetAll && (
            <button
              onClick={onResetAll}
              className="btn-secondary"
              title="Reset decisions and start with a fresh slate"
              style={{
                fontSize: '13px',
                padding: '10px 14px',
                color: 'var(--text-muted)',
                borderColor: 'rgba(255, 255, 255, 0.15)'
              }}
            >
              <RotateCcw size={14} />
              <span>Reset State</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Flagship Scenario Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '14px'
      }}>
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isLoading = loadingKey === sc.key;

          return (
            <button
              key={sc.key}
              onClick={() => onInjectScenario(sc.key, true)}
              disabled={isLoading || isTourRunning}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: `1px solid ${sc.color}40`,
                borderRadius: '12px',
                padding: '14px 18px',
                textAlign: 'left',
                cursor: isLoading ? 'wait' : 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = sc.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 6px 20px ${sc.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${sc.color}40`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: `${sc.color}18`,
                  border: `1px solid ${sc.color}45`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={18} color={sc.color} />
                </div>

                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                    {sc.title}
                  </div>
                  <div style={{ fontSize: '11px', color: sc.color, fontWeight: 700, marginTop: '3px' }}>
                    {sc.statute}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span className="terminal-font" style={{ fontSize: '14px', fontWeight: 800, color: '#34d399' }}>
                  {sc.amount}
                </span>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {isLoading ? 'Processing...' : 'Click to Test →'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Autopilot Tour Progress Banner */}
      {isTourRunning && (
        <div style={{
          marginTop: '16px',
          padding: '12px 20px',
          borderRadius: '10px',
          background: 'rgba(0, 240, 255, 0.12)',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="pulsing-dot-emerald"></span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
              {tourStep === 1 && 'Stage 1: Ambient Daemon detects inbound bill in background (0 pings for normal expenses)...'}
              {tourStep === 2 && 'Stage 2: Multi-Agent Reasoning correlates baseline & identifies FCC 47 C.F.R. § 8.1 violation...'}
              {tourStep === 3 && 'Stage 3: Decision Card surfaced to Human Principal with $419.88 annual impact...'}
              {tourStep === 4 && 'Stage 4: Ready for 1-Click Human Authorization & Capital Recovery!'}
            </span>
          </div>

          <span style={{ fontSize: '12px', color: 'var(--neon-cyan)', fontWeight: 800, textTransform: 'uppercase' }}>
            Stage {tourStep} of 4
          </span>
        </div>
      )}
    </div>
  );
}
