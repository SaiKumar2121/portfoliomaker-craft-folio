
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { supabase, isSupabaseConfigured, isUsingFallbackValues } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Loader2, AlertTriangle } from "lucide-react";

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const supabaseConfigured = isSupabaseConfigured();
  const usingFallbackValues = isUsingFallbackValues();

  useEffect(() => {
    // If using fallbacks, skip auth checks and simulate logged in state
    if (usingFallbackValues) {
      setIsLoading(false);
      // Create a dummy user when using fallbacks
      setUser({ 
        id: 'demo-user',
        email: 'demo@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: '',
        created_at: ''
      } as User);
      return;
    }
    
    // Skip Supabase operations if not configured
    if (!supabaseConfigured) {
      setIsLoading(false);
      return;
    }
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseConfigured, usingFallbackValues]);

  const handleSignOut = async () => {
    if (usingFallbackValues) {
      // For demo mode, just reset the user state
      setUser(null);
      toast({ title: "Signed out from demo mode" });
      return;
    }
    
    if (!supabaseConfigured) {
      toast({
        title: "Configuration error",
        description: "Supabase is not properly configured. Authentication is disabled.",
        variant: "destructive" 
      });
      return;
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: "Signed out successfully" });
    } catch (error: any) {
      toast({ 
        title: "Sign out failed", 
        description: error.message,
        variant: "destructive" 
      });
    }
  };

  const handleAuthClick = () => {
    if (usingFallbackValues) {
      toast({
        title: "Demo Mode Active",
        description: "Using demo credentials. Set Supabase environment variables for real authentication.",
        variant: "default"
      });
    }
    
    setShowAuthModal(true);
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
          
          {isLoading ? (
            <Button variant="ghost" size="sm" disabled>
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          ) : user ? (
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
            <Button onClick={handleAuthClick}>
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
