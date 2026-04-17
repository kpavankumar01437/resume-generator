import { useResume } from '../../context/ResumeContext';
import './FormSteps.css';

export default function PersonalInfoStep() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const fields = [
    { key: 'fullName', label: 'Full Name', placeholder: 'e.g. Alex Johnson', icon: '👤', full: true },
    { key: 'email', label: 'Email Address', placeholder: 'alex@example.com', icon: '✉️' },
    { key: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000', icon: '📞' },
    { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/alexjohnson', icon: '💼' },
    { key: 'website', label: 'Portfolio / Website', placeholder: 'alexjohnson.dev', icon: '🌐' },
    { key: 'address', label: 'Location / Address', placeholder: 'New York, NY', icon: '📍', full: true },
  ];

  return (
    <div className="step-content animate-fade">
      <div className="step-header">
        <div className="step-icon-wrap">👤</div>
        <div>
          <h2 className="step-title">Personal Information</h2>
          <p className="step-desc">Let's start with your basic contact details</p>
        </div>
      </div>

      <div className="fields-grid">
        {fields.map(f => (
          <div key={f.key} className={`form-group ${f.full ? 'full-width' : ''}`}>
            <label className="form-label">{f.icon} {f.label}</label>
            <input
              className="form-input"
              type="text"
              placeholder={f.placeholder}
              value={personalInfo[f.key] || ''}
              onChange={e => updatePersonalInfo(f.key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
