import React, { useEffect, useRef } from 'react';
import { Terminal, Cpu, CheckCircle2, AlertCircle, Wrench, Shield, Play } from 'lucide-react';

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

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '440px' }}>
      
      {/* Terminal Top Window Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '14px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* macOS Style Window Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }}></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
            <Terminal size={17} color="var(--neon-cyan)" />
            <h2 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0 }}>
              Strands Agents Live Telemetry
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-medium" style={{ fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span className="pulsing-dot-cyan"></span>
            LIVE SSE STREAM
          </span>
        </div>
      </div>

      {/* Terminal Console Stream Body */}
      <div
        ref={scrollRef}
        className="terminal-font"
        style={{
          flex: 1,
          background: 'rgba(4, 7, 16, 0.9)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)',
          padding: '16px',
          overflowY: 'auto',
          maxHeight: '480px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '12px'
        }}
      >
        {events.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '36px 16px', textAlign: 'center' }}>
            <Cpu size={28} color="var(--text-dim)" style={{ margin: '0 auto 12px' }} />
            <div>Awaiting multi-agent invocation...</div>
            <div style={{ fontSize: '11px', marginTop: '6px', color: 'var(--text-dim)' }}>
              Click any benchmark scenario or inject a bill to observe the real-time Strands Agents reasoning chain.
            </div>
          </div>
        ) : (
          events.map((ev, idx) => {
            const agentColor = getAgentBadgeColor(ev.agent_name);
            return (
              <div
                key={ev.id || idx}
                style={{
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderLeft: `3px solid ${agentColor}`,
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                  transition: 'background 0.15s ease'
                }}
              >
                {/* Agent Header Line */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background: `${agentColor}20`,
                        color: agentColor,
                        border: `1px solid ${agentColor}40`,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.3px'
                      }}
                    >
                      {ev.agent_name}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                      [{ev.step}]
                    </span>
                  </div>

                  <span style={{ color: 'var(--text-dim)', fontSize: '10px' }}>
                    {ev.timestamp ? ev.timestamp.slice(11, 19) : ''}
                  </span>
                </div>

                {/* Agent Reasoning Thought */}
                <div style={{ color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: ev.tool_called ? '8px' : '0' }}>
                  {ev.thought}
                </div>

                {/* Tool Invocation Chip */}
                {ev.tool_called && (
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: 'var(--neon-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '4px'
                  }}>
                    <Wrench size={13} color="var(--neon-cyan)" />
                    <span>Strands Tool Executed: <strong style={{ color: '#fff' }}>{ev.tool_called}()</strong></span>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Pulsing Terminal Prompt at the end */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '11px', marginTop: '6px' }}>
          <span style={{ color: 'var(--neon-cyan)' }}>➜</span>
          <span>lifeguard-daemon:</span>
          <span style={{ color: 'var(--neon-emerald)' }}>~/ambient-stream</span>
          <span className="pulsing-dot-cyan" style={{ width: '4px', height: '12px', borderRadius: '1px' }}></span>
        </div>
      </div>

    </div>
  );
}
