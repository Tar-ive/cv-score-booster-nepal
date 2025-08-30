import { TemplateProps } from '@/types/template.types';

export default function BoldTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="p-8">
        {/* Bold Header */}
        <div className="bg-black text-white p-8 -m-8 mb-8">
          <h1 className="text-5xl font-black uppercase mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-2xl font-light text-yellow-400">{personalInfo.title}</p>
          
          <div className="flex flex-wrap gap-6 mt-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-yellow-400">✉</span> {personalInfo.email}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-400">☎</span> {personalInfo.phone}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-400">⚑</span>
              {personalInfo.location.city}
              {personalInfo.location.state && `, ${personalInfo.location.state}`}
              {personalInfo.location.country && `, ${personalInfo.location.country}`}
            </span>
          </div>
          
          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="flex gap-4 mt-3">
              {personalInfo.links.map((link, index) => (
                <a key={index} href={link.url} className="text-yellow-400 hover:text-yellow-300 text-sm font-bold">
                  {link.label || link.type}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <div className="bg-yellow-400 text-black p-1 inline-block mb-3">
              <h2 className="text-lg font-black uppercase px-2">Summary</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2">
            {/* Experience */}
            {sections.experience.length > 0 && (
              <div className="mb-8">
                <div className="bg-black text-white p-1 inline-block mb-4">
                  <h2 className="text-lg font-black uppercase px-2">Experience</h2>
                </div>
                <div className="space-y-6">
                  {sections.experience.map((exp) => (
                    <div key={exp.id} className="border-l-4 border-yellow-400 pl-4">
                      <h3 className="font-black text-xl text-black">{exp.position}</h3>
                      <p className="font-bold text-gray-700">{exp.company} | {exp.location}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 mb-2">{exp.description}</p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="space-y-1">
                          {exp.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-yellow-400 font-black mr-2">▶</span>
                              <span className="text-gray-700">{highlight}</span>
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
              <div className="mb-8">
                <div className="bg-black text-white p-1 inline-block mb-4">
                  <h2 className="text-lg font-black uppercase px-2">Projects</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {sections.projects.map((project) => (
                    <div key={project.id} className="bg-gray-100 p-4">
                      <h3 className="font-black text-lg mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-yellow-400 text-black text-xs font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Skills */}
            {sections.skills.length > 0 && (
              <div className="mb-8">
                <div className="bg-yellow-400 text-black p-1 mb-4">
                  <h2 className="text-sm font-black uppercase px-2">Skills</h2>
                </div>
                {sections.skills.map((category) => (
                  <div key={category.id} className="mb-4">
                    <h3 className="font-black text-sm text-black mb-2 uppercase">{category.category}</h3>
                    <div className="space-y-1">
                      {category.skills.map((skill, index) => (
                        <div key={index} className="bg-gray-100 px-2 py-1">
                          <span className="text-sm font-bold">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {sections.education.length > 0 && (
              <div className="mb-8">
                <div className="bg-yellow-400 text-black p-1 mb-4">
                  <h2 className="text-sm font-black uppercase px-2">Education</h2>
                </div>
                <div className="space-y-4">
                  {sections.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-black text-sm">{edu.degree}</h3>
                      <p className="text-sm font-bold text-gray-700">{edu.field}</p>
                      <p className="text-xs text-gray-600">{edu.institution}</p>
                      <p className="text-xs text-gray-600">
                        {edu.startDate} - {edu.current ? 'PRESENT' : edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {sections.certifications.length > 0 && (
              <div className="mb-8">
                <div className="bg-yellow-400 text-black p-1 mb-4">
                  <h2 className="text-sm font-black uppercase px-2">Certifications</h2>
                </div>
                <div className="space-y-2">
                  {sections.certifications.map((cert) => (
                    <div key={cert.id} className="bg-gray-100 p-2">
                      <h3 className="font-black text-xs">{cert.name}</h3>
                      <p className="text-xs text-gray-600">{cert.issuer} • {cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {sections.languages.length > 0 && (
              <div className="mb-8">
                <div className="bg-yellow-400 text-black p-1 mb-4">
                  <h2 className="text-sm font-black uppercase px-2">Languages</h2>
                </div>
                <div className="space-y-2">
                  {sections.languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="font-bold text-sm">{lang.language}</span>
                      <span className="bg-black text-yellow-400 px-2 py-0.5 text-xs font-black uppercase">
                        {lang.proficiency}
                      </span>
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