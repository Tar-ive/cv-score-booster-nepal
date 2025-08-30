'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { getTemplate } from '@/lib/templates/templateRegistry';
import { CVData } from '@/types/cv.types';
import { getEmptyCV } from '@/lib/templates/sampleData';
import CVForm from '@/components/builder/CVForm';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import BuilderHeader from '@/components/builder/BuilderHeader';

interface PageProps {
  params: {
    templateSlug: string;
  };
}

export default function BuilderPage({ params }: PageProps) {
  const [cvData, setCvData] = useState<CVData>(getEmptyCV());
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  
  const template = getTemplate(params.templateSlug);
  
  if (!template) {
    notFound();
  }

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('cv-draft');
    if (savedData) {
      try {
        setCvData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('cv-draft', JSON.stringify(cvData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cvData]);

  const handleDataChange = (newData: Partial<CVData>) => {
    setCvData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleExport = () => {
    // This will be implemented when we add PDF export
    console.log('Exporting CV...');
  };

  const handleSave = () => {
    // This would typically save to a backend
    localStorage.setItem('cv-saved', JSON.stringify(cvData));
    alert('CV saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BuilderHeader
        templateName={template.config.name}
        onSave={handleSave}
        onExport={handleExport}
        previewMode={previewMode}
        onTogglePreview={() => setPreviewMode(!previewMode)}
      />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Form Section */}
        <div
          className={`${
            previewMode ? 'hidden lg:block' : 'block'
          } w-full lg:w-1/2 xl:w-2/5 bg-white border-r overflow-y-auto`}
        >
          <CVForm
            data={cvData}
            onChange={handleDataChange}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Preview Section */}
        <div
          className={`${
            previewMode ? 'block' : 'hidden lg:block'
          } w-full lg:w-1/2 xl:w-3/5 bg-gray-100 overflow-y-auto`}
        >
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-xl rounded-lg">
                <div className="p-8">
                  <TemplateRenderer
                    templateSlug={params.templateSlug}
                    data={cvData}
                    previewMode={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}