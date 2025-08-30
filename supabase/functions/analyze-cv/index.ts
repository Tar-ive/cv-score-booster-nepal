import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// JSON Schema for Resume Parsing
const RESUME_SCHEMA = {
  "personal_data": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "portfolio": ""
  },
  "experiences": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "location": "",
      "responsibilities": [],
      "achievements": []
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "technologies": [],
      "start_date": "",
      "end_date": "",
      "url": ""
    }
  ],
  "skills": {
    "technical": [],
    "soft": [],
    "languages": [],
    "tools": []
  },
  "research_work": [
    {
      "title": "",
      "description": "",
      "publication_date": "",
      "url": "",
      "collaborators": []
    }
  ],
  "achievements": [
    {
      "title": "",
      "description": "",
      "date": "",
      "organization": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field_of_study": "",
      "start_date": "",
      "end_date": "",
      "gpa": "",
      "location": ""
    }
  ]
};

const RESUME_PARSING_PROMPT = `
You are a JSON extraction engine. Convert the following resume text into precisely the JSON schema specified below.
- Do not compose any extra fields or commentary.
- Do not make up values for any fields.
- Use "Present" if an end date is ongoing.
- Make sure dates are in YYYY-MM-DD format when possible.
- Do not format the response in Markdown or any other format. Just output raw JSON.

Schema:
${JSON.stringify(RESUME_SCHEMA, null, 2)}

Resume:
{resumeText}

NOTE: Please output only a valid JSON matching the EXACT schema.
`;

