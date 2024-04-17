// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
import { MainNavProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import SubNavigation from "./Sub-Navigation";
import { useEffect, useState } from "react";

// C O D E
const MainNavigation: React.FC<MainNavProps> = ({
  onAboutClick,
  hideSubNavigation,
  hideMobileNav,
  showMobileNavigation,
  handleAboutLinkClick,
  aboutLinkClicked,
  mobileView,
  setMobileView,
}) => {
  // const [mobileView, setMobileView] = useState<boolean>(false);
  const [showSubNavigation, setShowSubNavigation] = useState<boolean>(false);

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
    console.log("aboutLinkClicked: ", aboutLinkClicked);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              `about ${isPending ? "pending" : ""} ${isActive ? "active" : ""}`
            }
            to="/about"
            onClick={handleOnAboutClick}
          >
            About
          </NavLink>
        </li>
        {showSubNavigation && (
          <li className="sub_navigation_sm">
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
            onClick={hideMobileNav}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
