import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CVUploaderProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export const CVUploader: React.FC<CVUploaderProps> = ({ onFileUpload, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    multiple: false,
    disabled: isProcessing,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300",
            "hover:border-primary/50 hover:bg-secondary/50",
            isDragActive && "border-primary bg-primary/5 shadow-upload",
            isProcessing && "cursor-not-allowed opacity-50",
            !isDragActive && !isProcessing && "border-border"
          )}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4">
            {isProcessing ? (
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            ) : (
              <div className="relative">
                <Upload className="h-12 w-12 text-muted-foreground" />
                <FileText className="h-6 w-6 text-primary absolute -bottom-1 -right-1" />
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                {isProcessing ? "Analyzing your CV..." : "Upload Your CV"}
              </h3>
              <p className="text-muted-foreground">
                {isProcessing 
                  ? "Using advanced PDF.js extraction for better text quality"
                  : "Drag & drop your CV here, or click to select"
                }
              </p>
              {!isProcessing && (
                <p className="text-sm text-muted-foreground">
                  Supports PDF (text-based), DOCX, and TXT files
                </p>
              )}
            </div>

            {!isProcessing && (
              <Button variant="professional" size="lg" className="mt-4">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};