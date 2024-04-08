// I M P O R T:   F I L E S
import logoTW from "../assets/breffjaun_turquoise-white.svg";
import "../styles/header.scss";

// I M P O R T:  T Y P E S
import { HeaderProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import MainNavigation from "../components/Main-Navigation";

// C O D E
const Header: React.FC<HeaderProps> = ({ onAboutClick }) => {
  return (
    <header>
      <div className="header__logo">
        <NavLink to="/">
          <img src={logoTW} alt="breffjaun-logo" />
        </NavLink>
      </div>
      <div className="main__navigation">
        <MainNavigation onAboutClick={onAboutClick} />
      </div>
      <div className="theme__button">
        <button>Theme</button>
      </div>
      <div className="hamburger__menu">
        <div className="hamburger__icon">
          <span className="material-symbols-outlined">lunch_dining</span>
        </div>
        <div className="main_navigation_sm">
          <MainNavigation onAboutClick={onAboutClick} />
          <button>Theme</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
