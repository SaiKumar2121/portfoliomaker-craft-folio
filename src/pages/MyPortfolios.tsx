
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { Button } from "@/components/ui/button";
import { getAllPortfolios } from "@/lib/storage";
import { PortfolioData } from "@/types/portfolio";
import { Link } from "react-router-dom";

const MyPortfolios = () => {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  
  useEffect(() => {
    loadPortfolios();
  }, []);
  
  const loadPortfolios = () => {
    const savedPortfolios = getAllPortfolios();
    setPortfolios(savedPortfolios);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto max-w-6xl py-12 px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Portfolios</h1>
            <p className="text-gray-600 mt-2">Manage your saved portfolios</p>
          </div>
          <Button asChild>
            <Link to="/new">Create New</Link>
          </Button>
        </div>
        
        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map(portfolio => (
              <PortfolioCard 
                key={portfolio.id} 
                portfolio={portfolio}
                onDelete={loadPortfolios}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">No portfolios yet</h3>
            <p className="text-gray-600 mb-8">Create your first portfolio to get started</p>
            <Button asChild>
              <Link to="/new">Create Portfolio</Link>
            </Button>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} CraftFolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyPortfolios;
