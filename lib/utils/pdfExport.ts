import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface PDFExportOptions {
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
  quality?: number;
  scale?: number;
}

export const exportToPDF = async (
  element: HTMLElement,
  options: PDFExportOptions = {}
): Promise<void> => {
  const {
    filename = 'resume',
    format = 'a4',
    orientation = 'portrait',
    quality = 0.98,
    scale = 2,
  } = options;

  try {
    // Show loading state or disable button during export
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      removeContainer: true,
      imageTimeout: 15000,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png', quality);
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });

    // Calculate dimensions to fit the page
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const exportTemplateAsPDF = async (
  templateSlug: string,
  personalInfo: { firstName: string; lastName: string }
): Promise<void> => {
  const element = document.querySelector('.template-renderer') as HTMLElement;
  
  if (!element) {
    throw new Error('Template not found. Please make sure the CV is loaded.');
  }

  const filename = `${personalInfo.firstName}_${personalInfo.lastName}_CV_${templateSlug}`;
  
  await exportToPDF(element, {
    filename,
    format: 'a4',
    orientation: 'portrait',
    quality: 0.98,
    scale: 2,
  });
};