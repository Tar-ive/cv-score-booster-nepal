'use client';

import { CertificationItem } from '@/types/cv.types';

interface CertificationsFormProps {
  data: CertificationItem[];
  onChange: (data: CertificationItem[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const handleAdd = () => {
    const newItem: CertificationItem = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: '',
    };
    onChange([...data, newItem]);
  };

  const handleUpdate = (id: string, field: keyof CertificationItem, value: string | undefined) => {
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
          <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add your professional certifications.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Certification
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
                placeholder="Certification Name"
              />
              <input
                type="text"
                value={item.issuer}
                onChange={(e) => handleUpdate(item.id, 'issuer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Issuing Organization"
              />
              <input
                type="month"
                value={item.date}
                onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Issue Date"
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
          <p className="text-gray-500">No certifications added yet.</p>
        </div>
      )}
    </div>
  );
}