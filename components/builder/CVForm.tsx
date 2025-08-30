'use client';

import { CVData, CVSectionKey } from '@/types/cv.types';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import LanguagesForm from './forms/LanguagesForm';

interface CVFormProps {
  data: CVData;
  onChange: (data: Partial<CVData>) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { key: 'personal', label: 'Personal Info', icon: '👤' },
  { key: 'experience', label: 'Experience', icon: '💼' },
  { key: 'education', label: 'Education', icon: '🎓' },
  { key: 'skills', label: 'Skills', icon: '🛠️' },
  { key: 'projects', label: 'Projects', icon: '📁' },
  { key: 'certifications', label: 'Certifications', icon: '📜' },
  { key: 'languages', label: 'Languages', icon: '🌐' },
];

export default function CVForm({ data, onChange, activeSection, onSectionChange }: CVFormProps) {
  const handlePersonalInfoChange = (personalInfo: Partial<CVData['personalInfo']>) => {
    onChange({ personalInfo: { ...data.personalInfo, ...personalInfo } });
  };

  const handleSectionChange = (sectionKey: CVSectionKey, sectionData: unknown) => {
    onChange({
      sections: {
        ...data.sections,
        [sectionKey]: sectionData,
      },
    });
  };

  const renderSectionForm = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={data.personalInfo}
            onChange={handlePersonalInfoChange}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={data.sections.experience}
            onChange={(experience) => handleSectionChange('experience', experience)}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={data.sections.education}
            onChange={(education) => handleSectionChange('education', education)}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={data.sections.skills}
            onChange={(skills) => handleSectionChange('skills', skills)}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={data.sections.projects}
            onChange={(projects) => handleSectionChange('projects', projects)}
          />
        );
      case 'certifications':
        return (
          <CertificationsForm
            data={data.sections.certifications}
            onChange={(certifications) => handleSectionChange('certifications', certifications)}
          />
        );
      case 'languages':
        return (
          <LanguagesForm
            data={data.sections.languages}
            onChange={(languages) => handleSectionChange('languages', languages)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full">
      {/* Section Navigation */}
      <div className="w-48 bg-gray-50 border-r">
        <nav className="p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            CV Sections
          </h3>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.key}>
                <button
                  onClick={() => onSectionChange(section.key)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.key
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderSectionForm()}
        </div>
      </div>
    </div>
  );
}