const KEYWORD_EXTRACTION_PROMPT = `
Extract relevant keywords from the following resume text. Focus on:
- Technical skills
- Job titles and roles
- Industry terms
- Tools and technologies
- Soft skills
- Certifications

Return only a JSON object with an "extracted_keywords" array:
{"extracted_keywords": ["keyword1", "keyword2", ...]}

Resume text: {resumeText}
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, fileName } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Starting CV analysis for file:', fileName);

    // Parse resume structure
    const parsingPrompt = RESUME_PARSING_PROMPT.replace('{resumeText}', resumeText);
    const parseResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: parsingPrompt }
        ],
        temperature: 0.1,
      }),
    });

    const parseData = await parseResponse.json();
    let parsedResume;
    try {
      const jsonText = parseData.choices[0].message.content.trim();
      const cleanedJson = jsonText.replace(/```json\n?|\n?```/g, '');
      parsedResume = JSON.parse(cleanedJson);
    } catch (e) {
      console.error('Failed to parse resume JSON:', e);
      parsedResume = RESUME_SCHEMA;
    }

    // Extract keywords
    const keywordPrompt = KEYWORD_EXTRACTION_PROMPT.replace('{resumeText}', resumeText);
    const keywordResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: keywordPrompt }
        ],
        temperature: 0.1,
      }),
    });

    const keywordData = await keywordResponse.json();
    let extractedKeywords;
    try {
      const keywordJson = keywordData.choices[0].message.content.trim();
      const cleanedKeywordJson = keywordJson.replace(/```json\n?|\n?```/g, '');
      extractedKeywords = JSON.parse(cleanedKeywordJson);
    } catch (e) {
      console.error('Failed to parse keywords JSON:', e);
      extractedKeywords = { extracted_keywords: [] };
    }

    // Calculate ATS score with proper weights
    const scoreResult = calculateATSScore(parsedResume, resumeText, extractedKeywords);

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const cvRecord = {
      name: parsedResume?.personal_data?.name || null,
      email: parsedResume?.personal_data?.email || null,
      total_score: scoreResult.score,
      experience_count: Array.isArray(parsedResume?.experiences) ? parsedResume.experiences.length : 0,
      education_count: Array.isArray(parsedResume?.education) ? parsedResume.education.length : 0,
      skills_count: countAllSkills(parsedResume?.skills) || 0,
      projects_count: Array.isArray(parsedResume?.projects) ? parsedResume.projects.length : 0,
      total_experience_years: calculateExperienceYears(parsedResume?.experiences) || 0,
      personal_data: parsedResume?.personal_data || {},
      experiences: Array.isArray(parsedResume?.experiences) ? parsedResume.experiences : [],
      projects: Array.isArray(parsedResume?.projects) ? parsedResume.projects : [],
      skills: parsedResume?.skills || {},
      research_work: Array.isArray(parsedResume?.research_work) ? parsedResume.research_work : [],
      achievements: Array.isArray(parsedResume?.achievements) ? parsedResume.achievements : [],
      education: Array.isArray(parsedResume?.education) ? parsedResume.education : [],
      extracted_keywords: extractedKeywords?.extracted_keywords ? extractedKeywords : { extracted_keywords: [] },
      original_filename: fileName,
      raw_text_preview: resumeText.substring(0, 1000)
    };

    const { error: saveError } = await supabase
      .from('cv_analyses')
      .insert([cvRecord]);

    if (saveError) {
      console.error('Error saving CV analysis:', saveError);
    }

    return new Response(JSON.stringify({
      score: scoreResult.score,
      feedback: scoreResult.feedback,
      recommendations: scoreResult.recommendations,
      fileName: fileName
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-cv function:', error);
    return new Response(JSON.stringify({ 
      error: 'Analysis failed', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function calculateATSScore(parsedData: any, resumeText: string, keywords: any) {
  let score = 0;
  const feedback: string[] = [];
  const recommendations: string[] = [];

  // Format & Structure: 20%
  let formatScore = 0;
  if (resumeText.length > 300) {
    formatScore += 5;
    feedback.push("✅ Adequate content length");
  } else {
    recommendations.push("📝 Expand your resume content for better impact");
  }
  
  if (resumeText.includes('•') || resumeText.includes('-') || resumeText.includes('*')) {
    formatScore += 5;
    feedback.push("✅ Good use of bullet points");
  } else {
    recommendations.push("🔸 Use bullet points to improve readability");
  }
  
  if (parsedData?.experiences?.length > 0) {
    formatScore += 5;
    feedback.push("✅ Experience section present");
  }
  
  if (parsedData?.education?.length > 0) {
    formatScore += 5;
    feedback.push("✅ Education section included");
  }
  
  score += formatScore;

  // Skills Match: 25%
  let skillsScore = 0;
  const allSkills = countAllSkills(parsedData?.skills);
  if (allSkills >= 5) {
    skillsScore += 15;
    feedback.push(`✅ ${allSkills} skills listed`);
  } else if (allSkills > 0) {
    skillsScore += 8;
    feedback.push(`✅ ${allSkills} skills found`);
    recommendations.push("🎯 Add more relevant technical skills");
  } else {
    recommendations.push("🎯 Include a comprehensive skills section");
  }
  
  if (parsedData?.skills?.technical?.length > 0) {
    skillsScore += 10;
    feedback.push("✅ Technical skills identified");
  } else {
    recommendations.push("💻 Add specific technical skills for your field");
  }
  
  score += skillsScore;

  // ATS Keyword Presence: 20%
  let keywordScore = 0;
  const extractedKeywords = keywords?.extracted_keywords || [];
  if (extractedKeywords.length >= 10) {
    keywordScore += 20;
    feedback.push("✅ Rich keyword content detected");
  } else if (extractedKeywords.length >= 5) {
    keywordScore += 12;
    feedback.push("✅ Good keyword presence");
    recommendations.push("🔍 Include more industry-specific keywords");
  } else {
    keywordScore += 5;
    recommendations.push("🔍 Add more relevant keywords from job descriptions");
  }
  
  score += keywordScore;

  // Job Role Clarity: 15%
  let clarityScore = 0;
  if (parsedData?.experiences?.some((exp: any) => exp.position)) {
    clarityScore += 8;
    feedback.push("✅ Job titles clearly stated");
  } else {
    recommendations.push("🎯 Clearly state your job titles and roles");
  }
  
  if (parsedData?.experiences?.some((exp: any) => exp.responsibilities?.length > 0)) {
    clarityScore += 7;
    feedback.push("✅ Job responsibilities described");
  } else {
    recommendations.push("📋 Add detailed job responsibilities");
  }
  
  score += clarityScore;

  // Experience Chronology: 10%
  let chronologyScore = 0;
  if (parsedData?.experiences?.length > 0) {
    const hasValidDates = parsedData.experiences.some((exp: any) => 
      exp.start_date && (exp.end_date || exp.end_date === "Present")
    );
    if (hasValidDates) {
      chronologyScore += 10;
      feedback.push("✅ Work timeline provided");
    } else {
      recommendations.push("📅 Include start and end dates for positions");
    }
  }
  
  score += chronologyScore;

  // Contact Info Readability: 10%
  let contactScore = 0;
  if (parsedData?.personal_data?.email && parsedData.personal_data.email.includes('@')) {
    contactScore += 5;
    feedback.push("✅ Valid email address found");
  } else {
    recommendations.push("📧 Include a professional email address");
  }
  
  if (parsedData?.personal_data?.phone) {
    contactScore += 3;
    feedback.push("✅ Phone number included");
  } else {
    recommendations.push("📱 Add your phone number");
  }
  
  if (parsedData?.personal_data?.name) {
    contactScore += 2;
    feedback.push("✅ Name clearly displayed");
  }
  
  score += contactScore;

  return {
    score: Math.min(Math.round(score), 100),
    feedback: feedback.slice(0, 5), // Limit feedback items
    recommendations: recommendations.slice(0, 3) // Top 3 recommendations
  };
}

function countAllSkills(skills: any): number {
  if (!skills) return 0;
  let count = 0;
  Object.values(skills).forEach((skillArray: any) => {
    if (Array.isArray(skillArray)) {
      count += skillArray.length;
    }
  });
  return count;
}

function calculateExperienceYears(experiences: any[]): number {
  if (!experiences) return 0;
  
  let totalYears = 0;
  const currentYear = new Date().getFullYear();
  
  experiences.forEach(exp => {
    if (exp.start_date) {
      try {
        const startYear = new Date(exp.start_date).getFullYear();
        const endYear = exp.end_date === "Present" || !exp.end_date 
          ? currentYear 
          : new Date(exp.end_date).getFullYear();
        
        if (startYear && endYear >= startYear) {
          totalYears += endYear - startYear;
        }
      } catch (e) {
        console.log('Date parsing error:', e);
      }
    }
  });
  
  return totalYears;
}