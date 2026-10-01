// ==========================================
// CAREER DATABASE
// ==========================================

const careers = [

    {
        name: "Software Developer",
        icon: "</>",
        description:
            "Builds applications, solves problems and creates software solutions.",

        skills: [
            "c++",
            "java",
            "python",
            "javascript",
            "dsa",
            "problem solving",
            "oop",
            "git",
            "sql"
        ],

        requiredSkills: [
            "OOP",
            "Advanced DSA",
            "Git & GitHub",
            "SQL",
            "System Design"
        ]
    },

    {
        name: "Data Analyst",
        icon: "▥",
        description:
            "Analyzes data and helps organizations make better decisions.",

        skills: [
            "python",
            "sql",
            "excel",
            "statistics",
            "data analysis",
            "power bi",
            "problem solving"
        ],

        requiredSkills: [
            "SQL",
            "Excel",
            "Statistics",
            "Power BI",
            "Python/Pandas"
        ]
    },

    {
        name: "Data Scientist",
        icon: "🧠",
        description:
            "Uses data, machine learning and statistics to solve complex problems.",

        skills: [
            "python",
            "machine learning",
            "statistics",
            "sql",
            "data science",
            "pandas",
            "numpy",
            "problem solving"
        ],

        requiredSkills: [
            "Machine Learning",
            "Statistics",
            "Pandas & NumPy",
            "SQL",
            "Data Visualization"
        ]
    },

    {
        name: "AI Engineer",
        icon: "AI",
        description:
            "Develops intelligent systems using artificial intelligence and machine learning.",

        skills: [
            "python",
            "machine learning",
            "deep learning",
            "ai",
            "mathematics",
            "problem solving"
        ],

        requiredSkills: [
            "Machine Learning",
            "Deep Learning",
            "Python",
            "Mathematics",
            "AI Frameworks"
        ]
    }

];


// ==========================================
// NAVIGATION
// ==========================================

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });


    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }


    const buttons =
        document.querySelectorAll(".nav-btn");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });


    buttons.forEach(function(button) {

        const onclick =
            button.getAttribute("onclick");

        if (
            onclick &&
            onclick.includes(`showPage('${pageName}')`)
        ) {
            button.classList.add("active");
        }

    });

}


// ==========================================
// GET STUDENT SKILLS
// ==========================================

function getStudentSkills() {

    const skillsInput =
        document.getElementById("skills").value;


    return skillsInput
        .toLowerCase()
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

}


// ==========================================
// CALCULATE CAREER SCORE
// ==========================================

function calculateCareerScore(
    studentSkills,
    career
) {

    let matchedSkills = 0;


    career.skills.forEach(function(careerSkill) {

        const found =
            studentSkills.some(function(studentSkill) {

                return (
                    studentSkill.includes(careerSkill) ||
                    careerSkill.includes(studentSkill)
                );

            });


        if (found) {
            matchedSkills++;
        }

    });


    const score =
        Math.round(
            (matchedSkills / career.skills.length) * 100
        );


    return Math.min(score, 100);

}


// ==========================================
// FIND SKILL GAP
// ==========================================

function findSkillGap(
    studentSkills,
    career
) {

    const missingSkills = [];


    career.requiredSkills.forEach(function(requiredSkill) {

        const required =
            requiredSkill.toLowerCase();


        const alreadyHave =
            studentSkills.some(function(studentSkill) {

                // DSA and Advanced DSA are treated separately
                if (required === "advanced dsa") {

                    return studentSkill === "advanced dsa";

                }


                return (
                    studentSkill === required ||
                    studentSkill.includes(required) ||
                    required.includes(studentSkill)
                );

            });


        if (!alreadyHave) {
            missingSkills.push(requiredSkill);
        }

    });


    return missingSkills;

}


// ==========================================
// GENERATE CAREER RESULTS
// ==========================================

function generateCareerResults() {

    const studentSkills =
        getStudentSkills();


    const results =
        careers.map(function(career) {

            return {

                career: career,

                score:
                    calculateCareerScore(
                        studentSkills,
                        career
                    ),

                missing:
                    findSkillGap(
                        studentSkills,
                        career
                    )

            };

        });


    // Highest score first

    results.sort(function(a, b) {

        return b.score - a.score;

    });


    return results;

}


