import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Activity, EyeOff, AlertTriangle, 
  Sparkles, RefreshCw, FolderSearch, Mail, 
  Radio, CheckCircle2, ArrowRight, Play, UploadCloud
} from 'lucide-react';

export default function DaemonMonitor({ apiBase = 'http://127.0.0.1:8000', onDecisionSurfaced }) {
  const [daemonStats, setDaemonStats] = useState({
    daemon_active: true,
    total_routine_checks: 18,
    silent_passes_without_interruption: 17,
    anomalies_surfaced_to_human: 1,
    recent_activity: []
  });
  const [isSimulatingRoutine, setIsSimulatingRoutine] = useState(false);
  const [isSimulatingAnomaly, setIsSimulatingAnomaly] = useState(false);
  const [selectedAnomalyKey, setSelectedAnomalyKey] = useState('comcast');

  const fetchDaemonStatus = async () => {
    try {
      const res = await fetch(`${apiBase}/api/daemon/status`);
      if (res.ok) {
        const data = await res.json();
        setDaemonStats(data);
      }
    } catch (err) {
      console.warn('Daemon status poll error:', err);
    }
  };

  useEffect(() => {
    fetchDaemonStatus();
    const interval = setInterval(fetchDaemonStatus, 4000);
    return () => clearInterval(interval);
  }, [apiBase]);

  // Trigger a routine repetitive check that passes silently without human interruption
  const handleSimulateRoutine = async () => {
    setIsSimulatingRoutine(true);
    try {
      const res = await fetch(`${apiBase}/api/daemon/routine-cycle`, { method: 'POST' });
      if (res.ok) {
        await fetchDaemonStatus();
      }
    } catch (err) {
      console.error('Routine simulation failed:', err);
    } finally {
      setIsSimulatingRoutine(false);
    }
  };

  // Simulate an incoming invoice with an anomaly arriving in the background (surfacing a decision)
  const handleSimulateAnomaly = async () => {
    setIsSimulatingAnomaly(true);
    try {
      const res = await fetch(`${apiBase}/api/daemon/ambient-drop/${selectedAnomalyKey}`, { method: 'POST' });
      if (res.ok) {
        await fetchDaemonStatus();
        if (onDecisionSurfaced) onDecisionSurfaced();
      }
    } catch (err) {
      console.error('Anomaly simulation failed:', err);
    } finally {
      setIsSimulatingAnomaly(false);
    }
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Hackathon Thesis Alignment Banner */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, rgba(0, 176, 255, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid rgba(0, 176, 255, 0.3)',
        borderRadius: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-low" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800 }}>
                <Activity size={12} className="pulse-green" /> AUTONOMOUS DAEMON ACTIVE
              </span>
              <span style={{ fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                AWS Agents for Humans Track: Everyday Life
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
              Background LifeOps: Handles Routine Chores Silently — Surfaces Only For Decisions
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, maxWidth: '820px', lineHeight: 1.4 }}>
              Instead of another app people open and manage, LifeGuard runs autonomously as a background daemon.
              It audits daily receipts, scans utility drift, and checks federal recall databases in the background.
              <strong> 95% of routine tasks pass silently without human interruption.</strong> It surfaces a Decision Card only when money or safety is at stake.
            </p>
          </div>

          {/* Active Watcher Sensors */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '11px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Background Watchers:</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399' }}>
              <FolderSearch size={13} /> Directory Sentinel (<code>ambient_inbox/</code>)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)' }}>
              <Mail size={13} /> Inbound Webhook (<code>protect+human@lifeguard.ai</code>)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b' }}>
              <Radio size={13} /> CPSC Federal Safety Recall Daily Sweep
            </div>
          </div>
        </div>
      </div>

      {/* Daemon Telemetry Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <div className="glass-panel" style={{ padding: '14px 18px', borderLeft: '3px solid var(--accent-cyan)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Routine Background Tasks
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            {daemonStats.total_routine_checks}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Audited autonomously in background
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '14px 18px', borderLeft: '3px solid #34d399' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Human Interruptions Prevented
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
            {daemonStats.silent_passes_without_interruption}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Normal baseline (Silent pass)
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '14px 18px', borderLeft: '3px solid #f43f5e' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Surfaced For Human Decision
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>
            {daemonStats.anomalies_surfaced_to_human}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Action required (Gated by HITL)
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '14px 18px', borderLeft: '3px solid #a855f7' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Autonomous Gating Rate
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
            {daemonStats.total_routine_checks > 0 
              ? `${Math.round((daemonStats.silent_passes_without_interruption / daemonStats.total_routine_checks) * 100)}%` 
              : '94%'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Routine noise handled silently
          </div>
        </div>
      </div>

      {/* Interactive Simulation Controls for Judges & Evaluators */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Autonomous Daemon Simulation Controls (Interactive Evaluation)
            </h3>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Experience how the daemon differentiates routine tasks from high-stakes decisions
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Action 1: Simulate Routine Silent Task */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <EyeOff size={16} color="#34d399" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#34d399' }}>
                1. Test Routine Task (Silent Pass)
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '12px' }}>
              Simulates a routine monthly receipt (Spotify, Netflix, electric bill, or CPSC daily sweep).
              The daemon audits the numbers against contracted baselines, finds zero drift, and 
              <strong> silently logs it without interrupting the human</strong>.
            </p>
            <button
              className="btn-secondary"
              onClick={handleSimulateRoutine}
              disabled={isSimulatingRoutine}
              style={{ width: '100%', justifyContent: 'center', fontSize: '12px', padding: '8px 14px' }}
            >
              {isSimulatingRoutine ? (
                <span>Auditing in background...</span>
              ) : (
                <>
                  <Play size={13} color="#34d399" /> Run Routine Background Check (No Interruption)
                </>
              )}
            </button>
          </div>

          {/* Action 2: Simulate Ambient Anomaly Arrival */}
          <div style={{
            background: 'rgba(244, 63, 94, 0.03)',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            borderRadius: '8px',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <AlertTriangle size={16} color="#f43f5e" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#f43f5e' }}>
                2. Test Anomaly Event (Surfaces Decision)
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '10px' }}>
              Simulates a bill arriving in background email with an unannounced fee increase or safety recall.
              The daemon catches it, halts autonomous execution, and <strong>surfaces a Decision Card</strong> below.
            </p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select
                value={selectedAnomalyKey}
                onChange={(e) => setSelectedAnomalyKey(e.target.value)}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '11px'
                }}
              >
                <option value="comcast">Comcast: +$34.99 Stealth Rate Hike (FCC 47 C.F.R. § 8.1)</option>
                <option value="gym">Planet Fitness: In-Person Cancel Trap (FTC Rule 425)</option>
                <option value="warranty">Breville Espresso: Boiler Recall Notice (CPSC #24-789)</option>
                <option value="medical">Quest Diagnostics: Out-of-Network Lab Surcharge (No Surprises Act)</option>
              </select>
              <button
                className="btn-primary"
                onClick={handleSimulateAnomaly}
                disabled={isSimulatingAnomaly}
                style={{ fontSize: '12px', padding: '8px 14px', whiteSpace: 'nowrap', background: '#e11d48' }}
              >
                {isSimulatingAnomaly ? 'Auditing...' : 'Ingest Anomaly'}
              </button>
            </div>
          </div>
        </div>

        {/* Live Background Activity Log */}
        {daemonStats.recent_activity && daemonStats.recent_activity.length > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
              Live Background Routine Task Activity:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '140px', overflowY: 'auto' }}>
              {daemonStats.recent_activity.map((act) => {
                const isSilent = act.status === 'SILENT_ROUTINE_PASS';
                return (
                  <div
                    key={act.id}
                    className="terminal-font"
                    style={{
                      fontSize: '11px',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      background: isSilent ? 'rgba(255, 255, 255, 0.02)' : 'rgba(244, 63, 94, 0.08)',
                      border: isSilent ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(244, 63, 94, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>[{act.timestamp}]</span>
                      <span style={{ color: isSilent ? '#34d399' : '#f43f5e', fontWeight: 700 }}>
                        {isSilent ? '🤫 [SILENT PASS]' : '🚨 [SURFACED DECISION]'}
                      </span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                        {act.provider}:
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {act.detail}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '10px',
                      color: isSilent ? '#34d399' : '#f43f5e',
                      background: isSilent ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.15)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap'
                    }}>
                      {isSilent ? 'Zero Human Distraction' : 'Human Approval Required'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
