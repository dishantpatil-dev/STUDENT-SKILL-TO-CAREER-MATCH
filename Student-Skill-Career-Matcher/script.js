// ============================================================
// STUDENT SKILL-TO-CAREER MATCHER
// Explainable, rule-based career recommendation engine.
// The score is a heuristic fit score, NOT a probability of hiring.
// ============================================================

const SKILL_ALIASES = {
    "c++": "c++",
    "cpp": "c++",
    "c plus plus": "c++",
    "python": "python",
    "java": "java",
    "javascript": "javascript",
    "js": "javascript",
    "typescript": "typescript",
    "php": "php",
    "html": "html",
    "css": "css",
    "react": "react",
    "node": "node.js",
    "nodejs": "node.js",
    "node.js": "node.js",
    "sql": "sql",
    "mysql": "sql",
    "postgresql": "sql",
    "postgres": "sql",
    "database": "sql",
    "databases": "sql",
    "dsa": "dsa",
    "data structures": "dsa",
    "data structures and algorithms": "dsa",
    "algorithms": "algorithms",
    "advanced dsa": "advanced dsa",
    "problem solving": "problem solving",
    "problem-solving": "problem solving",
    "oop": "oop",
    "object oriented programming": "oop",
    "object-oriented programming": "oop",
    "git": "git",
    "github": "github",
    "rest": "rest api",
    "rest api": "rest api",
    "apis": "rest api",
    "api": "rest api",
    "system design": "system design",
    "cloud": "cloud",
    "aws": "aws",
    "azure": "azure",
    "docker": "docker",
    "kubernetes": "kubernetes",
    "linux": "linux",
    "excel": "excel",
    "power bi": "power bi",
    "tableau": "tableau",
    "statistics": "statistics",
    "data analysis": "data analysis",
    "pandas": "pandas",
    "numpy": "numpy",
    "machine learning": "machine learning",
    "ml": "machine learning",
    "deep learning": "deep learning",
    "ai": "ai",
    "artificial intelligence": "ai",
    "tensorflow": "tensorflow",
    "pytorch": "pytorch",
    "opencv": "opencv",
    "computer vision": "computer vision",
    "mathematics": "mathematics",
    "math": "mathematics",
    "cybersecurity": "cybersecurity",
    "networking": "networking",
    "computer networking": "networking"
};

