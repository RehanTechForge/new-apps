import { setupEditableFields } from "./editableFields";
import { gatherFormData } from "./ResumeDataCollector";
import { generateResume } from "./generateResume";
import { generateUniqueUrl } from "./utils";
import { addEducation, addWorkExperience } from "./resumeFormUtils";

export function setupFormHandlers(): void {
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

  form.addEventListener("submit", handleSubmit);
  addEducationButton.addEventListener("click", addEducation);
  addWorkExperienceButton.addEventListener("click", addWorkExperience);
  closePopupButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  function handleSubmit(e: Event): void {
    e.preventDefault();
    const resumeData = gatherFormData();
    resumeContent.innerHTML = generateResume(resumeData);
    setupEditableFields();
    overlay.style.display = "block";

    const uniqueUrl = generateUniqueUrl(resumeData.name);
    uniqueUrlSpan.textContent = uniqueUrl;
    shareSection.style.display = "block";
  }
}
