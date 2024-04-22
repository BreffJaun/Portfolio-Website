// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
import { ThemeButtonProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import ThemeContext from "../context/themeContext";

// I M P O R T:   F U N C T I O N S
import { useContext, useEffect, useState } from "react";

// C O D E
const ThemeButton = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  // Effect to store theme in localStorage and add classes to body
  useEffect(() => {
    // Store theme in localStorage
    localStorage.setItem("theme", JSON.stringify(theme));

    // Add classes to body
    document.body.classList.toggle("dark-theme", theme);
    document.body.classList.toggle("light-theme", !theme);
  }, [theme]);

  // Effect to toggle theme after 2 seconds when theme is false
  useEffect(() => {
    if (!theme) {
      const id = window.setTimeout(() => {
        setTheme(true);
      }, 2000);
      setTimeoutId(id);

      // Clear timeout on unmount
      return () => clearTimeout(id);
    }
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
  };

  return (
    <div className="theme__button__inner__container">
      <input
        type="checkbox"
        id="theme-toggle"
        onChange={toggleTheme}
        checked={theme ? true : false}
      />
      <label htmlFor="theme-toggle" className="toggle">
        <span className="material-symbols-outlined sun">light_mode</span>
        <span className="material-symbols-outlined moon">dark_mode</span>
      </label>
    </div>
  );
};

export default ThemeButton;
