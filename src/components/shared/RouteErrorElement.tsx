import { useRouteError, Link } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const RouteErrorElement = () => {
  const error = useRouteError() as any;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
        <AlertCircle className="size-10" />
      </div>
      
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Unexpected Application Error!
      </h1>
      
      <p className="mb-6 max-w-md text-muted-foreground">
        {error?.message || "Something went wrong while loading this page. Please try again or go back home."}
      </p>

      {error?.stack && process.env.NODE_ENV === 'development' && (
        <pre className="mb-8 max-w-2xl overflow-auto rounded-lg bg-white/5 p-4 text-left text-xs text-red-400 border border-white/10">
          {error.stack}
        </pre>
      )}

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
        >
          Try Again
        </Button>
        <Link 
          to="/" 
          className={cn(buttonVariants({ variant: 'default', size: 'lg' }), "rounded-xl")}
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RouteErrorElement;
