import { TemplateProps } from '@/types/template.types';

export default function MinimalTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="p-12 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-light text-gray-900 mb-1">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-gray-600 mb-4">{personalInfo.title}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>
              {personalInfo.location.city}
              {personalInfo.location.state && `, ${personalInfo.location.state}`}
              {personalInfo.location.country && `, ${personalInfo.location.country}`}
            </span>
          </div>
          
          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="flex gap-4 mt-2">
              {personalInfo.links.map((link, index) => (
                <a key={index} href={link.url} className="text-gray-600 hover:text-gray-900 text-sm">
                  {link.label || link.type}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {sections.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Experience</h2>
            <div className="space-y-6">
              {sections.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="mb-2">
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <div className="text-sm text-gray-600">
                      {exp.company} • {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 mb-2">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="mr-2">–</span>
                          <span>{highlight}</span>
                        </li>
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
          <div className="mb-8">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Education</h2>
            <div className="space-y-4">
              {sections.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-medium text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {edu.institution} • {edu.location} • {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {sections.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Skills</h2>
            <div className="space-y-2">
              {sections.skills.map((category) => (
                <div key={category.id} className="text-sm">
                  <span className="text-gray-700">{category.category}:</span>{' '}
                  <span className="text-gray-600">
                    {category.skills.map(skill => skill.name).join(' • ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {sections.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Projects</h2>
            <div className="space-y-4">
              {sections.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      {project.technologies.join(' • ')}
                    </p>
                  )}
                  {project.url && (
                    <a href={project.url} className="text-sm text-gray-600 hover:text-gray-900">
                      {project.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {sections.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Certifications</h2>
            <div className="space-y-2">
              {sections.certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <span className="text-gray-900">{cert.name}</span> • {cert.issuer} • {cert.date}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {sections.awards && sections.awards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Awards</h2>
            <div className="space-y-2">
              {sections.awards.map((award) => (
                <div key={award.id}>
                  <div className="text-sm">
                    <span className="text-gray-900">{award.title}</span> • {award.issuer} • {award.date}
                  </div>
                  {award.description && (
                    <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {sections.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Languages</h2>
            <div className="text-sm text-gray-600">
              {sections.languages.map((lang) => (
                <span key={lang.id}>
                  {lang.language} ({lang.proficiency})
                  {lang.id !== sections.languages[sections.languages.length - 1].id && ' • '}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}