'use client';

import { useState } from 'react';
import { EducationItem } from '@/types/cv.types';

interface EducationFormProps {
  data: EducationItem[];
  onChange: (data: EducationItem[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    const newItem: EducationItem = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      honors: [],
      coursework: [],
    };
    onChange([...data, newItem]);
    setEditingId(newItem.id);
  };

  const handleUpdate = (id: string, field: keyof EducationItem, value: string | boolean | string[] | undefined) => {
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
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add your educational background.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Education
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            {editingId !== item.id ? (
              <div
                className="cursor-pointer"
                onClick={() => setEditingId(item.id)}
              >
                <h3 className="font-semibold text-gray-900">
                  {item.degree || 'Degree'} in {item.field || 'Field'}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.institution || 'Institution'} • {item.startDate || 'Start'} - {item.current ? 'Present' : item.endDate || 'End'}
                </p>
                {item.gpa && <p className="text-sm text-gray-500">GPA: {item.gpa}</p>}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => handleUpdate(item.id, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="University Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree *
                    </label>
                    <input
                      type="text"
                      value={item.degree}
                      onChange={(e) => handleUpdate(item.id, 'degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Bachelor of Science"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field of Study *
                    </label>
                    <input
                      type="text"
                      value={item.field}
                      onChange={(e) => handleUpdate(item.id, 'field', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Computer Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={item.startDate}
                      onChange={(e) => handleUpdate(item.id, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={item.endDate || ''}
                      onChange={(e) => handleUpdate(item.id, 'endDate', e.target.value)}
                      disabled={item.current}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={item.current}
                        onChange={(e) => handleUpdate(item.id, 'current', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Currently studying</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.gpa || ''}
                    onChange={(e) => handleUpdate(item.id, 'gpa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="3.8/4.0"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No education added yet.</p>
          <button
            onClick={handleAdd}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Add your education
          </button>
        </div>
      )}
    </div>
  );
}