
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { deletePortfolio } from "@/lib/storage";
import { PortfolioData } from "@/types/portfolio";
import { Edit, FileText, Link, MoreVertical, Trash } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { formatRelativeTime } from "@/lib/date-utils";

interface PortfolioCardProps {
  portfolio: PortfolioData;
  onDelete: () => void;
}

export function PortfolioCard({ portfolio, onDelete }: PortfolioCardProps) {
  const navigate = useNavigate();
  
  const handleDelete = () => {
    deletePortfolio(portfolio.id);
    onDelete();
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="truncate">{portfolio.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/edit/${portfolio.id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/preview/${portfolio.id}`)}>
              <FileText className="mr-2 h-4 w-4" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          Last edited: {formatRelativeTime(new Date(portfolio.lastEdited))}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <RouterLink to={`/edit/${portfolio.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </RouterLink>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <RouterLink to={`/preview/${portfolio.id}`}>
            <Link className="mr-2 h-4 w-4" />
            Preview
          </RouterLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
