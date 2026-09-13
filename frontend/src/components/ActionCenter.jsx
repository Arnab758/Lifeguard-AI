import React, { useState, useRef } from 'react';
import { 
  AlertTriangle, CheckCircle2, XCircle, FileText, Send, 
  Scale, ArrowRight, ShieldAlert, Sparkles, Building, ExternalLink, 
  ShieldCheck, Zap, UploadCloud, FileUp, Check, Mail, Lock
} from 'lucide-react';

export default function ActionCenter({ 
  decisions, 
  onApprove, 
  onDismiss, 
  onViewMemo, 
  onTriggerDemo,
  onCustomAudit,
  onUploadAudit,
  onOpenConnectModal
}) {
  const pendingDecisions = decisions.filter(d => d.status === 'PENDING_APPROVAL');
  
  // Real Bill Upload & Quick Test State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const fileInputRef = useRef(null);

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL': 
        return <span className="badge badge-critical" style={{ fontSize: '13px', padding: '6px 14px' }}>Critical Risk</span>;
      case 'HIGH': 
        return <span className="badge badge-high" style={{ fontSize: '13px', padding: '6px 14px' }}>High Capital Leakage</span>;
      case 'MEDIUM': 
        return <span className="badge badge-medium" style={{ fontSize: '13px', padding: '6px 14px' }}>Moderate Leakage</span>;
      default: 
        return <span className="badge badge-low" style={{ fontSize: '13px', padding: '6px 14px' }}>Low Impact</span>;
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await processUploadedFile(file);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await processUploadedFile(file);
    }
  };

  const processUploadedFile = async (file) => {
    setSelectedFile(file);
    setIsAuditing(true);
    setStatusMsg(`Extracting text and auditing ${file.name} against federal consumer statutes...`);
    try {
      if (onUploadAudit) {
        await onUploadAudit(file, {});
        setStatusMsg('Audit complete! Decision evaluated and surfaced.');
      }
    } catch (err) {
      console.error('File audit error:', err);
      setStatusMsg('Audit failed. Please try again.');
    } finally {
      setIsAuditing(false);
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  // Quick Sample Audit Chips
  const handleQuickSample = async (sampleType) => {
    setIsAuditing(true);
    try {
      if (sampleType === 'comcast') {
        setStatusMsg('Auditing Comcast Xfinity statement against contracted baseline...');
        if (onCustomAudit) {
          await onCustomAudit({
            provider: 'Comcast Xfinity',
            category: 'TELECOM',
            baseline_amount: 50.00,
            current_amount: 84.99,
            account_number: 'ACCT-8920-COMCAST',
            raw_text_snippet: 'Previous Monthly Bill: $50.00. New Monthly Charge: $84.99. Includes $24.99 promotional expiration + $10.00 infrastructure maintenance fee.'
          });
        }
      } else if (sampleType === 'gym') {
        setStatusMsg('Auditing Planet Fitness membership against FTC Click-to-Cancel rules...');
        if (onCustomAudit) {
          await onCustomAudit({
            provider: 'Planet Fitness',
            category: 'SUBSCRIPTION',
            baseline_amount: 10.00,
            current_amount: 29.99,
            account_number: 'PF-CLUB-4491',
            raw_text_snippet: 'Monthly auto-renewing membership: $29.99. Cancellation requires in-person appearance or certified mail to home club location.'
          });
        }
      } else if (sampleType === 'medical') {
        setStatusMsg('Auditing Quest Diagnostics bill against Federal No Surprises Act...');
        if (onCustomAudit) {
          await onCustomAudit({
            provider: 'Quest Diagnostics',
            category: 'HEALTHCARE',
            baseline_amount: 0.00,
            current_amount: 420.00,
            account_number: 'QD-LAB-10928',
            raw_text_snippet: 'Routine preventative bloodwork completed at in-network facility. Billed as out-of-network balance: $420.00. Patient responsibility.'
          });
        }
      }
      setStatusMsg('Audit evaluated! Decision Card surfaced below.');
    } catch (err) {
      console.error('Sample error:', err);
      setStatusMsg('Audit error. Please try again.');
    } finally {
      setIsAuditing(false);
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* 1. Overview Banner */}
      <div className="glass-panel" style={{ padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.18)',
                border: '1px solid rgba(245, 158, 11, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldAlert size={22} color="#f59e0b" />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Human-in-the-Loop Action Gate
              </h2>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              The background daemon runs silently. It halts autonomous execution and surfaces below <strong style={{ color: '#ffffff' }}>ONLY</strong> when high-stakes human authorization is needed.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span className={pendingDecisions.length > 0 ? "badge badge-high" : "badge badge-low"} style={{ fontSize: '14px', padding: '8px 18px' }}>
              {pendingDecisions.length === 0 
                ? '0 Decisions Required' 
                : `${pendingDecisions.length} ${pendingDecisions.length === 1 ? 'Decision' : 'Decisions'} Awaiting Authorization`}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Empty State (Calm Shield + Quick Triggers) */}
      {pendingDecisions.length === 0 ? (
        <div className="glass-panel" style={{
          textAlign: 'center',
          padding: '48px 32px',
          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(14, 22, 40, 0.7) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 0 32px rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px'
          }}>
            <ShieldCheck size={40} color="#10b981" />
          </div>
          
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            All Monitored Accounts Within Normal Baselines
          </h3>
          
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            LifeGuard's background daemon is auditing routine chores silently. 
            Zero stealth rate hikes, cancellation traps, or safety recalls detected.
          </p>

          {/* Direct Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleQuickSample('comcast')}
              className="btn-primary"
              style={{ fontSize: '14px', padding: '12px 24px' }}
            >
              <Zap size={16} />
              <span>Simulate Comcast Rate Hike (Demo)</span>
            </button>

            {onOpenConnectModal && (
              <button
                onClick={onOpenConnectModal}
                className="btn-secondary"
                style={{ fontSize: '14px', padding: '12px 22px' }}
              >
                <Mail size={16} color="var(--neon-cyan)" />
                <span>Connect Household Email</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* 3. Surfaced Decision Cards - High Readability & Impact */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {pendingDecisions.map((card) => (
            <div
              key={card.id}
              className="glass-panel-amber"
              style={{
                borderRadius: '16px',
                padding: '32px',
                position: 'relative'
              }}
            >
              {/* Header Row: Provider, Category & Big Annual Impact */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '18px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {getSeverityBadge(card.severity)}
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Service Provider: <strong style={{ color: '#ffffff' }}>{card.provider}</strong>
                    </span>
                    {card.category && (
                      <span className="badge badge-purple" style={{ fontSize: '12px' }}>
                        {card.category}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                    {card.title}
                  </h3>
                </div>

                {/* Big Capital at Risk Callout */}
                <div style={{
                  background: 'rgba(244, 63, 94, 0.14)',
                  border: '1px solid rgba(244, 63, 94, 0.45)',
                  borderRadius: '14px',
                  padding: '12px 24px',
                  textAlign: 'right'
                }}>
                  <span style={{ fontSize: '12px', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    Annual Impact
                  </span>
                  <div className="terminal-font" style={{ fontSize: '32px', fontWeight: 800, color: '#f43f5e', letterSpacing: '-0.02em' }}>
                    ${card.annual_impact.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Grievance Narrative */}
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '20px' }}>
                {card.summary}
              </p>

              {/* Statutory Legal Authority Box */}
              <div style={{
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.28)',
                borderRadius: '12px',
                padding: '18px 22px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}>
                <Scale size={26} color="var(--neon-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '14px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--neon-cyan)', fontSize: '16px' }}>
                    Statutory Authority: {card.policy_reference?.authority}
                  </div>
                  <div style={{ color: '#ffffff', marginTop: '4px', fontWeight: 700 }}>
                    {card.policy_reference?.citation}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.55 }}>
                    {card.policy_reference?.relevance}
                  </div>
                </div>
              </div>

              {/* Prepared Executive Dossier Bar */}
              <div style={{
                background: 'rgba(5, 9, 20, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '16px 22px',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#cbd5e1',
                marginBottom: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <FileText size={20} color="#38bdf8" style={{ flexShrink: 0 }} />
                  <span className="terminal-font" style={{ fontSize: '15px' }}>
                    <strong>Drafted Dossier:</strong> {card.drafted_subject}
                  </span>
                </div>

                <button
                  onClick={() => onViewMemo(card)}
                  className="btn-secondary"
                  style={{
                    fontSize: '14px',
                    padding: '8px 18px',
                    color: 'var(--neon-cyan)',
                    borderColor: 'rgba(0, 240, 255, 0.4)',
                    background: 'rgba(0, 240, 255, 0.1)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Inspect Full Brief <ArrowRight size={15} />
                </button>
              </div>

              {/* High-Impact Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  className="btn-secondary"
                  onClick={() => onDismiss(card.id)}
                  style={{ fontSize: '15px', padding: '13px 26px' }}
                >
                  <XCircle size={17} /> Dismiss
                </button>

                <button
                  className="btn-success"
                  onClick={() => onApprove(card.id)}
                  style={{ fontSize: '15px', padding: '13px 32px' }}
                >
                  <Send size={17} /> Authorize &amp; Dispatch Resolution
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 4. Usable Tomorrow: Live Bill Drop-Zone & Instant Sample Chips */}
      <div className="glass-panel" style={{
        padding: '28px 32px',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(5, 9, 20, 0.9) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileUp size={20} color="var(--neon-cyan)" />
              <span>Test With Your Real Bill or Try Flagship Samples</span>
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Drag &amp; drop an actual PDF statement or click a real-world sample to see instant statutory extraction
            </p>
          </div>

          {statusMsg && (
            <div style={{
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid var(--neon-cyan)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#ffffff',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles size={14} color="var(--neon-cyan)" />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>

        {/* Drag & Drop Box */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          style={{
            border: dragActive ? '2px dashed #00f0ff' : '2px dashed rgba(255, 255, 255, 0.18)',
            background: dragActive ? 'rgba(0, 240, 255, 0.1)' : 'rgba(5, 9, 20, 0.5)',
            borderRadius: '14px',
            padding: '36px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '20px'
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.txt"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <UploadCloud size={38} color={dragActive ? '#00f0ff' : 'var(--text-muted)'} style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
            {selectedFile ? `Selected: ${selectedFile.name}` : 'Drop your monthly statement PDF here, or browse files'}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Supports Comcast, Verizon, gym invoices, hospital balance bills, utilities (PDF, PNG, JPG)
          </div>
        </div>

        {/* 1-Click Sample Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 700 }}>
            Or Try Real-World Samples:
          </span>

          <button
            onClick={() => handleQuickSample('comcast')}
            disabled={isAuditing}
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '8px 16px', color: 'var(--neon-cyan)', borderColor: 'rgba(0, 240, 255, 0.35)' }}
          >
            📄 Sample Comcast Bill (+$34.99 Hike)
          </button>

          <button
            onClick={() => handleQuickSample('gym')}
            disabled={isAuditing}
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '8px 16px', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.35)' }}
          >
            📄 Sample Planet Fitness (Click-to-Cancel)
          </button>

          <button
            onClick={() => handleQuickSample('medical')}
            disabled={isAuditing}
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '8px 16px', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.35)' }}
          >
            📄 Sample Quest Hospital Bill ($420 Surprise)
          </button>
        </div>

      </div>

    </div>
  );
}
