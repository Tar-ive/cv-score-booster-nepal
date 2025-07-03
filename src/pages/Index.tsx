import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { CVUploader } from '@/components/CVUploader';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { RecommendationsPanel } from '@/components/RecommendationsPanel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  score: number;
  feedback: string[];
  fileName: string;
}

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const { toast } = useToast();

  // Real CV analysis process
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setResult(null);
    setProcessingStage(0);

    try {
      // Read file content
      setProcessingStage(25);
      const text = await extractTextFromFile(file);
      
      if (!text) {
        throw new Error('Could not extract text from file');
      }

      // AI Analysis
      setProcessingStage(50);
      const { data, error } = await supabase.functions.invoke('analyze-cv', {
        body: {
          resumeText: text,
          fileName: file.name
        }
      });

      if (error) {
        throw new Error(error.message || 'Analysis failed');
      }

      setProcessingStage(100);
      
      setResult({
        score: data.score,
        feedback: data.feedback,
        fileName: file.name
      });

      toast({
        title: "Analysis Complete!",
        description: `Your CV "${file.name}" scored ${data.score}/100.`,
      });

    } catch (error) {
      console.error('CV analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingStage(0);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    console.log('Extracting text from:', file.name, 'Type:', file.type);
    
    if (file.type === 'application/pdf') {
      return await extractTextFromPDF(file);
    } else {
      // For DOCX and text files - simplified approach
      const text = await file.text();
      console.log('Extracted text length:', text.length);
      return text;
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      console.log('Starting PDF extraction...');
      
      // Use a simpler approach - convert to text for now
      // For production, you'd want proper PDF parsing
      const arrayBuffer = await file.arrayBuffer();
      const text = new TextDecoder().decode(arrayBuffer);
      
      // Basic cleanup - remove non-printable characters but keep structure
      const cleanText = text
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      console.log('PDF text extracted, length:', cleanText.length);
      
      if (cleanText.length < 50) {
        throw new Error('Could not extract readable text from PDF');
      }
      
      return cleanText;
    } catch (error) {
      console.error('PDF extraction error:', error);
      
      // Fallback: try reading as text
      try {
        const text = await file.text();
        console.log('Fallback text extraction, length:', text.length);
        return text;
      } catch (fallbackError) {
        console.error('Fallback extraction failed:', fallbackError);
        throw new Error('Could not extract text from PDF. Please try converting to .txt or .docx format.');
      }
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setIsProcessing(false);
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
                  {processingStage === 0 && "Reading CV content..."}
                  {processingStage === 25 && "Extracting text and structure..."}
                  {processingStage === 50 && "Analyzing ATS compatibility..."}
                  {processingStage === 75 && "Generating recommendations..."}
                  {processingStage === 100 && "Analysis complete!"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Section */}
        {!result && !isProcessing && (
          <div className="space-y-8">
            <CVUploader onFileUpload={handleFileUpload} isProcessing={isProcessing} />
            
            {/* How it Works */}
            <Card className="max-w-4xl mx-auto shadow-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">🎯 How it works</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl">📤</div>
                    <h4 className="font-medium">1. Upload</h4>
                    <p className="text-sm text-muted-foreground">Upload your CV (PDF or Word)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl">🔍</div>
                    <h4 className="font-medium">2. Analyze</h4>
                    <p className="text-sm text-muted-foreground">Get your ATS score instantly</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl">🚀</div>
                    <h4 className="font-medium">3. Improve</h4>
                    <p className="text-sm text-muted-foreground">Follow specific recommendations</p>
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
            <ScoreDisplay 
              score={result.score} 
              feedback={result.feedback}
              isAnimating={true}
            />
            
            <RecommendationsPanel 
              score={result.score}
              isAnimating={true}
            />

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
            Your CV data is processed securely and helps improve our analysis for everyone.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
