// contentGenerators.ts
import { EditableField, FieldType } from "../types/types";

export function generateEditableContent(
  field: EditableField,
  fieldType: FieldType
): string {
  let content = "";

  switch (fieldType) {
    case "name":
      content = `<input type="text" value="${
        (field.querySelector("h1") as HTMLHeadingElement)?.textContent || ""
      }">`;
      break;

    case "contact":
      const spans = Array.from(field.querySelectorAll("span"));
      const [email, phone] = spans.map((span) => span.textContent || "");

      content = `
        <input type="email" value="${email}">
        <input type="tel" value="${phone}">
      `;
      break;

    case "description":
      content = `<textarea>${
        (field.querySelector("p") as HTMLParagraphElement)?.textContent || ""
      }</textarea>`;
      break;

    case "education":
      const degree =
        (field.querySelector("h3") as HTMLHeadingElement)?.textContent || "";
      const university =
        (field.querySelector(".university") as HTMLSpanElement)?.textContent ||
        "";
      const year =
        (field.querySelector(".graduation-year") as HTMLParagraphElement)
          ?.textContent || "";

      content = `
        <input type="text" value="${degree.trim()}" placeholder="Degree">
        <input type="text" value="${university.trim()}" placeholder="University">
        <input type="text" value="${year.trim()}" placeholder="Graduation Year">
      `;
      break;

    case "workExperience":
      const jobTitle =
        (field.querySelector(".job-title") as HTMLHeadingElement)
          ?.textContent || "";
      const company =
        (field.querySelector(".company") as HTMLSpanElement)?.textContent || "";
      const workDates =
        (field.querySelector(".work-dates") as HTMLParagraphElement)
          ?.textContent || "";
      const jobDescription =
        (field.querySelector(".job-description") as HTMLParagraphElement)
          ?.textContent || "";

      content = `
        <input type="text" value="${jobTitle.trim()}" placeholder="Job Title">
        <input type="text" value="${company.trim()}" placeholder="Company">
        <input type="text" value="${workDates.trim()}" placeholder="Work Dates">
        <textarea placeholder="Job Description">${jobDescription.trim()}</textarea>
      `;
      break;

    case "skills":
      const skills = Array.from(field.querySelectorAll("li"))
        .map((li) => li.textContent?.trim() || "")
        .join(", ");
      content = `<textarea placeholder="Skills (comma-separated)">${skills}</textarea>`;
      break;

    case "languages":
      const languages = Array.from(field.querySelectorAll("li"))
        .map((li) => li.textContent?.trim() || "")
        .join(", ");
      content = `<textarea placeholder="Language (comma-separated)">${languages}</textarea>`;
      break;

    case "socialMedia":
      const links = Array.from(field.querySelectorAll("a"))
        .map((a) => `${a.textContent?.trim()}: ${a.getAttribute("href")}`)
        .join("\n");
      content = `<textarea placeholder="Social Media Links (one per line)">${links}</textarea>`;
      break;

    default:
      console.warn(`Unknown field type: ${fieldType}`);
      return "";
  }

  return content;
}
export function generateSavedContent(
  field: EditableField,
  fieldType: FieldType
): string {
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
      newContent = `<div class="contactMain">
            <div class="contactFirstRow">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="contactSecondRow">
              <p class="emailLabel">Email</p>
              <span>${email.value}</span>
            </div>
          </div>
          <div class="contactMain">
            <div class="contactFirstRow">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="contactSecondRow">
              <p class="phoneLabel">Phone</p>
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
                `<li><i class="fa-solid fa-check-double"></i> ${skill}</li>`
            )
            .join("")}
        </ul>
      `;
      break;
    case "languages":
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
                `<li><i class="fa-solid fa-language"></i> ${language}</li>`
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

  return newContent;
}
