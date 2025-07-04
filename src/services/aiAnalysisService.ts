import OpenAI from 'openai';
import axios from 'axios';

interface AnalysisResult {
  score: number;
  feedback: string[];
  detailedAnalysis?: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}

interface AIProvider {
  name: string;
  analyze: (cvText: string) => Promise<AnalysisResult>;
}

class AIAnalysisService {
  private openai: OpenAI | null = null;
  private apiKeys: {
    openai?: string;
  } = {};

  constructor() {
    // Initialize API keys from environment variables
    this.apiKeys.openai = process.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;

    // Initialize OpenAI client if API key is available
    if (this.apiKeys.openai) {
      try {
        this.openai = new OpenAI({
          apiKey: this.apiKeys.openai,
          dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
        });
      } catch (error) {
        console.warn('Failed to initialize OpenAI client:', error);
      }
    }
  }

  /**
   * Analyze CV using OpenAI GPT
   */
  private async analyzeWithOpenAI(cvText: string): Promise<AnalysisResult> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System) and resume reviewer. Analyze the following CV and provide:

1. An ATS compatibility score (0-100)
2. Specific feedback points for improvement
3. Detailed analysis of strengths, weaknesses, and suggestions

CV Content:
${cvText}

Please respond in JSON format with the following structure:
{
  "score": number,
  "feedback": ["feedback point 1", "feedback point 2", ...],
  "detailedAnalysis": {
    "strengths": ["strength 1", "strength 2", ...],
    "weaknesses": ["weakness 1", "weakness 2", ...],
    "suggestions": ["suggestion 1", "suggestion 2", ...]
  }
}

