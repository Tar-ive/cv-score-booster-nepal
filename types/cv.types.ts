// Core CV data types
export interface CVData {
  id?: string;
  personalInfo: PersonalInfo;
  sections: CVSections;
  metadata?: CVMetadata;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: {
    city: string;
    state?: string;
    country: string;
  };
  photo?: string;
  summary?: string;
  links?: SocialLink[];
}

export interface SocialLink {
  type: 'linkedin' | 'github' | 'portfolio' | 'twitter' | 'other';
  url: string;
  label?: string;
}

export interface CVSections {
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  awards?: AwardItem[];
  publications?: PublicationItem[];
  references?: ReferenceItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  rating?: number; // 1-5 or 1-10
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  githubUrl?: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'basic' | 'conversational' | 'professional' | 'native';
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
  authors?: string[];
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
}

export interface CVMetadata {
  templateSlug: string;
  createdAt: string;
  updatedAt: string;
  version?: number;
  isPublic?: boolean;
  customStyles?: CustomStyles;
}

export interface CustomStyles {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  fontSize?: 'small' | 'medium' | 'large';
  spacing?: 'compact' | 'normal' | 'relaxed';
}

// Form-related types
export type CVSectionKey = keyof CVSections;

export interface FormSection {
  key: CVSectionKey;
  title: string;
  description?: string;
  required?: boolean;
  maxItems?: number;
}

// Validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}