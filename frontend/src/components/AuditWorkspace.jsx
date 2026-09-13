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
  const [activeTab, setActiveTab] = useState('custom');
  
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Ambient Email Forwarding Ingestion Card */}
      <div className="glass-panel" style={{
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
        border: '1px solid rgba(0, 240, 255, 0.35)',
        borderRadius: '16px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'rgba(0, 240, 255, 0.18)',
            border: '1px solid rgba(0, 240, 255, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Mail size={28} color="var(--neon-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span>Ambient Auto-Forwarding Address:</span>
              <span className="terminal-font" style={{ color: 'var(--neon-cyan)', background: 'rgba(0, 0, 0, 0.6)', padding: '5px 14px', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.35)', fontSize: '15px' }}>
                protect+human@lifeguard.ai
              </span>
              <button
                onClick={handleCopyEmail}
                className="btn-secondary"
                style={{ padding: '5px 12px', fontSize: '13px' }}
              >
                {copiedEmail ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                {copiedEmail ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '6px 0 0 0', lineHeight: 1.5 }}>
              Forward any receipt, statement, or billing notice to this address. LifeGuard's ambient daemon audits it silently in the background and only alerts you when anomalies are detected.
            </p>
          </div>
        </div>

        <div className="badge badge-low" style={{ fontSize: '13px', padding: '6px 14px' }}>
          <CheckCircle2 size={15} />
          <span>Webhook Active</span>
        </div>
      </div>

      {/* Main Workspace Box */}
      <div className="glass-panel" style={{ padding: '36px' }}>
        
        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          borderBottom: '1px solid var(--border-subtle)', 
          paddingBottom: '20px', 
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <button
              onClick={() => setActiveTab('custom')}
              className={activeTab === 'custom' ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '15px', padding: '12px 24px' }}
            >
              <Send size={16} /> Audit Any Bill or Subscription (Live Form)
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '15px', padding: '12px 24px' }}
            >
              <UploadCloud size={16} /> Upload Bill Document (PDF / Image)
            </button>
          </div>

          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Instant Multi-Agent Analysis powered by Strands SDK
          </span>
        </div>

        {/* Tab 1: Custom Bill / Subscription Audit Form */}
        {activeTab === 'custom' && (
          <div>
            {/* Quick Fill Presets */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                Quick-Fill Real-World Benchmark Examples:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="btn-secondary"
                    style={{
                      fontSize: '13px',
                      padding: '8px 16px',
                      borderRadius: '10px'
                    }}
                  >
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>{p.name}</span>
                    <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>(${p.curr}/mo)</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCustomSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>
                  Service Provider / Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Comcast, Verizon, Adobe, NYSC"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="TELECOM">Telecom / Internet / Mobile</option>
                  <option value="SUBSCRIPTION">Subscription / Gym / SaaS</option>
                  <option value="HEALTHCARE">Healthcare / Lab Overbill</option>
                  <option value="WARRANTY">Warranty / Product Recall</option>
                  <option value="UTILITIES">Electric / Gas Utility</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>
                  Contracted Baseline Rate ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 50.00"
                  value={baselineAmount}
                  onChange={(e) => setBaselineAmount(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>
                  Current Billed Amount ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 84.99"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>
                  Account / Invoice ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ACCT-89412"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>
                  Issue Description / Email Snippet
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Promotional discount expired. Company added $22.50 rate hike plus hidden $7.50 infrastructure fee. Or: Gym club refuses cancellation without certified letter."
                  value={issueDesc}
                  onChange={(e) => setIssueDesc(e.target.value)}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                  style={{ padding: '14px 36px', fontSize: '16px' }}
                >
                  {isSubmitting ? (
                    <span>Auditing with Strands Multi-Agent Chain...</span>
                  ) : (
                    <>
                      <Sparkles size={18} /> Audit &amp; Protect This Account
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
                border: '2px dashed rgba(0, 240, 255, 0.4)',
                borderRadius: '16px',
                padding: '48px 24px',
                textAlign: 'center',
                background: 'rgba(0, 240, 255, 0.04)',
                marginBottom: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => document.getElementById('bill-file-input').click()}
            >
              <UploadCloud size={52} color="var(--neon-cyan)" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
                {selectedFile ? selectedFile.name : 'Drag & Drop your Statement or Bill (PDF, TXT, CSV, IMG)'}
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
                {selectedFile 
                  ? `Selected file: ${(selectedFile.size / 1024).toFixed(1)} KB. Click to change file.` 
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr)) auto', gap: '18px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>
                  Provider Override (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Auto-detected from file"
                  value={uploadProvider}
                  onChange={(e) => setUploadProvider(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>
                  Baseline Rate Override ($) (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Contracted rate"
                  value={uploadBaseline}
                  onChange={(e) => setUploadBaseline(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={!selectedFile || isUploading}
                style={{ height: '48px', padding: '0 32px', fontSize: '15px' }}
              >
                {isUploading ? 'Extracting & Auditing...' : 'Audit Document'}
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Benchmark Matrix */}
      <div className="glass-panel" style={{ padding: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0, color: '#ffffff' }}>
              1-Click Benchmark Test Scenarios Matrix
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Pre-configured test suite verifying FCC, FTC, CPSC &amp; HHS consumer protection statutes
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {SCENARIOS.map((sc) => {
            const Icon = sc.icon;
            const isLoading = loadingKey === sc.key;
            return (
              <div
                key={sc.key}
                onClick={() => !isLoading && onInject(sc.key)}
                className="glass-panel"
                style={{
                  padding: '22px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  borderLeft: `5px solid ${sc.color}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={20} color={sc.color} />
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                      {sc.title}
                    </span>
                  </div>
                  <span className="terminal-font" style={{ fontSize: '14px', fontWeight: 800, color: '#34d399' }}>
                    {sc.impact}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                  {sc.description}
                </p>

                <div style={{ fontSize: '14px', color: sc.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isLoading ? 'Auditing with Strands...' : 'Run Simulation'} <ArrowRight size={15} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
