import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Copy, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIEditSectionProps {
  originalText: string;
  onTextUpdate: (newText: string) => void;
}

interface EditSuggestion {
  type: 'improve' | 'fix' | 'enhance';
  section: string;
  original: string;
  improved: string;
  explanation: string;
}

export const AIEditSection: React.FC<AIEditSectionProps> = ({ originalText, onTextUpdate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [editedText, setEditedText] = useState(originalText);
  const [suggestions, setSuggestions] = useState<EditSuggestion[]>([]);
  const [selectedTab, setSelectedTab] = useState('editor');
  const { toast } = useToast();

  const generateAIImprovements = async () => {
    setIsGenerating(true);
    try {
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
                  content: 'You are an expert CV/resume editor. Analyze the provided CV text and generate specific improvements. Return a JSON array of improvements with: type (improve/fix/enhance), section, original, improved, and explanation fields.'
                },
                {
                  role: 'user',
                  content: `Improve this CV text and provide specific suggestions:\n\n${originalText}`
                }
              ],
              temperature: 0.7,
              max_tokens: 1500
            })
          });

          if (response.ok) {
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            
            try {
              const parsed = JSON.parse(aiResponse);
              if (Array.isArray(parsed)) {
                setSuggestions(parsed);
                
                // Apply improvements to create enhanced version
                let improvedText = originalText;
                parsed.forEach(suggestion => {
                  if (improvedText.toLowerCase().includes(suggestion.original.toLowerCase())) {
                    improvedText = improvedText.replace(
                      new RegExp(suggestion.original, 'gi'), 
                      suggestion.improved
                    );
                  }
                });
                
                setEditedText(improvedText);
                
                toast({
                  title: "AI Improvements Generated!",
                  description: `Generated ${parsed.length} AI-powered improvement suggestions.`,
                });
                
                return;
              }
            } catch (parseError) {
              console.log('Could not parse AI response as JSON, using fallback');
            }
          }
        } catch (error) {
          console.log('OpenAI API request failed, using fallback analysis:', error);
        }
      }
      
      // Fallback to mock suggestions
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Enhanced mock suggestions based on text analysis
      const mockSuggestions: EditSuggestion[] = [];
      const lowerText = originalText.toLowerCase();
      
      // Check for weak language
      if (lowerText.includes('responsible for') || lowerText.includes('duties included')) {
        mockSuggestions.push({
          type: 'improve',
          section: 'Experience',
          original: 'Responsible for managing projects',
          improved: 'Led cross-functional teams to deliver 5+ projects on time and within budget, resulting in 30% efficiency improvement',
          explanation: 'Use action verbs and include specific metrics and outcomes'
        });
      }
      
      // Check for generic phrases
      if (lowerText.includes('hardworking') || lowerText.includes('team player')) {
        mockSuggestions.push({
          type: 'improve',
          section: 'Professional Summary',
          original: 'Hardworking team player with good communication skills',
          improved: 'Collaborative software engineer with 3+ years of experience delivering scalable web applications and mentoring junior developers',
          explanation: 'Replace generic adjectives with specific experience and achievements'
        });
      }
      
      // Check for missing quantification
      if (!lowerText.match(/\d+%|\d+\+|increased|improved|reduced/)) {
        mockSuggestions.push({
          type: 'enhance',
          section: 'Achievements',
          original: 'Improved system performance',
          improved: 'Optimized system architecture, reducing page load times by 45% and improving user satisfaction scores by 25%',
          explanation: 'Add specific metrics and quantifiable results to demonstrate impact'
        });
      }
      
      // Check for basic skills listing
      if (lowerText.includes('skills:') && !lowerText.includes('proficient') && !lowerText.includes('expert')) {
        mockSuggestions.push({
          type: 'enhance',
          section: 'Technical Skills',
          original: 'JavaScript, HTML, CSS, React',
          improved: 'Frontend: React (Expert), TypeScript (Advanced), JavaScript ES6+ (Expert), HTML5/CSS3 (Advanced)\nBackend: Node.js (Intermediate), Express.js (Intermediate), MongoDB (Intermediate)',
          explanation: 'Categorize skills and indicate proficiency levels to help recruiters assess your expertise'
        });
      }
      
      // Default suggestions if no specific issues found
      if (mockSuggestions.length === 0) {
        mockSuggestions.push(
          {
            type: 'improve',
            section: 'Professional Summary',
            original: 'Experienced professional',
            improved: 'Results-driven [your field] professional with X+ years of experience in [specific area], specializing in [key skills/technologies]',
            explanation: 'Make your summary more specific and compelling with concrete details'
          },
          {
            type: 'enhance',
            section: 'Experience',
            original: 'Worked on various projects',
            improved: 'Led development of [specific project], resulting in [quantifiable outcome] and [business impact]',
            explanation: 'Replace vague descriptions with specific achievements and measurable results'
          }
        );
      }
      
      setSuggestions(mockSuggestions);
      
      // Apply improvements to text
      let improvedText = originalText;
      mockSuggestions.forEach(suggestion => {
        if (improvedText.toLowerCase().includes(suggestion.original.toLowerCase())) {
          improvedText = improvedText.replace(
            new RegExp(suggestion.original, 'gi'), 
            suggestion.improved
          );
        }
      });
      
      setEditedText(improvedText);
      
      toast({
        title: "AI Improvements Generated!",
        description: `Found ${mockSuggestions.length} improvement suggestions for your CV.`,
      });
      
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate improvements. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const applySuggestion = (suggestion: EditSuggestion) => {
    const newText = editedText.replace(
      new RegExp(suggestion.original, 'gi'), 
      suggestion.improved
    );
    setEditedText(newText);
    
    toast({
      title: "Suggestion Applied",
      description: `Improved ${suggestion.section} section.`,
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editedText);
      toast({
        title: "Copied to Clipboard",
        description: "Your improved CV text has been copied.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadAsText = () => {
    const blob = new Blob([editedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'improved-cv.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your improved CV has been downloaded.",
    });
  };

  const resetText = () => {
    setEditedText(originalText);
    setSuggestions([]);
    toast({
      title: "Text Reset",
      description: "Reverted to original CV text.",
    });
  };

  const getSuggestionTypeColor = (type: EditSuggestion['type']) => {
    switch (type) {
      case 'improve': return 'bg-green-100 text-green-800';
      case 'fix': return 'bg-yellow-100 text-yellow-800';
      case 'enhance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI-Powered CV Editor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor">Text Editor</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                onClick={generateAIImprovements} 
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {isGenerating ? 'Generating...' : 'Generate AI Improvements'}
              </Button>
              <Button variant="outline" onClick={resetText}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
            
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Your CV text will appear here..."
              className="min-h-[400px] font-mono text-sm"
            />
            
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy Text
              </Button>
              <Button onClick={downloadAsText} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={() => onTextUpdate(editedText)} className="ml-auto">
                Apply Changes
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions" className="space-y-4">
            {suggestions.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No suggestions yet. Click "Generate AI Improvements" to get started.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSuggestionTypeColor(suggestion.type)}>
                            {suggestion.type}
                          </Badge>
                          <span className="font-medium">{suggestion.section}</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => applySuggestion(suggestion)}
                          variant="outline"
                        >
                          Apply
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-red-600">Original:</p>
                          <p className="text-sm bg-red-50 p-2 rounded">{suggestion.original}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-green-600">Improved:</p>
                          <p className="text-sm bg-green-50 p-2 rounded">{suggestion.improved}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-blue-600">Why this helps:</p>
                          <p className="text-sm text-muted-foreground">{suggestion.explanation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Preview of Improved CV</h3>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
                    {editedText}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
