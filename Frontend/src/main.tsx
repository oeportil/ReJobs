import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router";
import ReJobsProvider from "./context/ReJobsProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReJobsProvider>
      <Router />
    </ReJobsProvider>
  </StrictMode>
);
