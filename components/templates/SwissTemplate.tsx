import { TemplateProps } from '@/types/template.types';

export default function SwissTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-black ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="p-12 max-w-4xl mx-auto font-mono">
        {/* Swiss Typography Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold tracking-tighter mb-2">
            {personalInfo.firstName.toUpperCase()}<br/>
            {personalInfo.lastName.toUpperCase()}
          </h1>
          <div className="bg-black h-1 w-24 mb-4"></div>
          <p className="text-xl font-light tracking-wide">{personalInfo.title.toUpperCase()}</p>
          
          <div className="mt-6 text-sm space-y-1">
            <div className="grid grid-cols-3 gap-4">
              <div>EMAIL: {personalInfo.email}</div>
              <div>PHONE: {personalInfo.phone}</div>
              <div>LOCATION: {personalInfo.location.city.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-8">
            {/* Summary */}
            {personalInfo.summary && (
              <div className="mb-8">
                <div className="bg-black text-white px-2 py-1 inline-block mb-4">
                  <h2 className="text-sm font-bold tracking-wider">PROFILE</h2>
                </div>
                <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {sections.experience.length > 0 && (
              <div className="mb-8">
                <div className="bg-black text-white px-2 py-1 inline-block mb-4">
                  <h2 className="text-sm font-bold tracking-wider">EXPERIENCE</h2>
                </div>
                <div className="space-y-6">
                  {sections.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start border-b border-gray-300 pb-2">
                        <div>
                          <h3 className="font-bold text-sm">{exp.position.toUpperCase()}</h3>
                          <p className="text-sm">{exp.company} / {exp.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs">{exp.startDate}  {exp.current ? 'PRESENT' : exp.endDate}</p>
                        </div>
                      </div>
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.highlights.map((highlight, index) => (
                            <li key={index} className="text-xs leading-tight flex items-start">
                              <span className="mr-2"></span>
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
          </div>

          {/* Sidebar */}
          <div className="col-span-4">
            {/* Education */}
            {sections.education.length > 0 && (
              <div className="mb-8">
                <div className="bg-black text-white px-2 py-1 mb-4">
                  <h2 className="text-xs font-bold tracking-wider">EDUCATION</h2>
                </div>
                <div className="space-y-3">
                  {sections.education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <p className="font-bold">{edu.degree.toUpperCase()}</p>
                      <p>{edu.field}</p>
                      <p>{edu.institution}</p>
                      <p className="text-gray-600">{edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {sections.skills.length > 0 && (
              <div className="mb-8">
                <div className="bg-black text-white px-2 py-1 mb-4">
                  <h2 className="text-xs font-bold tracking-wider">SKILLS</h2>
                </div>
                {sections.skills.map((category) => (
                  <div key={category.id} className="mb-4">
                    <h3 className="font-bold text-xs mb-2">{category.category.toUpperCase()}</h3>
                    <div className="space-y-1">
                      {category.skills.map((skill, index) => (
                        <div key={index} className="text-xs">
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Awards */}
            {sections.awards && sections.awards.length > 0 && (
              <div className="mb-8">
                <div className="bg-black text-white px-2 py-1 mb-4">
                  <h2 className="text-xs font-bold tracking-wider">AWARDS</h2>
                </div>
                <div className="space-y-2">
                  {sections.awards.map((award) => (
                    <div key={award.id} className="text-xs">
                      <p className="font-bold">{award.title}</p>
                      <p className="text-gray-600">{award.issuer} / {award.date}</p>
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