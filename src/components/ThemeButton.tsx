// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
// import { ThemeButtonProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import ThemeContext from "../context/ThemeContext";
import ThemeClickCountContext from "../context/ThemeClickCountContext";

// I M P O R T:   F U N C T I O N S
import { useContext, useEffect, useState } from "react";

// C O D E
const ThemeButton = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickCount, setClickCount] = useContext(ThemeClickCountContext);
  const [showOutOfOrder, setShowOutOfOrder] = useState(false);

  // Effect to store theme in localStorage and add classes to body
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
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
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    localStorage.setItem("clickCount", JSON.stringify(newClickCount));
  };

  // Effect to disable button after 3 clicks
  useEffect(() => {
    if (clickCount >= 3) {
      setIsDisabled(true);
      setShowOutOfOrder(true);
    }
  }, [clickCount]);

  let tooltippText = ["", "Are you sure?", "Honestly?", "Out of Order"];

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
      <label
        htmlFor="theme-toggle"
        className={`toggle ${clickCount === 3 ? "disabled" : ""}`}
      >
        <span className="material-symbols-outlined sun">light_mode</span>
        <span className="material-symbols-outlined moon">dark_mode</span>
        {clickCount > 0 && (
          <div className={`tooltip`}>
            {/* <div className={`tooltip ${clickCount === 3 ? "disabled" : ""}`}></div> */}
            {tooltippText[clickCount]}
          </div>
        )}
        {showOutOfOrder && <div className="out-of-order first"></div>}
        {showOutOfOrder && <div className="out-of-order second"></div>}
      </label>
    </div>
  );
};

export default ThemeButton;
