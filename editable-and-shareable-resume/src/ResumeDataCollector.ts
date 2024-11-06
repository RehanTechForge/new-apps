import { Education, ResumeData, WorkExperience } from "./types/types";

export const gatherFormData = (): ResumeData => {
  const form = document.getElementById("resumeForm") as HTMLFormElement;
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
