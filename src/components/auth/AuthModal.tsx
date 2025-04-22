
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const supabaseConfigured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabaseConfigured) {
      toast({
        title: "Configuration error",
        description: "Supabase is not properly configured. Authentication is disabled.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        if (data?.user) {
          toast({ title: "Welcome back!", description: "You have been successfully logged in." });
          onClose();
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        if (data?.user) {
          if (data.user.identities?.length === 0) {
            throw new Error("Email already in use. Please sign in instead.");
          }
          
          toast({ 
            title: "Account created!",
            description: "Please check your email to confirm your account." 
          });
          onClose();
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Welcome Back" : "Create Account"}</DialogTitle>
          <DialogDescription>
            {isLogin 
              ? "Sign in to your account to continue" 
              : "Create a new account to get started"}
          </DialogDescription>
        </DialogHeader>
        
        {!supabaseConfigured && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <AlertDescription>
              Supabase is not configured. Please set up environment variables for authentication to work.
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete={isLogin ? "username" : "email"}
              disabled={!supabaseConfigured}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={6}
              disabled={!supabaseConfigured}
            />
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-0 pt-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setIsLogin(!isLogin)}
              disabled={!supabaseConfigured}
            >
              {isLogin ? "Need an account?" : "Already have an account?"}
            </Button>
            <Button type="submit" disabled={loading || !supabaseConfigured}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
