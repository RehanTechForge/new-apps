interface ResumeData {
  name: string;
  email: string;
  education: Education[];
  experience: Experience[];
  skills: string;
}

interface Education {
  degree: string;
  institution: string;
  gradYear: number;
}

interface Experience {
  jobTitle: string;
  company: string;
  years: number;
}

let educationEntries: Education[] = [];
let experienceEntries: Experience[] = [];

// Adding education inputs
const educationSection = document.getElementById("education-section")!;
const addEducationBtn = document.getElementById("add-education-btn")!;
addEducationBtn.addEventListener("click", addEducationInput);

function addEducationInput(): void {
  const educationDiv = document.createElement("div");
  educationDiv.classList.add("education-entry");
  educationDiv.innerHTML = `
    <label for="degree">Degree:</label>
    <input type="text" class="degree" placeholder="B.Sc. Computer Science" required>
    <label for="institution">Institution:</label>
    <input type="text" class="institution" placeholder="Harvard University" required>
    <label for="gradYear">Graduation Year:</label>
    <input type="number" class="gradYear" placeholder="2020" required>
  `;
  educationSection.appendChild(educationDiv);
}

// Adding work experience inputs
const experienceSection = document.getElementById("experience-section")!;
const addExperienceBtn = document.getElementById("add-experience-btn")!;
addExperienceBtn.addEventListener("click", addExperienceInput);

function addExperienceInput(): void {
  const experienceDiv = document.createElement("div");
  experienceDiv.classList.add("experience-entry");
  experienceDiv.innerHTML = `
    <label for="jobTitle">Job Title:</label>
    <input type="text" class="jobTitle" placeholder="Software Engineer" required>
    <label for="company">Company:</label>
    <input type="text" class="company" placeholder="Tech Corp" required>
    <label for="years">Years:</label>
    <input type="number" class="years" placeholder="2" required>
  `;
  experienceSection.appendChild(experienceDiv);
}

document
  .getElementById("resume-form")!
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect education data
    const educationElements = document.querySelectorAll(".education-entry");
    educationEntries = Array.from(educationElements).map((element) => {
      const degree = (element.querySelector(".degree") as HTMLInputElement)
        .value;
      const institution = (
        element.querySelector(".institution") as HTMLInputElement
      ).value;
      const gradYear = Number(
        (element.querySelector(".gradYear") as HTMLInputElement).value
      );
      return { degree, institution, gradYear };
    });

    // Collect work experience data
    const experienceElements = document.querySelectorAll(".experience-entry");
    experienceEntries = Array.from(experienceElements).map((element) => {
      const jobTitle = (element.querySelector(".jobTitle") as HTMLInputElement)
        .value;
      const company = (element.querySelector(".company") as HTMLInputElement)
        .value;
      const years = Number(
        (element.querySelector(".years") as HTMLInputElement).value
      );
      return { jobTitle, company, years };
    });

    const resumeData: ResumeData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      education: educationEntries,
      experience: experienceEntries,
      skills: (document.getElementById("skills") as HTMLInputElement).value,
    };

    generateResume(resumeData);
  });

function generateResume(data: ResumeData): void {
  const resumeOutput = document.getElementById("resume-output")!;
  resumeOutput.innerHTML = `
    <div class="resume-header">
      <h3>${data.name}</h3>
    <p>Email: ${data.email}</p>
    </div>

    <div class="resume-section">
      <h4>Education</h4>
      <ul>
        ${
          data.education.length > 0
            ? data.education
                .map(
                  (edu) =>
                    `<li class="education-entry">
                     <div class="title">${edu.degree}</div>
        <div class="school">${edu.institution}</div>
        <div class="years">${edu.gradYear}</div>
                    </li>`
                )
                .join("")
            : "<li>No education details provided.</li>"
        }
      </ul>
    </div>

    <div class="resume-section">
      <h4>Work Experience</h4>
      <ul>
        ${
          data.experience.length > 0
            ? data.experience
                .map(
                  (exp) =>
                    `<li class="experience-entry">
                    <div class="title">${exp.jobTitle}</div>
        <div class="company">${exp.company}</div>
        <div class="years">${exp.years}</div>
                    </li>`
                )
                .join("")
            : "<li>No work experience provided.</li>"
        }
      </ul>
    </div>

    <div class="resume-section">
      <h4>Skills</h4>
      <div class="skills">
      <span class="skill-tag">${data.skills}</span>
    </div>
    <div class="resume-footer">
    <p>Generated by Dynamic Resume Builder</p>
  </div>
    </div>
  `;
}
