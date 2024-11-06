export interface Education {
  degree: string;
  university: string;
  graduationYear: string;
}

export interface WorkExperience {
  jobTitle: string;
  company: string;
  workDates: string;
  jobDescription: string;
}

export interface ResumeData {
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

export type FieldType =
  | "name"
  | "contact"
  | "description"
  | "education"
  | "workExperience"
  | "skills"
  | "languages"
  | "socialMedia";

export interface EditableField extends HTMLElement {
  dataset: {
    field: FieldType;
    index?: string;
  };
}
