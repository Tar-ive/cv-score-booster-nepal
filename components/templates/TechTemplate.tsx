import { TemplateProps } from '@/types/template.types';

export default function TechTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-gray-900 text-gray-100 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-800 p-6">
          {/* Profile Section */}
          <div className="text-center mb-6">
            {personalInfo.photo && (
              <div className="mb-4">
                <img
                  src={personalInfo.photo}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-500 shadow-lg"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold text-green-400 mb-1">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-gray-300 text-sm">{personalInfo.title}</p>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-green-400 font-mono text-sm mb-3">// CONTACT</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-500">$</span>
                <span className="text-gray-300 break-all font-mono">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">$</span>
                <span className="text-gray-300 font-mono">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">$</span>
                <span className="text-gray-300 font-mono">
                  {personalInfo.location.city}
                  {personalInfo.location.state && `, ${personalInfo.location.state}`}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="mb-6">
              <h2 className="text-green-400 font-mono text-sm mb-3">// LINKS</h2>
              <div className="space-y-2">
                {personalInfo.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-green-400 transition-colors font-mono"
                  >
                    <span className="text-green-500">→</span>
                    {link.label || link.type}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {sections.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-green-400 font-mono text-sm mb-3">// TECH STACK</h2>
              {sections.skills.map((category) => (
                <div key={category.id} className="mb-4">
                  <h3 className="text-xs text-gray-400 font-mono mb-2">{`<${category.category}>`}</h3>
                  <div className="flex flex-wrap gap-1">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-green-400 rounded text-xs font-mono border border-gray-600"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xs text-gray-400 font-mono mt-1">{`</${category.category}>`}</h3>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {sections.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-green-400 font-mono text-sm mb-3">// LANGUAGES</h2>
              <div className="space-y-2">
                {sections.languages.map((lang) => (
                  <div key={lang.id} className="font-mono text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{lang.language}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full ${
                              level <= (lang.proficiency === 'native' ? 5 : lang.proficiency === 'professional' ? 4 : lang.proficiency === 'conversational' ? 3 : 2)
                                ? 'bg-green-500'
                                : 'bg-gray-600'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6 bg-gray-950">
          {/* Terminal-style Header */}
          <div className="bg-gray-900 rounded-lg p-3 mb-6 font-mono">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500 ml-2">~/about</span>
            </div>
            {personalInfo.summary && (
              <div className="text-green-400 text-sm">
                <span className="text-gray-500">$</span> cat README.md
                <p className="text-gray-300 mt-2 font-sans">{personalInfo.summary}</p>
              </div>
            )}
          </div>

          {/* Experience */}
          {sections.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-green-400 font-mono text-sm mb-4">// WORK EXPERIENCE</h2>
              <div className="space-y-4">
                {sections.experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-green-500 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-100">{exp.position}</h3>
                        <p className="text-green-400 text-sm font-mono">@{exp.company} • {exp.location}</p>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-300 text-sm mb-2">{exp.description}</p>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1">
                        {exp.highlights.map((highlight, index) => (
                          <li key={index} className="text-sm text-gray-400 flex items-start">
                            <span className="text-green-500 mr-2 font-mono">▸</span>
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

          {/* Projects */}
          {sections.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-green-400 font-mono text-sm mb-4">// PROJECTS</h2>
              <div className="grid grid-cols-2 gap-3">
                {sections.projects.map((project) => (
                  <div key={project.id} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                    <h3 className="font-bold text-green-400 mb-1 font-mono text-sm">{project.name}</h3>
                    <p className="text-xs text-gray-400 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-1 py-0.5 bg-gray-800 text-green-500 rounded text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.url && (
                      <a href={project.url} className="text-xs text-gray-500 hover:text-green-400 mt-2 inline-block font-mono">
                        [View →]
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {sections.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-green-400 font-mono text-sm mb-4">// EDUCATION</h2>
              <div className="space-y-3">
                {sections.education.map((edu) => (
                  <div key={edu.id} className="bg-gray-900 rounded-lg p-3">
                    <h3 className="font-bold text-gray-100">
                      {edu.degree} • {edu.field}
                    </h3>
                    <p className="text-green-400 text-sm font-mono">@{edu.institution}</p>
                    <p className="text-xs text-gray-500 font-mono">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                      {edu.gpa && <span className="ml-2">| GPA: {edu.gpa}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {sections.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-green-400 font-mono text-sm mb-4">// CERTIFICATIONS</h2>
              <div className="grid grid-cols-2 gap-2">
                {sections.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 font-mono">✓</span>
                    <div>
                      <span className="text-gray-300">{cert.name}</span>
                      <span className="text-gray-500 text-xs block">{cert.issuer} • {cert.date}</span>
                    </div>
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