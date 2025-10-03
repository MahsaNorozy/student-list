import React from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.css";

const universityLogo =
  "https://static.vecteezy.com/ti/gratis-vektor/p3/4851939-uni-logo-oder-bildung-logo-konzept-illustration-uni-logo-design-vorlage-vektor.jpg";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <img alt="Uni Logo" className="app-logo" src={universityLogo} />
        <h1>Studentenverwaltung</h1>
      </header>

      {/* Hier werden verschiedene Seiten gerendert */}
      <Outlet />
    </div>
  );
};

export default App;
// about useState: Page 68
