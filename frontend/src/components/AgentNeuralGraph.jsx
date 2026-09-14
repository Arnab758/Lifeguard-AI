import React, { useState } from 'react';
import { 
  FileText, Calculator, Scale, PenTool, 
  ShieldAlert, CheckCircle2, ArrowRight, Zap, Sparkles 
} from 'lucide-react';

export default function AgentNeuralGraph({ activeStep = 3 }) {
  const [activeNode, setActiveNode] = useState(2); // Default to PolicyAgent

  const nodes = [
    {
      id: 0,
      name: 'Ingestion Daemon',
      agent: 'AmbientDaemon',
      icon: FileText,
      color: '#00f0ff',
      role: 'Monitors ambient_inbox & webhooks silently. Extracts line items and charges in 12ms without user ping.',
      output: 'Statement parsed: Comcast Xfinity • $84.99 • Contract baseline: $50.00'
    },
    {
      id: 1,
      name: 'Audit Agent',
      agent: 'Strands AuditAgent',
      icon: Calculator,
      color: '#38bdf8',
      role: 'Mathematical drift engine. Calculates +$34.99/mo (+70%) drift and projects $419.88 in annual capital leakage.',
      output: 'audit_bill_drift() -> { monthly_drift: 34.99, annual_leakage: 419.88, severity: "HIGH" }'
    },
    {
      id: 2,
      name: 'Policy Agent',
      agent: 'Strands PolicyAgent',
      icon: Scale,
      color: '#a855f7',
      role: 'Legal intelligence engine. Indexes federal CFR statutes and identifies violations of FCC Truth-in-Billing rules.',
      output: 'lookup_consumer_rights() -> Matched: FCC 47 C.F.R. § 8.1 (Broadband Consumer Labels)'
    },
    {
      id: 3,
      name: 'Resolver Agent',
      agent: 'Strands ResolverAgent',
      icon: PenTool,
      color: '#10b981',
      role: 'Executive dispute compiler. Resolves executive advocacy email and drafts formal statutory dispute notice.',
      output: 'draft_action_resolution() -> Drafted: "Formal Notice of Dispute: Unlawful Rate Increase"'
    },
    {
      id: 4,
      name: 'HITL Gatekeeper',
      agent: 'HITL Defense Gate',
      icon: ShieldAlert,
      color: '#f59e0b',
      role: 'Zero-trust security shield. Halts autonomous dispatch and surfaces turnkey Decision Card for 1-click authorization.',
      output: 'Decision Card dec_4a1cf21a surfaced to Human Principal. Awaiting 1-click release.'
    }
  ];

  return (
    <div className="glass-panel" style={{
      padding: '28px',
      background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1) 0%, rgba(14, 22, 40, 0.95) 100%)',
      border: '1px solid rgba(139, 92, 246, 0.35)',
      boxShadow: '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.15)',
      borderRadius: '20px',
      marginBottom: '28px'
    }}>
      {/* Flight Deck Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(139, 92, 246, 0.2)',
            border: '1px solid #a855f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)'
          }}>
            <Sparkles size={22} color="#a855f7" />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
              Strands Agents Multi-Agent Neural Flight Deck
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Real-time collaboration across 4 specialized autonomous agents &amp; 1 human-in-the-loop gating node
            </p>
          </div>
        </div>

        <span className="badge badge-purple" style={{ fontSize: '12px', padding: '5px 14px' }}>
          5 COOPERATING REASONING NODES
        </span>
      </div>

      {/* Interactive Neural Nodes Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
        marginBottom: '22px',
        position: 'relative'
      }}>
        {nodes.map((n, idx) => {
          const Icon = n.icon;
          const isSelected = activeNode === n.id;

          return (
            <div
              key={n.id}
              onClick={() => setActiveNode(n.id)}
              style={{
                background: isSelected 
                  ? `linear-gradient(135deg, ${n.color}25 0%, rgba(15, 23, 42, 0.95) 100%)` 
                  : 'rgba(15, 23, 42, 0.7)',
                border: isSelected ? `2px solid ${n.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '14px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isSelected ? 'translateY(-2px)' : 'none',
                boxShadow: isSelected ? `0 8px 24px -4px ${n.color}40` : 'none',
                position: 'relative'
              }}
            >
              {/* Node Sequence Number */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '10px',
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--text-muted)'
              }}>
                0{idx + 1}
              </div>

              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: `${n.color}20`,
                border: `1px solid ${n.color}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px'
              }}>
                <Icon size={18} color={n.color} />
              </div>

              <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                {n.name}
              </div>
              <div style={{ fontSize: '11px', color: n.color, fontWeight: 700 }}>
                {n.agent}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Telemetry Terminal Display */}
      {nodes[activeNode] && (
        <div style={{
          background: 'rgba(5, 8, 18, 0.95)',
          border: `1px solid ${nodes[activeNode].color}40`,
          borderRadius: '14px',
          padding: '20px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="pulsing-dot-emerald"></span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: nodes[activeNode].color, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                {nodes[activeNode].agent} • Live Autonomous Execution
              </span>
            </div>

            <span className="terminal-font" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Execution Time: 18ms • Deterministic Pass
            </span>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '12px' }}>
            {nodes[activeNode].role}
          </p>

          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '13px'
          }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
              Active Output Payload:
            </span>
            <code className="terminal-font" style={{ color: '#34d399', wordBreak: 'break-all' }}>
              {nodes[activeNode].output}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
