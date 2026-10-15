# 🎯 Student Skill-to-Career Matcher

<p align="center">
  <strong>Turn your skills, interests, and strengths into actionable career pathways—with explainable career matching, skill-gap analysis, job-description comparison, personalized roadmaps, and learning resources.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH?style=for-the-badge&logo=github&label=STARS" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH?style=for-the-badge&logo=github&label=FORKS" alt="GitHub forks" />
  <img src="https://img.shields.io/github/last-commit/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH?style=for-the-badge&logo=github&label=UPDATED" alt="Last commit" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

<p align="center">
  <a href="https://github.com/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH">⭐ Star the repository</a>
  ·
  <a href="https://github.com/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH/issues">🐛 Report a bug or request a feature</a>
</p>

---

## ✨ Overview

**Student Skill-to-Career Matcher** is a lightweight, browser-based career exploration tool for students and learners. It compares a user's skills, interests, subject strengths, and career preferences with supported career profiles, then turns the results into practical next steps.

The project includes **30+ multidisciplinary career pathways**, a searchable skills-and-subject picker, explainable matching results, personalized roadmaps, job-description skill analysis, downloadable reports, and roadmap-linked YouTube learning resources.

Built with plain **HTML, CSS, and JavaScript**, the current experience runs client-side without requiring a backend, database, or frontend framework.

## 🚀 Features

### 🎯 Explainable career matching
- Compare a learner's profile with supported career pathways.
- Consider technical/practical skills alongside interests, subject strengths, and stated preferences.
- Display multiple relevant career matches so users can explore alternatives.
- Normalize common skill aliases and variations to make matching more consistent.

### 🧭 Multidisciplinary career exploration
- Explore 30+ pathways across technology, software, AI/data, science, healthcare, engineering, design, education, environment, business, and related fields.
- Use a searchable, category-based picker for skills and subjects.
- Review pathway-specific guidance and eligibility reminders where relevant.

### 📈 Skill-gap analysis
- See tracked requirements that match the current profile and skills that may need development.
- Use prioritized gaps to decide what to learn next.
- Understand which tracked skills contribute to the match instead of relying on an unexplained label.

### 🗺️ Personalized learning roadmaps
- Generate a roadmap for the selected career pathway.
- Bring missing skills into the learning steps to make the roadmap more relevant to the user's profile.
- Progress through practical stages, from foundational learning to projects and interview preparation.
- Treat roadmaps as guidance that should be adapted to individual goals and verified requirements.

### 🧾 Job Description Matcher
- Paste a job or internship description to identify supported skills.
- Compare detected requirements with skills in the user's profile.
- Review tracked skill coverage and potential gaps.
- Try the demo description or clear results to start another comparison.

> **Metric note:** Job Match measures coverage of the skills the app can track. It is not an ATS score, a hiring probability, or a prediction of recruitment outcomes.

### 📄 Downloadable career reports and roadmaps
- Export a career report containing profile information, match results, and skill-gap details.
- Download roadmap steps as a text file for reference while learning.
- Keep a portable summary of recommended next steps.

### ▶️ Roadmap-based YouTube learning resources
- Open the dedicated **Learning Resources** page from the app navigation.
- Choose a career directly or start with **Use my top match**.
- Explore relevant YouTube channels and searches connected to career skills and roadmap stages.
- Find topic-focused learning material without losing sight of the selected career pathway.

> Suggested channels and videos are learning starting points, not endorsements. Check the quality, currency, prerequisites, and suitability of each resource.

### 📱 Responsive, lightweight interface
- Responsive layouts for desktop and smaller screens.
- Interactive career comparisons and profile views.
- Reduced-motion and print-related styling support.
- No heavy frontend framework or server setup required for the core client-side workflow.

## 🔄 How it works

~~~text
Skills + Interests + Subject Strengths + Career Preferences
                           |
                           v
                 Explainable Matching
                           |
             +-------------+-------------+
             |             |             |
             v             v             v
       Career Matches  Skill Gaps   Match Evidence
             |             |
             +------v------+
                    |
                    v
          Personalized Roadmap
                    |
          +---------+----------+
          |                    |
          v                    v
 Downloadable Report   YouTube Learning Resources

