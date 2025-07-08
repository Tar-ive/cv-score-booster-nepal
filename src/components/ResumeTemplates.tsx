import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Briefcase, 
  Code, 
  Users, 
  PenTool, 
  Camera, 
  Palette,
  Wand2,
  Download,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeTemplatesProps {
  extractedText: string;
  onTextUpdate?: (newText: string) => void;
}

interface Template {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
  prompt: string;
}

const templates: Template[] = [
  {
    id: 'professional',
    name: 'Professional',
    icon: Briefcase,
    description: 'Traditional corporate format with emphasis on achievements',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    prompt: 'Reformat this resume in a professional corporate style. Focus on quantifiable achievements, use formal language, emphasize leadership and results. Structure with clear sections: Summary, Experience, Education, Skills.'
  },
  {
    id: 'tech',
    name: 'Tech',
    icon: Code,
    description: 'Technical roles with focus on skills and projects',
    color: 'bg-green-50 text-green-700 border-green-200',
    prompt: 'Reformat this resume for a technical role. Emphasize programming languages, frameworks, projects, and technical achievements. Include technical skills prominently and use industry-specific terminology.'
  },
  {
    id: 'hr',
    name: 'HR',
    icon: Users,
    description: 'Human resources focused on people management',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    prompt: 'Reformat this resume for HR roles. Emphasize people management, recruitment, employee relations, and organizational development. Highlight soft skills and team leadership experience.'
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: PenTool,
    description: 'Content and copywriting emphasis',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    prompt: 'Reformat this resume for writing/content roles. Emphasize published work, writing samples, content strategy, and communication skills. Include portfolio links and publication metrics.'
  },
  {
    id: 'content',
    name: 'Content Creation',
    icon: Camera,
    description: 'Social media and content marketing focus',
    color: 'bg-pink-50 text-pink-700 border-pink-200',
    prompt: 'Reformat this resume for content creation roles. Emphasize social media growth, content strategy, brand building, and engagement metrics. Include platform-specific experience and creative projects.'
  },
  {
    id: 'uiux',
    name: 'UI/UX',
    icon: Palette,
    description: 'Design-focused with portfolio emphasis',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    prompt: 'Reformat this resume for UI/UX design roles. Emphasize design thinking, user research, prototyping tools, and design process. Include portfolio projects and user impact metrics.'
  }
];

export const ResumeTemplates: React.FC<ResumeTemplatesProps> = ({ 
  extractedText, 
  onTextUpdate 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editedText, setEditedText] = useState(extractedText);
  const [activeTab, setActiveTab] = useState<'templates' | 'editor' | 'preview'>('templates');
  const { toast } = useToast();

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsGenerating(true);

    try {
      const template = templates.find(t => t.id === templateId);
      if (!template) return;

      // Call Supabase edge function to reformat the resume
      const response = await fetch('https://cjkuvjzztigzlohtbdjz.supabase.co/functions/v1/reformat-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqa3V2anp6dGlnemxvaHRiZGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1Nzc3NzEsImV4cCI6MjA2NzE1Mzc3MX0.MFk7pmTTPNZmlPvC4X9v2Gxi4ipal7hCpBmt6AB8hfA`
        },
        body: JSON.stringify({
          resumeText: extractedText,
          prompt: template.prompt,
          templateName: template.name
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEditedText(data.reformattedText);
        setActiveTab('preview');
        
        toast({
          title: "Template Applied!",
          description: `Your resume has been reformatted using the ${template.name} template.`,
        });
      } else {
        throw new Error('Failed to reformat resume');
      }
    } catch (error) {
      console.error('Template generation error:', error);
      toast({
        title: "Template Error",
        description: "Could not apply template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveChanges = () => {
    if (onTextUpdate) {
      onTextUpdate(editedText);
      toast({
        title: "Changes Saved",
        description: "Your resume has been updated successfully.",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([editedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_${selectedTemplate}_template.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          Resume Templates & AI Editor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="editor">AI Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => !isGenerating && handleTemplateSelect(template.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${template.color}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                        </div>
                        {selectedTemplate === template.id && (
                          <Badge variant="default">Selected</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                      {isGenerating && selectedTemplate === template.id && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span className="text-sm text-primary">Applying template...</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="editor" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Edit Your Resume</h3>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('preview')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="Edit your resume content here..."
                className="min-h-[400px] font-mono text-sm"
              />
              
              <div className="text-sm text-muted-foreground">
                Word count: {editedText.split(/\s+/).length} words
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Resume Preview</h3>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab('editor')}
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[500px] border rounded-lg p-6 bg-white">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {editedText}
                </pre>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};