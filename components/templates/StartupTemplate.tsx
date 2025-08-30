import { TemplateProps } from '@/types/template.types';

export default function StartupTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="p-8">
        {/* Startup-style Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
          
          <div className="relative z-10 flex items-center gap-6">
            {personalInfo.photo && (
              <div className="flex-shrink-0">
                <img
                  src={personalInfo.photo}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-white/30 shadow-2xl"
                />
              </div>
            )}
            
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  🚀 Available
                </div>
              </div>
              <p className="text-xl text-white/90 mb-4">{personalInfo.title}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                  <span>📧</span> {personalInfo.email}
                </span>
                <span className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                  <span>📱</span> {personalInfo.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Vision/Summary */}
            {personalInfo.summary && (
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h2 className="text-lg font-bold text-emerald-400 mb-3">🎨 Vision</h2>
                <p className="text-gray-300 leading-relaxed text-sm">{personalInfo.summary}</p>
              </div>
            )}

            {/* Tech Stack */}
            {sections.skills.length > 0 && (
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h2 className="text-lg font-bold text-cyan-400 mb-4">⚙️ Tech Stack</h2>
                {sections.skills.map((category) => (
                  <div key={category.id} className="mb-4">
                    <h3 className="text-sm font-semibold text-white mb-2">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full text-xs font-medium text-white"
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

          {/* Center Column - Experience */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-yellow-400 mb-4">💼 Journey</h2>
            {sections.experience.length > 0 && (
              <div className="space-y-4">
                {sections.experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
                    {index < sections.experience.length - 1 && (
                      <div className="absolute left-1.5 top-5 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-transparent"></div>
                    )}
                    <div className="ml-6">
                      <h3 className="font-bold text-white">{exp.position}</h3>
                      <p className="text-emerald-400 font-medium">{exp.company}</p>
                      <p className="text-xs text-gray-400 mb-2">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Education */}
            {sections.education.length > 0 && (
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h2 className="text-lg font-bold text-orange-400 mb-4">🎓 Learning</h2>
                <div className="space-y-3">
                  {sections.education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-orange-400 pl-3">
                      <h3 className="font-semibold text-white text-sm">{edu.degree}</h3>
                      <p className="text-orange-400 text-xs">{edu.field}</p>
                      <p className="text-gray-400 text-xs">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {sections.projects.length > 0 && (
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h2 className="text-lg font-bold text-purple-400 mb-4">🚀 MVPs & Projects</h2>
                <div className="space-y-3">
                  {sections.projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-3">
                      <h3 className="font-bold text-white text-sm">{project.name}</h3>
                      <p className="text-xs text-gray-300 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-purple-500/30 text-purple-200 rounded text-xs"
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
        </div>
      </div>
    </div>
  );
}