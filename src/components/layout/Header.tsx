
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-2xl text-brand-600">
            CraftFolio
          </Link>
          <span className="bg-brand-100 text-brand-700 text-xs px-2 py-1 rounded-full">
            Beta
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/templates" className="text-muted-foreground hover:text-foreground">
            Templates
          </Link>
          <Link to="/my-portfolios" className="text-muted-foreground hover:text-foreground">
            My Portfolios
          </Link>
          <Button asChild variant="outline">
            <Link to="/new">Create Portfolio</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
