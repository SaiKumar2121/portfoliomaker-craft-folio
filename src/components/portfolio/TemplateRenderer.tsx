
import { PortfolioData } from "@/types/portfolio";
import { ModernTemplate } from "../templates/ModernTemplate";
import { CreativeTemplate } from "../templates/CreativeTemplate";
import { ProfessionalTemplate } from "../templates/ProfessionalTemplate";

interface TemplateRendererProps {
  portfolio: PortfolioData;
}

export function TemplateRenderer({ portfolio }: TemplateRendererProps) {
  switch (portfolio.templateId) {
    case 'modern':
      return <ModernTemplate data={portfolio} />;
    case 'creative':
      return <CreativeTemplate data={portfolio} />;
    case 'professional':
      return <ProfessionalTemplate data={portfolio} />;
    default:
      return <ModernTemplate data={portfolio} />;
  }
}
