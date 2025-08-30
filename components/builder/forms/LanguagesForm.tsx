'use client';

import { LanguageItem } from '@/types/cv.types';

interface LanguagesFormProps {
  data: LanguageItem[];
  onChange: (data: LanguageItem[]) => void;
}

export default function LanguagesForm({ data, onChange }: LanguagesFormProps) {
  const handleAdd = () => {
    const newItem: LanguageItem = {
      id: Date.now().toString(),
      language: '',
      proficiency: 'conversational',
    };
    onChange([...data, newItem]);
  };

  const handleUpdate = (id: string, field: keyof LanguageItem, value: string) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add languages you speak.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Language
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <input
                  type="text"
                  value={item.language}
                  onChange={(e) => handleUpdate(item.id, 'language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., English, Spanish"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency
                </label>
                <select
                  value={item.proficiency}
                  onChange={(e) => handleUpdate(item.id, 'proficiency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="basic">Basic</option>
                  <option value="conversational">Conversational</option>
                  <option value="professional">Professional</option>
                  <option value="native">Native</option>
                </select>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No languages added yet.</p>
        </div>
      )}
    </div>
  );
}