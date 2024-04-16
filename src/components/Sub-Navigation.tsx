// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
import { SubNavProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";

// I M P O R T:   F U N C T I O N S

// C O D E
const SubNavigation: React.FC<SubNavProps> = ({ hideMobileNav }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/about/me"
              onClick={hideMobileNav}
            >
              <span>01. </span>
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/about/stack"
              onClick={hideMobileNav}
            >
              <span>02. </span>
              Stack
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/about/projects"
              onClick={hideMobileNav}
            >
              <span>03. </span>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/about/contact"
              onClick={hideMobileNav}
            >
              <span>04. </span>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SubNavigation;
