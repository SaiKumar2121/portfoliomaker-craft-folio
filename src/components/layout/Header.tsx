
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out successfully" });
  };

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
          {user ? (
            <>
              <Link to="/my-portfolios" className="text-muted-foreground hover:text-foreground">
                My Portfolios
              </Link>
              <Button asChild variant="outline">
                <Link to="/new">Create Portfolio</Link>
              </Button>
              <Button variant="ghost" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowAuthModal(true)}>
              Sign In
            </Button>
          )}
        </nav>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
}
