import { RouterProvider } from "react-router";
import router from "@/routes/Router";
import "@/css/globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { useEffect, useState } from "react";
import Spinner from "./components/shared/Spinner";
import { Toaster } from "@/components/ui/sonner";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setIsInitializing(false);
  }, []);

  if (isInitializing) {
    return <Spinner />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AppInitializer>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" richColors />
        </AppInitializer>
      </ThemeProvider>
    </>
  );
}

export default App;
