import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/customErrorPage.scss";

const CustomErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h2 className="error-title">Ups! Etwas ist schiefgelaufen</h2>
        <p className="error-message">
          Es tut uns leid, aber etwas ist beim Laden der Seite schiefgelaufen.
          Bitte versuche es später noch einmal.
        </p>
        <NavLink to="/" className="back-home-link">
          Zurück zur Startseite
        </NavLink>
      </div>
    </div>
  );
};

export default CustomErrorPage;
