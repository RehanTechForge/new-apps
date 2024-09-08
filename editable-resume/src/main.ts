interface FormData {
  name: string;
  email: string;
  education: string;
  workExperience: string;
  skills: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm") as HTMLFormElement;
  const resumePreview = document.getElementById(
    "resumePreview"
  ) as HTMLDivElement;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData: FormData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      education: (document.getElementById("education") as HTMLTextAreaElement)
        .value,
      workExperience: (
        document.getElementById("workExperience") as HTMLTextAreaElement
      ).value,
      skills: (document.getElementById("skills") as HTMLTextAreaElement).value,
    };

    generateResume(formData);
  });

  function generateResume(data: FormData) {
    resumePreview.innerHTML = `
      <div class="editable" contenteditable="true" data-field="name">${data.name}</div>
      <div class="editable" contenteditable="true" data-field="email">Email: ${data.email}</div>
      <h2 class="editable" contenteditable="true" data-field="education">Education</h2>
      <p class="editable" contenteditable="true" data-field="education">${data.education}</p>
      <h2 class="editable" contenteditable="true" data-field="workExperience">Work Experience</h2>
      <p class="editable" contenteditable="true" data-field="workExperience">${data.workExperience}</p>
      <h2 class="editable" contenteditable="true" data-field="skills">Skills</h2>
      <p class="editable" contenteditable="true" data-field="skills">${data.skills}</p>
    `;

    // Add event listeners for editing functionality
    addEditListeners();
  }

  function addEditListeners() {
    const editableElements = document.querySelectorAll(".editable");

    editableElements.forEach((element) => {
      element.addEventListener("blur", () => {
        const field = element.getAttribute("data-field") as keyof FormData;
        updateFormField(field, element.textContent || "");
      });
    });
  }

  function updateFormField(field: keyof FormData, value: string) {
    const textarea = document.getElementById(field) as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = value;
    }
  }
});
