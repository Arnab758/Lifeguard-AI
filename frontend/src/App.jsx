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
  const [activeTab, setActiveTab] = useState('decisions');
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
        setActiveTab('decisions'); // Immediately show the surfaced decision card
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
        setActiveTab('decisions'); // Immediately show the surfaced decision card
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
        setActiveTab('decisions'); // Immediately show the surfaced decision card
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
      
      {/* 1. Header with Brand, Big Metrics, and Clean Navigation Tabs */}
      <Header 
        metrics={metrics} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* 2. Focused Main Stage — Displays Exactly What You Need Without Information Overload */}
      <main style={{ minHeight: '520px' }}>
        
        {/* View 1: Human-in-the-Loop Action Gate (Default View) */}
        {activeTab === 'decisions' && (
          <ActionCenter
            decisions={decisions}
            onApprove={handleApprove}
            onDismiss={handleDismiss}
            onViewMemo={(card) => setSelectedMemo(card)}
            onTriggerDemo={() => handleInject('comcast')}
          />
        )}

        {/* View 2: Autonomous Background Daemon & Radar Operations */}
        {activeTab === 'daemon' && (
          <DaemonMonitor 
            apiBase={API_BASE}
            onDecisionSurfaced={() => {
              refreshData();
              setActiveTab('decisions');
            }}
          />
        )}

        {/* View 3: Live Strands Agents Multi-Agent Reasoning Telemetry */}
        {activeTab === 'telemetry' && (
          <AgentTrace events={events} />
        )}

        {/* View 4: Document Parser, Custom Audit Sandbox & Benchmark Matrix */}
        {activeTab === 'sandbox' && (
          <AuditWorkspace
            onInject={handleInject}
            onCustomAudit={handleCustomAudit}
            onUploadAudit={handleUploadAudit}
            loadingKey={loadingKey}
          />
        )}

        {/* View 5: Verified Household Financial Recovery Ledger */}
        {activeTab === 'ledger' && (
          <SavingsLedger 
            ledger={metrics.ledger_items || []} 
            totalAnnual={metrics.total_saved_annual || 0}
            apiBase={API_BASE}
          />
        )}

      </main>

      {/* 3. High-End Hackathon Footer */}
      <footer style={{
        marginTop: '60px',
        padding: '28px 32px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        color: 'var(--text-muted)',
        fontSize: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={18} color="var(--neon-cyan)" />
          <span>
            <strong style={{ color: '#ffffff' }}>LifeGuard Agent</strong> • AWS Agents for Humans Hackathon 2026 (Everyday Life Track)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={14} color="#10b981" /> 100% Client-Side Principal Gating
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Terminal size={14} color="var(--neon-cyan)" /> Strands Agents SDK v1.0.0
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} color="#f59e0b" /> FCC • FTC • CPSC • HHS Compliant
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
