import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { generateExperienceBullets } from '../../utils/aiSuggestions';
import './FormSteps.css';

export default function ExperienceStep() {
  const { resumeData, addExperience, updateExperience, removeExperience, showToast } = useResume();
  const [loadingId, setLoadingId] = useState(null);

  const handleAIBullets = async (exp) => {
    setLoadingId(exp.id);
    await new Promise(r => setTimeout(r, 1000));
    const bullets = generateExperienceBullets(exp.role, 4);
    updateExperience(exp.id, 'bullets', bullets);
    setLoadingId(null);
    showToast('✨ AI bullets generated!');
  };

  return (
    <div className="step-content animate-fade">
      <div className="step-header">
        <div className="step-icon-wrap">💼</div>
        <div>
          <h2 className="step-title">Work Experience</h2>
          <p className="step-desc">List your work history, most recent first</p>
        </div>
      </div>

      {resumeData.experience.length === 0 && (
        <div className="empty-state">
          <span>💼</span>
          <p>No experience added. Click below to add your work history.</p>
        </div>
      )}

      {resumeData.experience.map((exp, idx) => (
        <div key={exp.id} className="entry-card animate-slide">
          <div className="entry-card-header">
            <span className="entry-number">#{idx + 1}</span>
            <span className="entry-label">Work Entry</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn btn-ghost btn-sm ai-btn"
                onClick={() => handleAIBullets(exp)}
                disabled={loadingId === exp.id}
              >
                {loadingId === exp.id ? <span className="spinner" /> : '✨'} AI Bullets
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => removeExperience(exp.id)}>🗑️</button>
            </div>
          </div>

          <div className="fields-grid">
            <div className="form-group">
              <label className="form-label">🏢 Company Name</label>
              <input className="form-input" placeholder="e.g. Google" value={exp.company}
                onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">💼 Job Title / Role</label>
              <input className="form-input" placeholder="e.g. Software Engineer" value={exp.role}
                onChange={e => updateExperience(exp.id, 'role', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">📅 Start Date</label>
              <input className="form-input" placeholder="Jan 2022" value={exp.startDate}
                onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">📅 End Date</label>
              <input className="form-input" placeholder="Dec 2023 or Present" value={exp.endDate}
                disabled={exp.current}
                onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">📍 Location</label>
              <input className="form-input" placeholder="New York, NY" value={exp.location}
                onChange={e => updateExperience(exp.id, 'location', e.target.value)} />
            </div>
            <div className="form-group full-width check-row">
              <label className="custom-checkbox">
                <input type="checkbox" checked={exp.current}
                  onChange={e => {
                    updateExperience(exp.id, 'current', e.target.checked);
                    if (e.target.checked) updateExperience(exp.id, 'endDate', 'Present');
                  }} />
                <span className="checkmark"></span>
                Currently working here
              </label>
            </div>
            <div className="form-group full-width">
              <label className="form-label">📝 Description</label>
              <textarea className="form-textarea" rows={3}
                placeholder="Briefly describe your role and responsibilities..."
                value={exp.description}
                onChange={e => updateExperience(exp.id, 'description', e.target.value)} />
            </div>

            {exp.bullets && exp.bullets.length > 0 && (
              <div className="form-group full-width">
                <label className="form-label">🎯 AI-Generated Bullet Points</label>
                <div className="bullets-list">
                  {exp.bullets.map((b, i) => (
                    <div key={i} className="bullet-item">
                      <span className="bullet-dot">•</span>
                      <input
                        className="form-input bullet-input"
                        value={b}
                        onChange={e => {
                          const newBullets = [...exp.bullets];
                          newBullets[i] = e.target.value;
                          updateExperience(exp.id, 'bullets', newBullets);
                        }}
                      />
                      <button className="bullet-remove" onClick={() => {
                        updateExperience(exp.id, 'bullets', exp.bullets.filter((_, j) => j !== i));
                      }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <button className="btn btn-primary add-btn" onClick={addExperience}>
        + Add Experience
      </button>
    </div>
  );
}
