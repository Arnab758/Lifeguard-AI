import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AuditWorkspace from './components/AuditWorkspace';
import ActionCenter from './components/ActionCenter';
import AgentTrace from './components/AgentTrace';
import SavingsLedger from './components/SavingsLedger';
import ResolutionModal from './components/ResolutionModal';

const API_BASE = 'http://127.0.0.1:8000';

export default function App() {
  const [decisions, setDecisions] = useState([]);
  const [metrics, setMetrics] = useState({ total_saved_annual: 0, pending_reviews_count: 0, ledger_items: [] });
  const [events, setEvents] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [loadingKey, setLoadingKey] = useState(null);

  // Fetch decisions and metrics
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
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px 60px' }}>
      {/* Top Header & Live Financial Metrics */}
      <Header metrics={metrics} />

      {/* Primary Audit Workspace: Live Custom Audits, File Uploads & Demo Benchmark */}
      <AuditWorkspace
        onInject={handleInject}
        onCustomAudit={handleCustomAudit}
        onUploadAudit={handleUploadAudit}
        loadingKey={loadingKey}
      />

      {/* 2-Column Main Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(400px, 1.2fr) minmax(350px, 1fr)',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Human-in-the-Loop Decision Action Center */}
        <ActionCenter
          decisions={decisions}
          onApprove={handleApprove}
          onDismiss={handleDismiss}
          onViewMemo={(card) => setSelectedMemo(card)}
        />

        {/* Right Column: Live Strands Agents Telemetry & Thought Stream */}
        <AgentTrace events={events} />
      </div>

      {/* Bottom: Verified Financial Recovery Ledger */}
      <SavingsLedger 
        ledger={metrics.ledger_items || []} 
        totalAnnual={metrics.total_saved_annual || 0}
        apiBase={API_BASE}
      />

      {/* Modal for viewing & dispatching drafted legal dossiers */}
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
