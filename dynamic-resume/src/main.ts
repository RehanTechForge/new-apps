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
      <h1>${data.name}</h1>
      <p>Email: ${data.email}</p>
      <h2>Education</h2>
      <p>${data.education}</p>
      <h2>Work Experience</h2>
      <p>${data.workExperience}</p>
      <h2>Skills</h2>
      <p>${data.skills}</p>
    `;
  }
});
