import { TemplateProps } from '@/types/template.types';

export default function ElegantTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-gradient-to-b from-gray-50 to-white text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Elegant Header with Photo */}
        <div className="text-center mb-8">
          {personalInfo.photo && (
            <div className="mb-6">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-36 h-36 rounded-full mx-auto object-cover ring-4 ring-gray-200 shadow-xl"
              />
            </div>
          )}
          <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-wide">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-xl text-gray-600 italic mb-4">{personalInfo.title}</p>
          
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="text-rose-500">	</span> {personalInfo.email}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <span className="text-rose-500"></span> {personalInfo.phone}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <span className="text-rose-500"></span>
              {personalInfo.location.city}
              {personalInfo.location.state && `, ${personalInfo.location.state}`}
            </span>
          </div>

          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="flex justify-center gap-4 mt-3">
              {personalInfo.links.map((link, index) => (
                <a key={index} href={link.url} className="text-rose-600 hover:text-rose-700 text-sm font-medium">
                  {link.label || link.type}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8 text-center">
            <p className="text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
              "{personalInfo.summary}"
            </p>
          </div>
        )}

        {/* Experience */}
        {sections.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-gray-800 mb-4 text-center">Experience</h2>
            <div className="space-y-6">
              {sections.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-rose-200 pl-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{exp.position}</h3>
                      <p className="text-rose-600">{exp.company} " {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-500 italic">
                      {exp.startDate}  {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {exp.highlights.map((highlight, index) => (
                        <li key={index} className="text-gray-600 flex items-start">
                          <span className="text-rose-400 mr-2">&</span>
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

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {sections.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-light text-gray-800 mb-4">Education</h2>
              <div className="space-y-4">
                {sections.education.map((edu) => (
                  <div key={edu.id} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-rose-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate}  {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {sections.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-light text-gray-800 mb-4">Skills</h2>
              <div className="space-y-3">
                {sections.skills.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm"
                        >
                          {skill.name}
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
  );
}