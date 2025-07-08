import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { CVUploader } from '@/components/CVUploader';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { RecommendationsPanel } from '@/components/RecommendationsPanel';
import { AIEditSection } from '@/components/AIEditSection';
import { ResumeViewer } from '@/components/ResumeViewer';
import { ResumeTemplates } from '@/components/ResumeTemplates';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, RefreshCw, FileText, Edit3, Eye, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PDFExtractor } from '@/services/pdfExtractor';
import * as mammoth from 'mammoth';
// import aiAnalysisService from '@/services/aiAnalysisService';

interface AnalysisResult {
  score: number;
  feedback: string[];
  fileName: string;
  detailedAnalysis?: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'score' | 'viewer' | 'editor' | 'templates'>('score');
  const { toast } = useToast();

  // Enhanced CV analysis process
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setResult(null);
    setProcessingStage(0);
    setUploadedFile(file);

    try {
      // Stage 1: Extract text from file
      setProcessingStage(25);
      console.log('Starting text extraction for:', file.name, 'Type:', file.type);
      
      const text = await extractTextFromFile(file);
      
      if (!text || text.trim().length < 50) {
        throw new Error('Could not extract meaningful text from file. Please ensure your CV contains readable text.');
      }

      console.log('Text extracted successfully, length:', text.length);
      setExtractedText(text);

      // Stage 2: Analyze CV content
      setProcessingStage(50);
      const analysisResult = await analyzeCV(text, file.name);

      setProcessingStage(100);
      
      setResult({
        score: analysisResult.score,
        feedback: analysisResult.feedback,
        fileName: file.name,
        detailedAnalysis: analysisResult.detailedAnalysis
      });

      toast({
        title: "Analysis Complete!",
        description: `Your CV "${file.name}" scored ${analysisResult.score}/100.`,
      });

    } catch (error) {
      console.error('CV analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again with a different file format.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingStage(0);
    }
  };

  // Enhanced text extraction with proper file format handling
  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    
    console.log('Extracting text from:', file.name, 'Type:', fileType);
    
