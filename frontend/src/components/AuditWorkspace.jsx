import React, { useState } from 'react';
import { 
  Wifi, Dumbbell, Coffee, HeartPulse, Sparkles, 
  UploadCloud, FileText, Send, Mail, ChevronDown, 
  ChevronUp, CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';

const PRESETS = [
  { name: 'Comcast Xfinity', category: 'TELECOM', base: 50.00, curr: 82.50, desc: 'Promotional discount expired. $22.50 rate increase + $7.50 infrastructure surcharge added.' },
  { name: 'Planet Fitness', category: 'SUBSCRIPTION', base: 15.00, curr: 29.99, desc: 'Zombie membership auto-debiting. Club refuses online cancellation, demanding in-person visit.' },
  { name: 'Verizon Wireless', category: 'TELECOM', base: 65.00, curr: 92.50, desc: 'Unannounced $12.50 5G network fee + administrative surcharge added without prior notice.' },
  { name: 'Adobe Creative Cloud', category: 'SUBSCRIPTION', base: 29.99, curr: 54.99, desc: 'Price increased after 1 year. Attempting to charge $180 early termination fee upon cancel.' },
  { name: 'Quest Diagnostics', category: 'HEALTHCARE', base: 0.00, curr: 420.00, desc: 'Out-of-network balance billing for routine preventive bloodwork. Violates No Surprises Act.' },
  { name: 'Breville Appliance', category: 'WARRANTY', base: 0.00, curr: 899.95, desc: 'Espresso machine warranty expiring in 5 days. Matches CPSC safety recall on boiler valve.' }
];

const SCENARIOS = [
  {
    key: 'comcast',
    title: 'Comcast Xfinity',
    category: 'Telecom Stealth Hike',
    impact: '+$270/yr',
    description: 'Promotional rate expired. $22.50/mo increase + unannounced surcharge.',
    icon: Wifi,
    color: '#00b0ff'
  },
  {
    key: 'gym',
    title: 'Apex Fitness Club',
    category: 'Zombie Subscription Trap',
    impact: '+$600/yr',
    description: 'Auto-debiting $49.99/mo with forced in-person notarized cancellation barrier.',
    icon: Dumbbell,
    color: '#f59e0b'
  },
  {
    key: 'warranty',
    title: 'Breville Espresso Machine',
    category: 'Expiring Warranty & Recall',
    impact: '$899.95 Value',
    description: 'Warranty expires in 5 days. Matches active CPSC safety recall on boiler valve.',
    icon: Coffee,
    color: '#8b5cf6'
  },
  {
    key: 'medical',
    title: 'Quest Diagnostics',
    category: 'Surprise Medical Overbill',
    impact: '$335 Saved',
    description: '$420 out-of-network balance bill for in-network routine lab work.',
    icon: HeartPulse,
    color: '#f43f5e'
  }
];

export default function AuditWorkspace({ onInject, onCustomAudit, onUploadAudit, loadingKey }) {
  const [activeTab, setActiveTab] = useState('custom'); // 'custom', 'upload', 'demo'
  
  // Custom form state
  const [provider, setProvider] = useState('');
  const [category, setCategory] = useState('TELECOM');
  const [baselineAmount, setBaselineAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [issueDesc, setIssueDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProvider, setUploadProvider] = useState('');
  const [uploadBaseline, setUploadBaseline] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showDemoScenarios, setShowDemoScenarios] = useState(true);

  const handleApplyPreset = (p) => {
    setProvider(p.name);
    setCategory(p.category);
    setBaselineAmount(p.base.toString());
    setCurrentAmount(p.curr.toString());
    setIssueDesc(p.desc);
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!provider || !currentAmount) return;

    setIsSubmitting(true);
    try {
      await onCustomAudit({
        provider,
        category,
        baseline_amount: parseFloat(baselineAmount) || 0,
        current_amount: parseFloat(currentAmount),
        issue_description: issueDesc || 'Unfair price increase or deceptive billing term.',
        account_number: accountNumber || 'ACCT-LIVE-USER'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await onUploadAudit(selectedFile, {
        provider_override: uploadProvider || undefined,
        baseline_override: uploadBaseline ? parseFloat(uploadBaseline) : undefined
      });
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Ambient Email Forwarding Banner */}
      <div className="glass-panel" style={{
        padding: '12px 18px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(90deg, rgba(0, 176, 255, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid rgba(0, 176, 255, 0.25)',
        borderRadius: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'rgba(0, 176, 255, 0.2)',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Mail size={18} color="var(--accent-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Auto-Pilot Forwarding Address:{' '}
              <span className="terminal-font" style={{ color: 'var(--accent-cyan)', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '4px' }}>
                protect+arnab@lifeguard.ai
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, marginTop: '2px' }}>
              Forward any bill, statement, or cancellation confirmation email here. LifeGuard will automatically audit it in the background.
            </p>
          </div>
        </div>
        <span className="badge badge-low" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={12} /> Ambient Daemon Active
        </span>
      </div>

      {/* Main Audit Workspace */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('custom')}
              style={{
                background: activeTab === 'custom' ? 'rgba(0, 176, 255, 0.15)' : 'transparent',
                border: activeTab === 'custom' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                color: activeTab === 'custom' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <Send size={15} /> Audit Any Bill or Subscription (Live)
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              style={{
                background: activeTab === 'upload' ? 'rgba(0, 176, 255, 0.15)' : 'transparent',
                border: activeTab === 'upload' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                color: activeTab === 'upload' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <UploadCloud size={15} /> Upload Document (PDF / Image / TXT)
            </button>
          </div>
          <button
            onClick={() => setShowDemoScenarios(!showDemoScenarios)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-muted)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={13} color="#f59e0b" />
            {showDemoScenarios ? 'Hide Demo Benchmark Suite' : 'Show Demo Benchmark Suite'}
            {showDemoScenarios ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Tab 1: Custom Bill / Subscription Audit Form */}
        {activeTab === 'custom' && (
          <div>
            {/* Quick Presets */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                Quick Fill Real-World Examples:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-primary)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  >
                    {p.name} (${p.curr}/mo)
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCustomSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>
                  Service Provider / Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Comcast, Verizon, Adobe, NYSC"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                >
                  <option value="TELECOM">Telecom / Internet / Mobile</option>
                  <option value="SUBSCRIPTION">Subscription / Gym / Software</option>
                  <option value="HEALTHCARE">Healthcare / Diagnostic Lab</option>
                  <option value="WARRANTY">Warranty / Product Safety Recall</option>
                  <option value="UTILITIES">Electric / Gas / Utilities</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>
                  Contracted Baseline Rate ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 50.00"
                  value={baselineAmount}
                  onChange={(e) => setBaselineAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>
                  Current Charge / Billed Rate ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 84.99"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>
                  Account / Invoice ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ACCT-89412"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>
                  What Happened? (Paste email snippet or describe grievance)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Promotional rate expired without notice. Bill jumped by $35 and new line item 'Technology Fee' was added. Or: Gym club refused online cancellation."
                  value={issueDesc}
                  onChange={(e) => setIssueDesc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '13px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                  style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 700 }}
                >
                  {isSubmitting ? (
                    <span>Auditing with Strands Agents...</span>
                  ) : (
                    <>
                      <Sparkles size={16} /> Audit &amp; Protect My Bill Now
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Document File Upload */}
        {activeTab === 'upload' && (
          <form onSubmit={handleFileUpload}>
            <div style={{
              border: '2px dashed rgba(0, 176, 255, 0.35)',
              borderRadius: '10px',
              padding: '30px 20px',
              textAlign: 'center',
              background: 'rgba(0, 176, 255, 0.03)',
              marginBottom: '16px',
              cursor: 'pointer'
            }}
            onClick={() => document.getElementById('bill-file-input').click()}
            >
              <UploadCloud size={36} color="var(--accent-cyan)" style={{ margin: '0 auto 10px' }} />
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                {selectedFile ? selectedFile.name : 'Drop your Bill or Statement (PDF, TXT, CSV, IMG)'}
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
                {selectedFile 
                  ? `Selected: ${(selectedFile.size / 1024).toFixed(1)} KB. Click to change file.` 
                  : 'LifeGuard extracts text, scans line-item charges, and automatically calculates stealth fee creep against federal statutes.'
                }
              </p>
              <input
                id="bill-file-input"
                type="file"
                accept=".pdf,.txt,.csv,.png,.jpg,.jpeg"
                style={{ display: 'none' }}
                onChange={(e) => setSelectedFile(e.target.files[0] || null)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Provider Override (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Auto-detected or enter name"
                  value={uploadProvider}
                  onChange={(e) => setUploadProvider(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Baseline Rate Override ($) (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Contracted amount"
                  value={uploadBaseline}
                  onChange={(e) => setUploadBaseline(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={!selectedFile || isUploading}
                style={{ padding: '8px 20px', height: '36px', fontSize: '13px' }}
              >
                {isUploading ? 'Extracting & Auditing...' : 'Audit Document'}
              </button>
            </div>
          </form>
        )}

        {/* Collapsible Demo Benchmark Scenarios for Judges */}
        {showDemoScenarios && (
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                1-Click Benchmark Test Scenarios
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Pre-configured test suite verifying FCC, FTC, CPSC &amp; HHS protections
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {SCENARIOS.map((sc) => {
                const Icon = sc.icon;
                const isLoading = loadingKey === sc.key;
                return (
                  <div
                    key={sc.key}
                    onClick={() => !isLoading && onInject(sc.key)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = sc.color;
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Icon size={16} color={sc.color} />
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {sc.title}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#34d399' }}>
                        {sc.impact}
                      </span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, marginBottom: '8px', lineHeight: 1.3 }}>
                      {sc.description}
                    </p>
                    <div style={{ fontSize: '11px', color: sc.color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {isLoading ? 'Processing...' : 'Run Simulation'} <ArrowRight size={12} />
                    </div>
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
