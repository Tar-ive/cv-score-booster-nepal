import { Template } from '@/types/template.types';

// Template configurations - 15 unique templates
const templates: Template[] = [
  // 1. Modern - With photo support
  {
    slug: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with photo support',
    category: 'modern',
    thumbnail: '/templates/modern-thumb.png',
    features: ['Two-column layout', 'Profile photo', 'Skill ratings', 'Modern icons'],
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
  // 2. Professional - No photo
  {
    slug: 'professional',
    name: 'Professional',
    description: 'Traditional formal design for corporate positions',
    category: 'professional',
    thumbnail: '/templates/professional-thumb.png',
    features: ['Single column', 'Classic typography', 'Formal structure', 'Print-optimized'],
    isPremium: false,
    customizable: {
      colors: false,
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
  // 3. Executive - With photo support
  {
    slug: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior positions with photo',
    category: 'executive',
    thumbnail: '/templates/executive-thumb.png',
    features: ['Profile photo', 'Executive summary', 'Achievement focused', 'Premium look'],
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
  // 4. Creative - With photo and colors
  {
    slug: 'creative',
    name: 'Creative',
    description: 'Bold and artistic design with vibrant colors',
    category: 'creative',
    thumbnail: '/templates/creative-thumb.png',
    features: ['Profile photo', 'Color accents', 'Portfolio section', 'Unique layout'],
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
      headerStyle: 'bold',
      sectionStyle: 'cards',
    },
  },
  // 5. Minimal - No photo
  {
    slug: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design focusing on content',
    category: 'minimal',
    thumbnail: '/templates/minimal-thumb.png',
    features: ['Minimalist design', 'Clean typography', 'White space', 'Content focused'],
    isPremium: false,
    customizable: {
      colors: false,
      fonts: true,
      spacing: true,
      sections: true,
      layout: false,
    },
    layout: {
      columns: 1,
      sidebarPosition: 'none',
      headerStyle: 'minimal',
      sectionStyle: 'default',
    },
  },
  // 6. Tech - With photo support
  {
    slug: 'tech',
    name: 'Tech',
    description: 'Developer-focused template with profile photo',
    category: 'tech',
    thumbnail: '/templates/tech-thumb.png',
    features: ['Profile photo', 'GitHub stats', 'Project showcase', 'Tech stack display'],
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
  // 7. Academic - No photo
  {
    slug: 'academic',
    name: 'Academic',
    description: 'Formal design for academic and research positions',
    category: 'academic',
    thumbnail: '/templates/academic-thumb.png',
    features: ['Publications section', 'Research focus', 'Citations', 'Academic structure'],
    isPremium: false,
    customizable: {
      colors: false,
      fonts: true,
      spacing: true,
      sections: true,
      layout: false,
    },
    layout: {
      columns: 1,
      sidebarPosition: 'none',
      headerStyle: 'classic',
      sectionStyle: 'list',
    },
  },
  // 8. Designer - With photo and colors
  {
    slug: 'designer',
    name: 'Designer',
    description: 'Visually striking template for creative professionals',
    category: 'artistic',
    thumbnail: '/templates/designer-thumb.png',
    features: ['Profile photo', 'Portfolio grid', 'Color palette', 'Visual hierarchy'],
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
  // 9. Compact - No photo
  {
    slug: 'compact',
    name: 'Compact',
    description: 'Space-efficient design for maximum content',
    category: 'minimal',
    thumbnail: '/templates/compact-thumb.png',
    features: ['Dense layout', 'Maximum content', 'One-page optimized', 'ATS-friendly'],
    isPremium: false,
    customizable: {
      colors: false,
      fonts: true,
      spacing: false,
      sections: true,
      layout: false,
    },
    layout: {
      columns: 2,
      sidebarPosition: 'none',
      headerStyle: 'minimal',
      sectionStyle: 'list',
    },
  },
  // 10. Elegant - With photo support
  {
    slug: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated and refined design with photo',
    category: 'professional',
    thumbnail: '/templates/elegant-thumb.png',
    features: ['Profile photo', 'Elegant typography', 'Subtle accents', 'Premium feel'],
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
      sidebarPosition: 'left',
      headerStyle: 'modern',
      sectionStyle: 'default',
    },
  },
  // 11. Bold - No photo but with colors
  {
    slug: 'bold',
    name: 'Bold',
    description: 'Strong visual impact with bold typography',
    category: 'modern',
    thumbnail: '/templates/bold-thumb.png',
    features: ['Bold headers', 'Color blocks', 'Strong contrast', 'Eye-catching'],
    isPremium: false,
    customizable: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true,
      layout: true,
    },
    layout: {
      columns: 1,
      sidebarPosition: 'none',
      headerStyle: 'bold',
      sectionStyle: 'cards',
    },
  },
  // 12. Swiss - No photo
  {
    slug: 'swiss',
    name: 'Swiss',
    description: 'Clean Swiss design principles',
    category: 'minimal',
    thumbnail: '/templates/swiss-thumb.png',
    features: ['Grid layout', 'Swiss typography', 'Structured', 'Professional'],
    isPremium: false,
    customizable: {
      colors: false,
      fonts: false,
      spacing: true,
      sections: true,
      layout: false,
    },
    layout: {
      columns: 2,
      sidebarPosition: 'none',
      headerStyle: 'minimal',
      sectionStyle: 'default',
    },
  },
  // 13. Infographic - With photo and colors
  {
    slug: 'infographic',
    name: 'Infographic',
    description: 'Visual resume with infographic elements',
    category: 'creative',
    thumbnail: '/templates/infographic-thumb.png',
    features: ['Profile photo', 'Data visualization', 'Icons', 'Visual stats'],
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
      sidebarPosition: 'left',
      headerStyle: 'modern',
      sectionStyle: 'cards',
    },
  },
  // 14. Classic - No photo
  {
    slug: 'classic',
    name: 'Classic',
    description: 'Timeless traditional resume design',
    category: 'professional',
    thumbnail: '/templates/classic-thumb.png',
    features: ['Traditional layout', 'Serif fonts', 'Conservative', 'Universal'],
    isPremium: false,
    customizable: {
      colors: false,
      fonts: false,
      spacing: true,
      sections: true,
      layout: false,
    },
    layout: {
      columns: 1,
      sidebarPosition: 'none',
      headerStyle: 'classic',
      sectionStyle: 'list',
    },
  },
  // 15. Startup - With photo support and colors
  {
    slug: 'startup',
    name: 'Startup',
    description: 'Modern startup-style resume with personality',
    category: 'modern',
    thumbnail: '/templates/startup-thumb.png',
    features: ['Profile photo', 'Casual tone', 'Project highlights', 'Modern colors'],
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
      sidebarPosition: 'right',
      headerStyle: 'modern',
      sectionStyle: 'timeline',
    },
  },
];

// Summary of templates:
// With Photo Support (8): modern, executive, creative, tech, designer, elegant, infographic, startup
// Without Photo (7): professional, minimal, academic, compact, bold, swiss, classic
// With Customizable Colors (9): modern, executive, creative, tech, designer, elegant, bold, infographic, startup
// Without Customizable Colors (6): professional, minimal, academic, compact, swiss, classic

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

// Get templates with photo support
export function getTemplatesWithPhoto(): Template[] {
  const photoTemplates = ['modern', 'executive', 'creative', 'tech', 'designer', 'elegant', 'infographic', 'startup'];
  return templates.filter(t => photoTemplates.includes(t.slug));
}

// Get templates with color customization
export function getTemplatesWithColors(): Template[] {
  return templates.filter(t => t.customizable.colors === true);
}