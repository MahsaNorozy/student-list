import App from "./App";
import { StrictMode } from "react";
import "./styles/index.css";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
