import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { RequestsProvider } from "./contexts/requestsContext";
import { FiltersProvider } from "./contexts/filtersContext";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RequestsProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </RequestsProvider>
  </StrictMode>,
);
