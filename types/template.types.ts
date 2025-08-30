// Template-related types
import { CVData } from './cv.types';

export interface Template {
  slug: string;
  name: string;
  description: string;
  category: TemplateCategory;
  thumbnail: string;
  features: string[];
  isPremium?: boolean;
  customizable: CustomizationOptions;
  layout: LayoutOptions;
}

export type TemplateCategory = 
  | 'modern'
  | 'professional'
  | 'creative'
  | 'tech'
  | 'academic'
  | 'executive'
  | 'minimal'
  | 'artistic';

export interface CustomizationOptions {
  colors: boolean;
  fonts: boolean;
  spacing: boolean;
  sections: boolean;
  layout: boolean;
}

export interface LayoutOptions {
  columns: 1 | 2 | 3;
  sidebarPosition?: 'left' | 'right' | 'none';
  headerStyle: 'classic' | 'modern' | 'minimal' | 'bold';
  sectionStyle: 'default' | 'timeline' | 'cards' | 'list';
}

export interface TemplateProps {
  data: CVData;
  className?: string;
  printMode?: boolean;
  previewMode?: boolean;
}

export interface TemplateSection {
  id: string;
  type: string;
  visible: boolean;
  order: number;
  customStyles?: Record<string, any>;
}

export interface TemplateSectionConfig {
  sections: TemplateSection[];
  allowReorder: boolean;
  allowToggle: boolean;
}

// Template Registry
export interface TemplateRegistry {
  [slug: string]: {
    component: React.ComponentType<TemplateProps>;
    config: Template;
  };
}

// Template API Response types
export interface TemplateListResponse {
  templates: Template[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TemplateDetailResponse {
  template: Template;
  sampleData?: CVData;
  previewUrl?: string;
}