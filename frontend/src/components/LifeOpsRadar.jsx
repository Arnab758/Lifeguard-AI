import React, { useState, useEffect } from 'react';
import { Shield, EyeOff, AlertTriangle, CheckCircle2, Zap, Radio, Info } from 'lucide-react';

const CHANNELS = [
  { id: 'spotify', name: 'Spotify Premium', baseline: '$11.99', current: '$11.99', drift: '$0.00', status: 'PASS', ring: 1, angle: 25, category: 'SUBSCRIPTION' },
  { id: 'netflix', name: 'Netflix 4K', baseline: '$15.49', current: '$15.49', drift: '$0.00', status: 'PASS', ring: 1, angle: 100, category: 'SUBSCRIPTION' },
  { id: 'coned', name: 'ConEd Power & Gas', baseline: '$78.20', current: '$78.20', drift: '$0.00', status: 'PASS', ring: 2, angle: 60, category: 'UTILITIES' },
  { id: 'icloud', name: 'Apple iCloud+ 2TB', baseline: '$2.99', current: '$2.99', drift: '$0.00', status: 'PASS', ring: 1, angle: 190, category: 'SUBSCRIPTION' },
  { id: 'amazon', name: 'Amazon Prime', baseline: '$14.99', current: '$14.99', drift: '$0.00', status: 'PASS', ring: 2, angle: 145, category: 'SUBSCRIPTION' },
  { id: 'water', name: 'Municipal Water', baseline: '$42.50', current: '$42.50', drift: '$0.00', status: 'PASS', ring: 3, angle: 30, category: 'UTILITIES' },
  { id: 'verizon', name: 'Verizon 5G Wireless', baseline: '$65.00', current: '$65.00', drift: '$0.00', status: 'PASS', ring: 3, angle: 215, category: 'TELECOM' },
  { id: 'gym', name: 'Planet Fitness', baseline: '$10.00', current: '$29.99', drift: '+$19.99', status: 'PASS', ring: 2, angle: 285, category: 'SUBSCRIPTION' },
  { id: 'comcast', name: 'Comcast Xfinity', baseline: '$50.00', current: '$84.99', drift: '+$34.99', status: 'ALERT', ring: 3, angle: 330, category: 'TELECOM' },
  { id: 'cpsc', name: 'CPSC Recall Sweeper', baseline: '0 Hazards', current: '0 Hazards', drift: '0 Matches', status: 'PASS', ring: 2, angle: 350, category: 'SAFETY' }
];

