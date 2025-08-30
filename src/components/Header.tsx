import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Target, TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="text-center space-y-6 mb-12">
      {/* Brand Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-hero rounded-xl shadow-score">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Recruit Nepal
            </h1>
            <p className="text-lg text-nepal-blue font-semibold">CV Analyzer</p>
          </div>
        </div>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get an instant ATS-friendly score with personalized tips to improve your CV
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-success mx-auto mb-2" />
            <h3 className="font-semibold text-success-foreground mb-1">ATS Optimized</h3>
            <p className="text-sm text-muted-foreground">Analyze compatibility with recruitment systems</p>
          </CardContent>
        </Card>
        
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-warning mx-auto mb-2" />
            <h3 className="font-semibold text-warning-foreground mb-1">Instant Feedback</h3>
            <p className="text-sm text-muted-foreground">Get detailed suggestions immediately</p>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-lg font-bold text-primary mr-1">🇳🇵</span>
              <Badge variant="outline" className="text-primary border-primary/30">Nepal</Badge>
            </div>
            <h3 className="font-semibold text-primary mb-1">Local Expertise</h3>
            <p className="text-sm text-muted-foreground">Tailored for Nepalese job market</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};