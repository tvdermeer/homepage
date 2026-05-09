export interface CVExperience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface CVEducation {
  institution: string;
  degree: string;
  details: string;
  year: string;
}

export interface CVSkillGroup {
  category: string;
  items: string[];
}

export interface CVData {
  experiences: CVExperience[];
  education: CVEducation[];
  skills: CVSkillGroup[];
}
