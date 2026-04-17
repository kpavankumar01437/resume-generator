import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { generateSummary } from '../../utils/aiSuggestions';
import './FormSteps.css';

export default function SummaryStep() {
  const { resumeData, updateSummary, updateTargetRole, showToast } = useResume();
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(resumeData.summary.length);

  const handleSummaryChange = (val) => {
    updateSummary(val);
    setCharCount(val.length);
  };

  const handleAISuggest = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const expYears = resumeData.experience.length > 0 ? resumeData.experience.length + 1 : 2;
    const suggestion = generateSummary(
      resumeData.targetRole || 'software engineer',
      resumeData.skills.technical,
      expYears
    );
    updateSummary(suggestion);
    setCharCount(suggestion.length);
    setLoading(false);
    showToast('✨ AI summary generated!');
  };

  const getCharColor = () => {
    if (charCount < 100) return '#ef4444';
    if (charCount < 200) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="step-content animate-fade">
      <div className="step-header">
        <div className="step-icon-wrap">🎯</div>
        <div>
          <h2 className="step-title">Career Objective & Target Role</h2>
          <p className="step-desc">Write a compelling summary or let AI craft one for you</p>
        </div>
      </div>

      <div className="form-group mt-16">
        <label className="form-label">🏹 Target Job Role</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. Software Engineer, Data Scientist, Product Manager"
          value={resumeData.targetRole || ''}
          onChange={e => updateTargetRole(e.target.value)}
        />
        <span className="field-hint">Used for AI suggestions and keyword optimization</span>
      </div>

      <div className="form-group mt-16">
        <div className="flex-between">
          <label className="form-label">📝 Career Summary / Objective</label>
          <button
            className="btn btn-ghost ai-btn"
            onClick={handleAISuggest}
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : '✨'}
            {loading ? 'Generating...' : 'AI Suggest'}
          </button>
        </div>
        <textarea
          className="form-textarea"
          rows={5}
          placeholder="Write 2-4 sentences summarizing your professional background, key skills, and career goals..."
          value={resumeData.summary}
          onChange={e => handleSummaryChange(e.target.value)}
        />
        <div className="char-counter">
          <span style={{ color: getCharColor() }}>{charCount} characters</span>
          <span className="field-hint">Recommended: 200-400 characters</span>
        </div>
      </div>

      <div className="ai-tip-card">
        <span>💡</span>
        <div>
          <strong>ATS Tip:</strong> Include your job title, years of experience, key skills, and a quantifiable achievement in your summary.
        </div>
      </div>
    </div>
  );
}
