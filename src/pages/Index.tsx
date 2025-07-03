import React, { useState } from 'react';
import { Header } from '@/components/Header';
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

  // Simulate CV analysis process
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setResult(null);
    setProcessingStage(0);

    try {
      // Simulate processing stages
      const stages = [
        { stage: 0, message: 'Reading CV content...' },
        { stage: 25, message: 'Extracting text and structure...' },
        { stage: 50, message: 'Analyzing ATS compatibility...' },
        { stage: 75, message: 'Generating recommendations...' },
        { stage: 100, message: 'Analysis complete!' }
      ];

      for (const { stage, message } of stages) {
        setProcessingStage(stage);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Generate mock results based on file characteristics
      const mockScore = Math.floor(Math.random() * 40) + 50; // 50-90 range
      const mockFeedback = [
        "✅ Valid email address found",
        "✅ Phone number included",
        "✅ Work experience section present",
        "✅ Skills section identified",
        "✅ Good content length detected"
      ].slice(0, Math.floor(Math.random() * 3) + 2);

      setResult({
        score: mockScore,
        feedback: mockFeedback,
        fileName: file.name
      });

      toast({
        title: "Analysis Complete!",
        description: `Your CV "${file.name}" has been analyzed successfully.`,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingStage(0);
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
