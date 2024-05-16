// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
import { SubNavProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { isSectionInView } from "../utils/utils";

// C O D E
const SubNavigation = ({ hideMobileNav = () => {} }) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const handleScroll = () => {
    const sections = ["aboutme", "stack", "projects", "contact"];
    let newActiveSection = "";

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 165) {
          newActiveSection = sectionId;
        }
      }
    });

    setActiveSection(newActiveSection);
  };

  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
      handleScroll();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>
            <a
              href="#aboutme"
              className={activeSection === "aboutme" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                hideMobileNav();
                scrollToSection("aboutme");
              }}
            >
              <span>My </span>
              Self
            </a>
          </li>
          <li>
            <a
              href="#stack"
              className={activeSection === "stack" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                hideMobileNav();
                scrollToSection("stack");
              }}
            >
              <span>My </span>
              Stack
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={activeSection === "projects" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                hideMobileNav();
                scrollToSection("projects");
              }}
            >
              <span>My </span>
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === "contact" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                hideMobileNav();
                scrollToSection("contact");
              }}
            >
              <span>My </span>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SubNavigation;
