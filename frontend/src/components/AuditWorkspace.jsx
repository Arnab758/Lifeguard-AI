import React, { useState } from 'react';
import { 
  Wifi, Dumbbell, Coffee, HeartPulse, Sparkles, 
  UploadCloud, FileText, Send, Mail, ChevronDown, 
  ChevronUp, CheckCircle2, AlertCircle, ArrowRight, Copy, Check, FileCheck
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
    color: '#00f0ff'
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

  // Copy email state
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('protect+human@lifeguard.ai');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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
      
      {/* Ambient Email Forwarding Ingestion Bar */}
      <div className="glass-panel" style={{
        padding: '16px 22px',
        marginBottom: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        borderRadius: '12px',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(0, 240, 255, 0.15)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Mail size={22} color="var(--neon-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Ambient Auto-Pilot Ingestion Email:</span>
              <span className="terminal-font" style={{ color: 'var(--neon-cyan)', background: 'rgba(0, 0, 0, 0.5)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
                protect+human@lifeguard.ai
              </span>
              <button
                onClick={handleCopyEmail}
                className="btn-secondary"
                style={{ padding: '3px 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                {copiedEmail ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                {copiedEmail ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Forward receipts or monthly billing notices here. LifeGuard's ambient daemon parses them in the background and only alerts you when anomalies are detected.
            </p>
          </div>
        </div>

        <div className="badge badge-low" style={{ fontSize: '11px' }}>
          <CheckCircle2 size={13} />
          <span>Webhook Active</span>
        </div>
      </div>

      {/* Main Audit Workspace Container */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        
        {/* Navigation Tabs Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          borderBottom: '1px solid var(--border-subtle)', 
          paddingBottom: '16px', 
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('custom')}
              className={activeTab === 'custom' ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '13px' }}
            >
              <Send size={15} /> Audit Any Bill or Subscription (Live Form)
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '13px' }}
            >
              <UploadCloud size={15} /> Upload Bill Document (PDF / Receipt)
            </button>
          </div>

          <button
            onClick={() => setShowDemoScenarios(!showDemoScenarios)}
            className="btn-secondary"
            style={{ fontSize: '12px', color: 'var(--text-muted)' }}
          >
            <Sparkles size={14} color="#f59e0b" />
            {showDemoScenarios ? 'Hide Benchmark Matrix' : 'Show Benchmark Matrix'}
            {showDemoScenarios ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Tab 1: Custom Bill / Subscription Audit Form */}
        {activeTab === 'custom' && (
          <div>
            {/* Quick Fill Presets */}
            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                Quick-Load Real-World Presets:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="btn-secondary"
                    style={{
                      fontSize: '11px',
                      padding: '5px 12px',
                      borderRadius: '8px'
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{p.name}</span>
                    <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>(${p.curr}/mo)</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCustomSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700 }}>
                  Service Provider / Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Comcast, Verizon, Adobe, NYSC"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700 }}>
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}
                >
                  <option value="TELECOM">Telecom / Internet / Mobile</option>
                  <option value="SUBSCRIPTION">Subscription / Gym / SaaS</option>
                  <option value="HEALTHCARE">Healthcare / Lab Overbill</option>
                  <option value="WARRANTY">Warranty / Product Recall</option>
                  <option value="UTILITIES">Electric / Gas Utility</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700 }}>
                  Contracted Baseline Rate ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 50.00"
                  value={baselineAmount}
                  onChange={(e) => setBaselineAmount(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700 }}>
                  Current Billed Amount ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 84.99"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700 }}>
                  Account / Invoice Reference (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ACCT-89412"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700 }}>
                  Issue Description / Email Snippet
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Promotional discount expired. Company tacked on $22.50 rate hike plus hidden $7.50 infrastructure fee. Or: Gym club refuses cancellation without certified letter."
                  value={issueDesc}
                  onChange={(e) => setIssueDesc(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                  style={{ padding: '12px 28px', fontSize: '14px' }}
                >
                  {isSubmitting ? (
                    <span>Auditing with Strands Multi-Agent Chain...</span>
                  ) : (
                    <>
                      <Sparkles size={16} /> Audit &amp; Protect This Account
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
            <div 
              style={{
                border: '2px dashed rgba(0, 240, 255, 0.35)',
                borderRadius: '12px',
                padding: '36px 20px',
                textAlign: 'center',
                background: 'rgba(0, 240, 255, 0.03)',
                marginBottom: '18px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => document.getElementById('bill-file-input').click()}
            >
              <UploadCloud size={42} color="var(--neon-cyan)" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
                {selectedFile ? selectedFile.name : 'Drag & Drop your Statement or Bill (PDF, TXT, CSV, IMG)'}
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
                {selectedFile 
                  ? `Selected: ${(selectedFile.size / 1024).toFixed(1)} KB. Click to change file.` 
                  : 'LifeGuard extracts text, scans line items, and calculates stealth fee creep against FCC/FTC regulations.'
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto', gap: '14px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700 }}>
                  Provider Override (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Auto-detected from file"
                  value={uploadProvider}
                  onChange={(e) => setUploadProvider(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700 }}>
                  Baseline Rate Override ($) (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Contracted rate"
                  value={uploadBaseline}
                  onChange={(e) => setUploadBaseline(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', fontSize: '13px' }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={!selectedFile || isUploading}
                style={{ height: '42px', padding: '0 24px', fontSize: '13px' }}
              >
                {isUploading ? 'Extracting & Auditing...' : 'Audit Document'}
              </button>
            </div>
          </form>
        )}

        {/* Collapsible Benchmark Test Scenarios Matrix */}
        {showDemoScenarios && (
          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.6px' }}>
                1-Click Benchmark Test Scenarios Matrix
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Pre-configured test suite verifying FCC, FTC, CPSC &amp; HHS protections
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {SCENARIOS.map((sc) => {
                const Icon = sc.icon;
                const isLoading = loadingKey === sc.key;
                return (
                  <div
                    key={sc.key}
                    onClick={() => !isLoading && onInject(sc.key)}
                    className="glass-panel"
                    style={{
                      padding: '16px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      borderLeft: `4px solid ${sc.color}`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Icon size={18} color={sc.color} />
                        <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {sc.title}
                        </span>
                      </div>
                      <span className="terminal-font" style={{ fontSize: '12px', fontWeight: 800, color: '#34d399' }}>
                        {sc.impact}
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: 1.45 }}>
                      {sc.description}
                    </p>

                    <div style={{ fontSize: '12px', color: sc.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {isLoading ? 'Processing with Strands...' : 'Run Simulation'} <ArrowRight size={13} />
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