Focus on:
- ATS compatibility and keyword optimization
- Professional formatting and structure
- Quantifiable achievements
- Skills and experience relevance
- Contact information completeness
- Overall presentation quality
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert ATS and resume reviewer. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.3
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse JSON response
      const analysis = JSON.parse(content);
      
      // Validate and sanitize the response
      return {
        score: Math.max(0, Math.min(100, analysis.score || 0)),
        feedback: Array.isArray(analysis.feedback) ? analysis.feedback : [],
        detailedAnalysis: analysis.detailedAnalysis || {
          strengths: [],
          weaknesses: [],
          suggestions: []
        }
      };

    } catch (error) {
      console.error('OpenAI analysis error:', error);
      throw new Error('Failed to analyze CV with OpenAI');
    }
  }

  /**
   * Fallback local analysis (existing logic)
   */
  private async analyzeLocally(cvText: string): Promise<AnalysisResult> {
    let score = 0;
    const feedback: string[] = [];
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const suggestions: string[] = [];
    
    const lowerText = cvText.toLowerCase();
    
    // Contact Information (20 points)
    if (lowerText.includes('@') && (lowerText.includes('.com') || lowerText.includes('.org'))) {
      score += 10;
      feedback.push('✅ Email address found');
      strengths.push('Contact information includes email address');
    } else {
      weaknesses.push('Missing email address');
      suggestions.push('Add a professional email address');
    }
    
    if (/\b\d{10}\b|\(\d{3}\)\s*\d{3}-\d{4}/.test(cvText)) {
      score += 10;
      feedback.push('✅ Phone number detected');
      strengths.push('Contact information includes phone number');
    } else {
      weaknesses.push('Missing phone number');
      suggestions.push('Add a phone number for easy contact');
    }

    // Professional Keywords (25 points)
    const keywords = [
      'experience', 'skills', 'education', 'work', 'project', 'management',
      'development', 'analysis', 'leadership', 'communication', 'teamwork',
      'problem-solving', 'technical', 'software', 'programming', 'data'
    ];
    
    const foundKeywords = keywords.filter(keyword => lowerText.includes(keyword));
    const keywordScore = Math.min(25, foundKeywords.length * 2);
    score += keywordScore;
    
    if (foundKeywords.length > 5) {
      feedback.push(`✅ Good keyword variety (${foundKeywords.length} professional terms found)`);
      strengths.push('Contains relevant professional keywords');
    } else {
      weaknesses.push('Limited professional keywords');
      suggestions.push('Include more industry-specific keywords and skills');
    }

    // Structure and Sections (20 points)
    const sections = ['education', 'experience', 'skill', 'project', 'work', 'employment'];
    const foundSections = sections.filter(section => lowerText.includes(section));
    const structureScore = Math.min(20, foundSections.length * 4);
    score += structureScore;
    
    if (foundSections.length >= 3) {
      feedback.push('✅ Well-structured with multiple sections');
      strengths.push('Well-organized with clear sections');
    } else {
      weaknesses.push('Missing standard CV sections');
      suggestions.push('Include standard sections: Education, Experience, Skills, Projects');
    }

    // Quantifiable Achievements (15 points)
    const numbers = cvText.match(/\d+%|\d+\+|\$\d+|\d+\s*(years?|months?|projects?|clients?|people|team)/gi);
    if (numbers && numbers.length > 0) {
      score += 15;
      feedback.push('✅ Contains quantifiable achievements');
      strengths.push('Includes measurable accomplishments');
    } else {
      weaknesses.push('Lacks quantifiable achievements');
      suggestions.push('Add numbers, percentages, and measurable results to your achievements');
    }

    // Education Information (10 points)
    const educationTerms = ['university', 'college', 'degree', 'bachelor', 'master', 'phd', 'certification'];
    const hasEducation = educationTerms.some(term => lowerText.includes(term));
    if (hasEducation) {
      score += 10;
      feedback.push('✅ Education information present');
      strengths.push('Educational background is clearly stated');
    } else {
      weaknesses.push('Missing education information');
      suggestions.push('Include your educational background and relevant certifications');
    }

    // Professional formatting (10 points)
    if (cvText.length > 500 && cvText.length < 3000) {
      score += 5;
      feedback.push('✅ Appropriate length');
      strengths.push('CV has appropriate length');
    } else if (cvText.length <= 500) {
      weaknesses.push('CV appears too short');
      suggestions.push('Expand your CV with more detailed descriptions of your experience');
    } else {
      weaknesses.push('CV might be too long');
      suggestions.push('Consider condensing your CV to 1-2 pages');
    }
    
    if (cvText.split('\n').length > 10) {
      score += 5;
      feedback.push('✅ Good formatting structure');
      strengths.push('Good use of formatting and structure');
    } else {
      weaknesses.push('Limited formatting structure');
      suggestions.push('Use bullet points and clear formatting to improve readability');
    }

    // Ensure minimum feedback
    if (feedback.length === 0) {
      feedback.push('Basic CV structure detected');
    }

    // Cap score at 100
    score = Math.min(100, score);

    return {
      score,
      feedback,
      detailedAnalysis: {
        strengths,
        weaknesses,
        suggestions
      }
    };
  }

  /**
   * Main analysis method - tries OpenAI first, falls back to local analysis
   */
  async analyzeCV(cvText: string): Promise<AnalysisResult> {
    // Try OpenAI first
    if (this.openai) {
      try {
        console.log('Analyzing CV with OpenAI...');
        return await this.analyzeWithOpenAI(cvText);
      } catch (error) {
        console.warn('OpenAI analysis failed, using local analysis:', error);
      }
    }

    // Fall back to local analysis
    console.log('Using local CV analysis...');
    return await this.analyzeLocally(cvText);
  }

  /**
   * Get available AI providers
   */
  getAvailableProviders(): string[] {
    const providers: string[] = [];
    if (this.openai) providers.push('OpenAI');
    providers.push('Local');
    return providers;
  }

  /**
   * Check if any AI services are configured
   */
  hasAIServices(): boolean {
    return !!this.openai;
  }
}

// Export singleton instance
export const aiAnalysisService = new AIAnalysisService();
export default aiAnalysisService;
