# Student Skill-to-Career Matcher

An explainable, browser-based career exploration tool that maps a student's skills, interests, strengths, subjects and preferences to career profiles.

## What changed

The matcher uses a transparent rule-based scoring model instead of treating every skill as equally important.

### Matching model

- **70% technical skill coverage** — weighted skills such as DSA, SQL, machine learning or cloud can contribute different amounts.
- **12% interests** — compares stated interests with the career profile.
- **8% strengths / subjects** — uses supporting signals such as problem solving, mathematics and analytical thinking.
- **10% career preferences** — checks whether the student's stated preferences align with the career profile.
- Skill aliases normalize inputs such as `JS -> JavaScript`, `C++ / CPP -> C++`, `MySQL / PostgreSQL -> SQL`, and `ML -> Machine Learning`.
- Results show matched-skill evidence and prioritized gaps.
- The roadmap changes automatically for the strongest matching career.
- Student input is saved locally in the browser.

> **Important:** the score is an explainable heuristic for career exploration. It is **not** a probability of getting hired and should not be used as a hiring prediction.

## Current career profiles

Software Developer, Backend Developer, Web Developer, Data Analyst, Data Scientist, AI / ML Engineer, and Cloud / DevOps Engineer.

The career profiles are intentionally editable JavaScript data so the project can later move to a database/API without rewriting the UI.

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- Rule-based weighted matching

## Project structure

    STUDENT-SKILL-TO-CAREER-MATCH/
    └── Student-Skill-Career-Matcher/
        ├── index.html
        ├── script.js
        └── style.css

## Next engineering upgrades

1. Move career profiles into JSON or a backend database.
2. Add tests for normalization and scoring.
3. Add a versioned skill taxonomy.
4. Add authenticated student profiles.
5. Add an API layer for recommendations.
6. Add outcome data later and evaluate the scoring model against real user feedback.

## Evidence and limitations

The career profiles are a structured starting point, not a complete labor-market model. Career requirements vary by employer, geography, seniority and specialization. Public occupational resources such as O*NET can be used to periodically review and update the skill taxonomy.

## Run locally

Open `Student-Skill-Career-Matcher/index.html` in a modern browser.