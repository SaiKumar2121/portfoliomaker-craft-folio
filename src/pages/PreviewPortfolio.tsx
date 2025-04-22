
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getPortfolio } from "@/lib/storage";
import { PortfolioData, defaultPortfolio } from "@/types/portfolio";
import { TemplateRenderer } from "@/components/portfolio/TemplateRenderer";
import { exportToPdf } from "@/lib/pdf-export";
import { Download, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PreviewPortfolio = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolio);
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      const portfolioData = getPortfolio(id);
      if (portfolioData) {
        setPortfolio(portfolioData);
      } else {
        navigate("/my-portfolios");
      }
    }
    setLoading(false);
  }, [id, navigate]);
  
  const handleExport = async () => {
    try {
      setExporting(true);
      await exportToPdf(portfolio);
      toast({
        title: "Success",
        description: "Your portfolio has been exported to PDF.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export portfolio.",
        variant: "destructive"
      });
    } finally {
      setExporting(false);
    }
  };
  
  if (loading) {
    return <div className="text-center py-12">Loading preview...</div>;
  }
  
  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          asChild
          variant="outline"
          className="bg-white shadow-md hover:bg-gray-100"
        >
          <Link to={`/edit/${portfolio.id}`} className="flex items-center gap-2">
            <Edit className="h-4 w-4" /> Edit
          </Link>
        </Button>
        <Button
          onClick={handleExport}
          disabled={exporting}
          variant="outline"
          className="bg-white shadow-md hover:bg-gray-100 flex items-center gap-2"
        >
          <Download className="h-4 w-4" /> Export PDF
        </Button>
        <Button
          onClick={() => navigate("/my-portfolios")}
          variant="outline"
          className="bg-white shadow-md hover:bg-gray-100"
        >
          Back
        </Button>
      </div>
      
      <TemplateRenderer portfolio={portfolio} />
    </div>
  );
};

export default PreviewPortfolio;
