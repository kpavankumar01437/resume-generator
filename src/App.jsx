import { useState } from 'react';
import { useResume } from './context/ResumeContext';
import PersonalInfoStep from './components/FormSteps/PersonalInfoStep';
import SummaryStep from './components/FormSteps/SummaryStep';
import EducationStep from './components/FormSteps/EducationStep';
import SkillsStep from './components/FormSteps/SkillsStep';
import ExperienceStep from './components/FormSteps/ExperienceStep';
import ProjectsStep from './components/FormSteps/ProjectsStep';
import CertificationsStep from './components/FormSteps/CertificationsStep';
import PreviewPanel from './components/Preview/PreviewPanel';
import './App.css';

const STEPS = [
  { id: 'personal', label: 'Personal', icon: '👤', component: PersonalInfoStep },
  { id: 'summary', label: 'Summary', icon: '🎯', component: SummaryStep },
  { id: 'education', label: 'Education', icon: '🎓', component: EducationStep },
  { id: 'skills', label: 'Skills', icon: '⚡', component: SkillsStep },
  { id: 'experience', label: 'Experience', icon: '💼', component: ExperienceStep },
  { id: 'projects', label: 'Projects', icon: '🚀', component: ProjectsStep },
  { id: 'certifications', label: 'Certs & More', icon: '🏆', component: CertificationsStep },
];

export default function App() {
  const { activeStep, setActiveStep, toast, resetData, resumeData } = useResume();
  const [previewOpen, setPreviewOpen] = useState(false);

  const CurrentStep = STEPS[activeStep].component;
  const completedSteps = STEPS.filter((_, i) => {
    if (i === 0) return resumeData.personalInfo.fullName.trim() !== '';
    if (i === 1) return resumeData.summary.trim() !== '';
    if (i === 2) return resumeData.education.length > 0;
    if (i === 3) return resumeData.skills.technical.length > 0;
    if (i === 4) return resumeData.experience.length > 0;
    if (i === 5) return resumeData.projects.length > 0;
    if (i === 6) return resumeData.certifications.length > 0 || resumeData.achievements.length > 0;
    return false;
  });

  return (
    <div className="app-layout">
      {/* ─── Sidebar ─── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <span>📄</span>
          </div>
          <div>
            <h1 className="brand-name">ResumeAI</h1>
            <p className="brand-sub">Smart Resume Builder</p>
          </div>
        </div>

        <nav className="step-nav">
          {STEPS.map((step, idx) => {
            const done = completedSteps.some(s => s.id === step.id);
            return (
              <button
                key={step.id}
                className={`step-nav-item ${activeStep === idx ? 'active' : ''} ${done ? 'done' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <span className="step-nav-icon">
                  {done ? '✓' : step.icon}
                </span>
                <div className="step-nav-info">
                  <span className="step-nav-label">{step.label}</span>
                  <span className="step-nav-num">Step {idx + 1} of {STEPS.length}</span>
                </div>
                {activeStep === idx && <span className="step-active-dot" />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="btn btn-danger sidebar-reset" onClick={resetData}>
            🗑 Clear All Data
          </button>
          <p className="sidebar-save-note">💾 Auto-saved locally</p>
        </div>
      </aside>

      {/* ─── Main Form Area ─── */}
      <main className="main-area">
        {/* Mobile header */}
        <div className="mobile-header">
          <span className="brand-name mobile-brand">📄 ResumeAI</span>
          <button
            className="btn btn-ghost mobile-preview-btn"
            onClick={() => setPreviewOpen(v => !v)}
          >
            {previewOpen ? '✕ Close Preview' : '👁 Preview'}
          </button>
        </div>

        <div className="form-area">
          {/* Step progress bar */}
          <div className="progress-bar-wrap">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            <span className="progress-label">
              Step {activeStep + 1} / {STEPS.length}
            </span>
          </div>

          {/* Current step */}
          <div className="step-scroll-area">
            <CurrentStep key={activeStep} />
          </div>

          {/* Navigation buttons */}
          <div className="step-nav-btns">
            <button
              className="btn btn-secondary"
              onClick={() => setActiveStep(s => Math.max(0, s - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>
            <div className="step-dots">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  className={`step-dot ${i === activeStep ? 'active' : ''} ${completedSteps.some(s => s.id === STEPS[i].id) ? 'done' : ''}`}
                  onClick={() => setActiveStep(i)}
                />
              ))}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setActiveStep(s => Math.min(STEPS.length - 1, s + 1))}
              disabled={activeStep === STEPS.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </main>

      {/* ─── Preview Panel ─── */}
      <section className={`preview-section ${previewOpen ? 'mobile-open' : ''}`}>
        <PreviewPanel />
      </section>

      {/* ─── Toast ─── */}
      {toast && (
        <div className="toast">
          <span>{toast.type === 'error' ? '❌' : '✅'}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
