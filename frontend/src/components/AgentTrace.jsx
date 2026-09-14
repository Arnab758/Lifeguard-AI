import React, { useEffect, useRef } from 'react';
import { Terminal, Cpu, CheckCircle2, AlertCircle, Wrench, Shield, Play } from 'lucide-react';
import AgentNeuralGraph from './AgentNeuralGraph';

export default function AgentTrace({ events }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  const getAgentBadgeColor = (agentName) => {
    switch (agentName) {
      case 'AuditAgent': return '#00f0ff';
      case 'PolicyAgent': return '#8b5cf6';
      case 'ResolverAgent': return '#10b981';
      case 'HITLGatekeeper': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  const latestAgent = events.length > 0 ? events[events.length - 1].agent_name : null;
  let currentStep = 2;
  if (latestAgent === 'AuditAgent') currentStep = 1;
  else if (latestAgent === 'PolicyAgent') currentStep = 2;
  else if (latestAgent === 'ResolverAgent') currentStep = 3;
  else if (latestAgent === 'HITLGatekeeper') currentStep = 4;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. Interactive Multi-Agent Neural Flight Deck */}
      <AgentNeuralGraph activeStep={currentStep} />

      {/* 2. Live SSE Telemetry Terminal Stream */}
      <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', minHeight: '520px' }}>
      
      {/* Top Terminal Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '18px',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }}></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '8px' }}>
            <Terminal size={20} color="var(--neon-cyan)" />
            <h2 style={{ fontSize: '18px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0, color: '#ffffff' }}>
              Strands Agents Live Telemetry &amp; Reasoning Chain
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-medium" style={{ fontSize: '12px', padding: '6px 14px' }}>
            <span className="pulsing-dot-cyan"></span>
            LIVE SSE STREAM • BIDIRECTIONAL
          </span>
        </div>
      </div>

      {/* Terminal Console Stream Body */}
      <div
        ref={scrollRef}
        className="terminal-font"
        style={{
          flex: 1,
          background: 'rgba(4, 7, 16, 0.95)',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.85)',
          padding: '24px',
          overflowY: 'auto',
          maxHeight: '620px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          fontSize: '14px'
        }}
      >
        {events.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '64px 20px', textAlign: 'center' }}>
            <Cpu size={36} color="var(--text-dim)" style={{ margin: '0 auto 16px' }} />
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Awaiting Multi-Agent Invocation...
            </div>
            <div style={{ fontSize: '14px', marginTop: '8px', color: 'var(--text-muted)' }}>
              The Strands multi-agent chain will stream live step-by-step reasoning here when an invoice is audited or an anomaly is triggered.
            </div>
          </div>
        ) : (
          events.map((ev, idx) => {
            const agentColor = getAgentBadgeColor(ev.agent_name);
            return (
              <div
                key={ev.id || idx}
                style={{
                  padding: '14px 18px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: `4px solid ${agentColor}`,
                  borderRadius: '8px',
                  boxShadow: '0 3px 12px rgba(0, 0, 0, 0.3)',
                  transition: 'background 0.15s ease'
                }}
              >
                {/* Agent Header Line */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        background: `${agentColor}25`,
                        color: agentColor,
                        border: `1px solid ${agentColor}50`,
                        padding: '3px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 800,
                        letterSpacing: '0.4px'
                      }}
                    >
                      {ev.agent_name}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600 }}>
                      [{ev.step}]
                    </span>
                  </div>

                  <span style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
                    {ev.timestamp ? ev.timestamp.slice(11, 19) : ''}
                  </span>
                </div>

                {/* Agent Thought */}
                <div style={{ color: '#ffffff', lineHeight: 1.6, fontSize: '14px', marginBottom: ev.tool_called ? '10px' : '0' }}>
                  {ev.thought}
                </div>

                {/* Tool Invocation Chip */}
                {ev.tool_called && (
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: 'var(--neon-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '6px'
                  }}>
                    <Wrench size={15} color="var(--neon-cyan)" />
                    <span>Strands SDK Tool Executed: <strong style={{ color: '#ffffff' }}>{ev.tool_called}()</strong></span>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Pulsing Terminal Prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '13px', marginTop: '10px' }}>
          <span style={{ color: 'var(--neon-cyan)', fontWeight: 800 }}>➜</span>
          <span>lifeguard-daemon:</span>
          <span style={{ color: 'var(--neon-emerald)' }}>~/ambient-stream</span>
          <span className="pulsing-dot-cyan" style={{ width: '6px', height: '14px', borderRadius: '1px' }}></span>
        </div>
      </div>

    </div>
  </div>
  );
}
