// AI Suggestion Engine (Smart local suggestions without external API)

const summaryTemplates = {
  'software engineer': [
    'Results-driven Software Engineer with {exp}+ years of experience designing and developing scalable web applications. Proficient in {skills}, with a strong foundation in algorithms and system design. Passionate about writing clean, maintainable code and delivering exceptional user experiences.',
    'Innovative Software Engineer with expertise in {skills}. Track record of delivering high-quality software solutions that improve business efficiency by up to 40%. Strong collaborator committed to Agile methodologies and continuous learning.',
    'Detail-oriented Software Engineer specializing in {skills}. Experienced in full-stack development, cloud infrastructure, and DevOps practices. Adept at translating complex requirements into elegant technical solutions.'
  ],
  'data scientist': [
    'Data Scientist with {exp}+ years of experience in machine learning, statistical modeling, and data visualization. Proficient in {skills}. Passionate about transforming raw data into actionable business insights that drive strategic decisions.',
    'Results-oriented Data Scientist skilled in {skills}, with a proven track record of building predictive models that improve decision-making accuracy by over 30%. Strong background in statistical analysis and A/B testing.',
  ],
  'product manager': [
    'Strategic Product Manager with {exp}+ years driving product vision and roadmap execution. Experienced in cross-functional collaboration, user research, and Agile methodologies. Skilled at translating user needs into impactful product features.',
    'Customer-focused Product Manager with expertise in {skills}. Track record of launching successful products from concept to market, increasing user engagement by 50%+ through data-driven feature prioritization.',
  ],
  'frontend developer': [
    'Creative Frontend Developer with {exp}+ years building responsive, performant web interfaces. Proficient in {skills}. Passionate about crafting pixel-perfect UI experiences and optimizing web performance metrics.',
    'Frontend Developer specializing in {skills} with a strong eye for design. Experienced in building component libraries and improving web application performance through code splitting and lazy loading techniques.',
  ],
  'backend developer': [
    'Backend Developer with {exp}+ years designing and maintaining robust server-side applications. Expert in {skills}, RESTful API design, and database optimization. Committed to writing scalable, secure, and well-tested code.',
    'Experienced Backend Developer proficient in {skills} with deep knowledge of microservices architecture and cloud deployment. Track record of reducing API response times by 60% through optimization strategies.',
  ],
  'ui/ux designer': [
    'Creative UI/UX Designer with {exp}+ years crafting intuitive digital experiences. Proficient in {skills} with strong understanding of user psychology and design thinking methodologies. Portfolio of products used by 1M+ users.',
    'User-centered UI/UX Designer skilled in {skills}. Experienced in end-to-end design processes from user research and wireframing to high-fidelity prototypes and usability testing.',
  ],
  'devops engineer': [
    'DevOps Engineer with {exp}+ years streamlining development pipelines and managing cloud infrastructure. Expert in {skills}, CI/CD automation, and container orchestration. Reduced deployment time by 70% through pipeline optimization.',
    'Cloud-focused DevOps Engineer proficient in {skills}. Experienced in designing resilient, auto-scaling infrastructure on AWS/GCP/Azure with 99.99% uptime track record.',
  ],
  default: [
    'Motivated and results-driven professional with {exp}+ years of experience in {skills}. Committed to delivering high-quality work, collaborating effectively with cross-functional teams, and continuously developing technical expertise to drive business success.',
    'Dedicated professional with a strong background in {skills}. Proven ability to manage complex projects, analyze requirements, and deliver solutions that exceed expectations. Strong communicator with excellent problem-solving skills.',
  ]
};

const experienceBullets = {
  software: [
    'Developed and maintained scalable RESTful APIs serving 100K+ daily active users',
    'Reduced application load time by 45% through code splitting and lazy loading optimization',
    'Collaborated with cross-functional teams in Agile sprints, consistently delivering features on schedule',
    'Implemented comprehensive unit and integration test suite achieving 90%+ code coverage',
    'Architected microservices migration reducing system downtime by 60%',
    'Mentored junior developers through code reviews and pair programming sessions',
    'Optimized database queries resulting in 3x performance improvement',
    'Led refactoring initiative that reduced technical debt by 40%',
    'Integrated third-party APIs and payment gateways for seamless user transactions',
    'Built CI/CD pipeline automating deployment process and reducing release cycles from weeks to hours',
  ],
  general: [
    'Delivered projects on time and within budget, consistently exceeding quality benchmarks',
    'Collaborated with stakeholders to gather requirements and translate them into actionable deliverables',
    'Analyzed complex data sets to identify trends and provide actionable insights',
    'Streamlined processes reducing operational overhead by 30%',
    'Led cross-functional team of 5+ members to achieve quarterly objectives',
    'Developed documentation and training materials for new team members',
    'Managed multiple priorities in fast-paced environment while maintaining high standards',
    'Contributed to 25% increase in team productivity through process improvements',
  ]
};

