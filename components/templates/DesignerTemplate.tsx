import { TemplateProps } from '@/types/template.types';

export default function DesignerTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="flex">
        {/* Right Sidebar with Photo */}
        <div className="w-1/3 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-8 order-2">
          {/* Profile Photo */}
          {personalInfo.photo && (
            <div className="mb-8">
              <div className="relative">
                <img
                  src={personalInfo.photo}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-48 h-48 rounded-2xl mx-auto object-cover shadow-2xl transform rotate-3 hover:rotate-0 transition-transform"
                />
                <div className="absolute -bottom-2 -right-2 w-48 h-48 bg-yellow-400 rounded-2xl -z-10"></div>
              </div>
            </div>
          )}

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-4">Get in Touch</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-purple-700 font-bold">@</div>
                <span className="break-all">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-purple-700 font-bold">☎</div>
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-purple-700 font-bold">⚑</div>
                <span>
                  {personalInfo.location.city}
                  {personalInfo.location.state && `, ${personalInfo.location.state}`}
                </span>
              </div>
            </div>
          </div>

          {/* Portfolio Links */}
          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="mb-8">
              <h2 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-4">Portfolio</h2>
              <div className="space-y-2">
                {personalInfo.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="block bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-sm transition-colors"
                  >
                    {link.label || link.type}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Design Skills */}
          {sections.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-4">Expertise</h2>
              {sections.skills.map((category) => (
                <div key={category.id} className="mb-4">
                  <h3 className="text-xs text-white/80 mb-2">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-400 text-purple-700 rounded-full text-xs font-bold"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8 order-1">
          {/* Creative Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-extrabold mb-2">
              <span className="text-indigo-600">{personalInfo.firstName}</span>
              <span className="text-purple-600 ml-3">{personalInfo.lastName}</span>
            </h1>
            <p className="text-2xl text-gray-700 font-light">{personalInfo.title}</p>
          </div>

          {/* About/Summary */}
          {personalInfo.summary && (
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-indigo-600 mb-3">About My Journey</h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Creative Experience */}
          {sections.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-6">Creative Experience</h2>
              <div className="space-y-6">
                {sections.experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-yellow-400 rounded-full"></div>
                    <div className="ml-6 bg-white rounded-2xl p-6 shadow-lg">
                      <h3 className="font-bold text-indigo-600 text-lg">{exp.position}</h3>
                      <p className="text-purple-600 font-medium">{exp.company} • {exp.location}</p>
                      <p className="text-xs text-gray-500 mb-3">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 mb-3">{exp.description}</p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {exp.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start">
                              <span className="text-yellow-500 mr-2">✦</span>
                              <span className="text-sm text-gray-600">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Gallery */}
          {sections.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-6">Featured Projects</h2>
              <div className="grid grid-cols-2 gap-4">
                {sections.projects.map((project) => (
                  <div key={project.id} className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-5 hover:shadow-xl transition-shadow">
                    <h3 className="font-bold text-indigo-600 mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white text-purple-600 rounded-lg text-xs font-medium"
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
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-6">Education</h2>
              <div className="space-y-4">
                {sections.education.map((edu) => (
                  <div key={edu.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5">
                    <h3 className="font-bold text-indigo-600">
                      {edu.degree} • {edu.field}
                    </h3>
                    <p className="text-purple-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {sections.awards && sections.awards.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-6">Recognition</h2>
              <div className="flex flex-wrap gap-3">
                {sections.awards.map((award) => (
                  <div key={award.id} className="bg-yellow-100 border-2 border-yellow-400 rounded-full px-4 py-2">
                    <span className="font-bold text-gray-800">🏆 {award.title}</span>
                    <span className="text-sm text-gray-600 ml-2">• {award.date}</span>
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