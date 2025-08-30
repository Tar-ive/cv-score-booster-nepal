import { CVData } from '@/types/cv.types';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import CreativeTemplate from './CreativeTemplate';
import MinimalTemplate from './MinimalTemplate';
import TechTemplate from './TechTemplate';
import AcademicTemplate from './AcademicTemplate';
import DesignerTemplate from './DesignerTemplate';
import BoldTemplate from './BoldTemplate';
import CompactTemplate from './CompactTemplate';
import ElegantTemplate from './ElegantTemplate';
import SwissTemplate from './SwissTemplate';
import InfographicTemplate from './InfographicTemplate';
import ClassicTemplate from './ClassicTemplate';
import StartupTemplate from './StartupTemplate';

interface TemplateRendererProps {
  templateSlug: string;
  data: CVData;
  className?: string;
  previewMode?: boolean;
  printMode?: boolean;
}

export default function TemplateRenderer({
  templateSlug,
  data,
  className = '',
  previewMode = false,
  printMode = false,
}: TemplateRendererProps) {
  const renderTemplate = () => {
    switch (templateSlug) {
      case 'modern':
        return (
          <ModernTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'professional':
        return (
          <ProfessionalTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'executive':
        return (
          <ExecutiveTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'creative':
        return (
          <CreativeTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'minimal':
        return (
          <MinimalTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'tech':
        return (
          <TechTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'academic':
        return (
          <AcademicTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'designer':
        return (
          <DesignerTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'bold':
        return (
          <BoldTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'compact':
        return (
          <CompactTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'elegant':
        return (
          <ElegantTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'swiss':
        return (
          <SwissTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'infographic':
        return (
          <InfographicTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'classic':
        return (
          <ClassicTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      case 'startup':
        return (
          <StartupTemplate
            data={data}
            className={className}
            printMode={printMode}
            previewMode={previewMode}
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Template not found: {templateSlug}</p>
            <p className="text-sm text-gray-400 mt-2">Using default template</p>
            <div className="mt-4">
              <ModernTemplate
                data={data}
                className={className}
                printMode={printMode}
                previewMode={previewMode}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`template-renderer ${previewMode ? 'preview-mode' : ''} ${printMode ? 'print-mode' : ''}`}>
      {renderTemplate()}
    </div>
  );
}