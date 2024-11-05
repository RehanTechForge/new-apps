interface Education {
  degree: FormDataEntryValue | null;
  university: FormDataEntryValue | null;
  graduationYear: FormDataEntryValue | null;
}

interface WorkExperience {
  jobTitle: FormDataEntryValue | null;
  company: FormDataEntryValue | null;
  workDates: FormDataEntryValue | null;
  jobDescription: FormDataEntryValue | null;
}

interface ResumeData {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  education: Education[];
  workExperiences: WorkExperience[];
  skills: string[];
  linkedin: FormDataEntryValue | null;
  github: FormDataEntryValue | null;
  portfolio: FormDataEntryValue | null;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm") as HTMLFormElement | null;
  const addEducationButton = document.getElementById(
    "addEducation"
  ) as HTMLButtonElement | null;
  const addWorkExperienceButton = document.getElementById(
    "addWorkExperience"
  ) as HTMLButtonElement | null;
  const educationSection = document.getElementById(
    "educationSection"
  ) as HTMLDivElement | null;
  const workExperienceSection = document.getElementById(
    "workExperienceSection"
  ) as HTMLDivElement | null;
  const overlay = document.getElementById("overlay") as HTMLDivElement | null;
  const closePopupButton = document.getElementById(
    "closePopup"
  ) as HTMLButtonElement | null;

  const addEducation = () => {
    if (!educationSection) return;

    const education = document.createElement("div");
    education.className = "education";
    education.innerHTML = `
      <input type="text" name="degree[]" placeholder="Degree" required>
      <input type="text" name="university[]" placeholder="University" required>
      <input type="text" name="graduationYear[]" placeholder="Graduation Year" required>
    `;
    educationSection.appendChild(education);
  };

  const addWorkExperience = () => {
    if (!workExperienceSection) return;

    const workExperience = document.createElement("div");
    workExperience.className = "work-experience";
    workExperience.innerHTML = `
      <input type="text" name="jobTitle[]" placeholder="Job Title" required>
      <input type="text" name="company[]" placeholder="Company" required>
      <input type="text" name="workDates[]" placeholder="Work Dates" required>
      <textarea name="jobDescription[]" placeholder="Job Description" required></textarea>
    `;
    workExperienceSection.appendChild(workExperience);
  };

  // const gatherFormData = (): ResumeData | null => {
  //   if (!form) return null;

  //   const formData = new FormData(form);
  //   const education: Education[] = [];
  //   const workExperiences: WorkExperience[] = [];
  //   const degrees = formData.getAll("degree[]");
  //   const universities = formData.getAll("university[]");
  //   const graduationYears = formData.getAll("graduationYear[]");
  //   const jobTitles = formData.getAll("jobTitle[]");
  //   const companies = formData.getAll("company[]");
  //   const workDates = formData.getAll("workDates[]");
  //   const jobDescriptions = formData.getAll("jobDescription[]");

  //   for (let i = 0; i < degrees.length; i++) {
  //     education.push({
  //       degree: degrees[i],
  //       university: universities[i],
  //       graduationYear: graduationYears[i],
  //     });
  //   }

  //   for (let i = 0; i < jobTitles.length; i++) {
  //     workExperiences.push({
  //       jobTitle: jobTitles[i],
  //       company: companies[i],
  //       workDates: workDates[i],
  //       jobDescription: jobDescriptions[i],
  //     });
  //   }

  //   return {
  //     name: formData.get("name"),
  //     email: formData.get("email"),
  //     phone: formData.get("phone"),
  //     description: formData.get("description"),
  //     education,
  //     workExperiences,
  //     skills:
  //       (formData.get("skills") as string | null)
  //         ?.split(",")
  //         .map((skill) => skill.trim()) || [],
  //     linkedin: formData.get("linkedin"),
  //     github: formData.get("github"),
  //     portfolio: formData.get("portfolio"),
  //   };
  // };