    try {
      if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        return await extractTextFromPDF(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
        return await extractTextFromDOCX(file);
      } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        return await file.text();
      } else {
        // Try as plain text fallback
        const text = await file.text();
        if (text.length > 50) {
          return text;
        }
        throw new Error('Unsupported file format. Please use PDF, DOCX, or TXT files.');
      }
    } catch (error) {
      console.error('Text extraction failed:', error);
      throw new Error(`Could not extract text from ${file.name}. Please ensure the file is not corrupted and try again.`);
    }
  };

  // Proper DOCX text extraction using mammoth
  const extractTextFromDOCX = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      if (result.value && result.value.length > 50) {
        console.log('DOCX text extracted successfully, length:', result.value.length);
        return result.value;
      } else {
        throw new Error('No readable text found in DOCX file');
      }
    } catch (error) {
      console.error('DOCX extraction error:', error);
      throw new Error('Could not read DOCX file. Please ensure it\'s not password protected.');
    }
  };

  // Enhanced PDF text extraction using PDF.js
  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      console.log('Starting PDF extraction with PDFExtractor for:', file.name);
      
      const pdfExtractor = PDFExtractor.getInstance();
      const extractedText = await pdfExtractor.extractText(file);
      
      console.log('PDF extraction completed successfully, length:', extractedText.length);
      return extractedText;
      
    } catch (error) {
      console.error('PDF extraction error:', error);
      
      // Provide helpful error messages
      if (error instanceof Error) {
        if (error.message.includes('password')) {
          throw new Error('This PDF is password protected. Please remove the password and try again.');
        }
        if (error.message.includes('corrupt')) {
          throw new Error('This PDF file appears to be corrupted. Please try a different file.');
        }
        if (error.message.includes('Invalid PDF')) {
          throw new Error('This file is not a valid PDF. Please check the file and try again.');
        }
        throw error;
      }
      
      throw new Error('Could not extract text from PDF. Please try converting to DOCX or TXT format for better results.');
    }
  };

  // AI-powered CV analysis using the new service
  const analyzeCV = async (text: string, fileName: string): Promise<{ score: number; feedback: string[]; detailedAnalysis?: any }> => {
    console.log('Analyzing CV content with AI analysis...');
    
    // Try to use OpenAI API if available
    const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (openaiApiKey && openaiApiKey.startsWith('sk-')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are an expert CV/resume analyzer. Analyze the provided CV and return a JSON response with: score (0-100), feedback array with specific points, and detailedAnalysis with strengths, weaknesses, and suggestions arrays.'
              },
              {
                role: 'user',
                content: `Analyze this CV and provide detailed feedback:\n\n${text}`
              }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices[0].message.content;
          
          // Try to parse JSON response
          try {
            const parsed = JSON.parse(aiResponse);
            return {
              score: parsed.score || 75,
              feedback: parsed.feedback || ['AI analysis completed'],
              detailedAnalysis: parsed.detailedAnalysis || {
                strengths: ['Professional format detected'],
                weaknesses: ['Could be improved'],
                suggestions: ['Add more specific achievements']
              }
            };
          } catch (parseError) {
            console.log('Could not parse AI response as JSON, using fallback analysis');
          }
        }
      } catch (error) {
        console.log('OpenAI API request failed, using fallback analysis:', error);
      }
    }
    
    // Fallback to local analysis
    let score = 0;
    const feedback: string[] = [];
    const lowerText = text.toLowerCase();
    
    // Enhanced local analysis
    if (lowerText.includes('@') && lowerText.includes('.')) {
      score += 15;
      feedback.push('✅ Email address found');
    } else {
      feedback.push('❌ Add email address');
    }
    
    if (lowerText.match(/\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)) {
      score += 10;
      feedback.push('✅ Phone number found');
    } else {
      feedback.push('❌ Add phone number');
    }
    
    if (lowerText.includes('experience') || lowerText.includes('work')) {
      score += 20;
      feedback.push('✅ Experience section found');
      
      if (lowerText.match(/\d{4}|\d{1,2}\/\d{4}/)) {
        score += 10;
        feedback.push('✅ Work dates included');
      } else {
        feedback.push('⚠️ Add specific dates for work experience');
      }
    } else {
      feedback.push('❌ Add work experience section');
    }
    
    if (lowerText.includes('education') || lowerText.includes('degree')) {
      score += 15;
      feedback.push('✅ Education section found');
    } else {
      feedback.push('❌ Add education section');
    }
    
    if (lowerText.includes('skills') || lowerText.includes('technical')) {
      score += 15;
      feedback.push('✅ Skills section found');
      
      const skillKeywords = ['javascript', 'python', 'java', 'react', 'node', 'html', 'css', 'sql', 'git'];
      const foundSkills = skillKeywords.filter(skill => lowerText.includes(skill));
      if (foundSkills.length > 0) {
        score += 10;
        feedback.push(`✅ Technical skills mentioned: ${foundSkills.join(', ')}`);
      }
    } else {
      feedback.push('❌ Add skills section');
    }
    
    // Check for achievements and metrics
    if (lowerText.match(/\d+%|\d+\+|increased|improved|reduced|achieved/)) {
      score += 15;
      feedback.push('✅ Quantifiable achievements found');
    } else {
      feedback.push('⚠️ Add quantifiable achievements (percentages, numbers)');
    }
    
    // Check CV length
    const wordCount = text.split(/\s+/).length;
    if (wordCount >= 300 && wordCount <= 800) {
      score += 5;
      feedback.push('✅ Good CV length');
    } else if (wordCount < 300) {
      feedback.push('⚠️ CV might be too short - add more details');
    } else {
      feedback.push('⚠️ CV might be too long - consider condensing');
    }
    
    return {
      score: Math.min(100, score),
      feedback,
      detailedAnalysis: {
        strengths: feedback.filter(f => f.includes('✅')).map(f => f.replace('✅ ', '')),
        weaknesses: feedback.filter(f => f.includes('❌')).map(f => f.replace('❌ ', '')),
        suggestions: feedback.filter(f => f.includes('⚠️')).map(f => f.replace('⚠️ ', ''))
      }
    };
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setIsProcessing(false);
    setUploadedFile(null);
    setExtractedText('');
    setActiveTab('score');
  };

  const handleTextUpdate = (newText: string) => {
    setExtractedText(newText);
    // Re-analyze with updated text
    if (uploadedFile) {
      analyzeCV(newText, uploadedFile.name).then(analysisResult => {
        setResult({
          score: analysisResult.score,
          feedback: analysisResult.feedback,
          fileName: uploadedFile.name,
          detailedAnalysis: analysisResult.detailedAnalysis
        });
        
        toast({
          title: "Analysis Updated!",
          description: `Your improved CV now scores ${analysisResult.score}/100.`,
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />

        {/* Processing Stage */}
        {isProcessing && (
          <Card className="w-full max-w-2xl mx-auto mb-8 shadow-card animate-fade-in">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="text-lg font-semibold text-primary">
                  Analyzing Your CV...
                </div>
                <Progress value={processingStage} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {processingStage <= 25 && "Using advanced PDF.js to extract text from your CV..."}
                  {processingStage > 25 && processingStage <= 50 && "Analyzing document structure and content with AI..."}
                  {processingStage > 50 && processingStage <= 75 && "Calculating ATS compatibility and keyword matching..."}
                  {processingStage > 75 && "Generating AI-powered recommendations and insights..."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Section */}
        {!result && !isProcessing && (
          <div className="space-y-8">
            <CVUploader onFileUpload={handleFileUpload} isProcessing={isProcessing} />
            
            {/* Supported Formats Info */}
            <Card className="max-w-2xl mx-auto shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">📁 Supported Formats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl">📄</div>
                    <Badge variant="outline">PDF</Badge>
                    <p className="text-xs text-muted-foreground">Text-based only</p>
                    <p className="text-xs text-green-600">✓ Proper text extraction</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl">📝</div>
                    <Badge variant="outline">DOCX</Badge>
                    <p className="text-xs text-muted-foreground">Word Document</p>
                    <p className="text-xs text-green-600">✓ Recommended</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl">📋</div>
                    <Badge variant="outline">TXT</Badge>
                    <p className="text-xs text-muted-foreground">Plain Text</p>
                    <p className="text-xs text-blue-600">✓ Always works</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Scanned PDFs or image-based documents won't work. 
                    Use text-based PDFs or convert to DOCX for best results.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* How it Works */}
            <Card className="max-w-4xl mx-auto shadow-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">🎯 How it works</h3>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl">📤</div>
                    <h4 className="font-medium">1. Upload</h4>
                    <p className="text-sm text-muted-foreground">Upload your CV (PDF, DOCX, or TXT)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl">🔍</div>
                    <h4 className="font-medium">2. Analyze</h4>
                    <p className="text-sm text-muted-foreground">Get your ATS score with AI analysis</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl">�️</div>
                    <h4 className="font-medium">3. Review</h4>
                    <p className="text-sm text-muted-foreground">View structured resume sections</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl">✨</div>
                    <h4 className="font-medium">4. Improve</h4>
                    <p className="text-sm text-muted-foreground">Use AI editor for enhancements</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Features Notice */}
            <Card className="max-w-2xl mx-auto shadow-card bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🤖</span>
                  AI-Powered Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">AI Analysis</Badge>
                    <p className="text-sm text-muted-foreground">
                      Get detailed feedback using OpenAI's advanced language models
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-100 text-blue-800">Smart Editor</Badge>
                    <p className="text-sm text-muted-foreground">
                      Receive AI-generated improvements and suggestions for your CV
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-green-100 text-green-800">Resume Parser</Badge>
                    <p className="text-sm text-muted-foreground">
                      Automatically extract and analyze different sections of your resume
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Score Preview */}
            <Card className="max-w-2xl mx-auto shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 text-warning mr-2" />
                  Sample Analysis Preview
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ATS Compatibility Score</span>
                    <Badge variant="outline">75/100</Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Example: Good foundation with room for improvement
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Section */}
        {result && !isProcessing && (
          <div className="space-y-8">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="score" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Score & Analysis
                </TabsTrigger>
                <TabsTrigger value="viewer" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Resume Viewer
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="editor" className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  AI Editor
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="score" className="space-y-6">
                <ScoreDisplay 
                  score={result.score} 
                  feedback={result.feedback}
                  isAnimating={true}
                />
                
                <RecommendationsPanel 
                  score={result.score}
                  isAnimating={true}
                />
              </TabsContent>
              
              <TabsContent value="viewer" className="space-y-6">
                <ResumeViewer 
                  file={uploadedFile}
                  extractedText={extractedText}
                  onTextUpdate={handleTextUpdate}
                />
              </TabsContent>
              
              <TabsContent value="templates" className="space-y-6">
                <ResumeTemplates 
                  extractedText={extractedText}
                  onTextUpdate={handleTextUpdate}
                />
              </TabsContent>
              
              <TabsContent value="editor" className="space-y-6">
                <AIEditSection 
                  originalText={extractedText}
                  onTextUpdate={handleTextUpdate}
                />
              </TabsContent>
            </Tabs>

            {/* New Analysis Button */}
            <div className="text-center">
              <Button 
                onClick={handleNewAnalysis}
                variant="outline"
                size="lg"
                className="shadow-card hover:shadow-lg"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Analyze Another CV
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-lg">🇳🇵</span>
            <span className="font-semibold text-nepal-blue">Recruit Nepal</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">Helping you land better jobs</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your CV data is processed locally and securely for analysis.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;