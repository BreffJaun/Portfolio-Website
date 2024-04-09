// I M P O R T:   F I L E S
import logoTW from "../assets/breffjaun_turquoise-white.svg";
import "../styles/header.scss";

// I M P O R T:  T Y P E S
// import { MainNavProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";
import { useState } from "react";

// I M P O R T:   F U N C T I O N S
import MainNavigation from "../components/Main-Navigation";
import SubNavigation from "../components/Sub-Navigation";

// C O D E
const Header = () => {
  const [showSubNavigation, setShowSubNavigation] = useState(false);

  const showSubNavOnClickAbout = () => {
    setShowSubNavigation(true);
  };

  const hideSubNavigation = () => {
    setShowSubNavigation(false);
  };

  return (
    <>
      <header>
        <div className="header__logo" onClick={hideSubNavigation}>
          <NavLink to="/">
            <img src={logoTW} alt="breffjaun-logo" />
          </NavLink>
        </div>

        <div className="main__navigation">
          <MainNavigation
            onAboutClick={showSubNavOnClickAbout}
            hideSubNavigation={hideSubNavigation}
          />
        </div>

        <div className="theme__button">
          <button>Theme</button>
        </div>

        {/* MOBILE NAVBAR */}
        <div className="hamburger__menu">
          <div className="hamburger__icon">
            <span className="material-symbols-outlined">lunch_dining</span>
          </div>
          <div className="main_navigation_sm">
            <MainNavigation
              onAboutClick={showSubNavOnClickAbout}
              hideSubNavigation={hideSubNavigation}
            />
            <button>Theme</button>
          </div>
        </div>
      </header>
      <div className={`sub__navigation ${showSubNavigation ? "show" : ""}`}>
        <SubNavigation />
      </div>
    </>
  );
};

export default Header;
