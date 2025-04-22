
import { PortfolioData } from "@/types/portfolio";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function exportToPdf(portfolio: PortfolioData): Promise<void> {
  const element = document.getElementById('portfolio-preview');
  
  if (!element) {
    throw new Error('Preview element not found');
  }
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width / 2, canvas.height / 2]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`${portfolio.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.pdf`);
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw new Error('PDF generation failed');
  }
}
