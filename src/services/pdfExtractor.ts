import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker with better Vite compatibility
const configurePDFWorker = () => {
  try {
    if (typeof window !== 'undefined') {
      // Use a more reliable CDN source for the worker
      const version = pdfjsLib.version || '4.0.269';
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
      
      // Alternative fallback
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.0.269/build/pdf.worker.min.js';
      }
      
      console.log('PDF.js worker configured:', pdfjsLib.GlobalWorkerOptions.workerSrc);
    }
  } catch (error) {
    console.warn('PDF.js worker configuration failed:', error);
    // Fallback to local worker if available
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    } catch (fallbackError) {
      console.error('All PDF worker configurations failed');
    }
  }
};

configurePDFWorker();

export class PDFExtractor {
  private static instance: PDFExtractor;
  
  public static getInstance(): PDFExtractor {
    if (!PDFExtractor.instance) {
      PDFExtractor.instance = new PDFExtractor();
    }
    return PDFExtractor.instance;
  }

  public async extractText(file: File): Promise<string> {
    try {
      console.log('Starting PDF extraction for:', file.name, 'Size:', file.size);
      
      // Validate file
      if (!file || file.size === 0) {
        throw new Error('Invalid file: File is empty');
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('File too large: Please use a PDF smaller than 10MB');
      }
      
      // Convert file to ArrayBuffer with validation
      const arrayBuffer = await this.fileToArrayBuffer(file);
      console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);
      
      // Validate PDF header
      const uint8Array = new Uint8Array(arrayBuffer);
      if (!this.isPDFFile(uint8Array)) {
        throw new Error('Invalid PDF file: File does not appear to be a valid PDF');
      }
      
      // Load PDF document with retry logic
      const pdfDocument = await this.loadPDFWithRetry(uint8Array);
      console.log('PDF loaded successfully, pages:', pdfDocument.numPages);
      
      if (pdfDocument.numPages === 0) {
        throw new Error('PDF has no pages');
      }
      
      let extractedText = '';
      let successfulPages = 0;
      
      // Extract text from each page
      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        try {
          const page = await pdfDocument.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Combine text items into readable text with better formatting
          const pageText = this.formatPageText(textContent.items);
          
          if (pageText.trim().length > 0) {
            extractedText += pageText + '\n\n';
            successfulPages++;
          }
          
          console.log(`Page ${pageNum} extracted, text length:`, pageText.length);
          
        } catch (pageError) {
          console.warn(`Error extracting page ${pageNum}:`, pageError);
          // Continue with other pages
        }
      }
      
      if (successfulPages === 0) {
        throw new Error('Could not extract text from any pages. The PDF might be password protected or contain only images.');
      }
      
      // Clean up extracted text
      extractedText = this.cleanExtractedText(extractedText);
      
      if (extractedText.trim().length < 50) {
        throw new Error('Very little text was extracted. The PDF might contain mainly images or be password protected.');
      }
      
      console.log('PDF extraction completed, total text length:', extractedText.length);
      return extractedText;
      
    } catch (error) {
      console.error('PDF extraction failed:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Invalid PDF')) {
          throw new Error('This file is not a valid PDF. Please check the file and try again.');
        }
        if (error.message.includes('password')) {
          throw new Error('This PDF is password protected. Please remove the password and try again.');
        }
        if (error.message.includes('corrupt')) {
          throw new Error('This PDF file appears to be corrupted. Please try a different file.');
        }
        throw error;
      }
      
      throw new Error('Failed to extract text from PDF. Please try a different file or convert to DOCX/TXT format.');
    }
  }

  private async fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as ArrayBuffer'));
        }
      };
      reader.onerror = () => reject(new Error('FileReader error'));
      reader.readAsArrayBuffer(file);
    });
  }

  private isPDFFile(uint8Array: Uint8Array): boolean {
    // Check for PDF signature
    const header = new TextDecoder('ascii').decode(uint8Array.slice(0, 4));
    return header === '%PDF';
  }

  private async loadPDFWithRetry(data: Uint8Array, maxRetries = 3): Promise<any> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const loadingTask = pdfjsLib.getDocument({
          data: data,
          verbosity: 0,
          // Add more options for better compatibility
          useWorkerFetch: false,
          disableAutoFetch: true,
          disableStream: true
        });
        
        return await loadingTask.promise;
      } catch (error) {
        console.warn(`PDF loading attempt ${attempt} failed:`, error);
        
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    throw new Error('Max retry attempts reached');
  }

  private formatPageText(textItems: any[]): string {
    let formattedText = '';
    let lastY = 0;
    
    textItems.forEach((item: any, index: number) => {
      if (item.str && item.str.trim()) {
        // Add line break if this text is significantly below the previous line
        if (item.transform && item.transform[5] !== undefined) {
          const currentY = item.transform[5];
          if (index > 0 && lastY - currentY > 5) { // Threshold for new line
            formattedText += '\n';
          }
          lastY = currentY;
        }
        
        formattedText += item.str;
        
        // Add space if the next item doesn't start with punctuation
        const nextItem = textItems[index + 1];
        if (nextItem && nextItem.str && !nextItem.str.match(/^[.,!?;:)}\]]/)) {
          formattedText += ' ';
        }
      }
    });
    
    return formattedText;
  }

  private cleanExtractedText(text: string): string {
    return text
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove page breaks and form feeds
      .replace(/[\f\r]/g, '')
      // Clean up line breaks
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Remove leading/trailing whitespace
      .trim()
      // Fix common OCR issues
      .replace(/[^\x20-\x7E\n]/g, '') // Remove non-printable characters except newlines
      .replace(/\s+([.,!?;:])/g, '$1') // Fix spacing before punctuation
      .replace(/([.!?])\s*([A-Z])/g, '$1 $2'); // Ensure proper spacing after sentences
  }
}