const careers = [
    {
        name: "Software Developer",
        icon: "</>",
        description: "Builds software, APIs and systems while solving programming and engineering problems.",
        skills: [
            ["programming", 2],
            ["c++", 4],
            ["python", 4],
            ["java", 3],
            ["javascript", 3],
            ["dsa", 5],
            ["algorithms", 4],
            ["problem solving", 5],
            ["oop", 4],
            ["git", 3],
            ["sql", 3],
            ["rest api", 3],
            ["system design", 3]
        ],
        requiredSkills: ["DSA", "Problem Solving", "OOP", "Git & GitHub", "SQL", "System Design"],
        interests: ["coding", "programming", "software", "problem solving", "technology"],
        strengths: ["logical thinking", "problem solving", "debugging", "analytical thinking"],
        roadmap: [
            ["Strengthen Programming", ["C++ / Python", "Functions & STL", "Debugging", "Clean code"]],
            ["Master DSA", ["Arrays & Strings", "Hashing", "Trees & Graphs", "DP & Greedy"]],
            ["Engineering Fundamentals", ["OOP", "DBMS & SQL", "Networking", "OS basics"]],
            ["Build Production Projects", ["REST APIs", "Authentication", "Testing", "Git & GitHub"]],
            ["Scale Your Thinking", ["System design basics", "Caching", "APIs", "Cloud fundamentals"]]
        ]
    },
    {
        name: "Backend Developer",
        icon: "{ }",
        description: "Designs server-side applications, APIs, databases and reliable backend services.",
        skills: [
            ["python", 4], ["java", 4], ["javascript", 3], ["php", 3],
            ["sql", 5], ["rest api", 5], ["oop", 3], ["git", 3],
            ["docker", 3], ["cloud", 3], ["system design", 4],
            ["problem solving", 4], ["linux", 2]
        ],
        requiredSkills: ["Programming", "SQL", "REST API", "Git & GitHub", "Docker", "System Design"],
        interests: ["coding", "backend", "apis", "databases", "software"],
        strengths: ["logical thinking", "debugging", "problem solving", "analytical thinking"],
        roadmap: [
            ["Programming & OOP", ["Python / Java / PHP", "OOP", "Error handling", "Testing"]],
            ["Databases", ["SQL", "Schema design", "Indexes", "Transactions"]],
            ["API Engineering", ["REST", "Authentication", "Validation", "API testing"]],
            ["Deployment", ["Linux", "Docker", "Environment variables", "CI/CD basics"]],
            ["System Design", ["Caching", "Queues", "Load balancing", "Scalability"]]
        ]
    },
    {
        name: "Web Developer",
        icon: "WEB",
        description: "Builds accessible, responsive web applications and connects frontend experiences to services.",
        skills: [
            ["html", 3], ["css", 3], ["javascript", 5], ["typescript", 3],
            ["react", 4], ["python", 2], ["php", 3], ["sql", 3],
            ["rest api", 4], ["git", 3], ["problem solving", 3]
        ],
        requiredSkills: ["HTML", "CSS", "JavaScript", "REST API", "Git & GitHub", "SQL"],
        interests: ["web development", "frontend", "design", "coding", "web"],
        strengths: ["problem solving", "creativity", "debugging", "communication"],
        roadmap: [
            ["Web Foundations", ["HTML", "CSS", "JavaScript", "Responsive design"]],
            ["Frontend Engineering", ["DOM", "Async JavaScript", "React", "State management"]],
            ["Backend Integration", ["REST APIs", "Authentication", "SQL", "Validation"]],
            ["Quality", ["Testing", "Accessibility", "Performance", "Error handling"]],
            ["Ship Projects", ["GitHub", "Deployment", "CI/CD basics", "Documentation"]]
        ]
    },
    {
        name: "Data Analyst",
        icon: "▥",
        description: "Uses data, statistics and visualization to answer business and operational questions.",
        skills: [
            ["python", 4], ["sql", 5], ["excel", 4], ["statistics", 5],
            ["data analysis", 5], ["power bi", 4], ["tableau", 3],
            ["pandas", 4], ["problem solving", 3]
        ],
        requiredSkills: ["SQL", "Statistics", "Excel", "Python/Pandas", "Power BI"],
        interests: ["data", "analytics", "statistics", "business", "visualization"],
        strengths: ["analytical thinking", "mathematics", "problem solving", "communication"],
        roadmap: [
            ["Data Foundations", ["Excel", "Data cleaning", "Descriptive statistics", "Charts"]],
            ["SQL", ["SELECT & JOIN", "Aggregation", "Subqueries", "Window functions"]],
            ["Python Analytics", ["Pandas", "NumPy", "EDA", "Data cleaning"]],
            ["Visualization", ["Power BI / Tableau", "Dashboards", "Storytelling", "KPIs"]],
            ["Portfolio", ["Real datasets", "Business questions", "Insights", "Documentation"]]
        ]
    },
    {
        name: "Data Scientist",
        icon: "DS",
        description: "Combines programming, statistics and machine learning to model and interpret data.",
        skills: [
            ["python", 5], ["sql", 4], ["statistics", 5], ["pandas", 4],
            ["numpy", 4], ["machine learning", 5], ["data analysis", 4],
            ["mathematics", 4], ["git", 2], ["problem solving", 4]
        ],
        requiredSkills: ["Python", "Statistics", "Pandas & NumPy", "Machine Learning", "SQL"],
        interests: ["data", "machine learning", "statistics", "ai", "research"],
        strengths: ["mathematics", "analytical thinking", "problem solving", "curiosity"],
        roadmap: [
            ["Python for Data", ["Pandas", "NumPy", "Visualization", "Jupyter"]],
            ["Statistics", ["Probability", "Distributions", "Hypothesis testing", "Regression"]],
            ["Machine Learning", ["Supervised learning", "Unsupervised learning", "Evaluation", "Feature engineering"]],
            ["Production Basics", ["APIs", "Git", "Model serving", "Experiment tracking"]],
            ["Portfolio", ["End-to-end project", "Data story", "Model comparison", "Reproducibility"]]
        ]
    },
    {
        name: "AI / ML Engineer",
        icon: "AI",
        description: "Builds machine-learning and AI systems and turns models into usable software.",
        skills: [
            ["python", 5], ["machine learning", 5], ["deep learning", 5],
            ["ai", 4], ["mathematics", 4], ["statistics", 3],
            ["pytorch", 4], ["tensorflow", 3], ["opencv", 3],
            ["git", 3], ["rest api", 3], ["problem solving", 4]
        ],
        requiredSkills: ["Python", "Machine Learning", "Deep Learning", "Mathematics", "AI Frameworks"],
        interests: ["ai", "machine learning", "computer vision", "research", "coding"],
        strengths: ["mathematics", "problem solving", "curiosity", "analytical thinking"],
        roadmap: [
            ["Math & Python", ["Linear algebra", "Probability", "NumPy", "Pandas"]],
            ["Machine Learning", ["Classical ML", "Feature engineering", "Evaluation", "Scikit-learn"]],
            ["Deep Learning", ["Neural networks", "CNNs", "Transformers", "PyTorch"]],
            ["ML Engineering", ["APIs", "Model serving", "Docker", "Experiment tracking"]],
            ["AI Portfolio", ["Real dataset", "Evaluation", "Error analysis", "Deployment"]]
        ]
    },
    {
        name: "Cloud / DevOps Engineer",
        icon: "☁",
        description: "Automates software delivery and operates reliable infrastructure and cloud systems.",
        skills: [
            ["linux", 4], ["cloud", 5], ["aws", 4], ["azure", 3],
            ["docker", 5], ["kubernetes", 4], ["git", 4], ["networking", 4],
            ["python", 2], ["rest api", 2], ["system design", 4],
            ["problem solving", 4]
        ],
        requiredSkills: ["Linux", "Cloud", "Docker", "Git & GitHub", "Networking", "CI/CD"],
        interests: ["cloud", "infrastructure", "automation", "networking", "systems"],
        strengths: ["problem solving", "debugging", "systems thinking", "consistency"],
        roadmap: [
            ["Linux & Networking", ["Linux CLI", "Processes", "TCP/IP", "DNS"]],
            ["Cloud", ["AWS / Azure", "Compute", "Storage", "IAM"]],
            ["Containers", ["Docker", "Images", "Networks", "Volumes"]],
            ["Delivery", ["Git", "CI/CD", "Testing", "Secrets"]],
            ["Operations", ["Kubernetes", "Monitoring", "Logging", "Reliability"]]
        ]
    }
];

