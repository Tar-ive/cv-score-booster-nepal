import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';

// Configure PDF.js worker - use correct version for better compatibility
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@5.3.31/build/pdf.worker.min.mjs';

interface PDFTextExtractionOptions {
  preserveLineBreaks?: boolean;
  cleanText?: boolean;
  mergeSpaces?: boolean;
}

export class PDFTextExtractor {
  private static instance: PDFTextExtractor;
  
  public static getInstance(): PDFTextExtractor {
    if (!PDFTextExtractor.instance) {
      PDFTextExtractor.instance = new PDFTextExtractor();
    }
    return PDFTextExtractor.instance;
  }

  /**
   * Extract text from PDF file using PDF.js
   */
  public async extractTextFromPDF(
    file: File, 
    options: PDFTextExtractionOptions = {}
  ): Promise<string> {
    const {
      preserveLineBreaks = true,
      cleanText = true,
      mergeSpaces = true
    } = options;

    try {
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      console.log(`PDF loaded successfully. Pages: ${pdf.numPages}`);
      
      let fullText = '';
      
      // Extract text from each page
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Extract text items and build page text
          const pageText = this.buildTextFromItems(textContent.items, {
            preserveLineBreaks,
            cleanText,
            mergeSpaces
          });
          
          if (pageText.trim()) {
            fullText += pageText;
            if (pageNum < pdf.numPages) {
              fullText += '\n\n--- Page Break ---\n\n';
            }
          }
          
          console.log(`Page ${pageNum} processed: ${pageText.length} characters`);
        } catch (pageError) {
          console.warn(`Error processing page ${pageNum}:`, pageError);
          // Continue with other pages
        }
      }
      
      // Final cleanup
      if (cleanText) {
        fullText = this.cleanExtractedText(fullText);
      }
      
      console.log(`Total extracted text length: ${fullText.length} characters`);
      
      if (fullText.trim().length < 50) {
        throw new Error('PDF appears to be empty or contains only images/scanned content');
      }
      
      return fullText;
      
    } catch (error) {
      console.error('PDF extraction failed:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid PDF')) {
          throw new Error('The file appears to be corrupted or is not a valid PDF');
        } else if (error.message.includes('Password')) {
          throw new Error('This PDF is password protected. Please provide an unlocked version');
        } else if (error.message.includes('empty')) {
          throw new Error('This PDF appears to contain only images or scanned content. Please use a text-based PDF or convert to DOCX');
        }
      }
      
      throw new Error('Could not extract text from PDF. Please try converting to DOCX or TXT format');
    }
  }

  /**
   * Build text from PDF text items with proper positioning
   */
  private buildTextFromItems(items: any[], options: PDFTextExtractionOptions): string {
    const { preserveLineBreaks, mergeSpaces } = options;
    
    if (!items || items.length === 0) {
      return '';
    }

    // Filter and sort items by position (top to bottom, left to right)
    const sortedItems = items
      .filter(item => item && typeof item === 'object' && 'str' in item && item.str && item.str.trim())
      .sort((a, b) => {
        // First sort by Y position (top to bottom)
        const yDiff = Math.abs(b.transform[5] - a.transform[5]);
        if (yDiff > 5) { // Different lines
          return b.transform[5] - a.transform[5];
        }
        // Same line, sort by X position (left to right)
        return a.transform[4] - b.transform[4];
      });

    let text = '';
    let lastY = null;
    let lastX = null;
    
    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];
      const currentY = item.transform[5];
      const currentX = item.transform[4];
      const itemText = item.str.trim();
      
      if (!itemText) continue;
      
      // Check if this is a new line
      if (lastY !== null && Math.abs(currentY - lastY) > 5) {
        if (preserveLineBreaks) {
          text += '\n';
        } else {
          text += ' ';
        }
      } else if (lastX !== null && currentX - lastX > 50) {
        // Large horizontal gap - might be a new section
        text += ' ';
      }
      
      // Add the text
      text += itemText;
      
      // Add space if needed
      if (i < sortedItems.length - 1) {
        const nextItem = sortedItems[i + 1];
        const nextY = nextItem.transform[5];
        const nextX = nextItem.transform[4];
        
        // Add space if not at end of line and next item is on same line
        if (Math.abs(nextY - currentY) <= 5 && nextX - (currentX + itemText.length * 6) > 10) {
          text += ' ';
        }
      }
      
      lastY = currentY;
      lastX = currentX;
    }
    
    return text;
  }

  /**
   * Clean and normalize extracted text
   */
  private cleanExtractedText(text: string): string {
    return text
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove page break markers
      .replace(/--- Page Break ---/g, '\n\n')
      // Clean up multiple line breaks
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Remove leading/trailing whitespace
      .trim()
      // Fix common OCR/extraction issues
      .replace(/\s*\n\s*/g, '\n')
      .replace(/([.!?])\s*\n\s*([A-Z])/g, '$1\n\n$2')
      // Ensure proper spacing around punctuation
      .replace(/([.!?])([A-Z])/g, '$1 $2')
      // Remove duplicate spaces
      .replace(/\s+/g, ' ')
      // Final cleanup
      .trim();
  }

  /**
   * Get PDF metadata
   */
  public async getPDFMetadata(file: File): Promise<any> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const metadata = await pdf.getMetadata();
      
      return {
        numPages: pdf.numPages,
        info: metadata.info,
        metadata: metadata.metadata
      };
    } catch (error) {
      console.error('Failed to get PDF metadata:', error);
      return null;
    }
  }

  /**
   * Check if PDF is searchable (contains text)
   */
  public async isPDFSearchable(file: File): Promise<boolean> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Check first few pages for text content
      const pagesToCheck = Math.min(3, pdf.numPages);
      
      for (let pageNum = 1; pageNum <= pagesToCheck; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        if (textContent.items.length > 0) {
          const hasText = textContent.items.some(item => 
            item && typeof item === 'object' && 'str' in item && item.str && item.str.trim().length > 0
          );
          if (hasText) {
            return true;
          }
        }
      }
      
      return false;
    } catch (error) {
      console.error('Failed to check PDF searchability:', error);
      return false;
    }
  }
}

// Export singleton instance
export const pdfTextExtractor = PDFTextExtractor.getInstance();
