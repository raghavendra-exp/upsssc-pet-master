# UPSSSC PET MASTER

> **Complete UPSSSC Preliminary Eligibility Test Preparation Platform**  
> *ZERO → FOUNDATION → CONCEPT → PRACTICE → PYQ → MOCK → REVISION*

[![Deploy to GitHub Pages](https://github.com/raghavendra-exp/upsssc-pet-master/actions/workflows/deploy.yml/badge.svg)](https://github.com/raghavendra-exp/upsssc-pet-master/actions/workflows/deploy.yml)
[![Content Validation](https://github.com/raghavendra-exp/upsssc-pet-master/actions/workflows/content-validation.yml/badge.svg)](https://github.com/raghavendra-exp/upsssc-pet-master/actions/workflows/content-validation.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Verified PET 2026 Exam Snapshot

- **Exam Version**: UPSSSC PET 2026 (Preliminary Eligibility Test)
- **Exam Conducting Body**: Uttar Pradesh Subordinate Services Selection Commission (UPSSSC, Lucknow)
- **Official Portal**: [upsssc.gov.in](http://upsssc.gov.in)
- **Confirmed Exam Dates**: **25 October, 30 October & 1 November 2026**
- **Last Schedule Verification**: **28 September 2026**
- **Score Validity**: 1 Year from scorecard declaration date for all UP Group 'C' Recruitments (*Lekhpal, VDO, Junior Assistant, Stenographer, Forest Guard, etc.*)

---

## 🎯 Examination Pattern & Commission Weightage

| Component | Official Specification |
| :--- | :--- |
| **Total Questions** | 100 Multiple Choice Questions (Bilingual: Hindi & English) |
| **Total Marks** | 100 Marks (1 Mark per Question) |
| **Exam Duration** | 120 Minutes (2 Hours) |
| **Negative Marking** | **-0.25 Marks** for every incorrect answer (¼ deduction) |
| **Syllabus Standard** | NCERT Secondary / Senior Secondary (Class 10–12 level) |

### 15 Official Subjects Breakdown

1. **Indian History (भारतीय इतिहास)** — 5 Questions (5 Marks)
2. **Indian National Movement (भारतीय राष्ट्रीय आन्दोलन)** — 5 Questions (5 Marks)
3. **Geography (भूगोल)** — 5 Questions (5 Marks)
4. **Indian Economy (भारतीय अर्थव्यवस्था)** — 5 Questions (5 Marks)
5. **Indian Constitution & Public Administration (भारतीय संविधान एवं लोक प्रशासन)** — 5 Questions (5 Marks)
6. **General Science (सामान्य विज्ञान)** — 5 Questions (5 Marks)
7. **Elementary Arithmetic (प्रारम्भिक अंकगणित)** — 5 Questions (5 Marks)
8. **General Hindi (सामान्य हिन्दी)** — 5 Questions (5 Marks)
9. **General English (सामान्य अंग्रेजी)** — 5 Questions (5 Marks)
10. **Logic & Reasoning (तर्क एवं तर्कशक्ति)** — 5 Questions (5 Marks)
11. **Current Affairs (सामयिकी)** — 10 Questions (10 Marks)
12. **General Awareness (सामान्य जागरूकता)** — 10 Questions (10 Marks)
13. **Hindi Unseen Passage (अपठित हिन्दी गद्यांश का विवेचन एवं विश्लेषण)** — 10 Questions (10 Marks)
14. **Graph Interpretation (ग्राफ की व्याख्या एवं विश्लेषण)** — 10 Questions (10 Marks)
15. **Table Interpretation (तालिका की व्याख्या एवं विश्लेषण)** — 10 Questions (10 Marks)

---

## 🚀 Key Platform Features

- **⚡ Zero to Mastery Roadmap**: 10 progressive learning levels taking students from foundational concepts to commission-level mock tests.
- **📚 Curated Books & Official Resource Center**:
  - Spotlight on **Arihant UPSSSC PET 2026 Complete Preparation Guide** (*2,000+ questions, chapterwise notes, 2021–2025 PYQs, 3 practice sets*).
  - Authentic reference suite: Lucent Samanya Gyan, Drishti Quick Book, Aditya Samanya Hindi, R.K. Jha Reasoning, YCT, Ghatna Chakra, and direct NCERT ePathshala links.
  - Interactive **2–4 Book Side-by-Side Comparison Tool**.
  - **100% Copyright-Safe**: Strictly direct links to authentic publishers and accredited retailers. No pirated PDF downloads.
- **📝 1,460+ Practice Question Bank**: Bilingual questions with instant feedback, bookmarking, and detailed pedagogical explanations.
- **⏱️ Real-time Mock Test Engine**:
  - Full-length 100-question simulation matching commission distribution.
  - 120-minute countdown timer with automatic submission.
  - Question status palette (Answered, Unanswered, Marked for Review).
  - Exact -0.25 negative marking engine with percentile and subject-wise scorecards.
- **🗺️ Interactive UP GK Map**: Vector SVG map of Uttar Pradesh featuring all 75 districts, 18 divisions, rivers, Dudhwa National Park, expressways, and One District One Product (ODOP) data.
- **📊 Data Interpretation (DI) Interactive Lab**: Interactive SVG bar charts, line graphs, and tabular analytics testing ratio, percentage, and growth rate calculations.
- **📖 Hindi Comprehension Viewer**: Unseen passages with adjustable reading typography and 5-question comprehension sets.
- **🔄 Spaced Repetition Flashcards & One-Liners**: High-yield rapid recall flashcards and subject one-liners for last-minute revision.
- **❌ "My Mistakes" Error Log**: Automatic tracking of every wrongly answered question in browser `localStorage` for targeted remedial practice.
- **📱 True Responsive & PWA**: Seamlessly responsive from 320px ultra-compact mobile screens to ultra-wide desktop monitors; offline-capable via service worker.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build System**: [Vite](https://vite.dev/) with relative base asset resolution (`base: './'`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: Client-side Hash Router (`window.location.hash`) for zero-dependency GitHub Pages hosting
- **State Management**: Persistent browser `localStorage` with JSON serialization
- **Automation**: GitHub Actions CI/CD workflows for testing, link verification, current affairs refresh, and deployment

---

## 📦 GitHub Pages Deployment Instructions

This repository is pre-configured for automated continuous deployment using GitHub Actions.

1. Go to your repository settings on GitHub:  
   `https://github.com/raghavendra-exp/upsssc-pet-master/settings/pages`
2. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions`
3. Any push to `main` will automatically trigger `.github/workflows/deploy.yml`:
   - Builds the production bundle with Vite.
   - Audits data integrity and responsiveness.
   - Deploys static assets to GitHub Pages.
4. Your website will be live at:  
   **`https://raghavendra-exp.github.io/upsssc-pet-master/`**

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/raghavendra-exp/upsssc-pet-master.git
cd upsssc-pet-master

# Install dependencies
npm install

# Start local development server
npm run dev

# Run content integrity & link verification audits
node scripts/validate-content.js
node scripts/verify-links.js

# Build production bundle
npm run build
```

---

## ⚖️ Legal & Attribution Notice

- UPSSSC PET is an examination conducted by the Uttar Pradesh Subordinate Services Selection Commission (UPSSSC). This platform is an educational resource developed for candidate preparation.
- All syllabi, question weightages, and examination timelines are grounded in official UPSSSC notifications.
- All book recommendations link directly to respective publisher platforms and verified book distributors. No copyrighted PDFs or unauthorized materials are hosted or redistributed.