function normalize(text) {
    return String(text || "")
        .toLowerCase()
        .replace(/[()]/g, " ")
        .replace(/[&]/g, " and ")
        .replace(/\s+/g, " ")
        .trim();
}

function canonicalSkill(skill) {
    const value = normalize(skill);
    if (SKILL_ALIASES[value]) return SKILL_ALIASES[value];

    for (const alias in SKILL_ALIASES) {
        if (value.includes(alias) && alias.length >= 4) {
            return SKILL_ALIASES[alias];
        }
    }

    return value;
}

function splitInput(id) {
    const element = document.getElementById(id);
    if (!element) return [];

    return element.value
        .split(",")
        .map(function(item) { return item.trim(); })
        .filter(Boolean);
}

function getStudentProfile() {
    return {
        name: document.getElementById("name").value.trim(),
        education: document.getElementById("education").value,
        highest: document.getElementById("highest").value,
        experience: document.getElementById("experience").value,
        skills: splitInput("skills").map(canonicalSkill),
        interests: splitInput("interests").map(normalize),
        subjects: splitInput("subjects").map(normalize),
        strengths: splitInput("strengths").map(normalize),
        preferences: splitInput("preferences").map(normalize)
    };
}

function listHasSignal(list, target) {
    const wanted = normalize(target);
    return list.some(function(item) {
        const value = normalize(item);
        return value === wanted ||
            value.includes(wanted) ||
            wanted.includes(value);
    });
}

