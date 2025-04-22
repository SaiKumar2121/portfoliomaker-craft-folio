import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import MyPortfolios from "./pages/MyPortfolios";
import NewPortfolio from "./pages/NewPortfolio";
import EditPortfolio from "./pages/EditPortfolio";
import PreviewPortfolio from "./pages/PreviewPortfolio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/my-portfolios" element={<MyPortfolios />} />
          <Route path="/new" element={<NewPortfolio />} />
          <Route path="/edit/:id" element={<EditPortfolio />} />
          <Route path="/preview/:id" element={<PreviewPortfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