// ==========================================
// DISPLAY CAREER RESULTS
// ==========================================

function displayCareerResults() {

    const results =
        generateCareerResults();


    const careerContainer =
        document.querySelector(
            "#recommendations"
        );


    // Remove old dynamically-created cards

    const oldCards =
        careerContainer.querySelectorAll(
            ".career-card"
        );


    oldCards.forEach(function(card) {
        card.remove();
    });


    const sectionTitle =
        careerContainer.querySelector(
            ".section-title"
        );


    const info =
        careerContainer.querySelector(
            ".info"
        );


    results.slice(0, 3).forEach(function(result, index) {

        const career =
            result.career;


        const card =
            document.createElement("div");


        card.className =
            "career-card";


        if (index === 0) {
            card.classList.add("best");
        }


        card.innerHTML = `

            <div class="career-icon ${
                index === 0
                    ? "green"
                    : index === 1
                    ? "blue"
                    : "purple"
            }">

                ${career.icon}

            </div>


            <div class="career-info">

                <h3>

                    ${index + 1}.
                    ${career.name}

                    ${
                        index === 0
                            ? `<span class="best-badge">
                                Best Match
                               </span>`
                            : ""
                    }

                </h3>


                <p>
                    ${career.description}
                </p>

            </div>


            <div class="score">

                <small>
                    Compatibility Score
                </small>

                <strong>
                    ${result.score}%
                </strong>


                <div class="progress">

                    <div
                        style="width:${result.score}%">
                    </div>

                </div>

            </div>

        `;


        // Insert in correct order before info box

        info.before(card);

    });


    return results;

}


// ==========================================
// DISPLAY SKILL GAP
// ==========================================

function displaySkillGap(result) {

    const studentSkills =
        getStudentSkills();


    const haveContainer =
        document.getElementById(
            "skillsHave"
        );


    const needContainer =
        document.querySelector(
            ".skill-box.need > div"
        );


    // ======================================
    // SKILLS STUDENT ALREADY HAS
    // ======================================

    haveContainer.innerHTML = "";


    studentSkills.forEach(function(skill) {

        const item =
            document.createElement("div");


        item.className =
            "skill-item";


        item.innerHTML =
            `✓ ${skill.toUpperCase()}`;


        haveContainer.appendChild(item);

    });


    // ======================================
    // SKILLS STUDENT NEEDS
    // ======================================

    needContainer.innerHTML = "";


    if (result.missing.length === 0) {

        needContainer.innerHTML = `

            <div class="skill-item">

                ✓ You already have the required skills!

            </div>

        `;

        return;

    }


    result.missing.forEach(function(skill) {

        const item =
            document.createElement("div");


        item.className =
            "skill-item";


        item.innerHTML =
            `⊕ ${skill}`;


        needContainer.appendChild(item);

    });

}


// ==========================================
// UPDATE ROADMAP
// ==========================================

function updateRoadmap(career) {

    const roadmapTitle =
        document.querySelector(
            "#roadmap .page-header p"
        );


    if (roadmapTitle) {

        roadmapTitle.innerHTML =
            `Step-by-step roadmap to become a <b>${career.name}</b>.`;

    }

}


// ==========================================
// MAIN ANALYSIS
// ==========================================

