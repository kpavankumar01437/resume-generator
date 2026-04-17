import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { generateProjectBullets } from '../../utils/aiSuggestions';
import './FormSteps.css';

export default function ProjectsStep() {
  const { resumeData, addProject, updateProject, removeProject, showToast } = useResume();
  const [loadingId, setLoadingId] = useState(null);
  const [techInputs, setTechInputs] = useState({});

  const handleAIBullets = async (proj) => {
    setLoadingId(proj.id);
    await new Promise(r => setTimeout(r, 1000));
    const bullets = generateProjectBullets(3);
    updateProject(proj.id, 'bullets', bullets);
    setLoadingId(null);
    showToast('✨ Project bullets generated!');
  };

  const handleAddTech = (projId, val) => {
    if (!val.trim()) return;
    const proj = resumeData.projects.find(p => p.id === projId);
    if (!proj) return;
    updateProject(projId, 'technologies', [...new Set([...(proj.technologies || []), val.trim()])]);
    setTechInputs(prev => ({ ...prev, [projId]: '' }));
  };

  const handleRemoveTech = (projId, tech) => {
    const proj = resumeData.projects.find(p => p.id === projId);
    if (!proj) return;
    updateProject(projId, 'technologies', proj.technologies.filter(t => t !== tech));
  };

  return (
    <div className="step-content animate-fade">
      <div className="step-header">
        <div className="step-icon-wrap">🚀</div>
        <div>
          <h2 className="step-title">Projects</h2>
          <p className="step-desc">Showcase your best work and side projects</p>
        </div>
      </div>

      {resumeData.projects.length === 0 && (
        <div className="empty-state">
          <span>🚀</span>
          <p>No projects added. Add projects to showcase your practical skills.</p>
        </div>
      )}

      {resumeData.projects.map((proj, idx) => (
        <div key={proj.id} className="entry-card animate-slide">
          <div className="entry-card-header">
            <span className="entry-number">#{idx + 1}</span>
            <span className="entry-label">Project</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm ai-btn"
                onClick={() => handleAIBullets(proj)}
                disabled={loadingId === proj.id}>
                {loadingId === proj.id ? <span className="spinner" /> : '✨'} AI Bullets
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => removeProject(proj.id)}>🗑️</button>
            </div>
          </div>

          <div className="fields-grid">
            <div className="form-group">
              <label className="form-label">📌 Project Title</label>
              <input className="form-input" placeholder="e.g. E-Commerce Platform" value={proj.title}
                onChange={e => updateProject(proj.id, 'title', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">🔗 Project Link (optional)</label>
              <input className="form-input" placeholder="github.com/user/project" value={proj.link}
                onChange={e => updateProject(proj.id, 'link', e.target.value)} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">📝 Description</label>
              <textarea className="form-textarea" rows={3}
                placeholder="Describe what the project does and your role in it..."
                value={proj.description}
                onChange={e => updateProject(proj.id, 'description', e.target.value)} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">🛠️ Technologies Used</label>
              <div className="skills-input-row">
                <input className="form-input"
                  placeholder="Add technology and press Enter..."
                  value={techInputs[proj.id] || ''}
                  onChange={e => setTechInputs(prev => ({ ...prev, [proj.id]: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { e.preventDefault(); handleAddTech(proj.id, techInputs[proj.id] || ''); }
                  }} />
                <button className="btn btn-ghost" onClick={() => handleAddTech(proj.id, techInputs[proj.id] || '')}>Add</button>
              </div>
              {(proj.technologies || []).length > 0 && (
                <div className="tags-wrap mt-8">
                  {proj.technologies.map(t => (
                    <span key={t} className="tag">
                      {t}
                      <button className="tag-remove" onClick={() => handleRemoveTech(proj.id, t)}>✕</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {proj.bullets && proj.bullets.length > 0 && (
              <div className="form-group full-width">
                <label className="form-label">🎯 Key Highlights</label>
                <div className="bullets-list">
                  {proj.bullets.map((b, i) => (
                    <div key={i} className="bullet-item">
                      <span className="bullet-dot">•</span>
                      <input className="form-input bullet-input" value={b}
                        onChange={e => {
                          const nb = [...proj.bullets]; nb[i] = e.target.value;
                          updateProject(proj.id, 'bullets', nb);
                        }} />
                      <button className="bullet-remove" onClick={() => {
                        updateProject(proj.id, 'bullets', proj.bullets.filter((_, j) => j !== i));
                      }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <button className="btn btn-primary add-btn" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
}
