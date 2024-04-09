// I M P O R T:   F I L E S
import logoTW from "../assets/breffjaun_turquoise-white.svg";
import "../styles/header.scss";

// I M P O R T:  T Y P E S
// import { MainNavProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

// I M P O R T:   F U N C T I O N S
import MainNavigation from "../components/Main-Navigation";
import SubNavigation from "../components/Sub-Navigation";

// C O D E
const Header = () => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // handles bevahiour of the mobile navigation. If clicked outside of the navigation, it will close.
      if (
        event.target &&
        !(event.target as HTMLElement).closest(".hamburger__menu")
      ) {
        setShowMobileNavigation(false);
      }
      // handles behaviour of the hamburger icon. If clicked outside of the icon, it will delete the actove class (except at about) and close.
      if (
        event.target &&
        !(event.target as HTMLElement).closest(".hamburger__icon") &&
        (event.target as HTMLElement).closest(".about") === null
      ) {
        const burgerIcon = document.querySelector(".hamburger__icon");
        if (burgerIcon) {
          burgerIcon.classList.remove("active");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // SUB NAVIGATION
  const [showSubNavigation, setShowSubNavigation] = useState(false);

  const [showMobileNavigation, setShowMobileNavigation] = useState(false);

  const showSubNavOnClickAbout = () => {
    setShowSubNavigation(true);
  };

  const hideSubNavigation = () => {
    setShowSubNavigation(false);
  };

  // MOBILE NAVIGATION
  const hideMobileNav = () => {
    setShowMobileNavigation(false);
  };

  const toggleMobileNav = () => {
    setShowMobileNavigation((prev) => !prev);
    const burgerIcon = document.querySelector(".hamburger__icon");
    if (burgerIcon) {
      if (!showMobileNavigation) {
        burgerIcon.classList.add("active");
      } else {
        burgerIcon.classList.remove("active");
      }
    }
  };

  // HANDLE CLICK ON ABOUT IN MOBILE NAVIGATION
  const [aboutLinkClicked, setAboutLinkClicked] = useState(false);

  const handleAboutLinkClick = () => {
    setAboutLinkClicked((prev) => !prev);
    // showSubNavOnClickAbout();
  };

  return (
    <>
      <header>
        {/* DESKTOP VIEW */}
        <div className="header__logo" onClick={hideSubNavigation}>
          <NavLink to="/">
            <img src={logoTW} alt="breffjaun-logo" />
          </NavLink>
        </div>

        <div className="main__navigation">
          <MainNavigation
            onAboutClick={showSubNavOnClickAbout}
            hideSubNavigation={hideSubNavigation}
            hideMobileNav={hideMobileNav}
            showMobileNavigation={showMobileNavigation}
            handleAboutLinkClick={handleAboutLinkClick}
            aboutLinkClicked={aboutLinkClicked}
          />
        </div>

        <div className="theme__button">
          <button>Theme</button>
        </div>

        {/* MOBILE VIEW */}
        <div className="hamburger__menu">
          <div className="hamburger__icon" onClick={toggleMobileNav}>
            <span className="material-symbols-outlined">lunch_dining</span>
          </div>
          <div
            className={`main_navigation_sm ${
              showMobileNavigation ? "show__mobile__navigation" : ""
            }`}
          >
            <MainNavigation
              onAboutClick={showSubNavOnClickAbout}
              hideSubNavigation={hideSubNavigation}
              hideMobileNav={hideMobileNav}
              showMobileNavigation={showMobileNavigation}
              handleAboutLinkClick={handleAboutLinkClick}
              aboutLinkClicked={aboutLinkClicked}
            />
            <button>Theme</button>
          </div>
        </div>
      </header>
      <div
        className={`sub__navigation ${
          showSubNavigation ? "show__sub__navigation" : ""
        }`}
      >
        <SubNavigation />
      </div>
    </>
  );
};

export default Header;