function skillMatch(studentSkills, requiredSkill) {
    const required = canonicalSkill(requiredSkill);

    return studentSkills.some(function(studentSkill) {
        return studentSkill === required ||
            studentSkill.includes(required) ||
            required.includes(studentSkill);
    });
}

function calculateTechnicalCoverage(profile, career) {
    let earned = 0;
    let possible = 0;
    const matched = [];
    const missing = [];

    career.skills.forEach(function(entry) {
        const skill = entry[0];
        const weight = entry[1];
        possible += weight;

        if (skillMatch(profile.skills, skill)) {
            earned += weight;
            matched.push(skill);
        }
    });

    career.requiredSkills.forEach(function(skill) {
        if (!skillMatch(profile.skills, skill)) {
            missing.push(skill);
        }
    });

    return {
        score: possible ? (earned / possible) * 100 : 0,
        matched: matched,
        missing: missing
    };
}

function calculateSignalCoverage(profile, career) {
    const interestHits = career.interests.filter(function(item) {
        return listHasSignal(profile.interests, item);
    }).length;

    const strengthHits = career.strengths.filter(function(item) {
        return listHasSignal(profile.strengths, item) ||
            listHasSignal(profile.subjects, item);
    }).length;

    const preferenceHits = career.interests.filter(function(item) {
        return listHasSignal(profile.preferences, item);
    }).length;

    const interestScore = career.interests.length
        ? (interestHits / career.interests.length) * 100
        : 0;

    const strengthScore = career.strengths.length
        ? (strengthHits / career.strengths.length) * 100
        : 0;

    const preferenceScore = career.interests.length
        ? (preferenceHits / career.interests.length) * 100
        : 0;

    return {
        interestScore: interestScore,
        strengthScore: strengthScore,
        preferenceScore: preferenceScore
    };
}

function calculateCareerScore(profile, career) {
    const technical = calculateTechnicalCoverage(profile, career);
    const signals = calculateSignalCoverage(profile, career);

    // Technical skills dominate; preferences and soft signals support the result.
    const raw =
        technical.score * 0.70 +
        signals.interestScore * 0.12 +
        signals.strengthScore * 0.08 +
        signals.preferenceScore * 0.10;

    return Math.round(Math.min(100, raw));
}

function profileCoverage(profile) {
    let signals = 0;
    if (profile.skills.length) signals++;
    if (profile.interests.length) signals++;
    if (profile.subjects.length) signals++;
    if (profile.strengths.length) signals++;
    if (profile.preferences.length) signals++;
    if (profile.education) signals++;
    if (profile.experience) signals++;

    return Math.round((signals / 7) * 100);
}

function generateCareerResults(profile) {
    return careers.map(function(career) {
        const technical = calculateTechnicalCoverage(profile, career);
        const signals = calculateSignalCoverage(profile, career);

        return {
            career: career,
            score: calculateCareerScore(profile, career),
            technical: technical,
            signals: signals
        };
    }).sort(function(a, b) {
        return b.score - a.score;
    });
}

function iconClass(index) {
    return ["green", "blue", "purple", "orange", "pink"][index % 5];
}

