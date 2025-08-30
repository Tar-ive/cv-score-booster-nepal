import Link from 'next/link';
import { getTemplates } from '@/lib/templates/templateRegistry';

export default function TemplatesPage() {
  const templates = getTemplates();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your CV Template
          </h1>
          <p className="text-lg text-gray-600">
            Select from our professionally designed templates to create your perfect CV
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.slug}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-3 aspect-h-4 bg-gray-200">
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-gray-500">Template Preview</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/templates/${template.slug}`}
                    className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/builder/${template.slug}`}
                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Use Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}