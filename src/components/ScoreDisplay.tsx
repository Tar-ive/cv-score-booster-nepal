import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: number;
  feedback: string[];
  isAnimating?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  score, 
  feedback, 
  isAnimating = false 
}) => {
  const getScoreVariant = (score: number) => {
    if (score >= 80) return { variant: 'success', icon: CheckCircle, label: 'Excellent' };
    if (score >= 60) return { variant: 'warning', icon: AlertTriangle, label: 'Good' };
    return { variant: 'destructive', icon: XCircle, label: 'Needs Work' };
  };

  const { variant, icon: Icon, label } = getScoreVariant(score);

  return (
    <Card className={cn(
      "w-full max-w-2xl mx-auto shadow-score transition-all duration-500",
      isAnimating && "animate-slide-up"
    )}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center space-x-3">
          <Icon className={cn(
            "h-8 w-8",
            variant === 'success' && "text-success",
            variant === 'warning' && "text-warning",
            variant === 'destructive' && "text-destructive"
          )} />
          <span className="text-2xl font-bold">Your ATS Score</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="text-center space-y-4">
          <div className={cn(
            "text-6xl font-bold transition-all duration-700",
            isAnimating && "animate-score-pulse",
            variant === 'success' && "text-success",
            variant === 'warning' && "text-warning", 
            variant === 'destructive' && "text-destructive"
          )}>
            {score}/100
          </div>
          
          <Badge 
            variant={variant === 'success' ? 'default' : variant === 'warning' ? 'secondary' : 'destructive'}
            className="text-lg px-4 py-2"
          >
            {label}
          </Badge>
          
          <div className="space-y-2">
            <Progress 
              value={score} 
              className="h-3 bg-secondary"
            />
            <p className="text-sm text-muted-foreground">
              {score >= 80 
                ? "Your CV is well-optimized for ATS systems!"
                : score >= 60
                ? "Good foundation with room for improvement"
                : "Your CV may struggle with ATS systems"
              }
            </p>
          </div>
        </div>

        {/* Feedback Section */}
        {feedback.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center">
              <CheckCircle className="h-5 w-5 text-success mr-2" />
              What's Working Well
            </h4>
            <div className="space-y-2">
              {feedback.map((item, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center space-x-2 p-3 rounded-lg bg-success/5 border border-success/20",
                    isAnimating && "animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="text-sm text-success-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};