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


    results.slice(0, 8).forEach(function(result, index) {

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


    renderCareerVisuals(results);

    return results;

}


// ==========================================
// DISPLAY SKILL GAP
// ==========================================


/* Interactive career insight graphics */
function renderCareerVisuals(results) {
    const host = document.getElementById("careerVisuals");
    if (!host || !results || !results.length) return;
    const top = results[0];
    const topScore = Math.max(0, Math.min(100, Number(top.score) || 0));
    host.innerHTML = `
        <section class="visual-panel" aria-label="Top career compatibility">
            <p class="visual-kicker">Your strongest match</p><h3>${top.career.name}</h3>
            <div class="score-ring-wrap"><div class="score-ring" style="--score:${topScore}" role="img" aria-label="Compatibility score ${topScore} percent">
                <div class="score-ring-content"><strong>${topScore}%</strong><span>COMPATIBILITY</span></div>
            </div></div>
            <p class="visual-caption">Based on the skills tracked by this project. Treat this as guidance, not a prediction of career success.</p>
        </section>
        <section class="visual-panel" aria-label="Career match comparison">
            <p class="visual-kicker">Explore your options</p><h3>Career match comparison</h3>
            <div class="comparison-list">${results.slice(0,4).map(function(result,index) {
                const score = Math.max(0,Math.min(100,Number(result.score)||0));
                const name = result.career.name;
                return '<button type="button" class="comparison-item" data-career="'+name.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'" onclick="selectCareerFromChart(this.dataset.career)" aria-label="View skill gaps for '+name+'"><span class="comparison-top"><span class="comparison-name">'+(index+1)+'. '+name+'</span><span class="comparison-score">'+score+'%</span></span><span class="comparison-track"><span class="comparison-fill" data-width="'+score+'%"></span></span></button>';
            }).join("")}</div>
            <p class="visual-hint">Select a career bar to open its skill-gap analysis.</p>
        </section>`;
    window.requestAnimationFrame(function() {
        host.querySelectorAll(".comparison-fill").forEach(function(bar) { bar.style.width = bar.getAttribute("data-width") || "0%"; });
    });
}
function selectCareerFromChart(careerName) {
    const result = generateCareerResults().find(function(item) { return item.career.name === careerName; });
    if (!result) return;
    displaySkillGap(result);
    updateRoadmap(result.career);
    showPage("skillgap");
}


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
    localStorage.setItem("studentSubjects", document.getElementById("subjects").value);
    localStorage.setItem("studentPreferences", document.getElementById("preferences").value);


    // ======================================
    // UPDATE USER NAME
    // ======================================

    document.getElementById(
        "topName"
    ).innerText = name;


    document.getElementById(
        "profileName"
    ).innerText = name;

    const profileSkills = document.getElementById("profileSkills");
    const profileInterests = document.getElementById("profileInterests");
    if (profileSkills) profileSkills.textContent = skills.join(", ");
    if (profileInterests) profileInterests.textContent = document.getElementById("interests").value.trim() || "Not specified";


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

        const profileSkills = document.getElementById("profileSkills");
        const profileInterests = document.getElementById("profileInterests");
        if (profileSkills) profileSkills.textContent = savedSkills || "Add your skills in Assessment.";
        if (profileInterests) profileInterests.textContent = savedInterests || "Add your interests in Assessment.";

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


/* ===== Expanded skill catalog + multidisciplinary pathway engine ===== */
const skillCatalogGroups = {
 "School Subjects":["Mathematics","Algebra","Geometry","Trigonometry","Calculus","Statistics","Probability","Physics","Chemistry","Biology","Botany","Zoology","Human Anatomy","Physiology","Microbiology","Genetics","Biochemistry","Environmental Science","Geography","Geology","Economics","Business Studies","Accountancy","History","Political Science","Psychology","English","Communication","Computer Science","Information Technology"],
 "Math & Science":["Logical Reasoning","Mental Maths","Data Interpretation","Scientific Research","Laboratory Skills","Experimentation","Graphing","Measurement","Spatial Reasoning","Mathematical Proofs","Organic Chemistry","Analytical Chemistry","Cell Biology","Ecology","Astronomy"],
 "Programming & IT":["C++","C","C#","Java","Python","JavaScript","TypeScript","PHP","SQL","HTML","CSS","Data Structures & Algorithms (DSA)","Problem Solving","Object-Oriented Programming (OOP)","Git & GitHub","Linux","Networking","Cybersecurity","Web Development","Mobile App Development","Cloud Computing","Artificial Intelligence","Machine Learning","Deep Learning","Data Analysis","Data Science","Excel","Power BI","Pandas","NumPy","REST APIs","React","Node.js","Testing","Docker","AWS","Azure","Google Cloud","System Design","Robotics","Embedded Systems"],
 "Engineering & Practical":["Engineering Drawing","Technical Drawing","CAD","3D Modeling","Electronics","Circuit Analysis","Mechanics","Thermodynamics","Structural Analysis","Civil Engineering","Mechanical Engineering","Electrical Engineering","Biomedical Engineering","Control Systems","Microcontrollers","Prototyping","Manufacturing","Renewable Energy","Agriculture","Soil Science","Food Science"],
 "Creative & Design":["Drawing","Sketching","Painting","Art","Visual Design","Graphic Design","Color Theory","Typography","Illustration","Animation","3D Animation","Video Editing","Photography","UI/UX Design","Product Design","Architecture","Interior Design","Game Design","Creative Writing","Music","Storytelling"],
 "Business & People":["Leadership","Teamwork","Critical Thinking","Research","Public Speaking","Teaching","Mentoring","Project Management","Entrepreneurship","Marketing","Finance","Accounting","Customer Service","Negotiation","Planning","Writing","Attention to Detail","Empathy","Healthcare","Pharmacy","Medicine","Biotechnology","Forensics","Sustainability"]
};
let activeSkillCategory="All";
function selectedCatalogValues(){const el=document.getElementById("skills");return new Set((el?el.value:"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean));}
function setSkillCategory(category){activeSkillCategory=category;renderSkillCatalog();}
function renderSkillCatalog(){
 const host=document.getElementById("skillCatalog"),tabs=document.getElementById("skillCategories"),search=document.getElementById("skillSearch");if(!host||!tabs)return;
 const groups=Object.keys(skillCatalogGroups),q=search?(search.value||"").trim().toLowerCase():"",chosen=selectedCatalogValues();
 tabs.innerHTML=["All"].concat(groups).map(function(g){return '<button type="button" class="skill-category-btn '+(activeSkillCategory===g?"active":"")+'" onclick="setSkillCategory('+JSON.stringify(g)+')">'+g+'</button>';}).join("");
 let markup="",count=0;
 groups.forEach(function(group){if(activeSkillCategory!=="All"&&activeSkillCategory!==group)return;const skills=skillCatalogGroups[group].filter(function(s){return !q||s.toLowerCase().includes(q);});if(!skills.length)return;
 markup+='<div class="skill-group-title">'+group+'</div><div class="skill-group-grid">';
 skills.forEach(function(skill){const checked=chosen.has(skill.toLowerCase());if(checked)count++;markup+='<label class="skill-chip '+(checked?"selected":"")+'"><input type="checkbox" '+(checked?"checked":"")+' onchange="toggleCatalogSkill('+JSON.stringify(skill)+',this.checked)"><span>'+skill+'</span></label>';});markup+='</div>';});
 host.innerHTML=markup||'<p class="field-hint">No matching options. Type any skill in the field above.</p>';
 const counter=document.getElementById("skillCount");if(counter)counter.textContent=chosen.size;
}
function toggleCatalogSkill(skill,checked){const field=document.getElementById("skills");if(!field)return;let vals=field.value.split(",").map(x=>x.trim()).filter(Boolean);vals=vals.filter(x=>x.toLowerCase()!==skill.toLowerCase());if(checked)vals.push(skill);field.value=vals.join(", ");renderSkillCatalog();}
function clearCatalogSelection(){const field=document.getElementById("skills");if(field)field.value="";renderSkillCatalog();}
function normalizeSkill(value){return String(value||"").toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9+#]+/g," ").trim().replace(/\s+/g," ");}
function getStudentSkills(){const vals=[];["skills","subjects"].forEach(function(id){const el=document.getElementById(id);if(el)vals.push.apply(vals,el.value.toLowerCase().split(",").map(x=>x.trim()).filter(Boolean));});return Array.from(new Set(vals));}
function profileHas(skill,studentSkills){
 const target=normalizeSkill(skill),aliases={
 "dsa":["data structures algorithms","data structures and algorithms"],
 "object oriented programming oop":["oop","object oriented programming"],
 "git github":["git","github"],
 "html css":["html","css"],
 "pandas numpy":["pandas","numpy"],
 "mathematics":["math","maths","mathematics","algebra","geometry","calculus","trigonometry"],
 "biology":["biology","botany","zoology","anatomy","physiology","genetics","microbiology","biochemistry"],
 "chemistry":["chemistry","biochemistry","organic chemistry","analytical chemistry"],
 "drawing":["drawing","sketching","technical drawing","engineering drawing"],
 "statistics":["statistics","probability"]
 };
 const keys=[target].concat(aliases[target]||[]);
 return studentSkills.some(function(value){const current=normalizeSkill(value);return keys.some(function(key){const k=normalizeSkill(key);return current===k||current.includes(k)||k.includes(current);});});
}
const extendedCareers=[
{name:"Doctor / Physician",icon:"🩺",description:"Diagnoses and treats illness; requires a recognized medical qualification.",skills:["biology","chemistry","physics","human anatomy","physiology","communication"],requiredSkills:["Biology","Chemistry","Physics","NEET-UG preparation","MBBS and clinical training"],subjects:["biology","chemistry","physics"],interests:["medicine","healthcare"],roadmap:["Strengthen Biology, Chemistry and Physics","Build NCERT-level science foundations and problem-solving","Prepare for NEET-UG and verify current eligibility rules","Complete MBBS at a recognized institution","Complete required internship and registration","Explore postgraduate specialization if desired"]},
{name:"Pharmacist",icon:"💊",description:"Supports safe medicine use, dispensing and pharmaceutical care.",skills:["biology","chemistry","pharmacology","pharmaceutical science","attention to detail"],requiredSkills:["Chemistry","Biology","Pharmacology","Pharmaceutical calculations","Recognized pharmacy qualification"],subjects:["chemistry","biology","mathematics"],interests:["pharmacy","healthcare","medicines"],roadmap:["Strengthen Chemistry and Biology","Learn physiology and medicine basics","Check D.Pharm/B.Pharm eligibility and recognized institutions","Study pharmacology and pharmaceutical sciences","Complete required practical training","Verify state registration requirements"]},
{name:"Biotechnologist",icon:"🧬",description:"Applies biology and chemistry to living systems, health and biological products.",skills:["biology","chemistry","genetics","microbiology","biotechnology","laboratory skills"],requiredSkills:["Biology","Chemistry","Genetics","Microbiology","Laboratory methods"],subjects:["biology","chemistry","mathematics"],interests:["biotechnology","research","healthcare"],roadmap:["Biology and Chemistry foundations","Cell biology and genetics","Lab safety and basic lab skills","Explore BSc/BTech Biotechnology entry requirements","Learn microbiology and molecular biology","Build research or industry experience"]},
{name:"Biochemist",icon:"⚗️",description:"Studies chemical processes and molecules in living organisms.",skills:["biology","chemistry","biochemistry","molecular biology","laboratory skills"],requiredSkills:["Biology","Chemistry","Organic Chemistry","Biochemistry","Laboratory methods"],subjects:["biology","chemistry"],interests:["biochemistry","research"],roadmap:["Biology and Chemistry foundations","Organic chemistry and cell biology","Explore BSc Biochemistry or related degree routes","Learn proteins, enzymes and metabolism","Gain laboratory and research experience","Consider postgraduate specialization"]},
{name:"Biomedical Engineer",icon:"🦾",description:"Combines engineering and life sciences to create medical devices and healthcare technology.",skills:["biology","physics","mathematics","electronics","programming","engineering drawing"],requiredSkills:["Mathematics","Physics","Biology","Electronics","Biomedical instrumentation"],subjects:["biology","physics","mathematics"],interests:["healthcare","engineering","robotics"],roadmap:["Mathematics and Physics foundations","Biology and human physiology basics","Check engineering degree eligibility","Learn electronics, sensors and programming","Explore medical-device design and safety","Build an assistive-tech prototype"]},
{name:"Civil Engineer",icon:"🏗️",description:"Designs infrastructure such as buildings, roads and bridges.",skills:["mathematics","physics","engineering drawing","geometry","cad","structural analysis"],requiredSkills:["Mathematics","Physics","Engineering Drawing","CAD","Structural Mechanics"],subjects:["mathematics","physics","geometry"],interests:["civil engineering","construction","design"],roadmap:["Algebra, geometry and trigonometry","Physics and mechanics","Engineering drawing and CAD","Verify approved civil-engineering entry requirements","Study materials, surveying and structural analysis","Gain supervised project/site experience"]},
{name:"Mechanical Engineer",icon:"⚙️",description:"Designs machines, mechanisms and energy systems.",skills:["mathematics","physics","engineering drawing","cad","mechanics","thermodynamics"],requiredSkills:["Mathematics","Physics","Engineering Drawing","CAD","Mechanics"],subjects:["mathematics","physics"],interests:["mechanical engineering","machines","design"],roadmap:["Algebra, geometry and trigonometry","Physics and mechanics","Technical drawing and CAD","Verify engineering degree eligibility","Study thermodynamics and manufacturing","Build a design or prototyping project"]},
{name:"Electrical Engineer",icon:"⚡",description:"Designs and maintains electrical systems and power equipment.",skills:["mathematics","physics","electronics","circuit analysis","programming"],requiredSkills:["Mathematics","Physics","Circuit Analysis","Electrical Machines","Safety"],subjects:["mathematics","physics"],interests:["electrical engineering","energy","electronics"],roadmap:["Mathematics and physics foundations","Circuit fundamentals","Electrical measurements and safety","Check recognized course/entry requirements","Study machines, power systems and controls","Complete practical lab projects"]},
{name:"Electronics / Embedded Engineer",icon:"🔌",description:"Builds electronic systems, firmware and connected devices.",skills:["mathematics","physics","electronics","c programming","c++","microcontrollers","circuits"],requiredSkills:["Circuit Basics","C/C++","Digital Electronics","Microcontrollers","Debugging"],subjects:["mathematics","physics"],interests:["electronics","robotics","gadgets"],roadmap:["Math and Physics foundations","Circuits and digital logic","C/C++ programming","Microcontrollers and sensors","Debugging and testing","Build an embedded/IoT prototype"]},
{name:"Architect",icon:"📐",description:"Plans functional spaces and buildings using design, technical knowledge and regulations.",skills:["drawing","geometry","visual design","spatial reasoning","cad","communication"],requiredSkills:["Freehand Drawing","Geometry","Design Fundamentals","CAD/BIM","Building Regulations"],subjects:["mathematics","geometry","drawing"],interests:["architecture","design","buildings"],roadmap:["Practice observation, drawing and geometry","Build spatial reasoning and visual communication","Research recognized architecture degree and entrance requirements","Learn CAD/BIM and design principles","Study structures, materials and building rules","Create a design portfolio"]},
{name:"Graphic Designer",icon:"🎨",description:"Creates visual communication for digital and print media.",skills:["drawing","visual design","color theory","typography","illustration","design software"],requiredSkills:["Design Fundamentals","Color Theory","Typography","Design Software","Portfolio"],subjects:["drawing","art","geometry"],interests:["design","art","creativity"],roadmap:["Drawing and visual observation","Color, composition and typography","Learn design tools","Practice real design briefs","Build a portfolio showing process","Seek feedback and project experience"]},
{name:"Animator / 3D Artist",icon:"🎬",description:"Creates motion graphics, characters and 2D/3D visual experiences.",skills:["drawing","geometry","visual storytelling","animation","3d modeling","design software"],requiredSkills:["Drawing/Observation","Animation Principles","3D Tools","Storytelling","Portfolio"],subjects:["drawing","geometry","art"],interests:["animation","games","film","art"],roadmap:["Drawing, form and observation","Timing, motion and storytelling","Choose 2D or 3D tools","Practice modeling and animation","Create polished short shots","Build a showreel"]},
{name:"Mathematician / Statistician",icon:"∑",description:"Uses mathematical reasoning, models and statistics to answer complex questions.",skills:["mathematics","algebra","geometry","calculus","statistics","probability","logical reasoning"],requiredSkills:["Algebra","Calculus","Probability","Statistics","Mathematical Modeling"],subjects:["mathematics","algebra","geometry","statistics"],interests:["mathematics","research","analytics"],roadmap:["Algebra and functions","Geometry and trigonometry","Calculus and linear algebra","Probability and statistics","Proofs and computational modeling","Explore degree or research pathways"]},
{name:"Actuary",icon:"📊",description:"Models financial risk using probability, statistics and mathematics.",skills:["mathematics","algebra","statistics","probability","finance","excel"],requiredSkills:["Advanced Mathematics","Probability","Statistics","Financial Mathematics","Professional Exams"],subjects:["mathematics","statistics","economics"],interests:["finance","risk","mathematics"],roadmap:["Algebra and calculus","Probability and statistics","Excel and programming basics","Research actuarial qualification pathways and exams","Financial mathematics and risk models","Build a study and practice plan"]},
{name:"Physicist / Research Scientist",icon:"🔭",description:"Investigates physical systems using mathematics and experiments.",skills:["physics","mathematics","calculus","algebra","experimentation","programming"],requiredSkills:["Physics","Mathematics","Calculus","Experimental Methods","Data Analysis"],subjects:["physics","mathematics"],interests:["physics","research","space","science"],roadmap:["Algebra, trigonometry and calculus","Mechanics, waves, electricity and modern physics","Practice experiments and scientific writing","Learn data analysis or programming","Explore relevant degree/entrance routes","Pursue research projects"]},
{name:"Chemist",icon:"🧪",description:"Studies substances, reactions, materials and chemical processes.",skills:["chemistry","biology","mathematics","laboratory skills","analytical chemistry"],requiredSkills:["Chemistry","Lab Safety","Analytical Methods","Data Recording","Relevant Degree"],subjects:["chemistry","mathematics","biology"],interests:["chemistry","research","laboratory"],roadmap:["Basic chemistry and mathematics","Stoichiometry and chemical bonding","Organic, inorganic and physical chemistry","Lab safety and analytical methods","Explore BSc or related degree requirements","Gain lab/research experience"]},
{name:"Environmental Scientist",icon:"🌱",description:"Studies ecosystems, pollution, conservation and environmental impact.",skills:["biology","chemistry","geography","statistics","field research","environmental science"],requiredSkills:["Biology","Chemistry","Environmental Science","Data Collection","GIS/Statistics"],subjects:["biology","chemistry","geography"],interests:["environment","nature","sustainability"],roadmap:["Biology, Chemistry and Earth science","Ecology and environmental systems","Statistics and field-data methods","Learn GIS or environmental monitoring","Explore relevant degree routes","Join field projects"]},
{name:"Agricultural Scientist",icon:"🌾",description:"Improves crops, soil, farming systems and sustainability.",skills:["biology","chemistry","mathematics","agriculture","soil science","botany"],requiredSkills:["Biology","Chemistry","Botany","Soil/Crop Science","Field Methods"],subjects:["biology","chemistry","mathematics"],interests:["agriculture","plants","food","environment"],roadmap:["Biology and Chemistry","Botany, soil and plant systems","Explore agricultural degree/entrance requirements","Learn crop science and field methods","Study yield and sustainability data","Gain farm or research experience"]},
{name:"Nutrition / Dietetics Pathway",icon:"🥗",description:"Applies nutrition science to food and health; clinical roles may need specific credentials.",skills:["biology","chemistry","human physiology","food science","communication"],requiredSkills:["Biology","Chemistry","Nutrition Science","Human Physiology","Recognized Qualification"],subjects:["biology","chemistry"],interests:["nutrition","healthcare","food"],roadmap:["Biology and Chemistry","Human physiology and food science","Research recognized courses","Learn evidence-based nutrition and ethics","Complete required supervised training","Verify credentials for target role"]},
{name:"Psychology / Behavioral Science",icon:"🧠",description:"Studies behavior, cognition and mental processes; clinical practice needs specific qualifications.",skills:["biology","statistics","research methods","communication","psychology","writing"],requiredSkills:["Psychology Foundations","Statistics","Research Methods","Ethics","Relevant Degree"],subjects:["biology","statistics"],interests:["psychology","people","research"],roadmap:["Psychology and behavior foundations","Statistics and research methods","Critical reading and writing","Explore recognized psychology degrees","Check postgraduate/registration rules for clinical practice","Gain appropriate supervised experience"]},
{name:"Teacher / Educator",icon:"📚",description:"Helps learners develop knowledge and skills in a subject or age group.",skills:["communication","mathematics","biology","english","drawing","subject knowledge"],requiredSkills:["Subject Knowledge","Communication","Lesson Planning","Assessment","Required Teaching Qualification"],subjects:["english","mathematics","biology"],interests:["teaching","education","helping people"],roadmap:["Strengthen subject knowledge","Practice explanation and communication","Learn lesson design and assessment","Check local teacher qualification requirements","Gain supervised teaching practice","Build learning resources"]},
{name:"Cybersecurity Analyst",icon:"🛡️",description:"Protects systems, networks and data from security threats.",skills:["networking","linux","python","security","problem solving","operating systems"],requiredSkills:["Networking","Linux","Security Fundamentals","Scripting","Incident Response"],subjects:["computer science","mathematics"],interests:["cybersecurity","technology","investigation"],roadmap:["Computer and networking fundamentals","Linux and operating systems","Python/scripting basics","Security concepts and legal lab practice","Monitoring and incident response","Build a defensive-security portfolio"]},
{name:"Cloud / DevOps Engineer",icon:"☁️",description:"Builds and operates reliable infrastructure, deployments and cloud services.",skills:["linux","git","docker","aws","azure","gcp","scripting","networking"],requiredSkills:["Linux","Git","Scripting","Cloud Fundamentals","CI/CD and Containers"],subjects:["computer science","mathematics"],interests:["cloud","automation","infrastructure"],roadmap:["Linux and networking","Git and scripting","Cloud fundamentals","Docker and CI/CD","Monitoring and infrastructure as code","Deploy a documented cloud project"]},
{name:"Web Developer",icon:"🌐",description:"Creates accessible, responsive websites and web applications.",skills:["html","css","javascript","react","node.js","sql","git"],requiredSkills:["HTML/CSS","JavaScript","Responsive Design","Git","APIs"],subjects:["computer science","drawing"],interests:["web development","design","coding"],roadmap:["HTML and semantic structure","CSS and responsive layouts","JavaScript and browser APIs","Git/GitHub and accessibility","APIs and backend basics","Deploy a portfolio project"]},
{name:"Mobile App Developer",icon:"📱",description:"Builds Android, iOS or cross-platform applications.",skills:["java","kotlin","swift","javascript","react native","flutter","api"],requiredSkills:["Programming","Mobile UI","APIs","Data Storage","Testing"],subjects:["computer science","mathematics"],interests:["mobile apps","coding","design"],roadmap:["Programming foundations","Choose Android, iOS or cross-platform tools","Mobile UI and navigation","APIs and data storage","Testing and accessibility","Publish a demo app"]},
{name:"Game Developer",icon:"🎮",description:"Builds game mechanics, systems and interactive experiences.",skills:["c++","c#","mathematics","geometry","physics","game engine","drawing"],requiredSkills:["Programming","Vectors/Geometry","Physics Basics","Game Engine","Debugging"],subjects:["mathematics","geometry","physics","drawing"],interests:["games","coding","art"],roadmap:["Programming foundations","Vectors, geometry and physics","Choose a game engine","Build mechanics and input systems","Test and optimize a small game","Publish a playable demo"]},
{name:"Robotics Engineer",icon:"🤖",description:"Combines mechanics, electronics, controls and software to build robots.",skills:["mathematics","physics","programming","electronics","geometry","robotics"],requiredSkills:["Mathematics","Physics","Programming","Electronics","Control Systems"],subjects:["mathematics","physics","computer science"],interests:["robotics","automation","engineering"],roadmap:["Algebra, geometry and physics","Programming basics","Circuits, sensors and microcontrollers","Mechanics and control systems","Build or simulate a robot","Integrate, test and document"]},
{name:"Product / Industrial Designer",icon:"🧩",description:"Designs useful products with user needs, visual thinking and engineering constraints.",skills:["drawing","geometry","visual design","engineering drawing","cad","prototyping"],requiredSkills:["Sketching","Geometry/Spatial Reasoning","CAD","Materials","Portfolio"],subjects:["drawing","geometry","mathematics"],interests:["design","making","engineering"],roadmap:["Sketching and observation","Geometry and spatial reasoning","Human-centered design","CAD and prototyping","Test concepts with users","Build a design portfolio"]},
{name:"Economist",icon:"📈",description:"Studies markets, policy and resource allocation using economics and data.",skills:["mathematics","statistics","economics","writing","data analysis"],requiredSkills:["Economics","Statistics","Mathematics","Research Methods","Data Interpretation"],subjects:["mathematics","statistics","economics"],interests:["economics","policy","research"],roadmap:["Microeconomics and macroeconomics","Algebra, graphs and statistics","Research methods and data analysis","Learn spreadsheet or coding tools","Analyze a real economic question","Explore degree/postgraduate options"]},
{name:"Forensic Scientist",icon:"🔬",description:"Uses scientific methods to examine evidence; roles may require specific qualifications.",skills:["biology","chemistry","physics","laboratory skills","observation","writing"],requiredSkills:["Scientific Foundations","Lab Methods","Evidence Handling","Documentation","Relevant Qualification"],subjects:["biology","chemistry","physics"],interests:["forensics","investigation","science"],roadmap:["Biology, Chemistry and Physics","Lab methods and scientific reasoning","Evidence integrity and documentation","Explore recognized forensic science programs","Practice analytical reporting","Verify role-specific qualification rules"]},
{name:"Geologist / Earth Scientist",icon:"🪨",description:"Studies Earth materials, processes, natural resources and hazards.",skills:["geography","chemistry","physics","mathematics","field research","geology"],requiredSkills:["Earth Science","Chemistry","Physics","Field Methods","Mapping/Data Analysis"],subjects:["geography","chemistry","physics","mathematics"],interests:["geology","nature","earth science"],roadmap:["Geography and Earth science","Chemistry, Physics and mathematics","Minerals, rocks and Earth processes","Field observation and mapping","Explore relevant degree routes","Gain field/lab experience"]},
{name:"CAD Drafter / Technical Illustrator",icon:"📏",description:"Turns technical concepts into precise drawings and digital models.",skills:["drawing","geometry","engineering drawing","cad","spatial reasoning","mathematics"],requiredSkills:["Geometry","Technical Drawing","CAD","Measurement","Attention to Detail"],subjects:["drawing","geometry","mathematics"],interests:["drawing","design","engineering"],roadmap:["Geometry, scale and measurement","Freehand and technical drawing","Learn CAD drafting tools","Practice dimensions and standards","Create a drawing/model portfolio","Explore industry-specific training"]},
{name:"Content / Technical Writer",icon:"✍️",description:"Explains ideas, products and technical information clearly.",skills:["english","writing","communication","research","computer science"],requiredSkills:["Writing","Research","Editing","Audience Awareness","Portfolio"],subjects:["english","computer science"],interests:["writing","communication","technology"],roadmap:["Writing and grammar foundations","Research and fact-checking","Practice concise explanations","Learn documentation tools","Create writing samples","Build a portfolio from feedback"]},
{name:"Business Analyst / Entrepreneur",icon:"💡",description:"Identifies problems, evaluates opportunities and improves business decisions.",skills:["mathematics","communication","economics","excel","problem solving","data analysis"],requiredSkills:["Problem Solving","Communication","Business Fundamentals","Data Literacy","Planning"],subjects:["mathematics","economics","english"],interests:["business","entrepreneurship","leadership"],roadmap:["Explore customer problems and business basics","Build communication and research skills","Learn spreadsheets and data interpretation","Test a small idea with users","Learn budgeting and project planning","Document outcomes and iterate"]}
];
extendedCareers.forEach(function(c){if(!careers.some(function(old){return old.name===c.name;}))careers.push(c);});
function profileHas(skill,studentSkills){
 const target=normalizeSkill(skill);
 const aliases={
  "dsa":["data structures algorithms","data structures and algorithms"],
  "object oriented programming oop":["oop","object oriented programming"],
  "git github":["git","github"],
  "html css":["html","css"],
  "pandas numpy":["pandas","numpy"],
  "mathematics":["math","maths","mathematics","algebra","geometry","calculus","trigonometry"],
  "biology":["biology","botany","zoology","anatomy","physiology","genetics","microbiology","biochemistry"],
  "chemistry":["chemistry","biochemistry","organic chemistry","analytical chemistry"],
  "drawing":["drawing","sketching","technical drawing","engineering drawing"],
  "statistics":["statistics","probability"],
  "physics":["physics"]
 };
 const keys=[target].concat(aliases[target]||[]);
 return studentSkills.some(function(value){
  const current=normalizeSkill(value);
  return keys.some(function(key){
   const k=normalizeSkill(key);
   return current===k || (k.length>=5 && current.includes(k)) || (current.length>=5 && k.includes(current));
  });
 });
}
function calculateCareerScore(studentSkills,career){
 const req=career.skills||[];if(!req.length)return 0;
 let hit=0;req.forEach(function(s){if(profileHas(s,studentSkills))hit++;});
 const base=hit/req.length*75;
 const subjectHits=(career.subjects||[]).filter(function(s){return profileHas(s,studentSkills);}).length;
 const interestText=normalizeSkill((document.getElementById("interests")||{}).value||"");
 const interestHits=(career.interests||[]).filter(function(s){return interestText.includes(normalizeSkill(s));}).length;
 return Math.min(100,Math.round(base+Math.min(15,subjectHits*5)+Math.min(10,interestHits*5)));
}
function findSkillGap(studentSkills,career){return (career.requiredSkills||[]).filter(function(s){return !profileHas(s,studentSkills);});}
function generateCareerResults(){const skills=getStudentSkills();const results=careers.map(function(c){return {career:c,score:calculateCareerScore(skills,c),missing:findSkillGap(skills,c)};});results.sort(function(a,b){return b.score-a.score;});return results;}
function renderPersonalizedRoadmap(career,missing){
 const box=document.querySelector("#roadmap .roadmap"),title=document.querySelector("#roadmap .page-header p");if(!box)return;
 if(title)title.innerHTML="Personalized pathway toward <b>"+career.name+"</b>, based on your selected skills, subjects and interests.";
 const route=career.roadmap&&career.roadmap.length?career.roadmap:["Explore foundational subjects","Learn core skills for "+career.name,"Complete a guided beginner project","Build practical experience","Check official education and qualification requirements","Create a portfolio and plan next steps"];
 const colors=["green","blue","orange","purple","pink","green"];
 box.innerHTML=route.map(function(item,i){return '<div class="step"><div class="step-icon '+colors[i%colors.length]+'">'+(i+1)+'</div><h4>Step '+(i+1)+'</h4><strong>'+(["Foundation","Core Learning","Focused Practice","Applied Experience","Qualification & Portfolio","Next Milestone"][i]||"Next Step")+'</strong><ul><li>'+item+'</li></ul></div>';}).join("");
 const goal=document.querySelector("#roadmap .goal p");if(goal)goal.textContent=missing.length?"Next skill gaps for this pathway: "+missing.slice(0,5).join(", ")+". Requirements vary by course, institution and location; verify official eligibility before applying.":"Your profile matches many tracked requirements. Build evidence through projects, practical experience and relevant qualifications.";
}
const priorOnload=window.onload;
window.onload=function(){
 if(typeof priorOnload==="function")priorOnload();
 const savedSubjects=localStorage.getItem("studentSubjects"),savedPreferences=localStorage.getItem("studentPreferences");
 if(savedSubjects)document.getElementById("subjects").value=savedSubjects;
 if(savedPreferences)document.getElementById("preferences").value=savedPreferences;
 const skillField=document.getElementById("skills");if(skillField)skillField.addEventListener("input",renderSkillCatalog);
 const searchField=document.getElementById("skillSearch");if(searchField)searchField.addEventListener("input",renderSkillCatalog);
 renderSkillCatalog();
};
