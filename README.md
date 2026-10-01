# 🎯 Student Skill-to-Career Matcher

<p align="center"><strong>A lightweight web tool that maps a student's skills to suitable career paths and highlights potential skill gaps.</strong></p>

<p align="center">
  <img src="https://img.shields.io/github/stars/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH?style=for-the-badge&logo=github&label=STARS" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH?style=for-the-badge&logo=github&label=FORKS" alt="GitHub forks" />
  <img src="https://img.shields.io/github/last-commit/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH?style=for-the-badge&logo=github&label=UPDATED" alt="Last commit" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

<p align="center">
  <a href="https://github.com/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH">⭐ Star the repository</a>
  ·
  <a href="https://github.com/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH/issues">🐛 Report an issue</a>
</p>

---

## 💡 What It Does

The matcher accepts a student's current skills, compares them against predefined career requirements and returns relevant career paths.

```text
Student Skills
      ↓
Skill Matching Engine
      ↓
Career Compatibility
      ↓
Recommended Roles + Skill Gaps
```

## ✨ Features

- 🎯 Skill-to-career matching
- 🧩 Skill-gap identification
- ⚡ Instant client-side results
- 📱 Responsive interface
- 🧱 Simple extensible career dataset
- 🚫 No heavy framework dependency

## 🖥️ Screenshots

<p align="center">
  <img width="1366" src="https://github.com/user-attachments/assets/b344c0ac-071a-45cc-bcb1-4fa82d6f7e78" alt="Career matcher interface" />
</p>

<p align="center">
  <img width="1366" src="https://github.com/user-attachments/assets/852367a0-5d07-4bb0-bb1d-84338af39e15" alt="Career matching results" />
</p>

<p align="center">
  <img width="1366" src="https://github.com/user-attachments/assets/c61548cd-f36e-4533-85ee-b45869832fb3" alt="Skill matcher screen" />
</p>

## 🛠️ Tech Stack

- **HTML5** — structure
- **CSS3** — responsive presentation
- **JavaScript** — matching logic and dynamic results

## 🚀 Run Locally

Clone the repository and open `index.html` in a browser.

```bash
git clone https://github.com/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH.git
cd STUDENT-SKILL-TO-CAREER-MATCH
```

No backend or database is required for the current version.

## 🧠 Matching Logic

The current implementation uses a predefined set of career requirements. A student's selected skills are compared against those requirements and the UI presents matching career options.

The architecture is intentionally simple so the dataset and scoring logic can be expanded later.

## 🗺️ Roadmap

- [ ] Weighted compatibility scoring
- [ ] More career profiles
- [ ] Personalized learning paths
- [ ] Job-description matching
- [ ] Backend persistence
- [ ] AI-assisted career recommendations
- [ ] Interactive skill-gap visualization

## ⭐ Support

If you find the project useful, consider giving it a **star**.

<p align="center">
  <a href="https://github.com/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH">
    <img src="https://img.shields.io/badge/⭐_Star_Career_Matcher-on_GitHub-181717?style=for-the-badge&logo=github" alt="Star Career Matcher on GitHub" />
  </a>
</p>

<p align="center"><strong>Built to turn skills into clearer career direction.</strong></p>

## 🚀 Product Capabilities

The current web app now goes beyond a static career list:

### 🎯 Career matching
Enter your skills, interests and profile information to calculate compatibility with the tracked career profiles.

### 📈 Skill-gap analysis
The app identifies tracked requirements that are not yet present in your current skill profile.

### 🗺️ Personalized roadmap
The roadmap updates around the selected career and current skill gaps, giving a practical sequence from fundamentals to projects and interview preparation.

### 🧾 Job-description matching
Paste a job description into **Job Match** to detect supported technical skills and compare them against your current profile.

The Job Match score is intentionally described as **tracked skill coverage**, not an ATS score, hiring probability or prediction.

```text
Your Skills
    │
    ├──► Career Matching ──► Career Profiles
    │
    ├──► Skill Gap ────────► Missing Requirements
    │
    ├──► Roadmap ──────────► Prioritized Next Steps
    │
    └──► Job Description ──► Matched Skills + Gaps
```

## 🧠 Design Principles

- **Explainable:** matching is based on visible skills and rules rather than an opaque recommendation.
- **Local-first:** the current app works in the browser without requiring a backend.
- **Extensible:** career profiles and skill aliases can be expanded without changing the overall UI.
- **Honest metrics:** job matching reports tracked skill coverage rather than claiming to predict ATS results or hiring outcomes.

## 🛣️ Open-Source Roadmap

- [x] Career compatibility matching
- [x] Skill-gap analysis
- [x] Personalized roadmap
- [x] Job-description skill matching
- [x] Skill aliases / normalization
- [ ] Weighted skill scoring
- [ ] Larger normalized skill taxonomy
- [ ] Exportable career report
- [ ] Job-description history
- [ ] Optional backend persistence
- [ ] Optional AI-assisted explanations

## 🤝 Contributing

Feature ideas and implementation tasks are tracked in GitHub Issues. Good starting points include skill normalization, UI improvements, documentation and test coverage.

Please keep matching logic explainable and avoid presenting the tool as a guarantee of employment, ATS ranking or career outcomes.
