import { Template } from '@/types/template.types';

// Template configurations
const templates: Template[] = [
  {
    slug: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a focus on readability',
    category: 'modern',
    thumbnail: '/templates/modern-thumb.png',
    features: ['Two-column layout', 'Skill ratings', 'Modern icons', 'ATS-friendly'],
    isPremium: false,
    customizable: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true,
      layout: true,
    },
    layout: {
      columns: 2,
      sidebarPosition: 'left',
      headerStyle: 'modern',
      sectionStyle: 'default',
    },
  },
  {
    slug: 'professional',
    name: 'Professional',
    description: 'Traditional and formal design perfect for corporate positions',
    category: 'professional',
    thumbnail: '/templates/professional-thumb.png',
    features: ['Single column', 'Classic typography', 'Formal structure', 'Print-optimized'],
    isPremium: false,
    customizable: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true,
      layout: false,
    },
    layout: {
      columns: 1,
      sidebarPosition: 'none',
      headerStyle: 'classic',
      sectionStyle: 'default',
    },
  },
  {
    slug: 'creative',
    name: 'Creative',
    description: 'Bold and artistic design for creative professionals',
    category: 'creative',
    thumbnail: '/templates/creative-thumb.png',
    features: ['Unique layout', 'Color accents', 'Portfolio section', 'Visual hierarchy'],
    isPremium: true,
    customizable: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true,
      layout: true,
    },
    layout: {
      columns: 2,
      sidebarPosition: 'right',
      headerStyle: 'bold',
      sectionStyle: 'cards',
    },
  },
  {
    slug: 'tech',
    name: 'Tech',
    description: 'Developer-focused template with emphasis on technical skills',
    category: 'tech',
    thumbnail: '/templates/tech-thumb.png',
    features: ['GitHub integration', 'Project showcase', 'Tech stack display', 'Code-friendly'],
    isPremium: false,
    customizable: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true,
      layout: true,
    },
    layout: {
      columns: 2,
      sidebarPosition: 'left',
      headerStyle: 'minimal',
      sectionStyle: 'timeline',
    },
  },
];

// Get all templates
export function getTemplates(): Template[] {
  return templates;
}

// Get a single template by slug
export function getTemplate(slug: string): { config: Template } | undefined {
  const template = templates.find(t => t.slug === slug);
  if (template) {
    return { config: template };
  }
  return undefined;
}

// Get templates by category
export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(t => t.category === category);
}

// Get free templates
export function getFreeTemplates(): Template[] {
  return templates.filter(t => !t.isPremium);
}

// Get premium templates
export function getPremiumTemplates(): Template[] {
  return templates.filter(t => t.isPremium);
}

// Check if a template exists
export function templateExists(slug: string): boolean {
  return templates.some(t => t.slug === slug);
}

// Get template categories
export function getTemplateCategories(): string[] {
  const categories = new Set(templates.map(t => t.category));
  return Array.from(categories);
}