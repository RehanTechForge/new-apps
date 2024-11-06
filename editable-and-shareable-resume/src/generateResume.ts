import { ResumeData } from "./types/types";

export const generateResume = (resumeData: ResumeData): string => {
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
