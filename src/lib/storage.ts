
import { PortfolioData, defaultPortfolio } from "@/types/portfolio";
import { v4 as uuidv4 } from "@/lib/uuid";

const STORAGE_KEY = 'portfolio_maker_data';

export function savePortfolio(portfolio: PortfolioData): void {
  const portfolios = getAllPortfolios();
  const existingIndex = portfolios.findIndex(p => p.id === portfolio.id);
  
  if (existingIndex >= 0) {
    portfolios[existingIndex] = {
      ...portfolio,
      lastEdited: new Date().toISOString()
    };
  } else {
    portfolios.push({
      ...portfolio,
      id: portfolio.id || uuidv4(),
      lastEdited: new Date().toISOString()
    });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
}

export function getPortfolio(id: string): PortfolioData | null {
  const portfolios = getAllPortfolios();
  return portfolios.find(p => p.id === id) || null;
}

export function getAllPortfolios(): PortfolioData[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function deletePortfolio(id: string): void {
  let portfolios = getAllPortfolios();
  portfolios = portfolios.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
}

export function createNewPortfolio(templateId: string = 'modern'): PortfolioData {
  const newPortfolio: PortfolioData = {
    ...defaultPortfolio,
    id: uuidv4(),
    templateId,
    lastEdited: new Date().toISOString(),
  };
  
  savePortfolio(newPortfolio);
  return newPortfolio;
}
