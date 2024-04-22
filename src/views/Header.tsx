// I M P O R T:   F I L E S
import logoTW from "../assets/breffjaun_turquoise-white.svg";
import logoTA from "../assets/breffjaun_turquoise-anthrazit.svg";
import "../styles/header.scss";

// I M P O R T:  T Y P E S
// import { MainNavProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ThemeContext from "../context/themeContext";

// I M P O R T:   F U N C T I O N S
import MainNavigation from "../components/Main-Navigation";
import SubNavigation from "../components/Sub-Navigation";
import ThemeButton from "../components/ThemeButton";

// C O D E
const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [mobileView, setMobileView] = useState<boolean>(false);
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
    setShowMobileNavigation((prev) => {
      const newState = !prev;
      const burgerIcon = document.querySelector(".hamburger__icon");
      if (burgerIcon) {
        if (newState) {
          burgerIcon.classList.add("active");
        } else {
          burgerIcon.classList.remove("active");
        }
      }
      return newState;
    });
  };

  // HANDLE CLICK ON ABOUT IN MOBILE NAVIGATION
  const [aboutLinkClicked, setAboutLinkClicked] = useState(false);

  const handleAboutLinkClick = () => {
    setAboutLinkClicked((prev) => !prev);
  };

  return (
    <>
      <header>
        {/* DESKTOP VIEW */}
        <div className="header__logo" onClick={hideSubNavigation}>
          <NavLink to="/">
            <img src={theme ? logoTW : logoTA} alt="breffjaun-logo" />
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
            mobileView={mobileView}
            setMobileView={setMobileView}
          />
        </div>

        {mobileView ? (
          <></>
        ) : (
          <div className="theme__button__outer__container">
            <ThemeButton />
          </div>
        )}

        {/* MOBILE VIEW */}
        <div className="hamburger__menu">
          <div className="hamburger__icon" onClick={toggleMobileNav}>
            <span className="material-symbols-outlined">lunch_dining</span>
          </div>
          <div
            className={`main__navigation__sm ${
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
              mobileView={mobileView}
              setMobileView={setMobileView}
            />
            {mobileView ? (
              <div className="theme__button__outer__container">
                <ThemeButton />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </header>
      <div
        className={`sub__navigation ${
          showSubNavigation ? "show__sub__navigation" : ""
        } ${theme ? "" : "light-theme"}`}
      >
        <SubNavigation hideMobileNav={hideMobileNav} />
      </div>
    </>
  );
};

export default Header;
