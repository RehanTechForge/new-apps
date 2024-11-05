// document.addEventListener("DOMContentLoaded", () => {
//   interface Education {
//     degree: string;
//     university: string;
//     graduationYear: string;
//   }

//   interface WorkExperience {
//     jobTitle: string;
//     company: string;
//     workDates: string;
//     jobDescription: string;
//   }

//   interface ResumeData {
//     name: string | null;
//     email: string | null;
//     phone: string | null;
//     description: string | null;
//     education: Education[];
//     workExperiences: WorkExperience[];
//     skills: string[];
//     linkedin: string | null;
//     github: string | null;
//     portfolio: string | null;
//   }

//   type FieldType =
//     | "name"
//     | "contact"
//     | "description"
//     | "education"
//     | "workExperience"
//     | "skills"
//     | "socialMedia";

//   interface EditableField extends HTMLElement {
//     dataset: {
//       field: FieldType;
//       index: string;
//     };
//   }

//   interface FieldContent {
//     name: string;
//     contact: { email: string; phone: string };
//     description: string;
//     education: { degree: string; university: string; year: string };
//     workExperience: {
//       jobTitle: string;
//       company: string;
//       dates: string;
//       description: string;
//     };
//     skills: string[];
//     socialMedia: string[];
//   }

//   const form = document.getElementById("resumeForm") as HTMLFormElement;
//   const addEducationButton = document.getElementById(
//     "addEducation"
//   ) as HTMLButtonElement;
//   const addWorkExperienceButton = document.getElementById(
//     "addWorkExperience"
//   ) as HTMLButtonElement;
//   const educationSection = document.getElementById(
//     "educationSection"
//   ) as HTMLDivElement;
//   const workExperienceSection = document.getElementById(
//     "workExperienceSection"
//   ) as HTMLDivElement;
//   const overlay = document.getElementById("overlay") as HTMLDivElement;
//   const closePopupButton = document.getElementById(
//     "closePopup"
//   ) as HTMLButtonElement;
//   const resumeContent = document.getElementById(
//     "resumeContent"
//   ) as HTMLDivElement;

//   const addEducation = () => {
//     const education = document.createElement("div");
//     education.className = "education";
//     education.innerHTML = `
//             <input type="text" name="degree[]" placeholder="Degree" required>
//             <input type="text" name="university[]" placeholder="University" required>
//             <input type="text" name="graduationYear[]" placeholder="Graduation Year" required>
//         `;
//     educationSection.appendChild(education);
//   };

//   const addWorkExperience = () => {
//     const workExperience = document.createElement("div");
//     workExperience.className = "work-experience";
//     workExperience.innerHTML = `
//             <input type="text" name="jobTitle[]" placeholder="Job Title" required>
//             <input type="text" name="company[]" placeholder="Company" required>
//             <input type="text" name="workDates[]" placeholder="Work Dates" required>
//             <textarea name="jobDescription[]" placeholder="Job Description" required></textarea>
//         `;
//     workExperienceSection.appendChild(workExperience);
//   };

//   const gatherFormData = (): ResumeData => {
//     const formData = new FormData(form);
//     const education: Education[] = [];
//     const workExperiences: WorkExperience[] = [];

//     const degrees = formData.getAll("degree[]") as string[];
//     const universities = formData.getAll("university[]") as string[];
//     const graduationYears = formData.getAll("graduationYear[]") as string[];
//     const jobTitles = formData.getAll("jobTitle[]") as string[];
//     const companies = formData.getAll("company[]") as string[];
//     const workDates = formData.getAll("workDates[]") as string[];
//     const jobDescriptions = formData.getAll("jobDescription[]") as string[];

//     for (let i = 0; i < degrees.length; i++) {
//       education.push({
//         degree: degrees[i],
//         university: universities[i],
//         graduationYear: graduationYears[i],
//       });
//     }

//     for (let i = 0; i < jobTitles.length; i++) {
//       workExperiences.push({
//         jobTitle: jobTitles[i],
//         company: companies[i],
//         workDates: workDates[i],
//         jobDescription: jobDescriptions[i],
//       });
//     }

