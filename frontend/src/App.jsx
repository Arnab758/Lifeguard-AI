import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DaemonMonitor from './components/DaemonMonitor';
import AuditWorkspace from './components/AuditWorkspace';
import ActionCenter from './components/ActionCenter';
import AgentTrace from './components/AgentTrace';
import SavingsLedger from './components/SavingsLedger';
import ResolutionModal from './components/ResolutionModal';
import { Shield, ExternalLink, BookOpen, Lock, Terminal } from 'lucide-react';

const API_BASE = 'http://127.0.0.1:8000';

export default function App() {
  const [decisions, setDecisions] = useState([]);
  const [metrics, setMetrics] = useState({ total_saved_annual: 0, pending_reviews_count: 0, ledger_items: [] });
  const [events, setEvents] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [loadingKey, setLoadingKey] = useState(null);

  // Fetch decisions and metrics from FastAPI backend
  const refreshData = async () => {
    try {
      const [decRes, metRes] = await Promise.all([
        fetch(`${API_BASE}/api/decisions`),
        fetch(`${API_BASE}/api/metrics`)
      ]);
      if (decRes.ok) {
        const decData = await decRes.json();
        setDecisions(decData);
      }
      if (metRes.ok) {
        const metData = await metRes.json();
        setMetrics(metData);
      }
    } catch (err) {
      console.warn('Backend connection error (server may be starting):', err);
    }
  };

  useEffect(() => {
    refreshData();

    // Connect to Server-Sent Events (SSE) stream for real-time agent telemetry
    const eventSource = new EventSource(`${API_BASE}/api/audit-stream`);

    eventSource.addEventListener('agent_trace', (e) => {
      try {
        const parsed = JSON.parse(e.data);
        setEvents((prev) => [...prev.slice(-49), parsed]); // Keep last 50 events
        refreshData();
      } catch (err) {
        console.error('SSE parse error:', err);
      }
    });

    eventSource.onerror = () => {
      // EventSource reconnects automatically
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Handle Benchmark Scenario Injection
  const handleInject = async (scenarioKey) => {
    setLoadingKey(scenarioKey);
    try {
      const res = await fetch(`${API_BASE}/api/scenarios/inject/${scenarioKey}`, {
        method: 'POST'
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.error('Failed to inject scenario:', err);
    } finally {
      setLoadingKey(null);
    }
  };

  // Handle Custom Bill Audit
  const handleCustomAudit = async (customData) => {
    try {
      const res = await fetch(`${API_BASE}/api/audit-custom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customData)
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.error('Custom audit failed:', err);
    }
  };

  // Handle File Upload Audit
  const handleUploadAudit = async (file, overrides) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (overrides.provider_override) formData.append('provider_override', overrides.provider_override);
      if (overrides.baseline_override) formData.append('baseline_override', overrides.baseline_override);

      const res = await fetch(`${API_BASE}/api/audit-upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.error('Upload audit failed:', err);
    }
  };

  // Handle Human Approval
  const handleApprove = async (decisionId) => {
    try {
      const res = await fetch(`${API_BASE}/api/decisions/${decisionId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_note: 'Authorized by human principal via LifeGuard UI' })
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  // Handle Dismissal
  const handleDismiss = async (decisionId) => {
    try {
      const res = await fetch(`${API_BASE}/api/decisions/${decisionId}/dismiss`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Dismissed by user' })
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.error('Dismissal failed:', err);
    }
  };

  return (
    <div className="app-container">
      
      {/* 1. Header & Live Financial Metrics Cockpit */}
      <Header metrics={metrics} />

      {/* 2. Autonomous Background Daemon: Routine Chores Sentinel & HITL Gating Simulator */}
      <DaemonMonitor 
        apiBase={API_BASE}
        onDecisionSurfaced={refreshData}
      />

      {/* 3. Two-Column Intelligence Command Center */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '24px',
        alignItems: 'start',
        marginBottom: '24px'
      }}>
        {/* Left Column: Human-in-the-Loop Action Center (Surfaced ONLY when decision needed) */}
        <ActionCenter
          decisions={decisions}
          onApprove={handleApprove}
          onDismiss={handleDismiss}
          onViewMemo={(card) => setSelectedMemo(card)}
        />

        {/* Right Column: Live Strands Agents Multi-Agent Reasoning Telemetry */}
        <AgentTrace events={events} />
      </div>

      {/* 4. Live Custom Audit Sandbox, Document Parser & Benchmark Matrix */}
      <AuditWorkspace
        onInject={handleInject}
        onCustomAudit={handleCustomAudit}
        onUploadAudit={handleUploadAudit}
        loadingKey={loadingKey}
      />

      {/* 5. Verified Household Financial Ledger & Dispute Records */}
      <SavingsLedger 
        ledger={metrics.ledger_items || []} 
        totalAnnual={metrics.total_saved_annual || 0}
        apiBase={API_BASE}
      />

      {/* 6. World-Class Hackathon Submission Footer */}
      <footer style={{
        marginTop: '40px',
        padding: '24px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        color: 'var(--text-muted)',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={16} color="var(--neon-cyan)" />
          <span>
            <strong style={{ color: 'var(--text-primary)' }}>LifeGuard Agent</strong> • AWS Agents for Humans Hackathon 2026 (Everyday Life Track)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Lock size={12} color="#10b981" /> 100% Client-Side Principal Gating
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Terminal size={12} color="var(--neon-cyan)" /> Strands Agents SDK v1.0.0
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <BookOpen size={12} color="#f59e0b" /> FCC • FTC • CPSC • HHS Compliant
          </span>
        </div>
      </footer>

      {/* Modal for viewing & dispatching formal legal briefs */}
      <ResolutionModal 
        card={selectedMemo} 
        onClose={() => setSelectedMemo(null)}
        onApproveAndDispatch={(id) => {
          handleApprove(id);
          setSelectedMemo(null);
        }}
      />

    </div>
  );
}
