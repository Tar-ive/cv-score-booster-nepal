'use client';

import { useState } from 'react';
import { SkillCategory } from '@/types/cv.types';

interface SkillsFormProps {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddCategory = () => {
    const newCategory: SkillCategory = {
      id: Date.now().toString(),
      category: '',
      skills: [],
    };
    onChange([...data, newCategory]);
    setEditingId(newCategory.id);
  };

  const handleUpdateCategory = (id: string, field: keyof SkillCategory, value: string | { name: string; level?: string }[]) => {
    const updated = data.map((cat) =>
      cat.id === id ? { ...cat, [field]: value } : cat
    );
    onChange(updated);
  };

  const handleAddSkill = (categoryId: string) => {
    const category = data.find((cat) => cat.id === categoryId);
    if (category) {
      const newSkills = [...category.skills, { name: '', level: 'intermediate' }];
      handleUpdateCategory(categoryId, 'skills', newSkills);
    }
  };

  const handleUpdateSkill = (categoryId: string, skillIndex: number, field: string, value: string) => {
    const category = data.find((cat) => cat.id === categoryId);
    if (category) {
      const newSkills = [...category.skills];
      newSkills[skillIndex] = { ...newSkills[skillIndex], [field]: value };
      handleUpdateCategory(categoryId, 'skills', newSkills);
    }
  };

  const handleRemoveSkill = (categoryId: string, skillIndex: number) => {
    const category = data.find((cat) => cat.id === categoryId);
    if (category) {
      const newSkills = category.skills.filter((_, index) => index !== skillIndex);
      handleUpdateCategory(categoryId, 'skills', newSkills);
    }
  };

  const handleDeleteCategory = (id: string) => {
    onChange(data.filter((cat) => cat.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add your technical and professional skills.
          </p>
        </div>
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Category
        </button>
      </div>

      <div className="space-y-4">
        {data.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-lg p-4">
            {editingId !== category.id ? (
              <div
                className="cursor-pointer"
                onClick={() => setEditingId(category.id)}
              >
                <h3 className="font-semibold text-gray-900">
                  {category.category || 'Category Name'}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {category.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={category.category}
                    onChange={(e) => handleUpdateCategory(category.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Programming Languages, Tools, Soft Skills"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Skills
                    </label>
                    <button
                      onClick={() => handleAddSkill(category.id)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      + Add Skill
                    </button>
                  </div>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => handleUpdateSkill(category.id, skillIndex, 'name', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Skill name"
                        />
                        <select
                          value={skill.level || 'intermediate'}
                          onChange={(e) => handleUpdateSkill(category.id, skillIndex, 'level', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                        <button
                          onClick={() => handleRemoveSkill(category.id, skillIndex)}
                          className="px-3 py-2 text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete Category
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No skills added yet.</p>
          <button
            onClick={handleAddCategory}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Add your skills
          </button>
        </div>
      )}
    </div>
  );
}