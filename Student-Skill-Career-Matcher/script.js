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
  "html":["html","html5"], "css":["css","css3"],
  "sql":["sql","structured query language"], "postgresql":["postgresql","postgres","psql"], "mysql":["mysql"],
  "javascript":["javascript","js","ecmascript"], "typescript":["typescript","ts"],
  "c++":["c++","cpp","c plus plus"], "c#":["c#","c sharp","csharp"],
  "rest api":["rest api","restful api","restful services"], "node.js":["node.js","nodejs"],
  "machine learning":["machine learning","ml"], "artificial intelligence":["artificial intelligence","ai"],
  "mathematics":["mathematics","math","maths"], "algebra":["algebra"], "geometry":["geometry"],
  "biology":["biology","bio"], "chemistry":["chemistry","chem"], "physics":["physics"],
  "drawing":["drawing","sketching","freehand drawing"], "engineering drawing":["engineering drawing","technical drawing"],
  "biochemistry":["biochemistry","biochemical science"], "biotechnology":["biotechnology","biotech"],
  "pharmacy":["pharmacy","pharmaceutical science"], "communication":["communication","communication skills"],
  "git":["git","git version control"], "github":["github","git hub"]
};
const jobSkillCatalog = ["c++","java","python","javascript","typescript","react","node.js","dsa","problem solving","oop","git","github","sql","postgresql","mysql","system design","machine learning","deep learning","artificial intelligence","statistics","pandas & numpy","data visualization","power bi","excel","rest api","docker","aws","azure","gcp","linux","testing","html","css","mathematics","algebra","geometry","calculus","drawing","engineering drawing","biology","chemistry","physics","biochemistry","biotechnology","pharmacy","communication"];
function skillMentioned(text, skill) {
  const aliases=skillAliases[skill]||[skill];
  const normalizedText=" "+String(text||"").toLowerCase().replace(/[^a-z0-9+#.]+/g," ").trim()+" ";
  return aliases.some(function(alias){
    const phrase=String(alias||"").toLowerCase().replace(/[^a-z0-9+#.]+/g," ").trim();
    return phrase.length>0 && normalizedText.includes(" "+phrase+" ");
  });
}
function currentSkillMatches(skill) {
  const target=normalizeSkill(skill);
  const aliases=(skillAliases[skill]||[skill]).map(normalizeSkill);
  return getStudentSkills().some(function(value){
    const current=normalizeSkill(value);
    return current===target || aliases.some(function(alias){return current===alias;});
  });
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
function escapeJobHtml(value) {
 return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
function analyzeJobDescription() {
 const input=document.getElementById("jobDescription");
 const out=document.getElementById("jobMatchResults");
 if(!input||!out)return;
 const description=input.value.trim();
 if(!description){out.innerHTML='<div class="info">Paste a job description first.</div>';return;}
 const mentioned=jobSkillCatalog.filter(function(skill){return skillMentioned(description,skill);});
 const matched=mentioned.filter(currentSkillMatches);
 const missing=mentioned.filter(function(skill){return !currentSkillMatches(skill);});
 const score=mentioned.length?Math.round(matched.length/mentioned.length*100):0;
 const ranking=careers.map(function(career){
   return {career:career,count:(career.skills||[]).filter(function(skill){return skillMentioned(description,skill);}).length};
 }).sort(function(a,b){return b.count-a.count;});
 const role=ranking[0]&&ranking[0].count?ranking[0].career.name:"No tracked career profile matched strongly";
 const matchedHtml=matched.length?matched.map(function(skill){return '<span class="keyword matched">✓ '+escapeJobHtml(skill)+'</span>';}).join(""):'<span class="keyword">No tracked skills detected</span>';
 const missingHtml=missing.length?missing.map(function(skill){return '<span class="keyword missing">+ '+escapeJobHtml(skill)+'</span>';}).join(""):'<span class="keyword matched">No tracked gaps detected</span>';
 out.innerHTML='<div class="job-result"><h3>Job Match Analysis</h3><p>This keyword-based comparison uses the skills tracked by this project. It is not an ATS prediction or hiring decision.</p><div class="match-stat-grid"><div class="match-stat"><strong>'+score+'%</strong><small>Tracked skill coverage</small></div><div class="match-stat"><strong>'+matched.length+'</strong><small>Skills you match</small></div><div class="match-stat"><strong>'+missing.length+'</strong><small>Skills to work on</small></div></div><p><strong>Closest tracked career profile:</strong> '+escapeJobHtml(role)+'</p><h4>Matched skills</h4><div class="keyword-list">'+matchedHtml+'</div><h4>Skill gaps</h4><div class="keyword-list">'+missingHtml+'</div></div>';
}
updateRoadmap=function(career){renderPersonalizedRoadmap(career,findSkillGap(getStudentSkills(),career));renderResourcePage(career.name);};

    
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
const CAREER_SCORE_WEIGHTS = Object.freeze({ core: 0.70, preferred: 0.25, bonus: 0.05 });
function calculateCareerScore(studentSkills,career){
 const core=career.coreSkills || career.requiredSkills || [];
 const all=career.skills || [];
 const preferred=(career.preferredSkills || all).filter(function(s){return !core.some(function(c){return normalizeSkill(c)===normalizeSkill(s);});});
 const bonus=career.bonusSkills || [];
 const groups=[{skills:core,weight:CAREER_SCORE_WEIGHTS.core},{skills:preferred,weight:CAREER_SCORE_WEIGHTS.preferred},{skills:bonus,weight:CAREER_SCORE_WEIGHTS.bonus}].filter(function(group){return group.skills.length>0;});
 if(!groups.length)return 0;
 let availableWeight=0,earned=0;
 groups.forEach(function(group){
  const unique=Array.from(new Set(group.skills.map(normalizeSkill))).filter(Boolean);
  if(!unique.length)return;
  const hits=unique.filter(function(skill){return profileHas(skill,studentSkills);}).length;
  availableWeight+=group.weight;earned+=(hits/unique.length)*group.weight;
 });
 const subjectHits=(career.subjects||[]).filter(function(s){return profileHas(s,studentSkills);}).length;
 const interestText=normalizeSkill((document.getElementById("interests")||{}).value||"");
 const interestHits=(career.interests||[]).filter(function(s){return interestText.includes(normalizeSkill(s));}).length;
 const weightedScore=availableWeight?earned/availableWeight*85:0;
 const contextBonus=Math.min(10,subjectHits*2)+Math.min(5,interestHits*2.5);
 return Math.max(0,Math.min(100,Math.round(weightedScore+contextBonus)));
}
function findSkillGap(studentSkills,career){return (career.requiredSkills||[]).filter(function(s){return !profileHas(s,studentSkills);});}
function generateCareerResults(){const skills=getStudentSkills();const results=careers.map(function(c){return {career:c,score:calculateCareerScore(skills,c),missing:findSkillGap(skills,c)};});results.sort(function(a,b){return b.score-a.score;});return results;}
function renderPersonalizedRoadmap(career,missing){
 const box=document.querySelector("#roadmap .roadmap"),title=document.querySelector("#roadmap .page-header p");if(!box)return;
 if(title)title.innerHTML="Personalized pathway toward <b>"+escapeJobHtml(career.name)+"</b>, based on your selected skills, subjects and interests.";
 const base=career.roadmap&&career.roadmap.length?career.roadmap:["Explore foundational subjects","Learn core skills for "+career.name,"Complete a guided beginner project","Build practical experience","Check official education and qualification requirements","Create a portfolio and plan next steps"];
 const gapSteps=missing.slice(0,4).map(function(skill){return "Learn and practice "+skill+" through guided exercises and a small project."});
 const route=base.slice(0,2).concat(gapSteps,base.slice(2)).filter(function(item,index,all){return all.indexOf(item)===index;}).slice(0,9);
 const colors=["green","blue","orange","purple","pink","green"];
 box.innerHTML=route.map(function(item,i){return '<div class="step"><div class="step-icon '+colors[i%colors.length]+'">'+(i+1)+'</div><h4>Step '+(i+1)+'</h4><strong>'+(["Foundation","Core Learning","Priority Skill Gap","Guided Practice","Applied Experience","Qualification & Portfolio","Project","Validation","Next Milestone"][i]||"Next Step")+'</strong><ul><li>'+escapeJobHtml(item)+'</li></ul></div>';}).join("");
 const goal=document.querySelector("#roadmap .goal p");if(goal)goal.textContent=missing.length?"Prioritized gaps to work on: "+missing.slice(0,5).join(", ")+". Requirements vary by course, institution and location; verify official eligibility before applying.":"Your profile matches many tracked requirements. Build evidence through projects, practical experience and relevant qualifications.";
}
function downloadCareerReport(kind){
 const name=String((document.getElementById("name")||{}).value||"Student").trim();
 const skills=getStudentSkills();
 const interests=(document.getElementById("interests")||{}).value||"";
 const subjects=(document.getElementById("subjects")||{}).value||"";
 const targetResults=generateCareerResults(),chosen=targetResults.slice(0,8);
 const lines=["STUDENT SKILL-TO-CAREER MATCHER","Generated: "+new Date().toLocaleString(),"Student: "+name,"","Skills: "+(skills.join(", ")||"Not provided"),"Subjects: "+(subjects||"Not provided"),"Interests: "+(interests||"Not provided"),""];
 if(kind==="roadmap"){
  const best=chosen[0];lines.push("PERSONALIZED ROADMAP");
  if(best){lines.push("Target career: "+best.career.name,"Compatibility: "+best.score+"%","","Learning steps:");
   (best.career.roadmap||["Strengthen foundational subjects","Learn core role skills","Build a practical project","Verify course and qualification requirements"]).forEach(function(step,i){lines.push((i+1)+". "+step);});
   const gaps=findSkillGap(skills,best.career);lines.push("","Priority skill gaps: "+(gaps.join(", ")||"No tracked gaps detected"));
  }
 }else{
  lines.push("TOP CAREER MATCHES");
  chosen.forEach(function(item,i){lines.push((i+1)+". "+item.career.name+" — "+item.score+"%","   Skill gaps: "+(item.missing.join(", ")||"No tracked gaps detected"));});
  if(chosen[0]){lines.push("","RECOMMENDED LEARNING ROADMAP");(chosen[0].career.roadmap||[]).forEach(function(step,i){lines.push((i+1)+". "+step);});}
 }
 lines.push("","Note: Scores are rule-based guidance, not aptitude tests or hiring predictions. Check official course eligibility and licensing requirements.");
 const blob=new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),link=document.createElement("a");
 link.href=url;link.download=(kind==="roadmap"?"career-roadmap":"career-match-report")+".txt";
 document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);
}

/* =========================================================
   ROADMAP-BASED YOUTUBE RESOURCES
   ========================================================= */
const learningChannels = [
 {name:"freeCodeCamp.org",handle:"@freecodecamp",url:"https://www.youtube.com/@freecodecamp",focus:"Programming, web development, data and AI",tags:["software","programming","web","data","ai","cloud","cybersecurity","mobile","game","robotics"],why:"Long-form tutorials and practical projects for building technical foundations."},
 {name:"CS50",handle:"@cs50",url:"https://www.youtube.com/@cs50",focus:"Computer science and programming fundamentals",tags:["software","programming","computer","ai","game","robotics","cybersecurity"],why:"Structured introductions to computational thinking and core computer science."},
 {name:"Apna College",handle:"@ApnaCollegeOfficial",url:"https://www.youtube.com/@ApnaCollegeOfficial",focus:"Programming, DSA and interview preparation",tags:["software","programming","web","mobile","cybersecurity"],why:"Beginner-friendly coding lessons and interview-oriented practice."},
 {name:"Neso Academy",handle:"@nesoacademy",url:"https://www.youtube.com/@nesoacademy",focus:"Engineering, electronics, mathematics and computer science",tags:["software","engineering","electronics","robotics","math","physics","civil","mechanical","electrical","biomedical"],why:"Concept-focused lessons for technical subjects and engineering foundations."},
 {name:"Khan Academy",handle:"@khanacademy",url:"https://www.youtube.com/@khanacademy",focus:"Algebra, geometry, calculus, biology, chemistry and physics",tags:["math","science","biology","medicine","pharmacy","biotech","biochemistry","chemistry","physics","engineering","actuary","economics","environment","agriculture","geology","forensic","nutrition","psychology"],why:"Clear foundational explanations for school and early university topics."},
 {name:"The Organic Chemistry Tutor",handle:"@TheOrganicChemistryTutor",url:"https://www.youtube.com/@TheOrganicChemistryTutor",focus:"Maths, chemistry, physics and worked examples",tags:["math","science","chemistry","biology","medicine","pharmacy","biotech","biochemistry","physics","engineering","forensic","nutrition"],why:"Step-by-step problem walkthroughs useful for strengthening prerequisites."},
 {name:"3Blue1Brown",handle:"@3blue1brown",url:"https://www.youtube.com/@3blue1brown",focus:"Visual mathematics, calculus, linear algebra and neural networks",tags:["math","ai","data","actuary","economics","physics","statistics","software"],why:"Visual intuition for abstract mathematical ideas."},
 {name:"StatQuest with Josh Starmer",handle:"@statquest",url:"https://www.youtube.com/@statquest",focus:"Statistics, machine learning and data science",tags:["data","ai","math","statistics","actuary","economics","psychology","environment","agriculture"],why:"Friendly visual explanations of statistical and machine-learning concepts."},
 {name:"CrashCourse",handle:"@crashcourse",url:"https://www.youtube.com/@crashcourse",focus:"Biology, chemistry, physics, economics and psychology",tags:["science","biology","medicine","pharmacy","biotech","biochemistry","chemistry","physics","economics","psychology","environment","agriculture","geology","forensic","nutrition"],why:"Short, structured introductions to a wide range of academic subjects."},
 {name:"Ninja Nerd",handle:"@NinjaNerdOfficial",url:"https://www.youtube.com/@NinjaNerdOfficial",focus:"Human physiology, anatomy and medical sciences",tags:["medicine","doctor","pharmacy","biomedical","nutrition","psychology","biology"],why:"Detailed medical-science lectures to supplement formal study."},
 {name:"MIT OpenCourseWare",handle:"@mitocw",url:"https://www.youtube.com/@mitocw",focus:"University-level science, engineering, maths and computing",tags:["engineering","math","physics","software","ai","robotics","electronics","civil","mechanical","electrical","biomedical","chemistry","data"],why:"University course lectures for learners ready to go deeper."},
 {name:"Proko",handle:"@ProkoTV",url:"https://www.youtube.com/@ProkoTV",focus:"Drawing, figure drawing and visual fundamentals",tags:["drawing","design","architecture","animation","game","cad","illustration"],why:"Guided drawing practice for visual communication and portfolio work."},
 {name:"SketchUp",handle:"@SketchUp",url:"https://www.youtube.com/@SketchUp",focus:"3D modelling and architectural design workflows",tags:["architecture","cad","civil","design","drawing","engineering"],why:"Useful introductions to 3D modelling and spatial design workflows."},
 {name:"Figma",handle:"@Figma",url:"https://www.youtube.com/@Figma",focus:"UI/UX design and digital product design",tags:["design","web","software","business","drawing"],why:"Product design, interface workflows and collaborative design concepts."},
 {name:"Harvard Business Review",handle:"@HarvardBusinessReview",url:"https://www.youtube.com/@HarvardBusinessReview",focus:"Business thinking, management and communication",tags:["business","economics","actuary","writer","teacher","communication","psychology","analyst"],why:"Perspectives on decision-making, organizations and professional skills."},
 {name:"Toastmasters International",handle:"@ToastmastersInternational",url:"https://www.youtube.com/@ToastmastersInternational",focus:"Public speaking, presentation and communication",tags:["communication","teacher","business","writer","psychology","medicine","management"],why:"Practice ideas for explaining your work clearly and confidently."}
];

function getAllCareerProfiles() {
 const all=(typeof careers!=="undefined"?careers:[]).slice();
 if(typeof extendedCareers!=="undefined")extendedCareers.forEach(function(c){if(!all.some(function(x){return x.name===c.name;}))all.push(c);});
 return all.sort(function(a,b){return a.name.localeCompare(b.name);});
}
function resourceCareerTags(career) {
 const text=[career.name,career.description].concat(career.skills||[],career.subjects||[],career.interests||[],career.requiredSkills||[],career.roadmap||[]).join(" ").toLowerCase();
 const tags=[];
 const rules=[
  ["software|developer|programming|computer|backend|web|mobile|cybersecurity|cloud|devops|data scientist|ai engineer","software","programming","computer"],
  ["data analyst|data scientist|statistics|analytics|economist|actuary","data","statistics","math"],
  ["artificial intelligence|machine learning|ai engineer|neural network","ai"],
  ["doctor|physician|medicine|pharmacist|pharmacy|nutrition|biomedical|biochem|biotechn|forensic|psychology","science","biology","medicine","pharmacy"],
  ["biology|biolog|microbiology|genetics|agriculture|environment|geolog","biology","science"],
  ["chemistry|chemist|pharmac|biochem","chemistry","science"],
  ["physics|physicist|electrical|mechanical|civil|engineering|robotics|electronics","physics","engineering"],
  ["mathemat|algebra|geometry|calculus|statistic|actuary|economist","math"],
  ["drawing|architect|design|animator|illustrat|cad|3d artist|visual","drawing","design","architecture"],
  ["business|entrepreneur|analyst|economist|writer|teacher|communication|psychology","business","communication"]
 ];
 rules.forEach(function(rule){if(new RegExp(rule[0],"i").test(text))tags.push.apply(tags,rule.slice(1));});
 return Array.from(new Set(tags));
}
function getCareerRoadmapSteps(career) {
 const steps=(career.roadmap||[]).slice();
 if(!steps.length) {
  (career.requiredSkills||career.skills||[]).slice(0,6).forEach(function(skill){steps.push("Learn and practice "+skill);});
 }
 if(!steps.length)steps.push("Build foundations for "+career.name,"Practice core skills","Complete a small project","Review official education and qualification requirements");
 return steps.slice(0,10);
}
function renderResourcePage(careerName) {
 const selector=document.getElementById("resourceCareer");
 const profiles=getAllCareerProfiles();
 if(!profiles.length)return;
 if(selector) {
  const current=careerName||selector.value||profiles[0].name;
  selector.innerHTML=profiles.map(function(career){return '<option value="'+escapeJobHtml(career.name)+'">'+escapeJobHtml(career.name)+'</option>';}).join("");
  selector.value=profiles.some(function(c){return c.name===current;})?current:profiles[0].name;
 }
 const selectedName=selector?selector.value:(careerName||profiles[0].name);
 const career=profiles.find(function(item){return item.name===selectedName;})||profiles[0];
 const tags=resourceCareerTags(career);
 const roadmap=getCareerRoadmapSteps(career);
 const summary=document.getElementById("resourceSummary");
 if(summary)summary.innerHTML='<div class="resource-summary-main"><span class="resource-eyebrow">YOUR LEARNING PATH</span><h3>'+escapeJobHtml(career.icon||"🎯")+' '+escapeJobHtml(career.name)+'</h3><p>'+escapeJobHtml(career.description||"A focused collection of learning resources for this pathway.")+'</p><div class="resource-tags">'+tags.slice(0,6).map(function(tag){return '<span>'+escapeJobHtml(tag)+'</span>';}).join("")+'</div><small>'+roadmap.length+' roadmap stages · '+tags.length+' topic areas detected</small></div>';
 const matched=learningChannels.map(function(channel){
  const score=channel.tags.reduce(function(total,tag){return total+(tags.indexOf(tag)>=0?1:0);},0);
  return {channel:channel,score:score};
 }).filter(function(item){return item.score>0;}).sort(function(a,b){return b.score-a.score;}).slice(0,8);
 const grid=document.getElementById("resourceChannelGrid");
 if(grid)grid.innerHTML=matched.map(function(item){
  const ch=item.channel;
  return '<article class="resource-card"><div class="resource-card-top"><span class="resource-play">▶</span><span class="resource-fit">'+item.score+' topic match'+(item.score===1?'':'es')+'</span></div><h3>'+escapeJobHtml(ch.name)+'</h3><p class="resource-focus">'+escapeJobHtml(ch.focus)+'</p><p>'+escapeJobHtml(ch.why)+'</p><a href="'+ch.url+'" target="_blank" rel="noopener noreferrer">Open YouTube channel <span aria-hidden="true">↗</span></a></article>';
 }).join("")||'<p class="info">No channel matches were found. Use the topic searches below to discover current playlists.</p>';
 const list=document.getElementById("roadmapResourceList");
 if(list)list.innerHTML=roadmap.map(function(step,index){
  const query=encodeURIComponent(step+" "+career.name+" tutorial course");
  return '<article class="roadmap-resource"><div class="resource-step-number">'+(index+1)+'</div><div class="roadmap-resource-copy"><strong>'+escapeJobHtml(step)+'</strong><p>Study this stage, then practice it before moving to the next step.</p><a href="https://www.youtube.com/results?search_query='+query+'" target="_blank" rel="noopener noreferrer">Find YouTube lessons for this step ↗</a></div></article>';
 }).join("");
}
function useTopCareerResources() {
 const results=generateCareerResults();
 if(results.length&&results[0].career)renderResourcePage(results[0].career.name);
 else renderResourcePage();
 showPage("resources");
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
 renderResourcePage();
};
