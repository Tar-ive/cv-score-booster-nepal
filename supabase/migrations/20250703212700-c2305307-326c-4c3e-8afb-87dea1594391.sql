-- Create table for storing CV analysis data
CREATE TABLE public.cv_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Basic info
  name TEXT,
  email TEXT,
  total_score INTEGER NOT NULL,
  
  -- Counts
  experience_count INTEGER DEFAULT 0,
  education_count INTEGER DEFAULT 0,
  skills_count INTEGER DEFAULT 0,
  projects_count INTEGER DEFAULT 0,
  total_experience_years NUMERIC DEFAULT 0,
  
  -- Detailed JSON data
  personal_data JSONB,
  experiences JSONB,
  projects JSONB,
  skills JSONB,
  research_work JSONB,
  achievements JSONB,
  education JSONB,
  extracted_keywords JSONB,
  
  -- Original file info
  original_filename TEXT,
  file_size INTEGER,
  raw_text_preview TEXT
);

-- Enable RLS
ALTER TABLE public.cv_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies for cv_analyses
CREATE POLICY "Users can view their own CV analyses" 
ON public.cv_analyses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own CV analyses" 
ON public.cv_analyses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CV analyses" 
ON public.cv_analyses 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CV analyses" 
ON public.cv_analyses 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.processed_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cv_analyses_updated_at
  BEFORE UPDATE ON public.cv_analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();