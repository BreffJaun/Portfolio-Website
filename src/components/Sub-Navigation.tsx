// I M P O R T:   F I L E S

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";

// I M P O R T:   F U N C T I O N S

// C O D E
const SubNavigation = () => {
  return (
    <>
      {/* <div className="placeholder__div"></div> */}
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/about/me"
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
            >
              <span>04. </span>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <div className="placeholder__div"></div> */}
    </>
  );
};

export default SubNavigation;
