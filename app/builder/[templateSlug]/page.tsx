'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getTemplate } from '@/lib/templates/templateRegistry';
import { CVData } from '@/types/cv.types';
import { getSampleData } from '@/lib/templates/sampleData';
import CVForm from '@/components/builder/CVForm';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import BuilderHeader from '@/components/builder/BuilderHeader';
import { exportTemplateAsPDF } from '@/lib/utils/pdfExport';

export default function BuilderPage() {
  const params = useParams();
  const templateSlug = params.templateSlug as string;
  const [cvData, setCvData] = useState<CVData>(getSampleData());
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  
  const template = getTemplate(templateSlug);
  
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

  const handleExport = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      await exportTemplateAsPDF(templateSlug, cvData.personalInfo);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
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
        isExporting={isExporting}
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
                    templateSlug={templateSlug}
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