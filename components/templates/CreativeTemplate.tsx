import { TemplateProps } from '@/types/template.types';

export default function CreativeTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="relative">
        {/* Creative Header with Diagonal Background */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 h-64 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1440 120" fill="white">
            <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,58.7C960,43,1056,21,1152,21.3C1248,21,1344,43,1392,53.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
          
          <div className="relative z-10 px-8 pt-8 flex items-start gap-6">
            {/* Profile Photo */}
            {personalInfo.photo && (
              <div className="flex-shrink-0">
                <img
                  src={personalInfo.photo}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                />
              </div>
            )}
            
            <div className="text-white flex-grow">
              <h1 className="text-4xl font-bold mb-2">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="text-xl font-light opacity-95">{personalInfo.title}</p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <span className="flex items-center gap-1">
                  <span>📧</span> {personalInfo.email}
                </span>
                <span className="flex items-center gap-1">
                  <span>📱</span> {personalInfo.phone}
                </span>
                <span className="flex items-center gap-1">
                  <span>📍</span>
                  {personalInfo.location.city}
                  {personalInfo.location.state && `, ${personalInfo.location.state}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Left Column */}
          <div className="w-1/3 bg-gray-50 p-6">
            {/* Links */}
            {personalInfo.links && personalInfo.links.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3">Connect</h2>
                <div className="space-y-2">
                  {personalInfo.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <span className="text-purple-400">→</span>
                      {link.label || link.type}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Skills with Visual Bars */}
            {sections.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3">Skills</h2>
                {sections.skills.map((category) => (
                  <div key={category.id} className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-700 mb-2">{category.category}</h3>
                    {category.skills.map((skill, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{skill.name}</span>
                          <span className="text-gray-500">{skill.level}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${(skill.rating || 3) * 20}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {sections.languages.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3">Languages</h2>
                <div className="space-y-2">
                  {sections.languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{lang.language}</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs capitalize">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Awards */}
            {sections.awards && sections.awards.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3">Awards</h2>
                <div className="space-y-3">
                  {sections.awards.map((award) => (
                    <div key={award.id} className="border-l-2 border-purple-400 pl-3">
                      <h3 className="font-semibold text-sm text-gray-800">{award.title}</h3>
                      <p className="text-xs text-gray-600">{award.issuer} • {award.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="w-2/3 p-6">
            {/* Summary */}
            {personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-purple-600 mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-purple-600"></span>
                  About Me
                </h2>
                <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience with Timeline */}
            {sections.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-purple-600"></span>
                  Experience
                </h2>
                <div className="space-y-4">
                  {sections.experience.map((exp, index) => (
                    <div key={exp.id} className="relative pl-6">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-purple-500 rounded-full"></div>
                      {index < sections.experience.length - 1 && (
                        <div className="absolute left-1.5 top-5 bottom-0 w-0.5 bg-purple-200"></div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-purple-600 font-medium">{exp.company} • {exp.location}</p>
                        <p className="text-xs text-gray-500 mb-2">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                        {exp.description && (
                          <p className="text-sm text-gray-700 mb-2">{exp.description}</p>
                        )}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="space-y-1">
                            {exp.highlights.map((highlight, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Portfolio */}
            {sections.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-purple-600"></span>
                  Projects
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {sections.projects.map((project) => (
                    <div key={project.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-white text-purple-600 rounded text-xs"
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

            {/* Education */}
            {sections.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-purple-600"></span>
                  Education
                </h2>
                <div className="space-y-3">
                  {sections.education.map((edu) => (
                    <div key={edu.id} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-purple-600">{edu.institution}</p>
                      <p className="text-xs text-gray-500">
                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                        {edu.gpa && <span className="ml-2">• GPA: {edu.gpa}</span>}
                      </p>
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