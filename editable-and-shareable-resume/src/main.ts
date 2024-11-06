import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
    languages: string[];
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
    | "languages"
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
  const shareSection = document.getElementById(
    "shareSection"
  ) as HTMLDivElement;
  const uniqueUrlSpan = document.getElementById("uniqueUrl") as HTMLSpanElement;
  const shareButton = document.getElementById(
    "shareButton"
  ) as HTMLButtonElement;
  const downloadButton = document.getElementById(
    "downloadButton"
  ) as HTMLButtonElement;

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
      languages: ((formData.get("languages") as string) || "")
        .split(",")
        .map((language) => language.trim()),
      linkedin: (formData.get("linkedin") as string) || "",
      github: (formData.get("github") as string) || "",
      portfolio: (formData.get("portfolio") as string) || "",
    };
  };

  const generateResume = (resumeData: ResumeData): string => {
    console.log(resumeData.languages);
    return `
      <section class="main-resume">
        <div class="left">
          <section class="editable" data-field="name">
            <h1>${resumeData.name}</h1>
            <button class="edit-button">Edit</button>
          </section>
          <section class="editable" data-field="contact">
            <h2> <i class="fa-solid fa-address-book"></i> Contact</h2>
            <div class="contactMain">
              <div class="contactFirstRow">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <div class="contactSecondRow">
                <p  class="emailLabel">Email</p>
                <span>${resumeData.email}</span>
              </div>
            </div>
            <div class="contactMain">
              <div class="contactFirstRow">
                <i class="fa-solid fa-phone"></i>
              </div>
              <div class="contactSecondRow">
                <p  class="phoneLabel">Phone</p>
                <span>${resumeData.phone}</span>
              </div>
            </div>
            <button class="edit-button">Edit</button>
          </section>
          <section>
            <h2> <i class="fa-solid fa-code"></i> Skills</h2>
            <div class="editable" data-field="skills">
              <ul>
                ${resumeData.skills
                  .map(
                    (skill) =>
                      `<li> <i class="fa-solid fa-check-double"></i> ${skill}</li>`
                  )
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
                    ? `<li> <i class="fa-brands fa-linkedin-in"></i> <a href="${resumeData.linkedin}" target="_blank">  LinkedIn</a></li>`
                    : ""
                }
                ${
                  resumeData.github
                    ? `<li> <i class="fa-brands fa-github"></i> <a href="${resumeData.github}" target="_blank">  GitHub</a></li>`
                    : ""
                }
                ${
                  resumeData.portfolio
                    ? `<li> <i class="fa-regular fa-address-card"></i>  <a href="${resumeData.portfolio}" target="_blank">  Portfolio</a></li>`
                    : ""
                }
              </ul>
              <button class="edit-button">Edit</button>
            </div>
          </section>

          <section>
            <h2> <i class="fa-solid fa-code"></i> Languages</h2>
            <div class="editable" data-field="languages">
              <ul>
                ${resumeData.languages
                  .map(
                    (language) =>
                      `<li> <i class="fa-solid fa-language"></i> ${language}</li>`
                  )
                  .join("")}
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
          
         <section class="education-section">
          <h2 class="section-title">
            <i class="fa-solid fa-graduation-cap"></i> Education
          </h2>
          ${resumeData.education
            .map(
              (edu, index) => `
              <div class="education-item editable" data-field="education" data-index="${index}">
                <div class="education-header">
                  <h3 class="degree">${edu.degree}</h3>
                  <span class="university"> | ${edu.university}</span>
                </div>
                <p class="graduation-year">${edu.graduationYear}</p>
                <button class="edit-button">Edit</button>
              </div>
            `
            )
            .join("")}
        </section>


          
          <section class="work-experience-section">
            <h2 class="section-title">
              <i class="fa-solid fa-briefcase"></i> Work Experience
            </h2>
            ${resumeData.workExperiences
              .map(
                (exp, index) => `
                <div class="work-item editable" data-field="workExperience" data-index="${index}">
                  <div class="work-header">
                    <h3 class="job-title">${exp.jobTitle}</h3>
                    <span class="company">${exp.company}</span>
                  </div>
                  <p class="work-dates">${exp.workDates}</p>
                  <p class="job-description">${exp.jobDescription}</p>
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

  const generateUniqueUrl = (name: string): string => {
    const username = name.toLowerCase().replace(/\s+/g, "-");
    return `${window.location.origin}/${username}/resume`;
  };

  const handleSubmit = (e: Event): void => {
    e.preventDefault();
    const resumeData = gatherFormData();
    resumeContent.innerHTML = generateResume(resumeData);
    setupEditableFields();
    overlay.style.display = "block";

    // Generate and display the unique URL
    const uniqueUrl = generateUniqueUrl(resumeData.name);
    uniqueUrlSpan.textContent = uniqueUrl;
    shareSection.style.display = "block";
  };

  const shareResume = (): void => {
    const uniqueUrl = uniqueUrlSpan.textContent;
    if (!uniqueUrl) {
      console.error("URL is missing.");
      return;
    }
    if (navigator.share) {
      navigator
        .share({
          title: `${gatherFormData().name}'s Resume`,
          text: "Check out my resume!",
          url: uniqueUrl,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      prompt("Copy this link to share your resume:", uniqueUrl);
    }
  };

  const downloadResume = (): void => {
    const doc = new jsPDF();

    html2canvas(resumeContent).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save(`${gatherFormData().name}_resume.pdf`);
    });
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
        const spans = Array.from(field.querySelectorAll("span"));
        const [email, phone] = spans.map((span) => span.textContent || "");
        console.log("EmailValue:", email);
        console.log("PhoneValue:", phone);

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
        const degreeElement = field.querySelector("h3") as HTMLHeadingElement;
        const universityElement = field.querySelector(
          ".university"
        ) as HTMLSpanElement;
        const yearElement = field.querySelector(
          ".graduation-year"
        ) as HTMLParagraphElement;

        // Get the text content from each element, handling any potential null values
        const degree = degreeElement
          ? degreeElement.textContent?.trim() || ""
          : "";
        const university = universityElement
          ? universityElement.textContent?.replace(" | ", "").trim() || ""
          : "";
        const year = yearElement ? yearElement.textContent?.trim() || "" : "";

        // Populate the input fields with the extracted values
        content = `
      <input type="text" value="${degree}" placeholder="Degree">
      <input type="text" value="${university}" placeholder="University">
      <input type="text" value="${year}" placeholder="Graduation Year">
    `;
        break;
      case "workExperience":
        const jobTitle =
          (field.querySelector(".job-title") as HTMLHeadingElement)
            .textContent || "";
        console.log(jobTitle);

        const company = (field.querySelector(".company") as HTMLSpanElement)
          .textContent;
        console.log(company);

        const workDates = (
          field.querySelector(".work-dates") as HTMLParagraphElement
        ).textContent;
        console.log(workDates);

        const jobDescription = (
          field.querySelector(".job-description") as HTMLParagraphElement
        ).textContent;
        console.log(jobDescription);

        content = `
          <input type="text" value="${jobTitle}" placeholder="Job Title">
          <input type="text" value="${company}" placeholder="Company">
          <input type="text" value="${
            workDates || ""
          }" placeholder="Work Dates">
          <textarea placeholder="Job Description">${
            jobDescription || ""
          }</textarea>
        `;
        break;
      case "skills":
        const skills = Array.from(field.querySelectorAll("li"))
          .map((li) => li.textContent)
          .join(", ");
        content = `<textarea placeholder="Skills (comma-separated)">${skills}</textarea>`;
        break;
      case "languages":
        const languages = Array.from(field.querySelectorAll("li"))
          .map((li) => li.textContent)
          .join(", ");
        content = `<textarea placeholder="Language (comma-separated)">${languages}</textarea>`;
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
        console.log(email, phone);

        newContent = `<div class="contactMain">
              <div class="contactFirstRow">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <div class="contactSecondRow">
                <p  class="emailLabel">Email</p>
                <span>${email.value}</span>
              </div>
            </div>
            <div class="contactMain">
              <div class="contactFirstRow">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <div class="contactSecondRow">
                <p  class="phoneLabel">Phone</p>
                <span>${phone.value}</span>
              </div>
            </div>`;
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
          
                <div class="education-header">
                  <h3 class="degree">${degree.value}</h3>
                  <span class="university"> | ${university.value}</span>
                </div>
                <p class="graduation-year">${year.value}</p>
                <button class="edit-button">Edit</button>
              
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
          <div class="work-header">
                    <h3 class="job-title">${jobTitle.value}</h3>
                    <span> - </span>
                    <span class="company">${company.value}</span>
                  </div>
                  <p class="work-dates">${dates.value}</p>
                  <p class="job-description">${description.value}</p>
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
            ${skills
              .map(
                (skill) =>
                  `<li> <i class="fa-solid fa-check-double"></i> ${skill}</li>`
              )
              .join("")}
          </ul>
        `;
        break;
      case "languages":
        console.log("Field", field);

        const languages = (
          (field.querySelector("textarea") as HTMLTextAreaElement).value || ""
        )
          .split(",")
          .map((language) => language.trim());
        newContent = `
          <ul>
            ${languages
              .map(
                (language) =>
                  `<li> <i class="fa-solid fa-language"></i> ${language}</li>`
              )
              .join("")}
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
  shareButton.addEventListener("click", shareResume);
  downloadButton.addEventListener("click", downloadResume);
  addEducationButton.addEventListener("click", addEducation);
  addWorkExperienceButton.addEventListener("click", addWorkExperience);
  closePopupButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });
});
