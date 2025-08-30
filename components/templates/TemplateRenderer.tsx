import { CVData } from '@/types/cv.types';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';

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
      case 'creative':
        // Creative template placeholder - will use Modern as fallback for now
        return (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
            <ModernTemplate
              data={data}
              className={className}
              printMode={printMode}
              previewMode={previewMode}
            />
          </div>
        );
      case 'tech':
        // Tech template placeholder - will use Professional as fallback for now
        return (
          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <ProfessionalTemplate
              data={data}
              className="bg-gray-900 text-white"
              printMode={printMode}
              previewMode={previewMode}
            />
          </div>
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