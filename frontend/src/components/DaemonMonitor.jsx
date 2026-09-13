import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Activity, EyeOff, AlertTriangle, 
  Sparkles, RefreshCw, FolderSearch, Mail, 
  Radio, CheckCircle2, ArrowRight, Play, Cpu, Zap, Eye, BellOff
} from 'lucide-react';

export default function DaemonMonitor({ apiBase = 'http://127.0.0.1:8000', onDecisionSurfaced }) {
  const [daemonStats, setDaemonStats] = useState({
    daemon_active: true,
    total_routine_checks: 24,
    silent_passes_without_interruption: 23,
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
    const interval = setInterval(fetchDaemonStatus, 3500);
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

  const silentPercent = daemonStats.total_routine_checks > 0
    ? Math.round((daemonStats.silent_passes_without_interruption / daemonStats.total_routine_checks) * 100)
    : 95;

  return (
    <div style={{ marginBottom: '24px' }}>
      
      {/* Autonomous Background LifeOps HUD Banner */}
      <div className="glass-panel glass-panel-cyan" style={{ padding: '24px', marginBottom: '18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.8fr) minmax(280px, 1.2fr)', gap: '24px', alignItems: 'center' }}>
          
          {/* Narrative & Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span className="badge badge-low" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span className="pulsing-dot-emerald"></span>
                BACKGROUND SENTINEL ACTIVE
              </span>
              <span style={{ fontSize: '12px', color: 'var(--neon-cyan)', fontWeight: 700, letterSpacing: '0.3px' }}>
                AWS Agents for Humans Track: Everyday Life
              </span>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '8px' }}>
              Autonomous Background LifeOps Daemon
            </h2>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
              Instead of another app you have to open and manage, LifeGuard runs as an ambient daemon in the background.
              It silently audits monthly subscriptions, scans utility billing drift, and executes daily safety recall checks.
              <strong style={{ color: '#34d399' }}> 95% of routine bills pass silently with zero human disruption. </strong>
              The agent surfaces to the screen <em>only</em> when high-stakes authorization is required.
            </p>

            {/* Active Background Watchers Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
              <div style={{
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#e0f2fe'
              }}>
                <FolderSearch size={14} color="#00f0ff" />
                <span>Filesystem Sentinel: <code className="terminal-font" style={{ color: '#00f0ff' }}>ambient_inbox/</code></span>
              </div>

              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#ecfdf5'
              }}>
                <Mail size={14} color="#10b981" />
                <span>Inbound Webhook: <code className="terminal-font" style={{ color: '#10b981' }}>protect+human@lifeguard.ai</code></span>
              </div>

              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fffbeb'
              }}>
                <Radio size={14} color="#f59e0b" />
                <span>CPSC Daily Sweeper: <span style={{ color: '#fbbf24', fontWeight: 600 }}>Active</span></span>
              </div>
            </div>
          </div>

          {/* Visual Radar Scanner HUD */}
          <div style={{
            background: 'rgba(4, 8, 18, 0.8)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.08)'
          }}>
            {/* Animated SVG Radar */}
            <div style={{ position: 'relative', width: '92px', height: '92px', flexShrink: 0 }}>
              <svg width="92" height="92" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                {/* Concentric rings */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1" />
                {/* Crosshairs */}
                <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
                <line x1="50" y1="4" x2="50" y2="96" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
                {/* Radar Sweep Arc */}
                <g className="radar-sweep-beam">
                  <path d="M 50 50 L 96 50 A 46 46 0 0 0 82 18 Z" fill="url(#radarSweepGradient)" />
                </g>
                <defs>
                  <linearGradient id="radarSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Blip 1: Routine pass */}
              <div style={{ position: 'absolute', top: '24px', left: '60px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 6px #10b981' }} />
              {/* Blip 2: Silent baseline */}
              <div style={{ position: 'absolute', bottom: '28px', left: '26px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 6px #00f0ff' }} />
              {/* Center Sentry Core */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }} />
            </div>

            {/* Live Telemetry Micro-Readout */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                Sentry Telemetry
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                Scanning 18 Monitored Accounts
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Status: <span style={{ color: '#34d399', fontWeight: 700 }}>Zero Unchecked Drift</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Heartbeat: <span className="terminal-font" style={{ color: 'var(--neon-cyan)' }}>120s loop</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Telemetry Metric KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        
        {/* KPI 1: Routine Background Tasks */}
        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--neon-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
              Routine Chores Audited
            </span>
            <Activity size={15} color="var(--neon-cyan)" />
          </div>
          <div className="terminal-font" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px' }}>
            {daemonStats.total_routine_checks}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Audited silently in background
          </div>
        </div>

        {/* KPI 2: Human Interruptions Prevented */}
        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
              Human Interruptions Prevented
            </span>
            <EyeOff size={15} color="#10b981" />
          </div>
          <div className="terminal-font" style={{ fontSize: '28px', fontWeight: 800, color: '#34d399', marginTop: '6px' }}>
            {daemonStats.silent_passes_without_interruption}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Matched baseline (Passed silently)
          </div>
        </div>

        {/* KPI 3: Surfaced For Human Decision */}
        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
              Surfaced For Decision
            </span>
            <AlertTriangle size={15} color="#f43f5e" />
          </div>
          <div className="terminal-font" style={{ fontSize: '28px', fontWeight: 800, color: '#f43f5e', marginTop: '6px' }}>
            {daemonStats.anomalies_surfaced_to_human}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            High-stakes (Gated by HITL)
          </div>
        </div>

        {/* KPI 4: Autonomous Gating Ratio */}
        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
              Autonomous Silence Rate
            </span>
            <Zap size={15} color="#a855f7" />
          </div>
          <div className="terminal-font" style={{ fontSize: '28px', fontWeight: 800, color: '#c084fc', marginTop: '6px' }}>
            {silentPercent}%
          </div>
          {/* Mini progress bar */}
          <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
            <div style={{ width: `${silentPercent}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6 0%, #00f0ff 100%)' }} />
          </div>
        </div>

      </div>

      {/* Interactive Simulation Controls for Hackathon Evaluators */}
      <div className="glass-panel" style={{ padding: '22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="var(--neon-cyan)" />
            <h3 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Interactive Daemon Simulator &amp; Gating Verification
            </h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Experience how LifeGuard differentiates routine chores from high-stakes decisions
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          
          {/* Simulation Action 1: Routine Task (Silent Pass) */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(14, 21, 37, 0.7) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <EyeOff size={17} color="#34d399" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#34d399' }}>
                  1. Test Routine Task (Passes Silently)
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                Simulates an everyday chore arriving in background inbox (e.g. Spotify $11.99, Netflix $15.49, or ConEd baseline).
                LifeGuard audits the line items against contracted baselines, confirms zero drift, and 
                <strong style={{ color: '#34d399' }}> silently logs it without interrupting you</strong>.
              </p>
            </div>

            <button
              className="btn-secondary"
              onClick={handleSimulateRoutine}
              disabled={isSimulatingRoutine}
              style={{
                width: '100%',
                justifyContent: 'center',
                fontSize: '13px',
                padding: '10px 16px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderColor: 'rgba(16, 185, 129, 0.3)'
              }}
            >
              {isSimulatingRoutine ? (
                <span>Auditing in background...</span>
              ) : (
                <>
                  <Play size={14} color="#34d399" /> Run Routine Silent Sweep (Zero Distraction)
                </>
              )}
            </button>
          </div>

          {/* Simulation Action 2: Anomaly Arrival (Surfaces Decision) */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.06) 0%, rgba(14, 21, 37, 0.7) 100%)',
            border: '1px solid rgba(244, 63, 94, 0.35)',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <AlertTriangle size={17} color="#f43f5e" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#f43f5e' }}>
                  2. Test Anomaly Event (Surfaces Decision)
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                Simulates an incoming statement with an unannounced rate increase, cancellation trap, or federal safety recall.
                LifeGuard detects the anomaly, prepares a dispute dossier, and <strong style={{ color: '#f43f5e' }}>surfaces a Decision Card below</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <select
                value={selectedAnomalyKey}
                onChange={(e) => setSelectedAnomalyKey(e.target.value)}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                <option value="comcast">Comcast: +$34.99 Stealth Rate Hike (FCC 47 C.F.R. § 8.1)</option>
                <option value="gym">Planet Fitness: In-Person Cancel Barrier (FTC Rule 425)</option>
                <option value="warranty">Breville Espresso: Boiler Recall (CPSC #24-789)</option>
                <option value="medical">Quest Diagnostics: Out-of-Network Surcharge (No Surprises Act)</option>
              </select>

              <button
                className="btn-danger"
                onClick={handleSimulateAnomaly}
                disabled={isSimulatingAnomaly}
                style={{ fontSize: '13px', padding: '9px 16px', whiteSpace: 'nowrap' }}
              >
                {isSimulatingAnomaly ? 'Auditing...' : 'Trigger Anomaly'}
              </button>
            </div>
          </div>

        </div>

        {/* Live Background Activity Monospace Telemetry */}
        {daemonStats.recent_activity && daemonStats.recent_activity.length > 0 && (
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                Live Background Daemon Activity Log (Ambient Stream)
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Showing last {daemonStats.recent_activity.length} background events
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
              {daemonStats.recent_activity.map((act) => {
                const isSilent = act.status === 'SILENT_ROUTINE_PASS';
                return (
                  <div
                    key={act.id}
                    className="terminal-font"
                    style={{
                      fontSize: '12px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: isSilent ? 'rgba(255, 255, 255, 0.02)' : 'rgba(244, 63, 94, 0.08)',
                      border: isSilent ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(244, 63, 94, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>[{act.timestamp}]</span>
                      <span style={{ color: isSilent ? '#34d399' : '#f43f5e', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {isSilent ? '🤫 [SILENT PASS]' : '🚨 [SURFACED DECISION]'}
                      </span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {act.provider}:
                      </span>
                      <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {act.detail}
                      </span>
                    </div>

                    <span style={{
                      fontSize: '10px',
                      color: isSilent ? '#34d399' : '#f43f5e',
                      background: isSilent ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.2)',
                      border: isSilent ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(244, 63, 94, 0.4)',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>
                      {isSilent ? 'Zero Human Distraction' : 'Human Authorization Required'}
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