//     return {
//       name: formData.get("name") as string,
//       email: formData.get("email") as string,
//       phone: formData.get("phone") as string,
//       description: formData.get("description") as string,
//       education,
//       workExperiences,
//       skills: (formData.get("skills") as string)
//         .split(",")
//         .map((skill) => skill.trim()),
//       linkedin: formData.get("linkedin") as string,
//       github: formData.get("github") as string,
//       portfolio: formData.get("portfolio") as string,
//     };
//   };

//   const generateResume = (resumeData: ResumeData) => {
//     return `
//         <section class="main-resume">
//             <div class="left">
//                 <section class="editable" data-field="name">
//                     <h1>${resumeData.name}</h1>
//                     <button class="edit-button">Edit</button>
//                 </section>
//                 <section class="editable" data-field="contact">
//                     <p>${resumeData.email} | ${resumeData.phone}</p>
//                     <button class="edit-button">Edit</button>
//                 </section>
//                 <section>
//                     <h2> <i class="fa-solid fa-code"></i> Skills</h2>
//                     <div class="editable" data-field="skills">
//                         <ul>
//                             ${resumeData.skills
//                               .map((skill) => `<li>${skill}</li>`)
//                               .join("")}
//                         </ul>
//                         <button class="edit-button">Edit</button>
//                     </div>
//                 </section>
//                 <section>
//                     <h2> <i class="fa-solid fa-share-nodes"></i> Social Media</h2>
//                     <div class="editable" data-field="socialMedia">
//                         <ul>
//                             ${
//                               resumeData.linkedin
//                                 ? `<li>  <a href="${resumeData.linkedin}" target="_blank"> <i class="fa-brands fa-linkedin-in"></i> LinkedIn</a></li>`
//                                 : ""
//                             }
//                             ${
//                               resumeData.github
//                                 ? `<li>  <a href="${resumeData.github}" target="_blank"> <i class="fa-brands fa-github"></i> GitHub</a></li>`
//                                 : ""
//                             }
//                             ${
//                               resumeData.portfolio
//                                 ? `<li>  <a href="${resumeData.portfolio}" target="_blank"> <i class="fa-regular fa-address-card"></i> Portfolio</a></li>`
//                                 : ""
//                             }
//                         </ul>
//                         <button class="edit-button">Edit</button>
//                     </div>
//                 </section>
//             </div>
//             <div class="right">
//                 <section>
//                     <h2> <i class="fa-solid fa-user-tie"></i> Professional Summary</h2>
//                     <div class="editable" data-field="description">
//                         <p>${resumeData.description}</p>
//                         <button class="edit-button">Edit</button>
//                     </div>
//                 </section>

//                 <section>
//                     <h2> <i class="fa-solid fa-graduation-cap"></i> Education</h2>
//                     ${resumeData.education
//                       .map(
//                         (edu, index) => `
//                         <div class="editable" data-field="education" data-index="${index}">
//                             <h3>${edu.degree} - ${edu.university}</h3>
//                             <p>${edu.graduationYear}</p>
//                             <button class="edit-button">Edit</button>
//                         </div>
//                     `
//                       )
//                       .join("")}
//                 </section>

//                 <section>
//                     <h2> <i class="fa-solid fa-briefcase"></i> Work Experience</h2>
//                     ${resumeData.workExperiences
//                       .map(
//                         (exp, index) => `
//                         <div class="editable" data-field="workExperience" data-index="${index}">
//                             <h3>${exp.jobTitle} - ${exp.company}</h3>
//                             <p>${exp.workDates}</p>
//                             <p>${exp.jobDescription}</p>
//                             <button class="edit-button">Edit</button>
//                         </div>
//                     `
//                       )
//                       .join("")}
//                 </section>
//             </div>
//         </section>
//     `;
//   };

//   const handleSubmit = (e: Event) => {
//     e.preventDefault();
//     const resumeData = gatherFormData();
//     resumeContent.innerHTML = generateResume(resumeData);
//     setupEditableFields();
//     overlay.style.display = "block";
//   };

//   const setupEditableFields = () => {
//     const editableFields = document.querySelectorAll(".editable");
//     editableFields.forEach((field) => {
//       const editButton = field.querySelector(
//         ".edit-button"
//       ) as HTMLButtonElement;
//       editButton.addEventListener("click", () =>
//         makeEditable(field as HTMLDivElement)
//       );
//     });
//   };

