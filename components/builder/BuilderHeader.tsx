'use client';

import Link from 'next/link';

interface BuilderHeaderProps {
  templateName: string;
  onSave: () => void;
  onExport: () => void;
  previewMode: boolean;
  onTogglePreview: () => void;
}

export default function BuilderHeader({
  templateName,
  onSave,
  onExport,
  previewMode,
  onTogglePreview,
}: BuilderHeaderProps) {
  return (
    <header className="h-16 bg-white border-b shadow-sm">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/templates"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">CV Builder</h1>
            <p className="text-sm text-gray-500">Template: {templateName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePreview}
            className="lg:hidden px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          
          <button
            onClick={onSave}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Save Draft
          </button>
          
          <button
            onClick={onExport}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Export PDF
          </button>
        </div>
      </div>
    </header>
  );
}