const projectBullets = [
  'Implemented responsive design compatible across all major browsers and device sizes',
  'Integrated user authentication and authorization with JWT and OAuth 2.0',
  'Optimized application performance achieving 95+ Lighthouse score',
  'Deployed application on cloud platform with auto-scaling and load balancing',
  'Built real-time features using WebSocket connections for live data updates',
  'Implemented comprehensive error handling and logging for production monitoring',
  'Used Redux/Context API for predictable state management across the application',
  'Achieved 85%+ test coverage with Jest and React Testing Library',
];

const keywordsByRole = {
  'software engineer': ['algorithms', 'data structures', 'system design', 'agile', 'scrum', 'git', 'code review', 'REST API', 'microservices', 'CI/CD', 'unit testing', 'debugging', 'version control', 'object-oriented programming', 'cloud computing'],
  'data scientist': ['machine learning', 'deep learning', 'NLP', 'computer vision', 'Python', 'TensorFlow', 'PyTorch', 'statistical analysis', 'A/B testing', 'data visualization', 'SQL', 'big data', 'feature engineering', 'model deployment'],
  'frontend developer': ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'HTML5', 'responsive design', 'accessibility', 'performance optimization', 'webpack', 'REST APIs', 'component architecture', 'UI/UX'],
  'backend developer': ['Node.js', 'Python', 'Java', 'REST API', 'GraphQL', 'SQL', 'NoSQL', 'Docker', 'Kubernetes', 'microservices', 'authentication', 'caching', 'message queues', 'scalability'],
  'devops engineer': ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Terraform', 'CI/CD', 'Jenkins', 'GitHub Actions', 'monitoring', 'logging', 'infrastructure as code', 'Linux', 'bash scripting'],
  'product manager': ['roadmap', 'user stories', 'agile', 'scrum', 'KPIs', 'stakeholder management', 'A/B testing', 'user research', 'product strategy', 'go-to-market', 'prioritization', 'OKRs'],
};

export function generateSummary(targetRole, skills = [], experienceYears = 2) {
  const roleKey = Object.keys(summaryTemplates).find(k =>
    targetRole.toLowerCase().includes(k)
  ) || 'default';

  const templates = summaryTemplates[roleKey];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const skillStr = skills.length > 0
    ? skills.slice(0, 4).join(', ')
    : 'modern technologies';

  return template
    .replace('{exp}', experienceYears)
    .replace('{skills}', skillStr);
}

export function generateExperienceBullets(role = '', count = 4) {
  const isTech = /develop|engineer|program|code|software|tech|data|devops/i.test(role);
  const pool = isTech ? [...experienceBullets.software, ...experienceBullets.general] : experienceBullets.general;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateProjectBullets(count = 3) {
  const shuffled = [...projectBullets].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getKeywordSuggestions(targetRole) {
  const roleKey = Object.keys(keywordsByRole).find(k =>
    targetRole.toLowerCase().includes(k)
  );
  return roleKey ? keywordsByRole[roleKey] : [];
}

export function analyzeKeywords(resumeText, targetRole) {
  const suggestions = getKeywordSuggestions(targetRole);
  if (!suggestions.length) return { score: 75, missing: [], present: [] };

  const present = suggestions.filter(kw =>
    resumeText.toLowerCase().includes(kw.toLowerCase())
  );
  const missing = suggestions.filter(kw =>
    !resumeText.toLowerCase().includes(kw.toLowerCase())
  );
  const score = Math.round((present.length / suggestions.length) * 100);
  return { score, present, missing: missing.slice(0, 6) };
}

export function getATSScore(resumeData) {
  let score = 0;
  const checks = [];

  if (resumeData.personalInfo.fullName) { score += 5; checks.push({ ok: true, text: 'Full name present' }); }
  else checks.push({ ok: false, text: 'Add your full name' });

  if (resumeData.personalInfo.email) { score += 5; checks.push({ ok: true, text: 'Email address present' }); }
  else checks.push({ ok: false, text: 'Add your email address' });

  if (resumeData.personalInfo.phone) { score += 5; checks.push({ ok: true, text: 'Phone number present' }); }
  else checks.push({ ok: false, text: 'Add a phone number' });

  if (resumeData.summary && resumeData.summary.length > 50) { score += 15; checks.push({ ok: true, text: 'Career summary present' }); }
  else checks.push({ ok: false, text: 'Write a strong career summary (50+ characters)' });

  if (resumeData.skills.technical.length >= 5) { score += 15; checks.push({ ok: true, text: 'Good number of technical skills' }); }
  else checks.push({ ok: false, text: 'Add at least 5 technical skills' });

  if (resumeData.experience.length > 0) { score += 20; checks.push({ ok: true, text: 'Work experience present' }); }
  else checks.push({ ok: false, text: 'Add work experience' });

  if (resumeData.education.length > 0) { score += 15; checks.push({ ok: true, text: 'Education section present' }); }
  else checks.push({ ok: false, text: 'Add your educational background' });

  if (resumeData.projects.length > 0) { score += 10; checks.push({ ok: true, text: 'Projects section present' }); }
  else checks.push({ ok: false, text: 'Showcase your projects' });

  if (resumeData.certifications.length > 0) { score += 10; checks.push({ ok: true, text: 'Certifications added' }); }
  else checks.push({ ok: false, text: 'Add relevant certifications' });

  return { score: Math.min(score, 100), checks };
}