function analyzeProfile() {

    const name =
        document.getElementById(
            "name"
        ).value.trim();


    // Check name

    if (name === "") {

        alert(
            "Please enter your name."
        );

        return;

    }


    // Check skills

    const skills =
        getStudentSkills();


    if (skills.length === 0) {

        alert(
            "Please enter at least one skill."
        );

        return;

    }


    // ======================================
    // GENERATE CAREER RESULTS
    // ======================================

    const results =
        displayCareerResults();


    // ======================================
    // BEST CAREER
    // ======================================

    const bestCareer =
        results[0];


    // ======================================
    // UPDATE SKILL GAP
    // ======================================

    displaySkillGap(
        bestCareer
    );


    // ======================================
    // UPDATE ROADMAP
    // ======================================

    updateRoadmap(
        bestCareer.career
    );


    // ======================================
    // SAVE DATA
    // ======================================

    localStorage.setItem(
        "studentName",
        name
    );


    localStorage.setItem(
        "studentSkills",
        document.getElementById(
            "skills"
        ).value
    );


    localStorage.setItem(
        "studentInterests",
        document.getElementById(
            "interests"
        ).value
    );


    // ======================================
    // UPDATE USER NAME
    // ======================================

    document.getElementById(
        "topName"
    ).innerText = name;


    document.getElementById(
        "profileName"
    ).innerText = name;


    // ======================================
    // SHOW RECOMMENDATIONS
    // ======================================

    showPage(
        "recommendations"
    );

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    alert(
        "Logout will be connected to the backend later."
    );

}


// ==========================================
// LOAD SAVED DATA
// ==========================================

window.onload = function() {

    const savedName =
        localStorage.getItem(
            "studentName"
        );


    const savedSkills =
        localStorage.getItem(
            "studentSkills"
        );


    const savedInterests =
        localStorage.getItem(
            "studentInterests"
        );


    if (savedName) {

        document.getElementById(
            "name"
        ).value = savedName;


        document.getElementById(
            "topName"
        ).innerText = savedName;


        document.getElementById(
            "profileName"
        ).innerText = savedName;

    }


    if (savedSkills) {

        document.getElementById(
            "skills"
        ).value = savedSkills;

    }


    if (savedInterests) {

        document.getElementById(
            "interests"
        ).value = savedInterests;

    }

};

