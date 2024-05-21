// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
import { MainNavProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

// I M P O R T:   F U N C T I O N S
import SubNavigation from "./Sub-Navigation";
import { scrollToSection } from "../utils/utils";
import MobileViewContext from "../context/MobileViewContext";

// C O D E
const MainNavigation: React.FC<MainNavProps> = ({
  onAboutClick,
  hideSubNavigation,
  hideMobileNav,
  showMobileNavigation,
  handleAboutLinkClick,
  aboutLinkClicked,
  // mobileView,
  // setMobileView,
}) => {
  const [showSubNavigation, setShowSubNavigation] = useState<boolean>(false);
  const [showTransition, setShowTransition] = useState<boolean>(false);
  const [mobileView, setMobileView] = useContext(MobileViewContext);

  useEffect(() => {
    const checkMobileView = () => {
      return window.innerWidth < 768;
    };

    const handleResize = () => {
      setMobileView(checkMobileView());
    };

    setMobileView(checkMobileView());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (aboutLinkClicked && mobileView) {
      setShowSubNavigation(true);
    } else {
      setShowSubNavigation(false);
    }
  }, [aboutLinkClicked, mobileView]);

  const handleOnClick = () => {
    hideSubNavigation();
    hideMobileNav();
  };

  const handleOnAboutClick = () => {
    onAboutClick(); // macht subNav auf true
    handleAboutLinkClick(); // macht aboutLinkClicked auf true
    if (showSubNavigation) {
      setShowSubNavigation(false);
    } else {
      setShowSubNavigation(true);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to="/"
            // onClick={handleOnAboutClick}
            onClick={() => {
              handleOnAboutClick();
            }}
          >
            About
          </NavLink>
        </li>
        {mobileView && (
          <li
            className={`sub__navigation__sm ${
              showSubNavigation ? "show__sub__navigation__sm" : ""
            }`}
          >
            <SubNavigation hideMobileNav={hideMobileNav} />
          </li>
        )}
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to="/feed"
            onClick={handleOnClick}
          >
            Feed
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to="/contact"
            onClick={() => {
              handleOnClick();
              scrollToSection("contact");
            }}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
