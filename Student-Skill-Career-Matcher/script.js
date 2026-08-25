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