// I M P O R T:   F I L E S

// I M P O R T:   P A C K A G E S
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/icons/fontawesome/fontawesome";

// I M P O R T:   F U N C T I O N S
import App from "./App";

// C O D E
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/* 
React.startTransition:
    Vor v7: State-Updates wurden synchron verarbeitet.
    Ab v7: React Router verwendet React.startTransition, um Hintergrundupdates zu optimieren, was UI-Blockaden reduziert.

Relative Splat Routes:
    Vor v7: Eine Splat-Route (*) verwendet relative Pfade, um Subrouten zu matchen, was manchmal verwirrend war.
    Ab v7: Splat-Routen verhalten sich konsistenter und klarer. Durch das Aktivieren des Flags kannst du schon jetzt die neue Logik testen.
*/
