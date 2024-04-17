// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
import { ThemeButtonProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S

// C O D E

const ThemeButton = () => {
  return (
    <div className="theme__button__inner__container">
      <input type="checkbox" id="theme-toggle" />
      <label htmlFor="theme-toggle" className="toggle">
        <span className="material-symbols-outlined sun">light_mode</span>
        <span className="material-symbols-outlined moon">dark_mode</span>
      </label>
    </div>
  );
};

export default ThemeButton;
