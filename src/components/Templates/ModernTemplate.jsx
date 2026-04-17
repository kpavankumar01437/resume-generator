import './Templates.css';

export default function ModernTemplate({ data }) {
  const { personalInfo, summary, education, skills, experience, projects, certifications, achievements } = data;

  return (
    <div className="resume modern-template" id="resume-preview">
      {/* Header */}
      <header className="modern-header">
        <div className="modern-name-block">
          <h1 className="modern-name">{personalInfo.fullName || 'Your Name'}</h1>
          {data.targetRole && <p className="modern-role">{data.targetRole}</p>}
        </div>
        <div className="modern-contact">
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
          {personalInfo.address && <span>📍 {personalInfo.address}</span>}
          {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
        </div>
      </header>

      <div className="modern-body">
        {/* Left Column */}
        <aside className="modern-sidebar">
          {/* Skills */}
          {skills.technical.length > 0 && (
            <section className="resume-section">
              <h2 className="sidebar-section-title">Technical Skills</h2>
              <div className="skill-tags">
                {skills.technical.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </section>
          )}
          {skills.soft.length > 0 && (
            <section className="resume-section">
              <h2 className="sidebar-section-title">Soft Skills</h2>
              <div className="skill-tags">
                {skills.soft.map(s => <span key={s} className="skill-tag skill-tag-soft">{s}</span>)}
              </div>
            </section>
          )}
          {/* Education */}
          {education.length > 0 && (
            <section className="resume-section">
              <h2 className="sidebar-section-title">Education</h2>
              {education.map(e => (
                <div key={e.id} className="edu-item">
                  <strong>{e.degree} {e.field && `in ${e.field}`}</strong>
                  <p>{e.institution}</p>
                  <p className="meta-text">{e.startYear}{e.endYear && ` – ${e.endYear}`} {e.location && `• ${e.location}`}</p>
                  {e.gpa && <p className="meta-text">GPA: {e.gpa}</p>}
                </div>
              ))}
            </section>
          )}
          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="resume-section">
              <h2 className="sidebar-section-title">Certifications</h2>
              {certifications.map(c => (
                <div key={c.id} className="cert-item">
                  <strong>{c.name}</strong>
                  {c.issuer && <p>{c.issuer}</p>}
                  {c.date && <p className="meta-text">{c.date}</p>}
                </div>
              ))}
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main className="modern-main">
          {/* Summary */}
          {summary && (
            <section className="resume-section">
              <h2 className="main-section-title">Professional Summary</h2>
              <p className="summary-text">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="resume-section">
              <h2 className="main-section-title">Work Experience</h2>
              {experience.map(e => (
                <div key={e.id} className="exp-item">
                  <div className="exp-header">
                    <div>
                      <h3 className="exp-role">{e.role || 'Role'}</h3>
                      <p className="exp-company">{e.company || 'Company'} {e.location && `• ${e.location}`}</p>
                    </div>
                    <span className="exp-date">{e.startDate}{(e.endDate || e.current) && ` – ${e.current ? 'Present' : e.endDate}`}</span>
                  </div>
                  {e.description && <p className="exp-desc">{e.description}</p>}
                  {e.bullets && e.bullets.length > 0 && (
                    <ul className="bullet-points">
                      {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="resume-section">
              <h2 className="main-section-title">Projects</h2>
              {projects.map(p => (
                <div key={p.id} className="proj-item">
                  <div className="proj-header">
                    <h3 className="proj-title">{p.title || 'Project'}</h3>
                    {p.link && <span className="proj-link">{p.link}</span>}
                  </div>
                  {p.technologies && p.technologies.length > 0 && (
                    <p className="proj-tech">{p.technologies.join(' • ')}</p>
                  )}
                  {p.description && <p className="proj-desc">{p.description}</p>}
                  {p.bullets && p.bullets.length > 0 && (
                    <ul className="bullet-points">
                      {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <section className="resume-section">
              <h2 className="main-section-title">Achievements</h2>
              <ul className="bullet-points">
                {achievements.filter(a => a.text).map(a => <li key={a.id}>{a.text}</li>)}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