//   const makeEditable = (field) => {
//     const fieldType = field.dataset.field;
//     const index = field.dataset.index;
//     let content = "";

//     switch (fieldType) {
//       case "name":
//         content = `<input type="text" value="${
//           field.querySelector("h1").textContent
//         }">`;
//         break;
//       case "contact":
//         const [email, phone] = field
//           .querySelector("p")
//           .textContent.split(" | ");
//         content = `
//                     <input type="email" value="${email}">
//                     <input type="tel" value="${phone}">
//                 `;
//         break;
//       case "description":
//         content = `<textarea>${
//           field.querySelector("p").textContent
//         }</textarea>`;
//         break;
//       case "education":
//         const [degree, university] = field
//           .querySelector("h3")
//           .textContent.split(" - ");
//         const year = field.querySelector("p").textContent;
//         content = `
//                     <input type="text" value="${degree}" placeholder="Degree">
//                     <input type="text" value="${university}" placeholder="University">
//                     <input type="text" value="${year}" placeholder="Graduation Year">
//                 `;
//         break;
//       case "workExperience":
//         const [jobTitle, company] = field
//           .querySelector("h3")
//           .textContent.split(" - ");
//         const dates = field.querySelectorAll("p")[0].textContent;
//         const description = field.querySelectorAll("p")[1].textContent;
//         content = `
//                     <input type="text" value="${jobTitle}" placeholder="Job Title">
//                     <input type="text" value="${company}" placeholder="Company">
//                     <input type="text" value="${dates}" placeholder="Work Dates">
//                     <textarea placeholder="Job Description">${description}</textarea>
//                 `;
//         break;
//       case "skills":
//         const skills = Array.from(field.querySelectorAll("li"))
//           .map((li) => li.textContent)
//           .join(", ");
//         content = `<textarea placeholder="Skills (comma-separated)">${skills}</textarea>`;
//         break;
//       case "socialMedia":
//         const links = Array.from(field.querySelectorAll("a"))
//           .map((a) => `${a.textContent}: ${a.href}`)
//           .join("\n");
//         content = `<textarea placeholder="Social Media Links (one per line)">${links}</textarea>`;
//         break;
//     }

//     field.innerHTML = content;
//     field.classList.add("editing");

//     const saveButton = document.createElement("button");
//     saveButton.textContent = "Save";
//     saveButton.addEventListener("click", () =>
//       saveEdit(field, fieldType, index)
//     );
//     field.appendChild(saveButton);
//   };

//   const saveEdit = (field, fieldType, index) => {
//     let newContent = "";

//     switch (fieldType) {
//       case "name":
//         newContent = `<h1>${field.querySelector("input").value}</h1>`;
//         break;
//       case "contact":
//         const [email, phone] = field.querySelectorAll("input");
//         newContent = `<p>${email.value} | ${phone.value}</p>`;
//         break;
//       case "description":
//         newContent = `<p>${field.querySelector("textarea").value}</p>`;
//         break;
//       case "education":
//         const [degree, university, year] = field.querySelectorAll("input");
//         newContent = `
//                     <h3>${degree.value} - ${university.value}</h3>
//                     <p>${year.value}</p>
//                 `;
//         break;
//       case "workExperience":
//         const [jobTitle, company, dates] = field.querySelectorAll("input");
//         const description = field.querySelector("textarea");
//         newContent = `
//                     <h3>${jobTitle.value} - ${company.value}</h3>
//                     <p>${dates.value}</p>
//                     <p>${description.value}</p>
//                 `;
//         break;
//       case "skills":
//         const skills = field
//           .querySelector("textarea")
//           .value.split(",")
//           .map((skill) => skill.trim());
//         newContent = `
//                     <ul>
//                         ${skills.map((skill) => `<li>${skill}</li>`).join("")}
//                     </ul>
//                 `;
//         break;
//       case "socialMedia":
//         const links = field
//           .querySelector("textarea")
//           .value.split("\n")
//           .filter((link) => link.trim() !== "");
//         newContent = `
//                     <ul>
//                         ${links
//                           .map((link) => {
//                             const [platform, url] = link
//                               .split(":")
//                               .map((item) => item.trim());
//                             return `<li><a href="${url}" target="_blank">${platform}</a></li>`;
//                           })
//                           .join("")}
//                     </ul>
//                 `;
//         break;
//     }

