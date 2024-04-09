// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
import { MainNavProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";

// I M P O R T:   F U N C T I O N S

// C O D E
const MainNavigation: React.FC<MainNavProps> = ({
  onAboutClick,
  hideSubNavigation,
}) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to="/about"
            onClick={onAboutClick}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to="/feed"
            onClick={hideSubNavigation}
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
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
