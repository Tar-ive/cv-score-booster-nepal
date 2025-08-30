import { TemplateProps } from '@/types/template.types';

export default function ModernTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-100 p-6">
          {/* Profile Photo */}
          {personalInfo.photo && (
            <div className="mb-6 text-center">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          {/* Personal Info */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-gray-700 font-medium">{personalInfo.title}</p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Contact</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">📧</span>
                <span className="break-all">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">📱</span>
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">📍</span>
                <span>
                  {personalInfo.location.city}
                  {personalInfo.location.state && `, ${personalInfo.location.state}`}
                  {personalInfo.location.country && `, ${personalInfo.location.country}`}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Links</h2>
              <div className="space-y-2 text-sm">
                {personalInfo.links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-gray-600">🔗</span>
                    <a href={link.url} className="text-blue-600 hover:underline break-all">
                      {link.label || link.type}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {sections.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Skills</h2>
              {sections.skills.map((category) => (
                <div key={category.id} className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {sections.languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Languages</h2>
              <div className="space-y-1 text-sm">
                {sections.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span>{lang.language}</span>
                    <span className="text-gray-600 capitalize">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-2 border-b-2 border-gray-300 pb-1">
                Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {sections.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1">
                Experience
              </h2>
              <div className="space-y-4">
                {sections.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-sm text-gray-700">{exp.company} • {exp.location}</p>
                      </div>
                      <span className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mb-2">{exp.description}</p>
                    )}
                    {exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                        {exp.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {sections.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {sections.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-sm text-gray-700">{edu.institution} • {edu.location}</p>
                        {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                      </div>
                      <span className="text-sm text-gray-600">
                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {sections.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1">
                Projects
              </h2>
              <div className="space-y-3">
                {sections.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-1">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.url && (
                      <a href={project.url} className="text-xs text-blue-600 hover:underline">
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {sections.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1">
                Certifications
              </h2>
              <div className="space-y-2">
                {sections.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                    <span className="text-sm text-gray-600">{cert.date}</span>
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