import { TemplateProps } from '@/types/template.types';

export default function InfographicTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="p-6">
        {/* Header with Photo */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-6">
            {personalInfo.photo && (
              <div className="flex-shrink-0">
                <img
                  src={personalInfo.photo}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
            )}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-1">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="text-blue-100 text-lg">{personalInfo.title}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                <span>📧 {personalInfo.email}</span>
                <span>📞 {personalInfo.phone}</span>
                <span>📍 {personalInfo.location.city}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Stats & Skills */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 text-white text-center">
                <div className="text-2xl font-bold">{sections.experience.length}</div>
                <div className="text-xs opacity-90">ROLES</div>
              </div>
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-4 text-white text-center">
                <div className="text-2xl font-bold">{sections.projects.length}</div>
                <div className="text-xs opacity-90">PROJECTS</div>
              </div>
            </div>

            {/* Skills */}
            {sections.skills.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">🎨 Skills Overview</h3>
                {sections.skills.map((category) => (
                  <div key={category.id} className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-600 mb-2">{category.category}</h4>
                    {category.skills.slice(0, 3).map((skill, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level || 'Advanced'}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                            style={{ width: `${(skill.rating || 4) * 20}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Center Column - Experience */}
          <div className="bg-white rounded-xl p-5 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4">💼 Experience Timeline</h3>
            {sections.experience.length > 0 && (
              <div className="space-y-4">
                {sections.experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>
                    {index < sections.experience.length - 1 && (
                      <div className="absolute left-1.5 top-5 bottom-0 w-0.5 bg-blue-200"></div>
                    )}
                    <div className="ml-6">
                      <h4 className="font-semibold text-sm text-gray-800">{exp.position}</h4>
                      <p className="text-blue-600 text-xs">{exp.company}</p>
                      <p className="text-xs text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Education & More */}
          <div className="space-y-6">
            {/* About */}
            {personalInfo.summary && (
              <div className="bg-white rounded-xl p-5 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-3">📝 About Me</h3>
                <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {/* Education */}
            {sections.education.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-3">🎓 Education</h3>
                <div className="space-y-3">
                  {sections.education.map((edu) => (
                    <div key={edu.id} className="border-l-3 border-indigo-400 pl-3">
                      <h4 className="font-semibold text-xs">{edu.degree}</h4>
                      <p className="text-xs text-indigo-600">{edu.field}</p>
                      <p className="text-xs text-gray-500">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}