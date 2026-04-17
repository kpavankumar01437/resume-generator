import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { getKeywordSuggestions } from '../../utils/aiSuggestions';
import './FormSteps.css';

const TECH_SUGGESTIONS = [
  'JavaScript','TypeScript','Python','Java','C++','React','Node.js','Next.js','Vue.js',
  'Angular','HTML5','CSS3','SQL','MongoDB','PostgreSQL','Redis','Docker','Kubernetes',
  'AWS','GCP','Azure','Git','GraphQL','REST API','Linux','Bash','TensorFlow','PyTorch',
  'Figma','Tailwind CSS','Express.js','Django','Spring Boot','Flutter','Swift','Kotlin'
];

const SOFT_SUGGESTIONS = [
  'Leadership','Communication','Problem Solving','Teamwork','Critical Thinking',
  'Time Management','Adaptability','Creativity','Attention to Detail','Project Management',
  'Collaboration','Analytical Thinking','Presentation Skills','Mentoring','Strategic Planning'
];

export default function SkillsStep() {
  const { resumeData, addSkill, removeSkill } = useResume();
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const keywordSuggestions = getKeywordSuggestions(resumeData.targetRole || '');

  const handleAddSkill = (type, val, clearFn) => {
    if (val.trim()) { addSkill(type, val); clearFn(''); }
  };

  const handleKeyDown = (e, type, val, clearFn) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill(type, val, clearFn);
    }
  };

  return (
    <div className="step-content animate-fade">
      <div className="step-header">
        <div className="step-icon-wrap">⚡</div>
        <div>
          <h2 className="step-title">Skills</h2>
          <p className="step-desc">Add technical and soft skills (press Enter or comma to add)</p>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="skills-section">
        <h3 className="skills-section-title">💻 Technical Skills</h3>
        <div className="skills-input-row">
          <input
            className="form-input"
            placeholder="Type a skill and press Enter..."
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
            onKeyDown={e => handleKeyDown(e, 'technical', techInput, setTechInput)}
          />
          <button className="btn btn-ghost" onClick={() => handleAddSkill('technical', techInput, setTechInput)}>Add</button>
        </div>

        {resumeData.skills.technical.length > 0 && (
          <div className="tags-wrap">
            {resumeData.skills.technical.map(s => (
              <span key={s} className="tag">
                {s}
                <button className="tag-remove" onClick={() => removeSkill('technical', s)}>✕</button>
              </span>
            ))}
          </div>
        )}

        <div className="suggestions-row">
          <span className="suggest-label">Quick add:</span>
          {TECH_SUGGESTIONS.filter(s => !resumeData.skills.technical.includes(s)).slice(0, 12).map(s => (
            <button key={s} className="suggest-chip" onClick={() => addSkill('technical', s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="skills-section mt-16">
        <h3 className="skills-section-title">🤝 Soft Skills</h3>
        <div className="skills-input-row">
          <input
            className="form-input"
            placeholder="Type a soft skill and press Enter..."
            value={softInput}
            onChange={e => setSoftInput(e.target.value)}
            onKeyDown={e => handleKeyDown(e, 'soft', softInput, setSoftInput)}
          />
          <button className="btn btn-ghost" onClick={() => handleAddSkill('soft', softInput, setSoftInput)}>Add</button>
        </div>

        {resumeData.skills.soft.length > 0 && (
          <div className="tags-wrap">
            {resumeData.skills.soft.map(s => (
              <span key={s} className="tag tag-soft">
                {s}
                <button className="tag-remove" onClick={() => removeSkill('soft', s)}>✕</button>
              </span>
            ))}
          </div>
        )}

        <div className="suggestions-row">
          <span className="suggest-label">Quick add:</span>
          {SOFT_SUGGESTIONS.filter(s => !resumeData.skills.soft.includes(s)).slice(0, 8).map(s => (
            <button key={s} className="suggest-chip suggest-chip-soft" onClick={() => addSkill('soft', s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Keyword Optimizer */}
      {keywordSuggestions.length > 0 && (
        <div className="keyword-optimizer">
          <div className="keyword-optimizer-header">
            <span>🎯</span>
            <strong>Keyword Optimizer</strong>
            <span className="badge badge-purple">ATS Boost</span>
          </div>
          <p className="keyword-desc">Recommended keywords for <strong>{resumeData.targetRole}</strong>:</p>
          <div className="suggestions-row">
            {keywordSuggestions.map(kw => {
              const hasIt = resumeData.skills.technical.includes(kw) || resumeData.skills.soft.includes(kw);
              return (
                <button
                  key={kw}
                  className={`suggest-chip ${hasIt ? 'suggest-chip-done' : ''}`}
                  onClick={() => !hasIt && addSkill('technical', kw)}
                  disabled={hasIt}
                >
                  {hasIt ? '✓ ' : ''}{kw}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