function renderSummary(results, profile) {
    const container = document.getElementById("analysisSummary");
    if (!container) return;

    const best = results[0];
    const gapCount = best.technical.missing.length;

    container.innerHTML =
        '<div class="summary-card">' +
            '<small>Profile coverage</small>' +
            '<strong>' + profileCoverage(profile) + '%</strong>' +
            '<span>of available input signals</span>' +
        '</div>' +
        '<div class="summary-card">' +
            '<small>Top match score</small>' +
            '<strong>' + best.score + '%</strong>' +
            '<span>rule-based fit, not hiring probability</span>' +
        '</div>' +
        '<div class="summary-card">' +
            '<small>Priority gaps</small>' +
            '<strong>' + gapCount + '</strong>' +
            '<span>skills to investigate next</span>' +
        '</div>';
}

function renderCareerResults(results) {
    const container = document.getElementById("careerResults");
    if (!container) return;

    container.innerHTML = "";

    results.slice(0, 5).forEach(function(result, index) {
        const career = result.career;
        const card = document.createElement("div");
        card.className = "career-card" + (index === 0 ? " best" : "");

        const icon = document.createElement("div");
        icon.className = "career-icon " + iconClass(index);
        icon.textContent = career.icon;

        const info = document.createElement("div");
        info.className = "career-info";

        const title = document.createElement("h3");
        title.textContent = (index + 1) + ". " + career.name;

        if (index === 0) {
            const badge = document.createElement("span");
            badge.className = "best-badge";
            badge.textContent = "Strongest Fit";
            title.appendChild(document.createTextNode(" "));
            title.appendChild(badge);
        }

        const description = document.createElement("p");
        description.textContent = career.description;

        const evidence = document.createElement("div");
        evidence.className = "match-evidence";
        evidence.textContent =
            result.technical.matched.length +
            " weighted skills matched • " +
            result.technical.missing.length +
            " priority gaps";

        info.appendChild(title);
        info.appendChild(description);
        info.appendChild(evidence);

        const score = document.createElement("div");
        score.className = "score";

        const small = document.createElement("small");
        small.textContent = "Explainable fit score";

        const strong = document.createElement("strong");
        strong.textContent = result.score + "%";

        const progress = document.createElement("div");
        progress.className = "progress";

        const fill = document.createElement("div");
        fill.style.width = result.score + "%";
        progress.appendChild(fill);

        score.appendChild(small);
        score.appendChild(strong);
        score.appendChild(progress);

        card.appendChild(icon);
        card.appendChild(info);
        card.appendChild(score);
        container.appendChild(card);
    });

    const infoBox = document.getElementById("recommendationNote");
    if (infoBox) {
        infoBox.textContent =
            "How this works: technical skills contribute 70% of the fit score; interests, strengths/subjects and stated career preferences provide supporting signals. The score is a transparent heuristic and should not be interpreted as a hiring probability.";
    }
}

function renderSkillGap(result, profile) {
    const haveContainer = document.getElementById("skillsHave");
    const needContainer = document.getElementById("skillsNeed");
    const summary = document.getElementById("gapSummary");

    if (!haveContainer || !needContainer) return;

    haveContainer.innerHTML = "";
    const uniqueSkills = [...new Set(profile.skills)];

    uniqueSkills.forEach(function(skill) {
        const item = document.createElement("div");
        item.className = "skill-item";
        item.textContent = "✓ " + skill.toUpperCase();
        haveContainer.appendChild(item);
    });

    needContainer.innerHTML = "";

    const gaps = result.technical.missing.slice(0, 8);

    if (!gaps.length) {
        const item = document.createElement("div");
        item.className = "skill-item";
        item.textContent = "✓ No priority gaps from this career profile.";
        needContainer.appendChild(item);
    } else {
        gaps.forEach(function(skill, index) {
            const item = document.createElement("div");
            item.className = "skill-item priority-gap";
            item.textContent = (index + 1) + ". " + skill;
            needContainer.appendChild(item);
        });
    }

    if (summary) {
        summary.textContent =
            result.career.name +
            " currently has " +
            result.technical.missing.length +
            " priority skill gaps in this model.";
    }
}

