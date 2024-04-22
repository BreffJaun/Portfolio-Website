// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
import { ThemeButtonProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import ThemeContext from "../context/themeContext";
import ThemeClickCountContext from "../context/ThemeClickCountContext";

// I M P O R T:   F U N C T I O N S
import { useContext, useEffect, useState } from "react";

// C O D E
const ThemeButton = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickCount, setClickCount] = useContext(ThemeClickCountContext);

  // Effect to store theme in localStorage and add classes to body
  useEffect(() => {
    // Store theme in localStorage
    localStorage.setItem("theme", JSON.stringify(theme));

    // Add classes to body
    document.body.classList.toggle("dark-theme", theme);
    document.body.classList.toggle("light-theme", !theme);

    const storedClickCount = localStorage.getItem("clickCount");
    if (
      typeof storedClickCount === "string" &&
      !isNaN(Number(storedClickCount))
    ) {
      const clickCountValue = parseInt(storedClickCount, 10);
      setClickCount(clickCountValue);
    }
  }, [theme]);

  // Effect to toggle theme after 2 seconds when theme is false
  useEffect(() => {
    if (!theme) {
      const id = window.setTimeout(() => {
        setTheme(true);
      }, 2000);
      setTimeoutId(id);

      return () => clearTimeout(id);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
  };

  const handleButtonClick = () => {
    if (clickCount < 3) {
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);
      localStorage.setItem("clickCount", JSON.stringify(newClickCount));
    } else {
      setIsDisabled(true);
    }
  };

  let tooltipText = "";
  if (clickCount === 0) {
    tooltipText = "";
  } else if (clickCount === 1) {
    tooltipText = "First Click!";
  } else if (clickCount === 2) {
    tooltipText = "Second Click!";
  } else if (clickCount === 3) {
    tooltipText = "Third Click!";
  } else {
    tooltipText = "Out of Order";
  }
  console.log("clickCount: ", clickCount);

  return (
    <div className="theme__button__inner__container">
      <input
        type="checkbox"
        id="theme-toggle"
        onClick={handleButtonClick}
        disabled={isDisabled}
        onChange={toggleTheme}
        checked={theme ? true : false}
      />
      <label htmlFor="theme-toggle" className="toggle">
        <span className="material-symbols-outlined sun">light_mode</span>
        <span className="material-symbols-outlined moon">dark_mode</span>
        <div className="tooltip">{tooltipText}</div>
      </label>
    </div>
  );
};

export default ThemeButton;
