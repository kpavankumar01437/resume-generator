# 📄 ResumeAI – Smart Resume Generator

A **fully-featured, AI-powered Resume Builder** built with React + Vite. Create professional, ATS-optimized resumes in minutes with real-time preview and one-click PDF download.

![ResumeAI](https://img.shields.io/badge/ResumeAI-Smart%20Resume%20Builder-6c63ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)

---

## ✨ Features

### Core Features
- **7-Step Guided Form** – Personal Info, Summary, Education, Skills, Experience, Projects, Certifications
- **3 Professional Templates** – Modern (two-column), Professional (corporate), Minimal (typographic)
- **Live Preview** – Real-time resume preview with zoom controls
- **PDF Download** – High-quality, print-ready PDF export
- **LocalStorage Persistence** – Your data is auto-saved between sessions

### AI-Powered Features
- **AI Summary Generator** – Smart career objective suggestions based on your role & skills
- **AI Bullet Points** – Auto-generated experience and project bullet points
- **Keyword Optimizer** – Role-based ATS keyword suggestions with tracking
- **ATS Score Analyzer** – Real-time score (0–100) with actionable improvement checklist

### Design
- 🌙 Dark mode UI with glassmorphism effects
- 📱 Fully responsive (mobile + desktop)
- ⚡ Smooth animations and micro-interactions

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kpavankumar01437/resume-generator.git

# Navigate to project
cd resume-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + Vite |
| Styling | Vanilla CSS (custom design system) |
| State Management | React Context API |
| PDF Export | html2pdf.js |
| Icons | Emoji-based (zero dependency) |
| Storage | localStorage |
| AI Engine | Smart local suggestion engine |

---

## 📁 Project Structure

```
src/
├── context/
│   └── ResumeContext.jsx       # Global state + localStorage persistence
├── utils/
│   ├── aiSuggestions.js        # AI engine: summaries, bullets, keywords, ATS scoring
│   └── pdfGenerator.js         # PDF export utility
├── components/
│   ├── FormSteps/
│   │   ├── PersonalInfoStep.jsx
│   │   ├── SummaryStep.jsx     # With AI suggestion button
│   │   ├── EducationStep.jsx
│   │   ├── SkillsStep.jsx      # With keyword optimizer
│   │   ├── ExperienceStep.jsx  # With AI bullet generator
│   │   ├── ProjectsStep.jsx    # With AI bullet generator
│   │   ├── CertificationsStep.jsx
│   │   └── FormSteps.css
│   ├── Templates/
│   │   ├── ModernTemplate.jsx
│   │   ├── ProfessionalTemplate.jsx
│   │   ├── MinimalTemplate.jsx
│   │   └── Templates.css       # Print-ready A4 styles
│   └── Preview/
│       ├── PreviewPanel.jsx    # Template switcher + ATS panel + zoom
│       └── PreviewPanel.css
├── App.jsx                     # Main 3-column layout
├── App.css                     # Responsive layout styles
├── index.css                   # Global design system
└── main.jsx                    # Entry point with ResumeProvider
```

---

## 📸 Screenshots

> Three-column layout: Sidebar navigation | Form editor | Live resume preview

---

## 📄 License

MIT License – feel free to use and modify.

---

## 👨‍💻 Author

**Pavan Kumar** – [GitHub](https://github.com/kpavankumar01437)