function renderRoadmap(career) {
    const container = document.getElementById("roadmapSteps");
    const title = document.getElementById("roadmapCareer");

    if (!container) return;

    if (title) title.textContent = career.name;

    container.innerHTML = "";

    career.roadmap.forEach(function(step, index) {
        const card = document.createElement("div");
        card.className = "step";

        const icon = document.createElement("div");
        icon.className = "step-icon " + iconClass(index);
        icon.textContent = index + 1;

        const heading = document.createElement("h4");
        heading.textContent = "Phase " + (index + 1);

        const strong = document.createElement("strong");
        strong.textContent = step[0];

        const list = document.createElement("ul");
        step[1].forEach(function(item) {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });

        card.appendChild(icon);
        card.appendChild(heading);
        card.appendChild(strong);
        card.appendChild(list);
        container.appendChild(card);
    });
}

function renderProfile(profile) {
    const name = profile.name || "Student";
    const topName = document.getElementById("topName");
    const profileName = document.getElementById("profileName");
    const profileDetails = document.getElementById("profileDetails");

    if (topName) topName.textContent = name;
    if (profileName) profileName.textContent = name;

    if (profileDetails) {
        profileDetails.textContent =
            profile.education + " • " +
            profile.experience + " • " +
            profile.skills.length + " normalized skills";
    }
}

function saveProfile(profile) {
    localStorage.setItem("careerMatcherProfile", JSON.stringify(profile));
}

function loadProfile() {
    try {
        return JSON.parse(localStorage.getItem("careerMatcherProfile")) || null;
    } catch (error) {
        return null;
    }
}

function populateProfile(profile) {
    if (!profile) return;

    const values = {
        name: profile.name,
        education: profile.education,
        highest: profile.highest,
        experience: profile.experience,
        skills: profile.skills.join(", "),
        interests: profile.interests.join(", "),
        subjects: profile.subjects.join(", "),
        strengths: profile.strengths.join(", "),
        preferences: profile.preferences.join(", ")
    };

    Object.keys(values).forEach(function(id) {
        const element = document.getElementById(id);
        if (element && values[id] !== undefined) {
            element.value = values[id];
        }
    });

    renderProfile(profile);
}

function analyzeProfile() {
    const profile = getStudentProfile();

    if (!profile.name) {
        alert("Please enter your name.");
        return;
    }

    if (!profile.skills.length) {
        alert("Please enter at least one skill.");
        return;
    }

    const results = generateCareerResults(profile);
    const best = results[0];

    renderCareerResults(results);
    renderSummary(results, profile);
    renderSkillGap(best, profile);
    renderRoadmap(best.career);
    renderProfile(profile);
    saveProfile(profile);

    showPage("recommendations");
}

function showPage(pageName) {
    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    const selected = document.getElementById(pageName);
    if (selected) selected.classList.add("active");

    document.querySelectorAll(".nav-btn").forEach(function(button) {
        button.classList.remove("active");
        const handler = button.getAttribute("onclick") || "";
        if (handler.includes("showPage('" + pageName + "')")) {
            button.classList.add("active");
        }
    });
}

function logout() {
    localStorage.removeItem("careerMatcherProfile");
    window.location.reload();
}

window.onload = function() {
    const saved = loadProfile();

    if (saved) {
        populateProfile(saved);

        // Rebuild the recommendation state if a saved skill profile exists.
        if (saved.skills && saved.skills.length) {
            const results = generateCareerResults(saved);
            renderCareerResults(results);
            renderSummary(results, saved);
            renderSkillGap(results[0], saved);
            renderRoadmap(results[0].career);
        }
    }
};
