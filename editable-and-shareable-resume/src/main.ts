import { EditableField, FieldType } from "./types/types";
import { addEducation, addWorkExperience } from "./resumeFormUtils";
import { generateResume } from "./generateResume";
import { gatherFormData } from "./ResumeDataCollector";
import { downloadResume, shareResume } from "./resumeActions";
import { generateUniqueUrl } from "./utils";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm") as HTMLFormElement;
  const addEducationButton = document.getElementById(
    "addEducation"
  ) as HTMLButtonElement;
  const addWorkExperienceButton = document.getElementById(
    "addWorkExperience"
  ) as HTMLButtonElement;

  const overlay = document.getElementById("overlay") as HTMLDivElement;
  const closePopupButton = document.getElementById(
    "closePopup"
  ) as HTMLButtonElement;
  const resumeContent = document.getElementById(
    "resumeContent"
  ) as HTMLDivElement;
  const uniqueUrlSpan = document.getElementById("uniqueUrl") as HTMLSpanElement;
  const shareSection = document.getElementById(
    "shareSection"
  ) as HTMLDivElement;

  const shareButton = document.getElementById(
    "shareButton"
  ) as HTMLButtonElement;
  const downloadButton = document.getElementById(
    "downloadButton"
  ) as HTMLButtonElement;

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
