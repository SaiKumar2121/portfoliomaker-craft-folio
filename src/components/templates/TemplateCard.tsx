
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateInfo } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface TemplateCardProps {
  template: TemplateInfo;
  user: any; 
  onLoginRequired: () => void; 
}

export function TemplateCard({ template, user, onLoginRequired }: TemplateCardProps) {

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={template.thumbnail} 
          alt={`${template.name} template`}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=755&auto=format&fit=crop";
          }}
        />
      </div>
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {template.features.map((feature, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              <Check className="h-3 w-3" />
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
      <Button className="w-full" onClick={() => {
        if (user) {
          window.location.href = `/new?template=${template.id}`;
        } else {
          onLoginRequired();
        }
      }}>
        Use Template
     </Button>

      </CardFooter>
    </Card>
  );
}
