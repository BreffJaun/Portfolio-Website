// I M P O R T:   F I L E S
import default_avatar from "../images/icon_avatar.png";

// I M P O R T:  T Y P E S
import { MainNavProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

// I M P O R T:   F U N C T I O N S
import SubNavigation from "./Sub-Navigation";
import { scrollToSection } from "../utils/utils";
import MobileViewContext from "../context/MobileViewContext";
import LoggedInContext from "../context/LoginContext";
import UserContext from "../context/UserContext";

// C O D E
const MainNavigation: React.FC<MainNavProps> = ({
  onAboutClick,
  hideSubNavigation,
  hideMobileNav,
  handleAboutLinkClick,
  aboutLinkClicked,
}) => {
  const [isLoggedIn] = useContext(LoggedInContext);
  const [user] = useContext(UserContext);
  const [showSubNavigation, setShowSubNavigation] = useState<boolean>(false);
  const [showTransition, setShowTransition] = useState<boolean>(false);
  const [mobileView, setMobileView] = useContext(MobileViewContext);

  const fakeUser = {
    _id: "1",
    userName: "breffjaun",
    email: "breffjaun@test.de",
    avatar: default_avatar,
    password: "12345678",
  };

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
        <li className="usual__navigation">
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
        <li className="usual__navigation">
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
        <li className="usual__navigation">
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
        {isLoggedIn ? (
          <li className="user__avatar">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/userinformation"
              onClick={() => {
                handleOnClick();
              }}
            >
              <img src={user?.avatar || fakeUser.avatar} alt={user?.userName} />
            </NavLink>
          </li>
        ) : (
          <li className="usual__navigation">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/login"
              onClick={() => {
                handleOnClick();
              }}
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
