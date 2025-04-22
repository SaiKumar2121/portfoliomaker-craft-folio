
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { PortfolioEditor } from "@/components/portfolio/PortfolioEditor";
import { getPortfolio } from "@/lib/storage";
import { defaultPortfolio } from "@/types/portfolio";

const EditPortfolio = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  
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
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto py-12">
          <div className="text-center">
            <p>Loading portfolio...</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto max-w-6xl py-12 px-6">
        <PortfolioEditor portfolio={portfolio} />
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} CraftFolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EditPortfolio;
