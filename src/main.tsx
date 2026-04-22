import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "@/css/globals.css";
import App from "./App.tsx";
import Spinner from "@/components/shared/Spinner.tsx";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
);