// ENHANCED JOB DESCRIPTION MATCHING
const skillAliases = {
  "c++":["cpp","c plus plus"], "dsa":["dsa","data structures","algorithms"],
  "problem solving":["problem-solving","problem solving"], "oop":["object oriented programming","object-oriented programming"],
  "git":["git","github"], "sql":["sql","mysql","postgresql","postgres"], "system design":["system design","distributed systems"],
  "python":["python"], "javascript":["javascript","js"], "machine learning":["machine learning","ml"],
  "deep learning":["deep learning","neural networks"], "statistics":["statistics","statistical"],
  "pandas & numpy":["pandas","numpy"], "data visualization":["data visualization","tableau","power bi"],
  "power bi":["power bi"], "excel":["excel","microsoft excel"], "java":["java"], "typescript":["typescript"],
  "react":["react","react.js"], "node.js":["node.js","nodejs","node"], "rest api":["rest api","restful","api"],
  "docker":["docker","containerization"], "aws":["aws","amazon web services"], "azure":["azure","microsoft azure"],
  "gcp":["gcp","google cloud"], "linux":["linux","unix"], "testing":["testing","unit testing","test automation"],
  "html":["html","html5"], "css":["css","css3"]
};
const jobSkillCatalog = ["c++","java","python","javascript","typescript","react","node.js","dsa","problem solving","oop","git","sql","system design","machine learning","deep learning","statistics","pandas & numpy","data visualization","power bi","excel","rest api","docker","aws","azure","gcp","linux","testing","html","css"];
function skillMentioned(text, skill) {
  const aliases=skillAliases[skill]||[skill]; const t=text.toLowerCase();
  return aliases.some(function(a){return t.includes(a.toLowerCase());});
}
function currentSkillMatches(skill) {
  const aliases=skillAliases[skill]||[skill]; const s=getStudentSkills();
  return s.some(function(x){return aliases.some(function(a){return x.includes(a)||a.includes(x);});});
}
function renderPersonalizedRoadmap(career, missing) {
  const box=document.querySelector("#roadmap .roadmap"); const title=document.querySelector("#roadmap .page-header p");
  if(!box)return;
  if(title)title.innerHTML="Personalized path toward <b>"+career.name+"</b> based on your current skill profile.";
  const steps=[["Foundation",["Strengthen core programming","Practice debugging and problem solving"]],["Core Skills",missing.slice(0,3)],["Role Skills",missing.slice(3,6)],["Projects",["Build one project using the target stack","Document the project and tests"]],["Interview / Application",["Practice role-specific questions","Review resume and project explanations"]]];
  const colors=["green","blue","orange","purple","pink"];
  box.innerHTML=steps.map(function(x,i){var items=x[1].length?x[1]:["Deepen skills required for "+career.name];return '<div class="step"><div class="step-icon '+colors[i]+'">'+(i+1)+'</div><h4>Step '+(i+1)+'</h4><strong>'+x[0]+'</strong><ul>'+items.map(function(v){return "<li>"+v+"</li>";}).join("")+"</ul></div>";}).join("");
  const goal=document.querySelector("#roadmap .goal p"); if(goal)goal.textContent=missing.length?"Focus next on "+missing.slice(0,4).join(", ")+". Re-run the assessment as your skills grow.":"Your current profile covers the tracked requirements. Keep building projects and validating your skills with practice.";
}
function analyzeJobDescription() {
  const input=document.getElementById("jobDescription"), out=document.getElementById("jobMatchResults"); if(!input||!out)return;
  const text=input.value.trim(); if(!text){out.innerHTML='<div class="info">Paste a job description first.</div>';return;}
  const mentioned=jobSkillCatalog.filter(function(s){return skillMentioned(text,s);});
  const matched=mentioned.filter(currentSkillMatches);
  const missing=mentioned.filter(function(s){return !currentSkillMatches(s);});
  const score=mentioned.length?Math.round(matched.length/mentioned.length*100):0;
  const fit=careers.map(function(c){return {career:c,count:c.skills.filter(function(s){return skillMentioned(text,s);}).length};}).sort(function(a,b){return b.count-a.count;})[0];
  const role=fit&&fit.count?fit.career.name:"No tracked career profile matched strongly";
  out.innerHTML='<div class="job-result"><h3>Job Match Analysis</h3><p>This keyword-based comparison uses the skills tracked by this project. It is not an ATS prediction or hiring decision.</p><div class="match-stat-grid"><div class="match-stat"><strong>'+score+'%</strong><small>Tracked skill coverage</small></div><div class="match-stat"><strong>'+matched.length+'</strong><small>Skills you match</small></div><div class="match-stat"><strong>'+missing.length+'</strong><small>Skills to work on</small></div></div><p><strong>Closest tracked career profile:</strong> '+role+'</p><h4>Matched skills</h4><div class="keyword-list">'+(matched.length?matched.map(function(s){return '<span class="keyword matched">✓ '+s+"</span>";}).join(""):'<span class="keyword">No tracked skills detected</span>')+"</div><h4>Skill gaps</h4><div class="keyword-list">"+(missing.length?missing.map(function(s){return '<span class="keyword missing">+ '+s+"</span>";}).join(""):'<span class="keyword matched">No tracked gaps detected</span>')+"</div></div>";
}
updateRoadmap=function(career){renderPersonalizedRoadmap(career,findSkillGap(getStudentSkills(),career));};

    
// ==========================================
// JOB WORKFLOW HELPERS
// ==========================================

function loadDemoJob() {
    const input = document.getElementById("jobDescription");
    if (!input) return;

    input.value = `Software Engineer Intern

We are looking for a software engineering intern who enjoys problem solving and building reliable software.

Requirements:
- Strong C++ or Python programming
- Data structures and algorithms
- Object-oriented programming
- Git and GitHub
- SQL
- REST APIs
- Basic system design
- Testing
- Docker
`;

    analyzeJobDescription();
}

function clearJobMatch() {
    const input = document.getElementById("jobDescription");
    const output = document.getElementById("jobMatchResults");
    if (input) input.value = "";
    if (output) output.innerHTML = "";
}

function buildJobLearningPlan(missing) {
    const ordered = [
        "C++", "Python", "OOP", "DSA", "Problem Solving",
        "Git", "SQL", "REST API", "Testing", "Docker",
        "System Design", "AWS", "Azure", "GCP"
    ];

    return ordered.filter(function(skill) {
        return missing.some(function(item) {
            return item.toLowerCase() === skill.toLowerCase();
        });
    }).slice(0, 6);
}
