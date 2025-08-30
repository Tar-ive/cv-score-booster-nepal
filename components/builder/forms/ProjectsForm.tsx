'use client';

import { ProjectItem } from '@/types/cv.types';

interface ProjectsFormProps {
  data: ProjectItem[];
  onChange: (data: ProjectItem[]) => void;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const handleAdd = () => {
    const newItem: ProjectItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      url: '',
      githubUrl: '',
      highlights: [],
    };
    onChange([...data, newItem]);
  };

  const handleUpdate = (id: string, field: keyof ProjectItem, value: string | string[]) => {
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
          <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showcase your personal or professional projects.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="space-y-4">
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Name"
              />
              <textarea
                value={item.description}
                onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Description"
                rows={3}
              />
              <input
                type="text"
                value={item.technologies.join(', ')}
                onChange={(e) => handleUpdate(item.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Technologies (comma-separated)"
              />
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
          <p className="text-gray-500">No projects added yet.</p>
        </div>
      )}
    </div>
  );
}