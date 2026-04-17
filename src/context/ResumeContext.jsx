import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const defaultData = {
  personalInfo: {
    fullName: '', phone: '', email: '', linkedin: '', address: '', website: ''
  },
  summary: '',
  education: [],
  skills: { technical: [], soft: [] },
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
  template: 'modern',
  targetRole: ''
};

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch { return defaultData; }
  });

  const [activeStep, setActiveStep] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  }, []);

  const updateSummary = useCallback((value) => {
    setResumeData(prev => ({ ...prev, summary: value }));
  }, []);

  const updateTargetRole = useCallback((value) => {
    setResumeData(prev => ({ ...prev, targetRole: value }));
  }, []);

  const updateTemplate = useCallback((value) => {
    setResumeData(prev => ({ ...prev, template: value }));
  }, []);

  // Education
  const addEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), institution: '', degree: '', field: '', startYear: '', endYear: '', gpa: '', location: '' }]
    }));
  }, []);
  const updateEducation = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  }, []);
  const removeEducation = useCallback((id) => {
    setResumeData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  }, []);

  // Skills
  const addSkill = useCallback((type, skill) => {
    if (!skill.trim()) return;
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [type]: [...new Set([...prev.skills[type], skill.trim()])] }
    }));
  }, []);
  const removeSkill = useCallback((type, skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [type]: prev.skills[type].filter(s => s !== skill) }
    }));
  }, []);

  // Experience
  const addExperience = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), company: '', role: '', startDate: '', endDate: '', current: false, location: '', description: '', bullets: [] }]
    }));
  }, []);
  const updateExperience = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  }, []);
  const removeExperience = useCallback((id) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  }, []);

  // Projects
  const addProject = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now(), title: '', description: '', technologies: [], link: '', bullets: [] }]
    }));
  }, []);
  const updateProject = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  }, []);
  const removeProject = useCallback((id) => {
    setResumeData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  }, []);

  // Certifications
  const addCertification = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: Date.now(), name: '', issuer: '', date: '', url: '' }]
    }));
  }, []);
  const updateCertification = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  }, []);
  const removeCertification = useCallback((id) => {
    setResumeData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
  }, []);

  // Achievements
  const addAchievement = useCallback(() => {
    setResumeData(prev => ({ ...prev, achievements: [...prev.achievements, { id: Date.now(), text: '' }] }));
  }, []);
  const updateAchievement = useCallback((id, value) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.map(a => a.id === id ? { ...a, text: value } : a)
    }));
  }, []);
  const removeAchievement = useCallback((id) => {
    setResumeData(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id) }));
  }, []);

  const resetData = useCallback(() => {
    setResumeData(defaultData);
    localStorage.removeItem('resumeData');
    showToast('Resume data cleared!', 'info');
  }, [showToast]);

  return (
    <ResumeContext.Provider value={{
      resumeData, activeStep, setActiveStep, toast, showToast,
      updatePersonalInfo, updateSummary, updateTargetRole, updateTemplate,
      addEducation, updateEducation, removeEducation,
      addSkill, removeSkill,
      addExperience, updateExperience, removeExperience,
      addProject, updateProject, removeProject,
      addCertification, updateCertification, removeCertification,
      addAchievement, updateAchievement, removeAchievement,
      resetData
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};
