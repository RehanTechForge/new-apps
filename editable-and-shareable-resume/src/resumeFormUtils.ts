export const addEducation = (): void => {
  const educationSection = document.getElementById(
    "educationSection"
  ) as HTMLDivElement;

  const education = document.createElement("div");
  education.className = "education";
  education.innerHTML = `
      <input type="text" name="degree[]" placeholder="Degree" required>
      <input type="text" name="university[]" placeholder="University" required>
      <input type="text" name="graduationYear[]" placeholder="Graduation Year" required>
    `;
  educationSection.appendChild(education);
};

export const addWorkExperience = (): void => {
  const workExperienceSection = document.getElementById(
    "workExperienceSection"
  ) as HTMLDivElement;
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