//     field.innerHTML = newContent;
//     field.classList.remove("editing");
//     const editButton = document.createElement("button");
//     editButton.textContent = "Edit";
//     editButton.className = "edit-button";
//     editButton.addEventListener("click", () => makeEditable(field));
//     field.appendChild(editButton);
//   };

//   form.addEventListener("submit", handleSubmit);
//   addEducationButton.addEventListener("click", addEducation);
//   addWorkExperienceButton.addEventListener("click", addWorkExperience);
//   closePopupButton.addEventListener("click", () => {
//     overlay.style.display = "none";
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  interface Education {
    degree: string;
    university: string;
    graduationYear: string;
  }

  interface WorkExperience {
    jobTitle: string;
    company: string;
    workDates: string;
    jobDescription: string;
  }

  interface ResumeData {
    name: string;
    email: string;
    phone: string;
    description: string;
    education: Education[];
    workExperiences: WorkExperience[];
    skills: string[];
    linkedin: string;
    github: string;
    portfolio: string;
  }

  type FieldType =
    | "name"
    | "contact"
    | "description"
    | "education"
    | "workExperience"
    | "skills"
    | "socialMedia";

  interface EditableField extends HTMLElement {
    dataset: {
      field: FieldType;
      index?: string;
    };
  }

  const form = document.getElementById("resumeForm") as HTMLFormElement;
  const addEducationButton = document.getElementById(
    "addEducation"
  ) as HTMLButtonElement;
  const addWorkExperienceButton = document.getElementById(
    "addWorkExperience"
  ) as HTMLButtonElement;
  const educationSection = document.getElementById(
    "educationSection"
  ) as HTMLDivElement;
  const workExperienceSection = document.getElementById(
    "workExperienceSection"
  ) as HTMLDivElement;
  const overlay = document.getElementById("overlay") as HTMLDivElement;
  const closePopupButton = document.getElementById(
    "closePopup"
  ) as HTMLButtonElement;
  const resumeContent = document.getElementById(
    "resumeContent"
  ) as HTMLDivElement;

  const addEducation = (): void => {
    const education = document.createElement("div");
    education.className = "education";
    education.innerHTML = `
      <input type="text" name="degree[]" placeholder="Degree" required>
      <input type="text" name="university[]" placeholder="University" required>
      <input type="text" name="graduationYear[]" placeholder="Graduation Year" required>
    `;
    educationSection.appendChild(education);
  };

  const addWorkExperience = (): void => {
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

  const gatherFormData = (): ResumeData => {
    const formData = new FormData(form);
    const education: Education[] = [];
    const workExperiences: WorkExperience[] = [];

    const degrees = formData.getAll("degree[]") as string[];
    const universities = formData.getAll("university[]") as string[];
    const graduationYears = formData.getAll("graduationYear[]") as string[];
    const jobTitles = formData.getAll("jobTitle[]") as string[];
    const companies = formData.getAll("company[]") as string[];
    const workDates = formData.getAll("workDates[]") as string[];
    const jobDescriptions = formData.getAll("jobDescription[]") as string[];

    for (let i = 0; i < degrees.length; i++) {
      education.push({
        degree: degrees[i],
        university: universities[i],
        graduationYear: graduationYears[i],
      });
    }

    for (let i = 0; i < jobTitles.length; i++) {
      workExperiences.push({
        jobTitle: jobTitles[i],
        company: companies[i],
        workDates: workDates[i],
        jobDescription: jobDescriptions[i],
      });
    }

    return {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || "",
      description: (formData.get("description") as string) || "",
      education,
      workExperiences,
      skills: ((formData.get("skills") as string) || "")
        .split(",")
        .map((skill) => skill.trim()),
      linkedin: (formData.get("linkedin") as string) || "",
      github: (formData.get("github") as string) || "",
      portfolio: (formData.get("portfolio") as string) || "",
    };
  };

  const generateResume = (resumeData: ResumeData): string => {
    return `
      <section class="main-resume">
        <div class="left">
          <section class="editable" data-field="name">
            <h1>${resumeData.name}</h1>
            <button class="edit-button">Edit</button>
          </section>
          <section class="editable" data-field="contact">
            <p>${resumeData.email} | ${resumeData.phone}</p>
            <button class="edit-button">Edit</button>
          </section>
          <section>
            <h2> <i class="fa-solid fa-code"></i> Skills</h2>
            <div class="editable" data-field="skills">
              <ul>
                ${resumeData.skills
                  .map((skill) => `<li>${skill}</li>`)
                  .join("")}
              </ul>
              <button class="edit-button">Edit</button>
            </div>
          </section>
          <section>
            <h2> <i class="fa-solid fa-share-nodes"></i> Social Media</h2>
            <div class="editable" data-field="socialMedia">
              <ul>
                ${
                  resumeData.linkedin
                    ? `<li>  <a href="${resumeData.linkedin}" target="_blank"> <i class="fa-brands fa-linkedin-in"></i> LinkedIn</a></li>`
                    : ""
                }
                ${
                  resumeData.github
                    ? `<li>  <a href="${resumeData.github}" target="_blank"> <i class="fa-brands fa-github"></i> GitHub</a></li>`
                    : ""
                }
                ${
                  resumeData.portfolio
                    ? `<li>  <a href="${resumeData.portfolio}" target="_blank"> <i class="fa-regular fa-address-card"></i> Portfolio</a></li>`
                    : ""
                }
              </ul>
              <button class="edit-button">Edit</button>
            </div>
          </section>
        </div>
        <div class="right">
          <section>
            <h2> <i class="fa-solid fa-user-tie"></i> Professional Summary</h2>
            <div class="editable" data-field="description">
              <p>${resumeData.description}</p>
              <button class="edit-button">Edit</button>
            </div>
          </section>
          
          <section>
            <h2> <i class="fa-solid fa-graduation-cap"></i> Education</h2>
            ${resumeData.education
              .map(
                (edu, index) => `
                <div class="editable" data-field="education" data-index="${index}">
                  <h3>${edu.degree} - ${edu.university}</h3>
                  <p>${edu.graduationYear}</p>
                  <button class="edit-button">Edit</button>
                </div>
              `
              )
              .join("")}
          </section>
          
          <section>
            <h2> <i class="fa-solid fa-briefcase"></i> Work Experience</h2>
            ${resumeData.workExperiences
              .map(
                (exp, index) => `
                <div class="editable" data-field="workExperience" data-index="${index}">
                  <h3>${exp.jobTitle} - ${exp.company}</h3>
                  <p>${exp.workDates}</p>
                  <p>${exp.jobDescription}</p>
                  <button class="edit-button">Edit</button>
                </div>
              `
              )
              .join("")}
          </section>
        </div>
      </section>
    `;
  };

  const handleSubmit = (e: Event): void => {
    e.preventDefault();
    const resumeData = gatherFormData();
    resumeContent.innerHTML = generateResume(resumeData);
    setupEditableFields();
    overlay.style.display = "block";
  };

  const setupEditableFields = (): void => {
    const editableFields = document.querySelectorAll(".editable");
    editableFields.forEach((field) => {
      const editButton = field.querySelector(
        ".edit-button"
      ) as HTMLButtonElement;
      editButton.addEventListener("click", () =>
        makeEditable(field as EditableField)
      );
    });
  };

  const makeEditable = (field: EditableField): void => {
    const fieldType = field.dataset.field;
    let content = "";

    switch (fieldType) {
      case "name":
        content = `<input type="text" value="${
          (field.querySelector("h1") as HTMLHeadingElement).textContent || ""
        }">`;
        break;
      case "contact":
        const [email, phone] = (
          (field.querySelector("p") as HTMLParagraphElement).textContent || ""
        ).split(" | ");
        content = `
          <input type="email" value="${email}">
          <input type="tel" value="${phone}">
        `;
        break;
      case "description":
        content = `<textarea>${
          (field.querySelector("p") as HTMLParagraphElement).textContent || ""
        }</textarea>`;
        break;
      case "education":
        const [degree, university] = (
          (field.querySelector("h3") as HTMLHeadingElement).textContent || ""
        ).split(" - ");
        const year = (field.querySelector("p") as HTMLParagraphElement)
          .textContent;
        content = `
          <input type="text" value="${degree}" placeholder="Degree">
          <input type="text" value="${university}" placeholder="University">
          <input type="text" value="${
            year || ""
          }" placeholder="Graduation Year">
        `;
        break;
      case "workExperience":
        const [jobTitle, company] = (
          (field.querySelector("h3") as HTMLHeadingElement).textContent || ""
        ).split(" - ");
        const dates = (field.querySelectorAll("p")[0] as HTMLParagraphElement)
          .textContent;
        const description = (
          field.querySelectorAll("p")[1] as HTMLParagraphElement
        ).textContent;
        content = `
          <input type="text" value="${jobTitle}" placeholder="Job Title">
          <input type="text" value="${company}" placeholder="Company">
          <input type="text" value="${dates || ""}" placeholder="Work Dates">
          <textarea placeholder="Job Description">${
            description || ""
          }</textarea>
        `;
        break;
      case "skills":
        const skills = Array.from(field.querySelectorAll("li"))
          .map((li) => li.textContent)
          .join(", ");
        content = `<textarea placeholder="Skills (comma-separated)">${skills}</textarea>`;
        break;
      case "socialMedia":
        const links = Array.from(field.querySelectorAll("a"))
          .map((a) => `${a.textContent}: ${a.getAttribute("href")}`)
          .join("\n");
        content = `<textarea placeholder="Social Media Links (one per line)">${links}</textarea>`;
        break;
    }

    field.innerHTML = content;
    field.classList.add("editing");

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => saveEdit(field, fieldType));
    field.appendChild(saveButton);
  };

  const saveEdit = (field: EditableField, fieldType: FieldType): void => {
    let newContent = "";

    switch (fieldType) {
      case "name":
        newContent = `<h1>${
          (field.querySelector("input") as HTMLInputElement).value
        }</h1>`;
        break;
      case "contact":
        const [email, phone] = field.querySelectorAll(
          "input"
        ) as NodeListOf<HTMLInputElement>;
        newContent = `<p>${email.value} | ${phone.value}</p>`;
        break;
      case "description":
        newContent = `<p>${
          (field.querySelector("textarea") as HTMLTextAreaElement).value
        }</p>`;
        break;
      case "education":
        const [degree, university, year] = field.querySelectorAll(
          "input"
        ) as NodeListOf<HTMLInputElement>;
        newContent = `
          <h3>${degree.value} - ${university.value}</h3>
          <p>${year.value}</p>
        `;
        break;
      case "workExperience":
        const [jobTitle, company, dates] = field.querySelectorAll(
          "input"
        ) as NodeListOf<HTMLInputElement>;
        const description = field.querySelector(
          "textarea"
        ) as HTMLTextAreaElement;
        newContent = `
          <h3>${jobTitle.value} - ${company.value}</h3>
          <p>${dates.value}</p>
          <p>${description.value}</p>
        `;
        break;
      case "skills":
        const skills = (
          (field.querySelector("textarea") as HTMLTextAreaElement).value || ""
        )
          .split(",")
          .map((skill) => skill.trim());
        newContent = `
          <ul>
            ${skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        `;
        break;
      case "socialMedia":
        const links = (
          (field.querySelector("textarea") as HTMLTextAreaElement).value || ""
        )
          .split("\n")
          .filter((link) => link.trim() !== "");
        newContent = `
          <ul>
            ${links
              .map((link) => {
                const [platform, url] = link
                  .split(":")
                  .map((item) => item.trim());
                return `<li><a href="${url}" target="_blank">${platform}</a></li>`;
              })
              .join("")}
          </ul>
        `;
        break;
    }

    field.innerHTML = newContent;
    field.classList.remove("editing");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.addEventListener("click", () => makeEditable(field));
    field.appendChild(editButton);
  };

  form.addEventListener("submit", handleSubmit);
  addEducationButton.addEventListener("click", addEducation);
  addWorkExperienceButton.addEventListener("click", addWorkExperience);
  closePopupButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });
});
