import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="text-center space-y-6 max-w-2xl animate-fade-in">
        <div className="inline-flex p-6 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
          <Sparkles className="w-16 h-16 text-primary-foreground" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome to Your Personal App
        </h1>
        
        <p className="text-xl text-muted-foreground">
          Your personal dashboard with AI Assistant, profile management, and more.
        </p>
        
        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" onClick={() => navigate("/auth")}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