  const gatherFormData = (): ResumeData | null => {
    if (!form) return null;

    const formData = new FormData(form);
    const education: Education[] = [];
    const workExperiences: WorkExperience[] = [];

    // Gather education data
    const degrees = formData.getAll("degree[]") as FormDataEntryValue[];
    const universities = formData.getAll(
      "university[]"
    ) as FormDataEntryValue[];
    const graduationYears = formData.getAll(
      "graduationYear[]"
    ) as FormDataEntryValue[];

    for (let i = 0; i < degrees.length; i++) {
      education.push({
        degree: degrees[i] || "",
        university: universities[i] || "",
        graduationYear: graduationYears[i] || "",
      });
    }

    // Gather work experience data
    const jobTitles = formData.getAll("jobTitle[]") as FormDataEntryValue[];
    const companies = formData.getAll("company[]") as FormDataEntryValue[];
    const workDates = formData.getAll("workDates[]") as FormDataEntryValue[];
    const jobDescriptions = formData.getAll(
      "jobDescription[]"
    ) as FormDataEntryValue[];

    for (let i = 0; i < jobTitles.length; i++) {
      workExperiences.push({
        jobTitle: jobTitles[i] || "",
        company: companies[i] || "",
        workDates: workDates[i] || "",
        jobDescription: jobDescriptions[i] || "",
      });
    }

    return {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      description: formData.get("description") || "",
      education,
      workExperiences,
      skills:
        (formData.get("skills") as string)
          ?.split(",")
          .map((skill) => skill.trim()) || [],
      linkedin: formData.get("linkedin") || "",
      github: formData.get("github") || "",
      portfolio: formData.get("portfolio") || "",
    };
  };

  const generateResume = (resumeData: ResumeData): string => {
    return `
        <div class="resume-container">
            <div class="resume-left-column">
                <div class="resume-header">
                    <h1 class="resume-name">${resumeData.name || ""}</h1>
                    <p class="resume-contact">${resumeData.email || ""} | ${
      resumeData.phone || ""
    }</p>
                </div>
                
                <div class="resume-section">
                    <h2><i class="fa-solid fa-code"></i> Skills</h2>
                    <ul class="skills-list">
                        ${resumeData.skills
                          .map((skill) => `<li>${skill}</li>`)
                          .join("")}
                    </ul>
                </div>
                
                <div class="resume-section">
                    <h2><i class="fa-solid fa-share-alt"></i> Social Media</h2>
                    <ul class="social-media-list">
                        ${
                          resumeData.linkedin
                            ? `<li><span class="social-icon"><i class="fa-brands fa-linkedin-in"></i></span><a href="${resumeData.linkedin}" target="_blank">LinkedIn</a></li>`
                            : ""
                        }
                        ${
                          resumeData.github
                            ? `<li><span class="social-icon"><i class="fa-brands fa-github"></i></span><a href="${resumeData.github}" target="_blank">GitHub</a></li>`
                            : ""
                        }
                        ${
                          resumeData.portfolio
                            ? `<li><span class="social-icon"><i class="fa-regular fa-address-card"></i></span><a href="${resumeData.portfolio}" target="_blank">Portfolio</a></li>`
                            : ""
                        }
                    </ul>
                </div>
            </div>
            
            <div class="resume-right-column">
                <div class="resume-section">
                    <h2><i class="fa-solid fa-user-tie"></i> Professional Summary</h2>
                    <p>${resumeData.description || ""}</p>
                </div>

                <div class="resume-section">
                    <h2><i class="fa-solid fa-graduation-cap"></i> Education</h2>
                    ${resumeData.education
                      .map(
                        (edu) => `
                        <div class="education-item">
                            <h3>${edu.degree || ""}</h3>
                            <p>${edu.university || ""}</p>
                            <p>${edu.graduationYear || ""}</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                
                <div class="resume-section">
                    <h2><i class="fa-solid fa-briefcase"></i> Work Experience</h2>
                    ${resumeData.workExperiences
                      .map(
                        (exp) => `
                        <div class="work-experience-item">
                            <h3>${exp.jobTitle || ""}</h3>
                            <p class="company-name">${exp.company || ""}</p>
                            <p class="work-dates">${exp.workDates || ""}</p>
                            <p class="job-description">${
                              exp.jobDescription || ""
                            }</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const resumeData = gatherFormData();
    if (resumeData && document.getElementById("resumeContent")) {
      const resumeContent = generateResume(resumeData);
      (document.getElementById("resumeContent") as HTMLDivElement).innerHTML =
        resumeContent;
      if (overlay) overlay.style.display = "block";
    }
  };

  form?.addEventListener("submit", handleSubmit);
  addEducationButton?.addEventListener("click", addEducation);
  addWorkExperienceButton?.addEventListener("click", addWorkExperience);
  closePopupButton?.addEventListener("click", () => {
    if (overlay) overlay.style.display = "none";
  });
});
