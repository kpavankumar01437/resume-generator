import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { getATSScore, analyzeKeywords } from '../../utils/aiSuggestions';
import { downloadPDF } from '../../utils/pdfGenerator';
import ModernTemplate from '../Templates/ModernTemplate';
import ProfessionalTemplate from '../Templates/ProfessionalTemplate';
import MinimalTemplate from '../Templates/MinimalTemplate';
import './PreviewPanel.css';

const TEMPLATES = [
  { id: 'modern', label: 'Modern', emoji: '🎨', desc: 'Two-column, colorful' },
  { id: 'professional', label: 'Professional', emoji: '💼', desc: 'Classic, corporate' },
  { id: 'minimal', label: 'Minimal', emoji: '✨', desc: 'Clean, typographic' },
];

export default function PreviewPanel() {
  const { resumeData, updateTemplate, showToast } = useResume();
  const [downloading, setDownloading] = useState(false);
  const [showATS, setShowATS] = useState(false);
  const [zoom, setZoom] = useState(0.55);

  const atsResult = getATSScore(resumeData);
  const resumeText = JSON.stringify(resumeData);
  const kwResult = analyzeKeywords(resumeText, resumeData.targetRole || '');

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const name = resumeData.personalInfo.fullName?.replace(/\s+/g, '_') || 'resume';
      await downloadPDF('resume-preview', `${name}_Resume.pdf`);
      showToast('📄 Resume downloaded as PDF!');
    } catch {
      showToast('Failed to download. Please try again.', 'error');
    }
    setDownloading(false);
  };

  const renderTemplate = () => {
    const props = { data: resumeData };
    switch (resumeData.template) {
      case 'professional': return <ProfessionalTemplate {...props} />;
      case 'minimal': return <MinimalTemplate {...props} />;
      default: return <ModernTemplate {...props} />;
    }
  };

  const getATSColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="preview-panel">
      {/* Top Controls */}
      <div className="preview-topbar">
        <div className="preview-topbar-left">
          <span className="preview-title">👁 Live Preview</span>
          <div className="zoom-controls">
            <button className="zoom-btn" onClick={() => setZoom(z => Math.max(0.3, z - 0.05))}>−</button>
            <span className="zoom-label">{Math.round(zoom * 100)}%</span>
            <button className="zoom-btn" onClick={() => setZoom(z => Math.min(1, z + 0.05))}>+</button>
          </div>
        </div>
        <div className="preview-topbar-right">
          <button className="btn btn-ghost preview-ats-btn" onClick={() => setShowATS(v => !v)}>
            🎯 ATS Score: <span style={{ color: getATSColor(atsResult.score) }}>{atsResult.score}%</span>
          </button>
          <button className="btn btn-success" onClick={handleDownload} disabled={downloading}>
            {downloading ? <><span className="spinner" /> Generating...</> : '⬇ Download PDF'}
          </button>
        </div>
      </div>

      {/* Template Selector */}
      <div className="template-selector">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            className={`template-chip ${resumeData.template === t.id ? 'active' : ''}`}
            onClick={() => updateTemplate(t.id)}
          >
            <span>{t.emoji}</span>
            <div>
              <div className="template-chip-name">{t.label}</div>
              <div className="template-chip-desc">{t.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ATS Analyzer */}
      {showATS && (
        <div className="ats-panel animate-fade">
          <div className="ats-header">
            <span>🎯 ATS Compatibility Report</span>
            <button className="ats-close" onClick={() => setShowATS(false)}>✕</button>
          </div>

          {/* Score ring */}
          <div className="ats-score-block">
            <div className="ats-score-ring" style={{ '--score-color': getATSColor(atsResult.score) }}>
              <span className="ats-score-num" style={{ color: getATSColor(atsResult.score) }}>
                {atsResult.score}
              </span>
              <span className="ats-score-label">/ 100</span>
            </div>
            <div className="ats-score-info">
              <p className="ats-score-status" style={{ color: getATSColor(atsResult.score) }}>
                {atsResult.score >= 80 ? '🟢 Excellent' : atsResult.score >= 60 ? '🟡 Good' : '🔴 Needs Work'}
              </p>
              <p className="ats-score-desc">
                {atsResult.score >= 80
                  ? 'Your resume is well-optimized for ATS systems.'
                  : atsResult.score >= 60
                  ? 'Good start! A few improvements can boost your score.'
                  : 'Complete more sections to improve your ATS score.'}
              </p>
            </div>
          </div>

          {/* Checks */}
          <div className="ats-checks">
            {atsResult.checks.map((c, i) => (
              <div key={i} className={`ats-check-item ${c.ok ? 'ok' : 'fail'}`}>
                <span>{c.ok ? '✅' : '❌'}</span>
                <span>{c.text}</span>
              </div>
            ))}
          </div>

          {/* Keyword analysis */}
          {resumeData.targetRole && kwResult.missing.length > 0 && (
            <div className="ats-keywords">
              <p className="ats-kw-label">🔑 Missing Keywords for "{resumeData.targetRole}":</p>
              <div className="ats-kw-chips">
                {kwResult.missing.map(kw => (
                  <span key={kw} className="ats-kw-chip">{kw}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resume Preview */}
      <div className="preview-canvas-wrap">
        <div
          className="preview-canvas"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          {renderTemplate()}
        </div>
        <div style={{ height: `${297 * zoom * 3.78 + 20}px` }} />
      </div>
    </div>
  );
}
