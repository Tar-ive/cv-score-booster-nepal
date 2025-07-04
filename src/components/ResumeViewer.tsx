import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Eye, 
  Download, 
  Printer, 
  Search,
  ZoomIn,
  ZoomOut,
  RotateCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeViewerProps {
  file: File | null;
  extractedText: string;
  onTextUpdate?: (newText: string) => void;
}

interface ParsedSection {
  title: string;
  content: string;
  type: 'header' | 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'other';
  score: number;
  suggestions: string[];
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ 
  file, 
  extractedText, 
  onTextUpdate 
}) => {
  const [viewMode, setViewMode] = useState<'text' | 'structured' | 'analysis'>('text');
  const [parsedSections, setParsedSections] = useState<ParsedSection[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const { toast } = useToast();

  useEffect(() => {
    if (extractedText) {
      parseResumeStructure(extractedText);
    }
  }, [extractedText]);

  const parseResumeStructure = async (text: string) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate parsing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sections: ParsedSection[] = [];
      const lines = text.split('\n').filter(line => line.trim());
      
      // Parse header/contact information
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      const phoneRegex = /(\+?1?[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
      
      const emails = text.match(emailRegex) || [];
      const phones = text.match(phoneRegex) || [];
      
      if (emails.length > 0 || phones.length > 0) {
        sections.push({
          title: 'Contact Information',
          content: `Email: ${emails.join(', ')}\nPhone: ${phones.join(', ')}`,
          type: 'contact',
          score: emails.length > 0 && phones.length > 0 ? 100 : 70,
          suggestions: emails.length === 0 ? ['Add email address'] : phones.length === 0 ? ['Add phone number'] : []
        });
      }
      
      // Parse sections by common keywords
      const sectionKeywords = {
        summary: ['summary', 'objective', 'profile', 'about'],
        experience: ['experience', 'work', 'employment', 'career'],
        education: ['education', 'academic', 'qualification', 'degree'],
        skills: ['skills', 'competencies', 'technical', 'proficiencies']
      };
      
      Object.entries(sectionKeywords).forEach(([sectionType, keywords]) => {
        const sectionLines = lines.filter(line => 
          keywords.some(keyword => 
            line.toLowerCase().includes(keyword.toLowerCase())
          )
        );
        
        if (sectionLines.length > 0) {
          const content = sectionLines.join('\n');
          let score = 60;
          const suggestions: string[] = [];
          
          // Basic scoring logic
          if (content.length < 50) {
            score = 30;
            suggestions.push('Add more detail to this section');
          } else if (content.length > 200) {
            score = 90;
          }
          
          // Specific suggestions by section type
          if (sectionType === 'experience') {
            if (!content.match(/\d{4}/)) {
              suggestions.push('Add dates for work experience');
            }
            if (!content.match(/\d+%|\d+\+/)) {
              suggestions.push('Include quantifiable achievements');
            }
          }
          
          if (sectionType === 'skills') {
            const skillCount = content.split(/[,\n]/).length;
            if (skillCount < 5) {
              suggestions.push('Consider adding more relevant skills');
            }
          }
          
          sections.push({
            title: sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
            content,
            type: sectionType as ParsedSection['type'],
            score,
            suggestions
          });
        }
      });
      
      // Add overall structure analysis
      const overallScore = sections.reduce((acc, section) => acc + section.score, 0) / sections.length;
      
      setParsedSections(sections);
      
      toast({
        title: "Resume Parsed Successfully",
        description: `Found ${sections.length} sections with overall score: ${Math.round(overallScore)}/100`,
      });
      
    } catch (error) {
      toast({
        title: "Parsing Failed",
        description: "Could not parse resume structure. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!file) return;
    
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.replace(/\.[^/.]+$/, '')}_extracted.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your extracted resume text has been downloaded.",
    });
  };

  const getSectionIcon = (type: ParsedSection['type']) => {
    switch (type) {
      case 'contact': return '📧';
      case 'summary': return '📝';
      case 'experience': return '💼';
      case 'education': return '🎓';
      case 'skills': return '🛠️';
      default: return '📄';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (!file || !extractedText) {
    return (
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Resume Viewer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Upload a resume file to view and analyze its structure.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Resume Viewer - {file.name}
        </CardTitle>
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{zoomLevel}%</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 150}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Raw Text</TabsTrigger>
            <TabsTrigger value="structured">Structured View</TabsTrigger>
            <TabsTrigger value="analysis">Section Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4">
            <ScrollArea className="h-[600px] border rounded-lg p-4">
              <pre 
                className="whitespace-pre-wrap text-sm font-mono"
                style={{ fontSize: `${zoomLevel}%` }}
              >
                {extractedText}
              </pre>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="structured" className="space-y-4">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">Analyzing resume structure...</p>
              </div>
            ) : parsedSections.length > 0 ? (
              <div className="space-y-4">
                {parsedSections.map((section, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getSectionIcon(section.type)}</span>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                        </div>
                        <Badge className={getScoreColor(section.score)}>
                          {section.score}/100
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm">
                            {section.content.substring(0, 300)}
                            {section.content.length > 300 && '...'}
                          </pre>
                        </div>
                        
                        {section.suggestions.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-muted-foreground">
                              Suggestions for improvement:
                            </h4>
                            <ul className="space-y-1">
                              {section.suggestions.map((suggestion, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <span className="text-yellow-500 mt-0.5">•</span>
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No structured sections found. The resume might need better formatting.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resume Structure Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {parsedSections.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Sections Found</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(parsedSections.reduce((acc, s) => acc + s.score, 0) / parsedSections.length || 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {extractedText.split(' ').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Word Count</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {extractedText.split('\n').filter(line => line.trim()).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Lines</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Section Completeness:</h4>
                    {['Contact Information', 'Summary', 'Experience', 'Education', 'Skills'].map(requiredSection => {
                      const hasSection = parsedSections.some(s => 
                        s.title.toLowerCase().includes(requiredSection.toLowerCase())
                      );
                      
                      return (
                        <div key={requiredSection} className="flex items-center gap-2">
                          {hasSection ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className={hasSection ? 'text-green-600' : 'text-red-600'}>
                            {requiredSection}
                          </span>
                          {!hasSection && (
                            <Badge variant="outline" className="ml-auto">
                              Missing
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
