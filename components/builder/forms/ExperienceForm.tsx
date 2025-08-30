'use client';

import { useState } from 'react';
import { ExperienceItem } from '@/types/cv.types';

interface ExperienceFormProps {
  data: ExperienceItem[];
  onChange: (data: ExperienceItem[]) => void;
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    const newItem: ExperienceItem = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: [],
    };
    onChange([...data, newItem]);
    setEditingId(newItem.id);
  };

  const handleUpdate = (id: string, field: keyof ExperienceItem, value: string | boolean | string[]) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleHighlightChange = (id: string, index: number, value: string) => {
    const item = data.find((exp) => exp.id === id);
    if (item) {
      const newHighlights = [...item.highlights];
      newHighlights[index] = value;
      handleUpdate(id, 'highlights', newHighlights);
    }
  };

  const handleAddHighlight = (id: string) => {
    const item = data.find((exp) => exp.id === id);
    if (item) {
      handleUpdate(id, 'highlights', [...item.highlights, '']);
    }
  };

  const handleRemoveHighlight = (id: string, index: number) => {
    const item = data.find((exp) => exp.id === id);
    if (item) {
      const newHighlights = item.highlights.filter((_, i) => i !== index);
      handleUpdate(id, 'highlights', newHighlights);
    }
  };

  const handleDelete = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newData = [...data];
      [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
      onChange(newData);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < data.length - 1) {
      const newData = [...data];
      [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
      onChange(newData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add your work experience, starting with the most recent position.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {editingId !== item.id ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => setEditingId(item.id)}
                  >
                    <h3 className="font-semibold text-gray-900">
                      {item.position || 'Position'} at {item.company || 'Company'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.startDate || 'Start'} - {item.current ? 'Present' : item.endDate || 'End'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company *
                        </label>
                        <input
                          type="text"
                          value={item.company}
                          onChange={(e) => handleUpdate(item.id, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Company Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position *
                        </label>
                        <input
                          type="text"
                          value={item.position}
                          onChange={(e) => handleUpdate(item.id, 'position', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Job Title"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => handleUpdate(item.id, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="City, State"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date *
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
                          <span className="text-sm text-gray-700">Currently working here</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description of your role and responsibilities..."
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Key Achievements
                        </label>
                        <button
                          onClick={() => handleAddHighlight(item.id)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          + Add Achievement
                        </button>
                      </div>
                      <div className="space-y-2">
                        {item.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={highlight}
                              onChange={(e) => handleHighlightChange(item.id, hIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Describe an achievement or responsibility..."
                            />
                            <button
                              onClick={() => handleRemoveHighlight(item.id, hIndex)}
                              className="px-3 py-2 text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Done Editing
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === data.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-red-400 hover:text-red-600"
                  title="Delete"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No experience added yet.</p>
          <button
            onClick={handleAdd}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Add your first experience
          </button>
        </div>
      )}
    </div>
  );
}