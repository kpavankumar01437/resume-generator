import './Templates.css';

export default function MinimalTemplate({ data }) {
  const { personalInfo, summary, education, skills, experience, projects, certifications, achievements } = data;

  return (
    <div className="resume minimal-template" id="resume-preview">
      {/* Header */}
      <header className="min-header">
        <h1 className="min-name">{personalInfo.fullName || 'Your Name'}</h1>
        {data.targetRole && <p className="min-role">{data.targetRole}</p>}
        <div className="min-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.address, personalInfo.linkedin, personalInfo.website]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i} className="min-contact-item">{item}</span>
            ))}
        </div>
        <div className="min-divider" />
      </header>

      {/* Summary */}
      {summary && (
        <section className="min-section">
          <h2 className="min-section-title">Summary</h2>
          <p className="min-text">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="min-section">
          <h2 className="min-section-title">Experience</h2>
          {experience.map(e => (
            <div key={e.id} className="min-item">
              <div className="min-item-header">
                <div>
                  <span className="min-bold">{e.role || 'Role'}</span>
                  {e.company && <span className="min-company"> — {e.company}</span>}
                  {e.location && <span className="min-company">, {e.location}</span>}
                </div>
                <span className="min-date">
                  {e.startDate}{(e.endDate || e.current) ? ` – ${e.current ? 'Present' : e.endDate}` : ''}
                </span>
              </div>
              {e.description && <p className="min-text min-mt">{e.description}</p>}
              {e.bullets && e.bullets.length > 0 && (
                <ul className="min-bullets">
                  {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="min-section">
          <h2 className="min-section-title">Education</h2>
          {education.map(e => (
            <div key={e.id} className="min-item">
              <div className="min-item-header">
                <div>
                  <span className="min-bold">{e.degree}{e.field ? ` in ${e.field}` : ''}</span>
                  {e.institution && <span className="min-company"> — {e.institution}</span>}
                </div>
                <span className="min-date">{e.startYear}{e.endYear ? ` – ${e.endYear}` : ''}</span>
              </div>
              {e.gpa && <p className="min-text min-mt">GPA: {e.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="min-section">
          <h2 className="min-section-title">Skills</h2>
          {skills.technical.length > 0 && (
            <p className="min-text min-mt">
              <span className="min-bold">Technical: </span>
              {skills.technical.join(' · ')}
            </p>
          )}
          {skills.soft.length > 0 && (
            <p className="min-text min-mt">
              <span className="min-bold">Soft Skills: </span>
              {skills.soft.join(' · ')}
            </p>
          )}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="min-section">
          <h2 className="min-section-title">Projects</h2>
          {projects.map(p => (
            <div key={p.id} className="min-item">
              <div className="min-item-header">
                <span className="min-bold">{p.title || 'Project'}</span>
                {p.link && <span className="min-date">{p.link}</span>}
              </div>
              {p.technologies && p.technologies.length > 0 && (
                <p className="min-tech">{p.technologies.join(' · ')}</p>
              )}
              {p.description && <p className="min-text min-mt">{p.description}</p>}
              {p.bullets && p.bullets.length > 0 && (
                <ul className="min-bullets">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="min-section">
          <h2 className="min-section-title">Certifications</h2>
          {certifications.map(c => (
            <div key={c.id} className="min-item min-inline">
              <span className="min-bold">{c.name}</span>
              {c.issuer && <span className="min-company"> — {c.issuer}</span>}
              {c.date && <span className="min-date"> ({c.date})</span>}
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {achievements.filter(a => a.text).length > 0 && (
        <section className="min-section">
          <h2 className="min-section-title">Achievements</h2>
          <ul className="min-bullets">
            {achievements.filter(a => a.text).map(a => <li key={a.id}>{a.text}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
