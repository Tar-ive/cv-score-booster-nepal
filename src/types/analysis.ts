// Types for AI Analysis Service
export interface AnalysisResult {
  score: number;
  feedback: string[];
  detailedAnalysis?: DetailedAnalysis;
}

export interface DetailedAnalysis {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface CVAnalysisRequest {
  text: string;
  fileName: string;
}

export interface AIProvider {
  name: string;
  analyze: (cvText: string) => Promise<AnalysisResult>;
}

export interface AIServiceConfig {
  openaiApiKey?: string;
  anthropicApiKey?: string;
}

export interface ProcessingStage {
  stage: number;
  description: string;
}

export const PROCESSING_STAGES = {
  EXTRACTING: { stage: 25, description: "Extracting text from your CV..." },
  ANALYZING: { stage: 50, description: "Analyzing content structure..." },
  SCORING: { stage: 75, description: "Calculating ATS compatibility score..." },
  RECOMMENDATIONS: { stage: 100, description: "Generating personalized recommendations..." }
} as const;
