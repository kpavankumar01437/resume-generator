import { useResume } from '../../context/ResumeContext';
import './FormSteps.css';

export default function CertificationsStep() {
  const {
    resumeData,
    addCertification, updateCertification, removeCertification,
    addAchievement, updateAchievement, removeAchievement
  } = useResume();

  return (
    <div className="step-content animate-fade">
      <div className="step-header">
        <div className="step-icon-wrap">🏆</div>
        <div>
          <h2 className="step-title">Certifications & Achievements</h2>
          <p className="step-desc">Highlight your credentials and notable accomplishments</p>
        </div>
      </div>

      {/* Certifications */}
      <section className="sub-section">
        <div className="sub-section-header">
          <h3 className="sub-title">🎖️ Certifications</h3>
          <button className="btn btn-ghost btn-sm" onClick={addCertification}>+ Add</button>
        </div>

        {resumeData.certifications.length === 0 && (
          <div className="empty-state small">
            <p>No certifications added yet.</p>
          </div>
        )}

        {resumeData.certifications.map((cert, idx) => (
          <div key={cert.id} className="entry-card compact animate-slide">
            <div className="entry-card-header">
              <span className="entry-number">#{idx + 1}</span>
              <span className="entry-label">Certification</span>
              <button className="btn btn-danger btn-sm" onClick={() => removeCertification(cert.id)}>🗑️</button>
            </div>
            <div className="fields-grid">
              <div className="form-group">
                <label className="form-label">🎖️ Certification Name</label>
                <input className="form-input" placeholder="e.g. AWS Solutions Architect" value={cert.name}
                  onChange={e => updateCertification(cert.id, 'name', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">🏢 Issuing Organization</label>
                <input className="form-input" placeholder="e.g. Amazon Web Services" value={cert.issuer}
                  onChange={e => updateCertification(cert.id, 'issuer', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">📅 Issue Date</label>
                <input className="form-input" placeholder="Mar 2023" value={cert.date}
                  onChange={e => updateCertification(cert.id, 'date', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">🔗 Credential URL</label>
                <input className="form-input" placeholder="credential link (optional)" value={cert.url}
                  onChange={e => updateCertification(cert.id, 'url', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Achievements */}
      <section className="sub-section mt-16">
        <div className="sub-section-header">
          <h3 className="sub-title">🏅 Achievements & Awards</h3>
          <button className="btn btn-ghost btn-sm" onClick={addAchievement}>+ Add</button>
        </div>

        {resumeData.achievements.length === 0 && (
          <div className="empty-state small">
            <p>No achievements added yet.</p>
          </div>
        )}

        {resumeData.achievements.map((ach, idx) => (
          <div key={ach.id} className="achievement-item animate-slide">
            <span className="achievement-num">{idx + 1}</span>
            <input
              className="form-input"
              placeholder="e.g. Won 1st place at National Hackathon 2023 among 500+ participants"
              value={ach.text}
              onChange={e => updateAchievement(ach.id, e.target.value)}
            />
            <button className="btn btn-danger btn-sm" onClick={() => removeAchievement(ach.id)}>🗑️</button>
          </div>
        ))}
      </section>

      <div className="ai-tip-card mt-16">
        <span>💡</span>
        <div>
          <strong>Pro Tip:</strong> Quantify achievements where possible. "Increased sales by 30%" is more impactful than "Increased sales".
        </div>
      </div>
    </div>
  );
}
