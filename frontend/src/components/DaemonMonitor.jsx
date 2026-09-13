import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Activity, EyeOff, AlertTriangle, 
  Sparkles, RefreshCw, FolderSearch, Mail, 
  Radio, CheckCircle2, ArrowRight, Play, Cpu, Zap
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Hero Radar HUD Banner */}
      <div className="glass-panel glass-panel-cyan" style={{ padding: '36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1.8fr) minmax(300px, 1.2fr)', gap: '36px', alignItems: 'center' }}>
          
          {/* Narrative & Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span className="badge badge-low" style={{ fontSize: '13px', padding: '6px 14px' }}>
                <span className="pulsing-dot-emerald"></span>
                AUTONOMOUS DAEMON ACTIVE
              </span>
              <span style={{ fontSize: '14px', color: 'var(--neon-cyan)', fontWeight: 700 }}>
                AWS Everyday Life Hackathon Track
              </span>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', lineHeight: 1.3, marginBottom: '12px' }}>
              Background LifeOps: Handles Routine Chores Silently
            </h2>

            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              Instead of another app you have to open and manage, LifeGuard runs as an ambient background daemon.
              It silently audits monthly subscriptions, utility drift, and federal product safety recalls.
              <strong style={{ color: '#34d399' }}> 95% of routine bills pass silently with zero human interruption. </strong>
              The agent surfaces a Decision Card only when money or safety is at risk.
            </p>

            {/* Active Sentry Channels */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
              <div style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                borderRadius: '10px',
                padding: '10px 16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ffffff'
              }}>
                <FolderSearch size={18} color="#00f0ff" />
                <span>Filesystem Watcher: <code className="terminal-font" style={{ color: '#00f0ff' }}>ambient_inbox/</code></span>
              </div>

              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderRadius: '10px',
                padding: '10px 16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ffffff'
              }}>
                <Mail size={18} color="#10b981" />
                <span>Inbound Webhook: <code className="terminal-font" style={{ color: '#10b981' }}>protect+human@lifeguard.ai</code></span>
              </div>

              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                borderRadius: '10px',
                padding: '10px 16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ffffff'
              }}>
                <Radio size={18} color="#f59e0b" />
                <span>CPSC Daily Sweeper: <strong style={{ color: '#fbbf24' }}>Active</strong></span>
              </div>
            </div>
          </div>

          {/* Large Visual Radar Scanner */}
          <div style={{
            background: 'rgba(4, 8, 18, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            boxShadow: 'inset 0 0 30px rgba(0, 240, 255, 0.1)'
          }}>
            {/* SVG Radar */}
            <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
              <svg width="120" height="120" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(0, 240, 255, 0.35)" strokeWidth="1" />
                <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" />
                <line x1="50" y1="4" x2="50" y2="96" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" />
                <g className="radar-sweep-beam">
                  <path d="M 50 50 L 96 50 A 46 46 0 0 0 82 18 Z" fill="url(#radarSweepGradientLg)" />
                </g>
                <defs>
                  <linearGradient id="radarSweepGradientLg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', top: '30px', left: '76px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <div style={{ position: 'absolute', bottom: '34px', left: '32px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 12px #00f0ff' }} />
            </div>

            {/* Readout */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                Sentry Telemetry
              </div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                Monitoring 18 Accounts
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                Status: <strong style={{ color: '#34d399' }}>Zero Unchecked Drift</strong>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Daemon loop: <span className="terminal-font" style={{ color: 'var(--neon-cyan)' }}>120s background tick</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* KPI Cards Grid - Large & Readable */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        
        <div className="glass-panel" style={{ padding: '24px 28px', borderLeft: '5px solid var(--neon-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
              Routine Chores Audited
            </span>
            <Activity size={18} color="var(--neon-cyan)" />
          </div>
          <div className="terminal-font" style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff', marginTop: '8px' }}>
            {daemonStats.total_routine_checks}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Handled automatically in background
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px 28px', borderLeft: '5px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
              Human Interruptions Saved
            </span>
            <EyeOff size={18} color="#10b981" />
          </div>
          <div className="terminal-font" style={{ fontSize: '38px', fontWeight: 800, color: '#34d399', marginTop: '8px' }}>
            {daemonStats.silent_passes_without_interruption}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Zero drift detected (Passed silently)
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px 28px', borderLeft: '5px solid #f43f5e' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
              Surfaced For Decision
            </span>
            <AlertTriangle size={18} color="#f43f5e" />
          </div>
          <div className="terminal-font" style={{ fontSize: '38px', fontWeight: 800, color: '#f43f5e', marginTop: '8px' }}>
            {daemonStats.anomalies_surfaced_to_human}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            High-stakes (Gated by Human)
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px 28px', borderLeft: '5px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
              Autonomous Silence Rate
            </span>
            <Zap size={18} color="#a855f7" />
          </div>
          <div className="terminal-font" style={{ fontSize: '38px', fontWeight: 800, color: '#c084fc', marginTop: '8px' }}>
            {silentPercent}%
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: `${silentPercent}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6 0%, #00f0ff 100%)' }} />
          </div>
        </div>

      </div>

      {/* Simulator Deck - Clear, Distinct, Spacious */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={22} color="var(--neon-cyan)" />
            <h3 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0, color: '#ffffff' }}>
              Autonomous Daemon Evaluation Deck
            </h3>
          </div>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Experience how the daemon differentiates routine noise from real decisions
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          
          {/* Card 1: Routine Task */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(14, 22, 40, 0.7) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <EyeOff size={20} color="#34d399" />
                <span style={{ fontSize: '17px', fontWeight: 800, color: '#34d399' }}>
                  1. Test Routine Task (Silent Pass)
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                Simulates an everyday chore arriving in your background inbox (Spotify $11.99, Netflix $15.49, or ConEd baseline).
                LifeGuard audits against contracted baselines, verifies zero drift, and 
                <strong style={{ color: '#34d399' }}> silently logs it without notifying or interrupting you</strong>.
              </p>
            </div>

            <button
              className="btn-secondary"
              onClick={handleSimulateRoutine}
              disabled={isSimulatingRoutine}
              style={{
                width: '100%',
                justifyContent: 'center',
                fontSize: '15px',
                padding: '13px 20px',
                background: 'rgba(16, 185, 129, 0.15)',
                borderColor: 'rgba(16, 185, 129, 0.4)'
              }}
            >
              {isSimulatingRoutine ? (
                <span>Auditing in background...</span>
              ) : (
                <>
                  <Play size={16} color="#34d399" /> Run Routine Silent Sweep (Zero Distraction)
                </>
              )}
            </button>
          </div>

          {/* Card 2: Anomaly Arrival */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(14, 22, 40, 0.7) 100%)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <AlertTriangle size={20} color="#f43f5e" />
                <span style={{ fontSize: '17px', fontWeight: 800, color: '#f43f5e' }}>
                  2. Test Anomaly Event (Surfaces Decision)
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                Simulates an incoming statement with an unannounced price hike, cancellation trap, or federal safety recall.
                LifeGuard catches it, halts autonomous execution, and <strong style={{ color: '#f43f5e' }}>surfaces a Decision Card in the Action Gate</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                value={selectedAnomalyKey}
                onChange={(e) => setSelectedAnomalyKey(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
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
                style={{ fontSize: '14px', padding: '12px 22px', whiteSpace: 'nowrap' }}
              >
                {isSimulatingAnomaly ? 'Auditing...' : 'Trigger Anomaly'}
              </button>
            </div>
          </div>

        </div>

        {/* Live Activity Feed */}
        {daemonStats.recent_activity && daemonStats.recent_activity.length > 0 && (
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                Live Background Daemon Activity Log (Ambient Stream)
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Showing last {daemonStats.recent_activity.length} background tasks
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
              {daemonStats.recent_activity.map((act) => {
                const isSilent = act.status === 'SILENT_ROUTINE_PASS';
                return (
                  <div
                    key={act.id}
                    className="terminal-font"
                    style={{
                      fontSize: '13px',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: isSilent ? 'rgba(255, 255, 255, 0.02)' : 'rgba(244, 63, 94, 0.08)',
                      border: isSilent ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(244, 63, 94, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>[{act.timestamp}]</span>
                      <span style={{ color: isSilent ? '#34d399' : '#f43f5e', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {isSilent ? '🤫 [SILENT PASS]' : '🚨 [SURFACED DECISION]'}
                      </span>
                      <span style={{ color: '#ffffff', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {act.provider}:
                      </span>
                      <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {act.detail}
                      </span>
                    </div>

                    <span style={{
                      fontSize: '11px',
                      color: isSilent ? '#34d399' : '#f43f5e',
                      background: isSilent ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.2)',
                      border: isSilent ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(244, 63, 94, 0.45)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontWeight: 800,
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
