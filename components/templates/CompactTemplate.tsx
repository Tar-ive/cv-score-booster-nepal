import { TemplateProps } from '@/types/template.types';

export default function CompactTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="p-6 text-sm">
        {/* Compact Header */}
        <div className="border-b border-gray-300 pb-2 mb-3">
          <h1 className="text-xl font-bold text-gray-900">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
            <span>{personalInfo.title}</span>
            <span>"</span>
            <span>{personalInfo.email}</span>
            <span>"</span>
            <span>{personalInfo.phone}</span>
            <span>"</span>
            <span>
              {personalInfo.location.city}
              {personalInfo.location.state && `, ${personalInfo.location.state}`}
            </span>
            {personalInfo.links && personalInfo.links.length > 0 && (
              <>
                <span>"</span>
                {personalInfo.links.map((link, index) => (
                  <span key={index}>
                    <a href={link.url} className="text-blue-600 hover:underline">
                      {link.label || link.type}
                    </a>
                    {personalInfo.links && index < personalInfo.links.length - 1 && ' | '}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-5 gap-4">
          {/* Main Content - Left */}
          <div className="col-span-3">
            {/* Summary */}
            {personalInfo.summary && (
              <div className="mb-3">
                <p className="text-xs text-gray-700 leading-tight">{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {sections.experience.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-200">Experience</h2>
                <div className="space-y-2">
                  {sections.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between">
                        <div>
                          <span className="font-semibold text-xs">{exp.position}</span> at <span className="text-xs">{exp.company}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="mt-1 space-y-0.5">
                          {exp.highlights.slice(0, 2).map((highlight, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-start">
                              <span className="mr-1">"</span>
                              <span className="leading-tight">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {sections.projects.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-200">Projects</h2>
                <div className="grid grid-cols-2 gap-2">
                  {sections.projects.slice(0, 4).map((project) => (
                    <div key={project.id}>
                      <span className="font-semibold text-xs">{project.name}</span>
                      <p className="text-xs text-gray-600 leading-tight">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right */}
          <div className="col-span-2">
            {/* Education */}
            {sections.education.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-200">Education</h2>
                <div className="space-y-1">
                  {sections.education.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-semibold text-xs">{edu.degree}</p>
                      <p className="text-xs text-gray-600">{edu.field}</p>
                      <p className="text-xs text-gray-500">{edu.institution}</p>
                      <p className="text-xs text-gray-500">
                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {sections.skills.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-200">Skills</h2>
                <div className="space-y-1">
                  {sections.skills.map((category) => (
                    <div key={category.id}>
                      <p className="text-xs">
                        <span className="font-semibold">{category.category}:</span>{' '}
                        {category.skills.map(s => s.name).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {sections.certifications.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-200">Certifications</h2>
                <div className="space-y-1">
                  {sections.certifications.slice(0, 3).map((cert) => (
                    <div key={cert.id}>
                      <p className="text-xs font-semibold">{cert.name}</p>
                      <p className="text-xs text-gray-500">{cert.issuer} " {cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {sections.languages.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-200">Languages</h2>
                <div className="text-xs">
                  {sections.languages.map((lang, index) => (
                    <span key={lang.id}>
                      {lang.language} ({lang.proficiency})
                      {index < sections.languages.length - 1 && ', '}
                    </span>
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