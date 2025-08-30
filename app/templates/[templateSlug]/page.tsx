import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTemplate, getTemplates } from '@/lib/templates/templateRegistry';
import { getSampleData } from '@/lib/templates/sampleData';
import TemplateRenderer from '@/components/templates/TemplateRenderer';

interface PageProps {
  params: Promise<{
    templateSlug: string;
  }>;
}

export default async function TemplatePreviewPage({ params }: PageProps) {
  const { templateSlug } = await params;
  const template = getTemplate(templateSlug);
  
  if (!template) {
    notFound();
  }

  const sampleData = getSampleData();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/templates"
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Templates
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                {template.config.name} Template
              </h1>
            </div>
            <Link
              href={`/builder/${templateSlug}`}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Use This Template
            </Link>
          </div>
        </div>
      </header>

      {/* Template Info */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Category</h3>
              <p className="text-gray-900 capitalize">{template.config.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Features</h3>
              <div className="flex flex-wrap gap-1">
                {template.config.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Layout</h3>
              <p className="text-gray-900">
                {template.config.layout.columns} Column{template.config.layout.columns > 1 ? 's' : ''}
                {template.config.layout.sidebarPosition && `, ${template.config.layout.sidebarPosition} sidebar`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-8">
              <TemplateRenderer
                templateSlug={templateSlug}
                data={sampleData}
                previewMode={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Like this template? Start building your CV now!
            </p>
            <Link
              href={`/builder/${templateSlug}`}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Start Building →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const templates = getTemplates();
  
  return templates.map((template) => ({
    templateSlug: template.slug,
  }));
}