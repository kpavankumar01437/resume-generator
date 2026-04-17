import './Templates.css';

export default function ProfessionalTemplate({ data }) {
  const { personalInfo, summary, education, skills, experience, projects, certifications, achievements } = data;

  return (
    <div className="resume professional-template" id="resume-preview">
      {/* Header */}
      <header className="pro-header">
        <h1 className="pro-name">{personalInfo.fullName || 'Your Name'}</h1>
        {data.targetRole && <h2 className="pro-role">{data.targetRole}</h2>}
        <div className="pro-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      <div className="pro-body">
        {/* Summary */}
        {summary && (
          <section className="pro-section">
            <h2 className="pro-section-title"><span className="pro-section-bar" />Professional Summary</h2>
            <p className="pro-summary">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="pro-section">
            <h2 className="pro-section-title"><span className="pro-section-bar" />Professional Experience</h2>
            {experience.map(e => (
              <div key={e.id} className="pro-exp-item">
                <div className="pro-exp-top">
                  <div>
                    <span className="pro-exp-role">{e.role || 'Role'}</span>
                    <span className="pro-sep"> | </span>
                    <span className="pro-exp-company">{e.company || 'Company'}</span>
                    {e.location && <span className="pro-exp-loc"> | {e.location}</span>}
                  </div>
                  <span className="pro-exp-date">{e.startDate}{(e.endDate || e.current) && ` – ${e.current ? 'Present' : e.endDate}`}</span>
                </div>
                {e.description && <p className="pro-exp-desc">{e.description}</p>}
                {e.bullets && e.bullets.length > 0 && (
                  <ul className="pro-bullets">
                    {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Two-column bottom */}
        <div className="pro-two-col">
          <div>
            {/* Education */}
            {education.length > 0 && (
              <section className="pro-section">
                <h2 className="pro-section-title"><span className="pro-section-bar" />Education</h2>
                {education.map(e => (
                  <div key={e.id} className="pro-edu-item">
                    <div className="pro-exp-top">
                      <div>
                        <strong>{e.degree}</strong>
                        {e.field && <span> in {e.field}</span>}
                        <p>{e.institution}</p>
                      </div>
                      <span className="pro-exp-date">{e.startYear}{e.endYear && ` – ${e.endYear}`}</span>
                    </div>
                    {e.gpa && <p className="meta-text">GPA: {e.gpa}</p>}
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="pro-section">
                <h2 className="pro-section-title"><span className="pro-section-bar" />Certifications</h2>
                {certifications.map(c => (
                  <div key={c.id} className="pro-cert-item">
                    <strong>{c.name}</strong>
                    {c.issuer && <span className="pro-sep"> | </span>}
                    {c.issuer && <span>{c.issuer}</span>}
                    {c.date && <span className="pro-exp-date"> ({c.date})</span>}
                  </div>
                ))}
              </section>
            )}
          </div>

          <div>
            {/* Skills */}
            {(skills.technical.length > 0 || skills.soft.length > 0) && (
              <section className="pro-section">
                <h2 className="pro-section-title"><span className="pro-section-bar" />Skills</h2>
                {skills.technical.length > 0 && (
                  <div className="pro-skill-row">
                    <strong>Technical:</strong>
                    <p>{skills.technical.join(' • ')}</p>
                  </div>
                )}
                {skills.soft.length > 0 && (
                  <div className="pro-skill-row">
                    <strong>Soft Skills:</strong>
                    <p>{skills.soft.join(' • ')}</p>
                  </div>
                )}
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="pro-section">
                <h2 className="pro-section-title"><span className="pro-section-bar" />Key Projects</h2>
                {projects.map(p => (
                  <div key={p.id} className="pro-proj-item">
                    <strong>{p.title}</strong>
                    {p.technologies && p.technologies.length > 0 && (
                      <p className="meta-text">{p.technologies.join(', ')}</p>
                    )}
                    {p.description && <p>{p.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <section className="pro-section">
                <h2 className="pro-section-title"><span className="pro-section-bar" />Achievements</h2>
                <ul className="pro-bullets">
                  {achievements.filter(a => a.text).map(a => <li key={a.id}>{a.text}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
