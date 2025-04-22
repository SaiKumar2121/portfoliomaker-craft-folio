
import { Header } from "@/components/layout/Header";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { availableTemplates } from "@/types/portfolio";

const Templates = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto max-w-6xl py-12 px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Choose a Template</h1>
          <p className="text-gray-600 mt-2">Select a template to start building your portfolio</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} CraftFolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Templates;
