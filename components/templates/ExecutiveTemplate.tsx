import { TemplateProps } from '@/types/template.types';

export default function ExecutiveTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="flex">
        {/* Main Content */}
        <div className="w-2/3 p-8">
          {/* Header with Name */}
          <div className="mb-8 pb-6 border-b-3 border-gray-800">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-xl text-gray-700 font-light">{personalInfo.title}</p>
          </div>

          {/* Executive Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 text-blue-800">
                Executive Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>
            </div>
          )}

          {/* Professional Experience */}
          {sections.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 text-blue-800 border-b-2 border-blue-800 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {sections.experience.map((exp) => (
                  <div key={exp.id} className="border-l-3 border-gray-300 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                        <p className="text-gray-700 font-medium">{exp.company} | {exp.location}</p>
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mb-2 italic">{exp.description}</p>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {exp.highlights.map((highlight, index) => (
                          <li key={index} className="text-sm">{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Achievements */}
          {sections.awards && sections.awards.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 text-blue-800 border-b-2 border-blue-800 pb-2">
                Key Achievements
              </h2>
              <div className="space-y-3">
                {sections.awards.map((award) => (
                  <div key={award.id} className="flex items-start">
                    <span className="text-blue-800 mr-3">▸</span>
                    <div>
                      <span className="font-semibold">{award.title}</span> - {award.issuer} ({award.date})
                      {award.description && <p className="text-sm text-gray-600 mt-1">{award.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-blue-50 to-gray-50 p-8">
          {/* Profile Photo */}
          {personalInfo.photo && (
            <div className="mb-8 text-center">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-xl"
              />
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 border-b-2 border-blue-200 pb-2">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">📧</span>
                <span className="break-all text-gray-700">{personalInfo.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600">📱</span>
                <span className="text-gray-700">{personalInfo.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600">📍</span>
                <span className="text-gray-700">
                  {personalInfo.location.city}
                  {personalInfo.location.state && `, ${personalInfo.location.state}`}
                  {personalInfo.location.country && `, ${personalInfo.location.country}`}
                </span>
              </div>
            </div>
          </div>

          {/* Professional Links */}
          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 border-b-2 border-blue-200 pb-2">
                Professional Links
              </h2>
              <div className="space-y-2 text-sm">
                {personalInfo.links.map((link, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-blue-600">🔗</span>
                    <a href={link.url} className="text-blue-700 hover:underline break-all">
                      {link.label || link.type}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Competencies */}
          {sections.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 border-b-2 border-blue-200 pb-2">
                Core Competencies
              </h2>
              {sections.skills.map((category) => (
                <div key={category.id} className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase mb-2">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs border border-gray-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {sections.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 border-b-2 border-blue-200 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {sections.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-gray-700">{edu.field}</p>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}