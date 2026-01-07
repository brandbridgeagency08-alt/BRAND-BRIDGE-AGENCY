import React from "react";
import { createRoot } from "react-dom/client";
import AgencyApp from "./App";

/**
 * MANDATORY PLATFORM ENTRY POINT
 * Google AI Studio requires a default export named 'App' 
 * and an immediate mount to the DOM.
 */

export default function App() {
  return (
    <React.StrictMode>
      <AgencyApp />
    </React.StrictMode>
  );
}

// Explicit manual mount for platform safety
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}