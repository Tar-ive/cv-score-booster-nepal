import { TemplateProps } from '@/types/template.types';

export default function AcademicTemplate({ data, className = '', printMode = false }: TemplateProps) {
  const { personalInfo, sections } = data;

  return (
    <div className={`bg-white text-gray-900 ${className} ${printMode ? 'print:m-0' : ''}`}>
      <div className="p-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-serif text-gray-900 mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-lg text-gray-700 font-serif italic mb-3">{personalInfo.title}</p>
          <div className="flex justify-center items-center gap-3 text-sm text-gray-600">
            <span>{personalInfo.email}</span>
            <span>|</span>
            <span>{personalInfo.phone}</span>
            <span>|</span>
            <span>
              {personalInfo.location.city}
              {personalInfo.location.state && `, ${personalInfo.location.state}`}
              {personalInfo.location.country && `, ${personalInfo.location.country}`}
            </span>
          </div>
          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="flex justify-center gap-3 mt-2">
              {personalInfo.links.map((link, index) => (
                <a key={index} href={link.url} className="text-blue-700 hover:underline text-sm">
                  {link.label || link.type}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Abstract/Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed text-justify indent-8">{personalInfo.summary}</p>
          </div>
        )}

        {/* Education */}
        {sections.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {sections.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">
                        {edu.institution}, {edu.location}
                      </p>
                      <p className="italic text-gray-700">
                        {edu.degree} in {edu.field}
                      </p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                      {edu.honors && edu.honors.length > 0 && (
                        <p className="text-sm text-gray-600 italic">
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

        {/* Professional Experience */}
        {sections.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {sections.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-bold text-gray-900">
                        {exp.position}, {exp.company}
                      </p>
                      <p className="italic text-gray-700">{exp.location}</p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm mb-2 ml-4">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-8">
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

        {/* Publications (if any) */}
        {sections.publications && sections.publications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1">
              Publications
            </h2>
            <div className="space-y-2">
              {sections.publications.map((pub) => (
                <div key={pub.id} className="text-sm">
                  <p className="text-gray-900">
                    {pub.authors}. ({pub.year}). "{pub.title}." <i>{pub.journal}</i>
                    {pub.volume && `, ${pub.volume}`}
                    {pub.issue && `(${pub.issue})`}
                    {pub.pages && `, pp. ${pub.pages}`}.
                    {pub.doi && ` DOI: ${pub.doi}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Research Interests / Skills */}
        {sections.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1">
              Areas of Expertise
            </h2>
            <div className="space-y-2">
              {sections.skills.map((category) => (
                <div key={category.id}>
                  <p className="text-gray-700">
                    <span className="font-semibold">{category.category}:</span>{' '}
                    {category.skills.map(skill => skill.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards and Honors */}
        {sections.awards && sections.awards.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1">
              Awards and Honors
            </h2>
            <div className="space-y-2">
              {sections.awards.map((award) => (
                <div key={award.id}>
                  <p className="text-gray-900">
                    <span className="font-semibold">{award.title}</span>, {award.issuer} ({award.date})
                  </p>
                  {award.description && (
                    <p className="text-sm text-gray-600 ml-4">{award.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {sections.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1">
              Professional Certifications
            </h2>
            <div className="space-y-2">
              {sections.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-gray-900">
                    <span className="font-semibold">{cert.name}</span>, {cert.issuer} ({cert.date})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {sections.references && sections.references.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1">
              References
            </h2>
            <p className="text-gray-700 italic">Available upon request</p>
          </div>
        )}
      </div>
    </div>
  );
}