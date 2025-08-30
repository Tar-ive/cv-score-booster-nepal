import { TemplateProps } from '@/types/template.types';

export default function ProfessionalTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-gray-900 p-8 ${className} ${printMode ? 'print:m-0' : ''}`}>
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-gray-700 mb-3">{personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>
            {personalInfo.location.city}
            {personalInfo.location.state && `, ${personalInfo.location.state}`}
            {personalInfo.location.country && `, ${personalInfo.location.country}`}
          </span>
        </div>
        {personalInfo.links && personalInfo.links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
            {personalInfo.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-blue-600 hover:underline"
              >
                {link.label || link.type}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Professional Experience */}
      {sections.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {sections.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 italic">
                      {exp.company}, {exp.location}
                    </p>
                  </div>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mb-2 mt-2">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
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
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {sections.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700 italic">
                      {edu.institution}, {edu.location}
                    </p>
                    {edu.gpa && (
                      <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>
                    )}
                    {edu.honors && edu.honors.length > 0 && (
                      <p className="text-gray-600 text-sm mt-1">
                        Honors: {edu.honors.join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {sections.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {sections.skills.map((category) => (
              <div key={category.id} className="flex">
                <span className="font-semibold text-gray-900 w-1/4">
                  {category.category}:
                </span>
                <span className="text-gray-700 w-3/4">
                  {category.skills.map((skill) => skill.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {sections.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Notable Projects
          </h2>
          <div className="space-y-3">
            {sections.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">
                  {project.name}
                  {project.startDate && (
                    <span className="font-normal text-gray-600 text-sm ml-2">
                      ({project.startDate} – {project.endDate || 'Present'})
                    </span>
                  )}
                </h3>
                <p className="text-gray-700 mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-semibold">Technologies:</span>{' '}
                    {project.technologies.join(', ')}
                  </p>
                )}
                {project.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 ml-4 mt-1 space-y-1">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm">{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {sections.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Certifications
          </h2>
          <div className="space-y-2">
            {sections.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <div>
                  <span className="font-semibold text-gray-900">{cert.name}</span>
                  <span className="text-gray-700"> – {cert.issuer}</span>
                </div>
                <span className="text-gray-600 text-sm">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {sections.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {sections.languages.map((lang) => (
              <span key={lang.id} className="text-gray-700">
                <span className="font-semibold">{lang.language}:</span>{' '}
                <span className="capitalize">{lang.proficiency}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {sections.awards && sections.awards.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Awards & Achievements
          </h2>
          <div className="space-y-2">
            {sections.awards.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">{award.title}</span>
                  <span className="text-gray-600 text-sm">{award.date}</span>
                </div>
                <p className="text-gray-700 text-sm">
                  {award.issuer}
                  {award.description && ` – ${award.description}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}