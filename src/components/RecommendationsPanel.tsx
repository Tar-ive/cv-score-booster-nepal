import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  Link, 
  Award,
  FileText,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Recommendation {
  icon: React.ReactNode;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface RecommendationsPanelProps {
  score: number;
  isAnimating?: boolean;
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ 
  score, 
  isAnimating = false 
}) => {
  const generateRecommendations = (score: number): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    if (score < 70) {
      recommendations.push(
        {
          icon: <Target className="h-5 w-5" />,
          title: "Add Targeted Keywords",
          description: "Include specific technical skills and industry terms from job descriptions you're targeting.",
          priority: 'high'
        },
        {
          icon: <TrendingUp className="h-5 w-5" />,
          title: "Quantify Achievements",
          description: "Add measurable results like 'Increased sales by 20%' or 'Managed team of 5 people'.",
          priority: 'high'
        },
        {
          icon: <Link className="h-5 w-5" />,
          title: "Complete Contact Info",
          description: "Ensure your contact information is complete and professional.",
          priority: 'medium'
        }
      );
    }

    if (score < 85) {
      recommendations.push(
        {
          icon: <Award className="h-5 w-5" />,
          title: "Highlight Certifications",
          description: "Add any relevant certifications, training, or professional development.",
          priority: 'medium'
        },
        {
          icon: <FileText className="h-5 w-5" />,
          title: "Improve Formatting",
          description: "Use bullet points and clear section headers to improve readability.",
          priority: 'low'
        }
      );
    }

    if (recommendations.length === 0) {
      recommendations.push({
        icon: <Lightbulb className="h-5 w-5" />,
        title: "Great Job!",
        description: "Your CV is well-optimized. Consider tailoring it for specific job applications.",
        priority: 'low'
      });
    }

    return recommendations.slice(0, 3); // Limit to top 3
  };

  const recommendations = generateRecommendations(score);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <Card className={cn(
      "w-full max-w-2xl mx-auto shadow-card transition-all duration-500",
      isAnimating && "animate-slide-up"
    )}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-6 w-6 text-primary" />
          <span>Improvement Recommendations</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            className={cn(
              "p-4 rounded-lg border transition-all duration-300",
              getPriorityColor(rec.priority),
              isAnimating && "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {rec.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {rec.priority.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm opacity-90">{rec.description}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t space-y-3">
          <div className="flex space-x-3">
            <Button variant="professional" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Get Detailed Tips
            </Button>
            <Button variant="outline" className="flex-1">
              <Award className="h-4 w-4 mr-2" />
              View Sample CVs
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            💡 Pro tip: Tailor your CV keywords to match each job application
          </p>
        </div>
      </CardContent>
    </Card>
  );
};