Job / Internship Description
             |
             v
    Tracked Skill Extraction
             |
             v
    Matched Skills + Gaps
~~~

## 🖥️ Screenshots

<p align="center">
  <img width="100%" src="https://github.com/user-attachments/assets/b344c0ac-071a-45cc-bcb1-4fa82d6f7e78" alt="Career matcher interface" />
</p>

<p align="center">
  <img width="100%" src="https://github.com/user-attachments/assets/852367a0-5d07-4bb0-bb1d-84338af39e15" alt="Career matching results" />
</p>

<p align="center">
  <img width="100%" src="https://github.com/user-attachments/assets/c61548cd-f36e-4533-85ee-b45869832fb3" alt="Skill matcher screen" />
</p>

## 🛠️ Tech stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Styling, responsive layouts, and visual feedback |
| JavaScript | Career matching, skill normalization, gap analysis, roadmaps, and interactions |
| YouTube links/searches | External learning resources connected to career and roadmap stages |
| Browser file downloads | Export career summaries and roadmap text |

## ▶️ Run locally

1. Clone the repository:

   ~~~bash
   git clone https://github.com/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH.git
   ~~~

2. Open the project folder:

   ~~~bash
   cd STUDENT-SKILL-TO-CAREER-MATCH
   ~~~

3. Open **index.html** in a modern browser.

No package installation, backend, or database setup is required for the current client-side version.

## 🧠 Matching methodology and limitations

- **Rule-based and explainable:** results come from the app's supported career profiles, tracked skills, normalization rules, and matching signals.
- **Multiple profile signals:** skills are considered alongside interests, subject strengths, and career preferences.
- **Coverage is not certainty:** a match score is a heuristic for exploration, not a scientifically validated aptitude result.
- **No employment guarantees:** the tool does not predict hiring decisions, ATS rankings, admission, licensing, or job outcomes.
- **Verify real-world requirements:** career eligibility, qualifications, certifications, and licensing can vary by institution and location. Confirm them with official sources.
- **Learning resources require judgment:** users should independently assess whether suggested channels and videos are accurate and appropriate.

## 🗺️ Project roadmap

- [x] Explainable career matching and skill normalization
- [x] Skill-gap analysis with matched-skill evidence
- [x] Personalized career learning roadmaps
- [x] Job-description skill matching
- [x] Expanded searchable skill and subject catalog
- [x] 30+ multidisciplinary career pathways
- [x] Downloadable career reports and roadmap text files
- [x] Roadmap-based YouTube learning resources
- [x] Career selector and “Use my top match” resource flow
- [x] Responsive layout foundations
- [ ] Expand and refine career profiles and skill taxonomy
- [ ] Add exportable structured reports
- [ ] Add optional job-description history
- [ ] Explore optional backend persistence
- [ ] Explore AI-assisted explanations with clear limitations
- [ ] Expand automated tests and cross-device regression checks

## 🤝 Contributing

Ideas, bug reports, and improvements are welcome through [GitHub Issues](https://github.com/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH/issues).

When contributing:
1. Keep matching results understandable and explainable.
2. Avoid claims that the tool guarantees a job or predicts ATS outcomes.
3. Check changes across desktop and mobile-sized layouts.
4. Include tests or clear reproduction steps when relevant.
5. Keep external links safe and make sure learning recommendations remain relevant to the selected career.

## ⭐ Support

If this project helps you explore career options or plan your learning, consider giving the repository a star.

<p align="center">
  <a href="https://github.com/dishantpatil-dev/STUDENT-SKILL-TO-CAREER-MATCH">
    <img src="https://img.shields.io/badge/⭐_Star_Career_Matcher-on_GitHub-181717?style=for-the-badge&logo=github" alt="Star Career Matcher on GitHub" />
  </a>
</p>

<p align="center"><strong>Built to turn skills into clearer career direction.</strong></p>