export default function LifeOpsRadar({ activeAnomaly = 'comcast', onSelectChannel }) {
  const [selectedChannel, setSelectedChannel] = useState(CHANNELS.find(c => c.id === 'comcast') || CHANNELS[0]);
  const [sweepAngle, setSweepAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSweepAngle((prev) => (prev + 1.2) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const getCoordinates = (ring, angleDeg) => {
    const center = 200;
    const radii = [0, 75, 125, 175];
    const radius = radii[ring] || 120;
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad)
    };
  };

  return (
    <div className="glass-panel" style={{
      padding: '28px',
      background: 'radial-gradient(circle at 50% 30%, rgba(14, 22, 40, 0.9) 0%, rgba(4, 7, 16, 0.98) 100%)',
      border: '1px solid rgba(0, 240, 255, 0.3)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.15)',
      borderRadius: '20px'
    }}>
      {/* Top HUD Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(0, 240, 255, 0.15)',
            border: '1px solid var(--neon-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0, 240, 255, 0.4)'
          }}>
            <Radio size={22} color="var(--neon-cyan)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Ambient LifeOps Orbital Radar
              </h3>
              <span className="badge badge-low" style={{ fontSize: '11px', padding: '3px 10px' }}>
                <span className="pulsing-dot-emerald"></span>
                95% SILENT SHIELD
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Silently auditing 18 household channels. Zero human distraction until predatory drift occurs.
            </p>
          </div>
        </div>

        {/* Live Counters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '10px',
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <CheckCircle2 size={15} />
            <span>17 Silent Passes Today</span>
          </div>

          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.45)',
            borderRadius: '10px',
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#f43f5e',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <AlertTriangle size={15} />
            <span>1 Anomaly Intercepted</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Screen on Left, Live Telemetry Inspector on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        alignItems: 'center'
      }}>
        
        {/* Radar SVG Visualizer */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          aspectRatio: '1',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              {/* Radar beam gradient */}
              <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </radialGradient>

              {/* Sweep cone gradient */}
              <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 240, 255, 0.35)" />
                <stop offset="100%" stopColor="rgba(0, 240, 255, 0.0)" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines */}
            <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="125" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="200" cy="200" r="75" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1" />

            {/* Crosshairs */}
            <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="1" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="1" />

            {/* Rotating Radar Sweep Cone */}
            <g transform={`rotate(${sweepAngle} 200 200)`}>
              <path
                d="M 200 200 L 375 200 A 175 175 0 0 0 323 76 Z"
                fill="url(#sweepGradient)"
              />
              <line x1="200" y1="200" x2="375" y2="200" stroke="#00f0ff" strokeWidth="2" opacity="0.8" />
            </g>

            {/* Center: LifeGuard Shield Defense Core */}
            <circle cx="200" cy="200" r="32" fill="#040711" stroke="var(--neon-cyan)" strokeWidth="2" />
            <circle cx="200" cy="200" r="26" fill="rgba(0, 240, 255, 0.15)" />
            <foreignObject x="185" y="185" width="30" height="30">
              <Shield size={28} color="#00f0ff" />
            </foreignObject>

            {/* Channel Orbit Nodes */}
            {CHANNELS.map((ch) => {
              const coords = getCoordinates(ch.ring, ch.angle);
              const isAlert = ch.id === activeAnomaly || ch.status === 'ALERT';
              const isSelected = selectedChannel?.id === ch.id;
              const nodeColor = isAlert ? '#f43f5e' : '#10b981';

              return (
                <g
                  key={ch.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedChannel(ch);
                    if (onSelectChannel) onSelectChannel(ch);
                  }}
                >
                  {/* Ping ripple for alert nodes */}
                  {isAlert && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="16"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      opacity="0.8"
                    >
                      <animate attributeName="r" values="8;24;8" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Outer selection ring */}
                  {isSelected && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="12"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="2"
                    />
                  )}

                  {/* Main Node Point */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isSelected ? 7 : 5}
                    fill={nodeColor}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2 : 1}
                    filter={isAlert ? 'drop-shadow(0 0 8px #f43f5e)' : 'drop-shadow(0 0 4px #10b981)'}
                  />

                  {/* Label */}
                  <text
                    x={coords.x + 9}
                    y={coords.y + 4}
                    fill={isAlert ? '#fda4af' : '#cbd5e1'}
                    fontSize="11"
                    fontWeight={isAlert ? '800' : '600'}
                    fontFamily="var(--font-heading)"
                  >
                    {ch.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Selected Channel Live Inspector Card */}
        {selectedChannel && (
          <div style={{
            background: selectedChannel.status === 'ALERT' 
              ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)' 
              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: selectedChannel.status === 'ALERT' ? '1px solid rgba(244, 63, 94, 0.5)' : '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span className={selectedChannel.status === 'ALERT' ? 'badge badge-critical' : 'badge badge-low'}>
                {selectedChannel.status === 'ALERT' ? '⚠️ ANOMALY SURFACED' : '✓ 100% SILENT PASS'}
              </span>
              <span className="terminal-font" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Channel ID: {selectedChannel.id.toUpperCase()}
              </span>
            </div>

            <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0' }}>
              {selectedChannel.name}
            </h4>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
              {selectedChannel.status === 'ALERT'
                ? 'Predatory billing drift detected. Promotional discount silently dropped; unannounced infrastructure surcharge added.'
                : 'Routine monthly statement audited against contracted baseline in 14ms. No rate change detected. Passed silently with zero user distraction.'}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              background: 'rgba(5, 9, 20, 0.7)',
              padding: '14px 18px',
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Contract Baseline</span>
                <div className="terminal-font" style={{ fontSize: '18px', fontWeight: 800, color: '#34d399', marginTop: '2px' }}>
                  {selectedChannel.baseline}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Billed Amount</span>
                <div className="terminal-font" style={{ fontSize: '18px', fontWeight: 800, color: selectedChannel.status === 'ALERT' ? '#f43f5e' : '#ffffff', marginTop: '2px' }}>
                  {selectedChannel.current}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Autonomous Action:</span>
              <span style={{ fontWeight: 800, color: selectedChannel.status === 'ALERT' ? '#f43f5e' : '#34d399' }}>
                {selectedChannel.status === 'ALERT' ? 'HALTED FOR HUMAN DISPATCH' : 'PASSED WITHOUT INTERRUPTION'}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
