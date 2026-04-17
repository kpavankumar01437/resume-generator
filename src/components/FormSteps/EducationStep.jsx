import { useResume } from '../../context/ResumeContext';
import './FormSteps.css';

export default function EducationStep() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();

  return (
    <div className="step-content animate-fade">
      <div className="step-header">
        <div className="step-icon-wrap">🎓</div>
        <div>
          <h2 className="step-title">Educational Qualifications</h2>
          <p className="step-desc">Add your academic background, starting with the most recent</p>
        </div>
      </div>

      {resumeData.education.length === 0 && (
        <div className="empty-state">
          <span>🎓</span>
          <p>No education added yet. Click the button below to add your first entry.</p>
        </div>
      )}

      {resumeData.education.map((edu, idx) => (
        <div key={edu.id} className="entry-card animate-slide">
          <div className="entry-card-header">
            <span className="entry-number">#{idx + 1}</span>
            <span className="entry-label">Education Entry</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeEducation(edu.id)}>
              🗑️ Remove
            </button>
          </div>

          <div className="fields-grid">
            <div className="form-group full-width">
              <label className="form-label">🏫 Institution Name</label>
              <input className="form-input" placeholder="e.g. Massachusetts Institute of Technology" value={edu.institution}
                onChange={e => updateEducation(edu.id, 'institution', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">📜 Degree / Certificate</label>
              <input className="form-input" placeholder="e.g. Bachelor of Science" value={edu.degree}
                onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">📚 Field of Study</label>
              <input className="form-input" placeholder="e.g. Computer Science" value={edu.field}
                onChange={e => updateEducation(edu.id, 'field', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">📅 Start Year</label>
              <input className="form-input" placeholder="2020" value={edu.startYear}
                onChange={e => updateEducation(edu.id, 'startYear', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">📅 End Year</label>
              <input className="form-input" placeholder="2024 or Present" value={edu.endYear}
                onChange={e => updateEducation(edu.id, 'endYear', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">📍 Location</label>
              <input className="form-input" placeholder="Cambridge, MA" value={edu.location}
                onChange={e => updateEducation(edu.id, 'location', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">⭐ GPA / Score (optional)</label>
              <input className="form-input" placeholder="3.8 / 4.0" value={edu.gpa}
                onChange={e => updateEducation(edu.id, 'gpa', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-primary add-btn" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );
}
