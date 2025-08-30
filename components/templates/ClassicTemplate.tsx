import { TemplateProps } from '@/types/template.types';

export default function ClassicTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="p-10 max-w-4xl mx-auto">
        {/* Classic Header */}
        <div className="text-center border-double border-4 border-gray-800 p-6 mb-8">
          <h1 className="text-4xl font-serif text-gray-900 mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-3"></div>
          <p className="text-lg text-gray-700 font-serif italic">{personalInfo.title}</p>
          
          <div className="flex justify-center items-center gap-3 mt-4 text-sm text-gray-700">
            <span>{personalInfo.email}</span>
            <span className="text-gray-400">"</span>
            <span>{personalInfo.phone}</span>
            <span className="text-gray-400">"</span>
            <span>
              {personalInfo.location.city}
              {personalInfo.location.state && `, ${personalInfo.location.state}`}
              {personalInfo.location.country && `, ${personalInfo.location.country}`}
            </span>
          </div>
          
          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="flex justify-center gap-4 mt-2">
              {personalInfo.links.map((link, index) => (
                <a key={index} href={link.url} className="text-blue-800 hover:underline text-sm">
                  {link.label || link.type}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <div className="text-center mb-4">
              <h2 className="text-xl font-serif font-bold text-gray-900 inline-block px-4">
                Professional Summary
              </h2>
              <div className="w-full h-0.5 bg-gray-300 relative -top-3 -z-10"></div>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify font-serif">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Professional Experience */}
        {sections.experience.length > 0 && (
          <div className="mb-8">
            <div className="text-center mb-4">
              <h2 className="text-xl font-serif font-bold text-gray-900 inline-block px-4 bg-white">
                Professional Experience
              </h2>
              <div className="w-full h-0.5 bg-gray-300 relative -top-3 -z-10"></div>
            </div>
            <div className="space-y-6">
              {sections.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 font-serif">{exp.position}</h3>
                      <p className="italic text-gray-700 font-serif">
                        {exp.company}, {exp.location}
                      </p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {exp.startDate}  {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-2 font-serif text-sm">
                      {exp.description}
                    </p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-6 font-serif">
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

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {sections.education.length > 0 && (
            <div className="mb-8">
              <div className="text-center mb-4">
                <h2 className="text-lg font-serif font-bold text-gray-900 inline-block px-4 bg-white">
                  Education
                </h2>
                <div className="w-full h-0.5 bg-gray-300 relative -top-3 -z-10"></div>
              </div>
              <div className="space-y-4">
                {sections.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900 font-serif">
                      {edu.degree}
                    </h3>
                    <p className="italic text-gray-700 font-serif">{edu.field}</p>
                    <p className="text-gray-700 font-serif text-sm">
                      {edu.institution}, {edu.location}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {edu.startDate}  {edu.current ? 'Present' : edu.endDate}
                      {edu.gpa && <span className="ml-2">GPA: {edu.gpa}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {sections.skills.length > 0 && (
            <div className="mb-8">
              <div className="text-center mb-4">
                <h2 className="text-lg font-serif font-bold text-gray-900 inline-block px-4 bg-white">
                  Core Competencies
                </h2>
                <div className="w-full h-0.5 bg-gray-300 relative -top-3 -z-10"></div>
              </div>
              <div className="space-y-3">
                {sections.skills.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-semibold text-gray-800 font-serif mb-1">
                      {category.category}
                    </h3>
                    <p className="text-gray-700 text-sm font-serif">
                      {category.skills.map(skill => skill.name).join(' " ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certifications */}
        {sections.certifications.length > 0 && (
          <div className="mb-8">
            <div className="text-center mb-4">
              <h2 className="text-lg font-serif font-bold text-gray-900 inline-block px-4 bg-white">
                Professional Certifications
              </h2>
              <div className="w-full h-0.5 bg-gray-300 relative -top-3 -z-10"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {sections.certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <span className="font-semibold text-gray-900 font-serif">
                    {cert.name}
                  </span>
                  <p className="text-gray-600 font-serif">
                    {cert.issuer} " {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {sections.awards && sections.awards.length > 0 && (
          <div className="mb-8">
            <div className="text-center mb-4">
              <h2 className="text-lg font-serif font-bold text-gray-900 inline-block px-4 bg-white">
                Honors & Awards
              </h2>
              <div className="w-full h-0.5 bg-gray-300 relative -top-3 -z-10"></div>
            </div>
            <div className="space-y-2">
              {sections.awards.map((award) => (
                <div key={award.id}>
                  <span className="font-semibold text-gray-900 font-serif">
                    {award.title}
                  </span>
                  <span className="text-gray-600 font-serif">  {award.issuer} ({award.date})</span>
                  {award.description && (
                    <p className="text-sm text-gray-600 font-serif ml-4">
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}