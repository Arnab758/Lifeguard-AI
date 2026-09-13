import React, { useEffect, useRef } from 'react';
import { Terminal, Cpu, CheckCircle2, AlertCircle, Wrench } from 'lucide-react';

export default function AgentTrace({ events }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  const getAgentBadgeColor = (agentName) => {
    switch (agentName) {
      case 'AuditAgent': return '#00b0ff';
      case 'PolicyAgent': return '#8b5cf6';
      case 'ResolverAgent': return '#10b981';
      case 'HITLGatekeeper': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '380px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={18} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Strands Agents Live Telemetry &amp; Reasoning Stream
          </h2>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
          <span className="pulsing-dot"></span> LIVE SSE STREAM
        </span>
      </div>

      <div
        ref={scrollRef}
        className="terminal-font"
        style={{
          flex: 1,
          background: 'rgba(5, 8, 16, 0.75)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '12px',
          overflowY: 'auto',
          maxHeight: '440px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          fontSize: '12px'
        }}
      >
        {events.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '16px', textAlign: 'center' }}>
            Awaiting background trigger... Click any scenario above to view the Strands multi-agent reasoning chain.
          </div>
        ) : (
          events.map((ev, idx) => {
            const agentColor = getAgentBadgeColor(ev.agent_name);
            return (
              <div
                key={ev.id || idx}
                style={{
                  padding: '8px 10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderLeft: `3px solid ${agentColor}`,
                  borderRadius: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background: `${agentColor}22`,
                        color: agentColor,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 700
                      }}
                    >
                      {ev.agent_name}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                      [{ev.step}]
                    </span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                    {ev.timestamp ? ev.timestamp.slice(11, 19) : ''}
                  </span>
                </div>

                <div style={{ color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: ev.tool_called ? '6px' : '0' }}>
                  {ev.thought}
                </div>

                {ev.tool_called && (
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Wrench size={12} />
                    <span>Tool Invocation: <strong>{ev.tool_called}()</strong></span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
