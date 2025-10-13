import logo from "./assets/Logo.png";
import React from "react";
import "./styles/App.css";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <img alt="Uni Logo" className="app-logo" src={logo} />
        <h2>Studentenverwaltung</h2>
        <p className="sub">Verwalten und aktualisieren</p>
      </header>

      {/* Hier werden verschiedene Seiten gerendert */}
      <Outlet />
    </div>
  );
};

export default App;
// about useState: Page 68
