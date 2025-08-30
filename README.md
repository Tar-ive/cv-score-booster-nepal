# CV Builder - Professional Resume Templates System

A modern, production-ready CV/Resume builder application built with Next.js, TypeScript, and Tailwind CSS. Features multiple professional templates with dynamic slug-based routing and real-time preview capabilities.

## 🌐 Live Demo

**Production URL:** https://cv-builder-iqut4o0or-sakshams-projects-1f763efb.vercel.app

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Maintenance Guide](#maintenance-guide)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

This CV Builder application allows users to create professional resumes using pre-designed templates. Users can input their information through intuitive forms and see real-time updates in the selected template. The application uses slug-based routing for SEO-friendly URLs and supports multiple template designs.

## Features

### Core Functionality
- ✅ **Multiple Professional Templates**: 4 template designs (Modern, Professional, Creative, Tech)
- ✅ **Dynamic Slug-Based Routing**: SEO-friendly URLs like `/templates/modern`
- ✅ **Live Preview**: Real-time CV preview as users type
- ✅ **Auto-Save**: Automatic saving to browser's localStorage
- ✅ **Responsive Design**: Mobile and desktop compatible
- ✅ **Print Optimization**: Templates optimized for PDF printing
- ✅ **Form Validation**: Input validation for required fields
- ✅ **Section Management**: Add, edit, delete, and reorder CV sections

### CV Sections Supported
- Personal Information (name, contact, location, links)
- Professional Summary
- Work Experience (with achievements)
- Education
- Skills (categorized)
- Projects
- Certifications
- Languages
- Awards & Achievements

## Tech Stack

### Core Technologies
- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **State Management**: React Context API
- **Deployment**: Vercel

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript compiler
- **Build Tool**: Next.js with Turbopack

## Quick Start

```bash
# Clone repository
git clone https://github.com/Tar-ive/cv-score-booster-nepal.git
cd cv-score-booster-nepal
git checkout cv-builder-feature

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser at http://localhost:3000
```

## Project Structure

```
cv-builder/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── templates/               # Template routes
│   │   ├── page.tsx            # Template gallery (/templates)
│   │   └── [templateSlug]/     # Dynamic template preview
│   │       └── page.tsx        # Individual template preview
│   └── builder/                 # Builder routes
│       └── [templateSlug]/     # Dynamic builder
│           └── page.tsx        # CV builder interface
│
├── components/                   # React components
│   ├── builder/                 # Builder-related components
│   │   ├── BuilderHeader.tsx   # Header with actions
│   │   ├── CVForm.tsx          # Main form container
│   │   └── forms/              # Individual section forms
│   │       ├── PersonalInfoForm.tsx
│   │       ├── ExperienceForm.tsx
│   │       ├── EducationForm.tsx
│   │       ├── SkillsForm.tsx
│   │       ├── ProjectsForm.tsx
│   │       ├── CertificationsForm.tsx
│   │       └── LanguagesForm.tsx
│   └── templates/               # Template components
│       ├── ModernTemplate.tsx   # Modern 2-column template
│       ├── ProfessionalTemplate.tsx # Traditional template
│       └── TemplateRenderer.tsx # Dynamic template loader
│
├── contexts/                     # React contexts
│   └── CVContext.tsx            # Global CV data state
│
├── lib/                         # Utility libraries
│   └── templates/               # Template utilities
│       ├── templateRegistry.ts # Template configurations
│       └── sampleData.ts        # Sample CV data
│
├── types/                       # TypeScript definitions
│   ├── cv.types.ts             # CV data types
│   └── template.types.ts       # Template types
│
├── public/                      # Static assets
│   └── (images, icons)
│
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind CSS config
└── README.md                   # This file
```

## Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Detailed Installation Steps

1. **Clone and setup:**
```bash
# Clone the repository
git clone https://github.com/Tar-ive/cv-score-booster-nepal.git
cd cv-score-booster-nepal

# Switch to CV builder branch
git checkout cv-builder-feature

# Install dependencies
npm install
```

2. **Environment Setup:**
No environment variables required for basic functionality. The app works out of the box.

3. **Run Development Server:**
```bash
npm run dev
# App will be available at http://localhost:3000
```

4. **Build for Production:**
```bash
npm run build
npm start
```

## Development Guide

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type checking (add to package.json if needed)
npx tsc --noEmit
```

### Code Style Guidelines

1. **TypeScript Best Practices:**
   - Always use proper types (avoid `any`)
   - Define interfaces for all data structures
   - Use type inference where appropriate

2. **React Best Practices:**
   - Use functional components with hooks
   - Keep components small and focused
   - Use proper prop types
   - Implement proper error boundaries

3. **File Organization:**
   - Components: PascalCase (e.g., `CVForm.tsx`)
   - Utilities: camelCase (e.g., `sampleData.ts`)
   - Types: camelCase with `.types.ts` suffix
   - Routes: kebab-case folders

### Development Workflow

1. **Create Feature Branch:**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes:**
   - Write clean, documented code
   - Follow existing patterns
   - Test thoroughly

3. **Test Your Changes:**
   - Test all templates
   - Check responsive design
   - Verify data persistence
   - Check for console errors

4. **Commit and Push:**
```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

## Deployment

### Deploy to Vercel

1. **Using Vercel CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

2. **Using GitHub Integration:**
   - Connect repository to Vercel
   - Set branch to `cv-builder-feature`
   - Automatic deployments on push

### Manual Deployment

```bash
# Build the project
npm run build

# The output will be in .next folder
# Deploy to any Node.js hosting service
```

## Architecture

### Data Flow Diagram

```
User Input → Form Component → onChange Handler → Context Update → 
LocalStorage Save → Template Re-render → Live Preview Update
```

### Component Architecture

```
App Layout
├── Landing Page
│   └── Navigation → Templates Gallery
├── Template Gallery
│   └── Template Cards → Preview/Use buttons
├── Template Preview
│   └── Sample Data → Template Component
└── CV Builder
    ├── Builder Header (Save/Export)
    ├── CV Form (Left Panel)
    │   ├── Section Navigation
    │   └── Form Sections
    └── Template Preview (Right Panel)
        └── Live Template Render
```

### State Management

- **Global State (CVContext):**
  - CV data
  - Auto-save functionality
  - CRUD operations for sections

- **Local State:**
  - Form editing states
  - UI toggles
  - Validation states

## Maintenance Guide

### Adding a New Template

1. **Create Template Component:**
```typescript
// components/templates/YourTemplate.tsx
import { TemplateProps } from '@/types/template.types';

export default function YourTemplate({ data, className, printMode }: TemplateProps) {
  const { personalInfo, sections } = data;
  
  return (
    <div className={className}>
      {/* Template HTML structure */}
    </div>
  );
}
```

2. **Register in Template Registry:**
```typescript
// lib/templates/templateRegistry.ts
const templates: Template[] = [
  // ... existing templates
  {
    slug: 'your-template',
    name: 'Your Template',
    description: 'Description',
    category: 'modern',
    thumbnail: '/templates/your-template-thumb.png',
    features: ['Feature 1', 'Feature 2'],
    // ... other config
  }
]
```

3. **Update Template Renderer:**
```typescript
// components/templates/TemplateRenderer.tsx
case 'your-template':
  return <YourTemplate {...props} />
```

### Adding a New CV Section

1. **Update Types:**
```typescript
// types/cv.types.ts
interface CVSections {
  // ... existing sections
  newSection: NewSectionItem[];
}

interface NewSectionItem {
  id: string;
  // ... fields
}
```

2. **Create Form Component:**
```typescript
// components/builder/forms/NewSectionForm.tsx
interface Props {
  data: NewSectionItem[];
  onChange: (data: NewSectionItem[]) => void;
}

export default function NewSectionForm({ data, onChange }: Props) {
  // Form implementation
}
```

3. **Add to CV Form:**
```typescript
// components/builder/CVForm.tsx
// Add to sections array
{ key: 'newSection', label: 'New Section', icon: '📝' }

// Add case in renderSectionForm()
case 'newSection':
  return <NewSectionForm ... />
```

### Common Customizations

#### Change Template Colors
```css
/* In template component */
className="bg-blue-600" /* Change to desired color */
```

#### Modify Form Fields
```typescript
// In form component
<input
  type="text"
  value={data.fieldName}
  onChange={(e) => handleChange('fieldName', e.target.value)}
/>
```

#### Update Navigation
```typescript
// app/page.tsx for landing
// components/builder/BuilderHeader.tsx for builder
```

## API Documentation

### Context API Methods

```typescript
import { useCV } from '@/contexts/CVContext';

const {
  cvData,              // Current CV data
  updatePersonalInfo,  // Update personal info
  updateSection,       // Update any section
  addSectionItem,      // Add item to section
  updateSectionItem,   // Update specific item
  deleteSectionItem,   // Delete item
  reorderSectionItems, // Reorder items
  resetCV,            // Reset all data
  saveToStorage,      // Manual save
  loadFromStorage,    // Manual load
} = useCV();
```

### Type Definitions

```typescript
// Main CV Data Structure
interface CVData {
  personalInfo: PersonalInfo;
  sections: CVSections;
  metadata?: CVMetadata;
}

// Template Props
interface TemplateProps {
  data: CVData;
  className?: string;
  printMode?: boolean;
  previewMode?: boolean;
}

// Template Configuration
interface Template {
  slug: string;
  name: string;
  description: string;
  category: TemplateCategory;
  features: string[];
  // ... more fields
}
```

## Troubleshooting

### Common Issues and Solutions

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### TypeScript Errors
```bash
# Check types
npx tsc --noEmit

# Fix linting
npm run lint -- --fix
```

#### Template Not Showing
1. Check template is registered in `templateRegistry.ts`
2. Verify TemplateRenderer includes the case
3. Check browser console for errors
4. Ensure template component is exported correctly

#### Data Not Persisting
1. Check localStorage is enabled
2. Verify CVContext provider wraps app
3. Check browser storage quota
4. Clear localStorage and try again:
```javascript
localStorage.clear()
```

#### Deployment Issues
1. Ensure all dependencies are in package.json
2. Check Next.js version compatibility
3. Verify no hardcoded localhost URLs
4. Check build logs for errors

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Tips
- Use React.memo for expensive components
- Lazy load heavy templates if needed
- Optimize images with Next.js Image
- Use production build for testing performance

## Contributing

### How to Contribute

1. **Fork the Repository**
2. **Create Feature Branch**
```bash
git checkout -b feature/AmazingFeature
```
3. **Make Your Changes**
   - Follow code style guide
   - Add tests if applicable
   - Update documentation
4. **Test Thoroughly**
5. **Submit Pull Request**

### Pull Request Checklist
- [ ] Code follows project style
- [ ] TypeScript types are proper
- [ ] No console errors
- [ ] Responsive design works
- [ ] LocalStorage handling correct
- [ ] Documentation updated
- [ ] Tests pass (if applicable)

### Reporting Issues
1. Check existing issues first
2. Provide clear description
3. Include steps to reproduce
4. Add browser/OS information
5. Include error messages/screenshots

## Future Roadmap

- [ ] PDF Export functionality
- [ ] User authentication system
- [ ] Cloud storage integration
- [ ] Multiple CV management
- [ ] LinkedIn import feature
- [ ] ATS score analyzer
- [ ] AI content suggestions
- [ ] More template designs
- [ ] Custom themes/branding
- [ ] Collaboration features
- [ ] Version history
- [ ] Template marketplace

## License

MIT License - See LICENSE file for details

## Support

For support and questions:
- Create an issue on [GitHub](https://github.com/Tar-ive/cv-score-booster-nepal/issues)
- Check existing issues and discussions
- Contact maintainers

## Credits

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vercel](https://vercel.com/) - Deployment

---

**Maintained by:** CV Score Booster Nepal Team  
**Version:** 1.0.0  
**Last Updated:** August 2024  
**Branch:** cv-builder-feature