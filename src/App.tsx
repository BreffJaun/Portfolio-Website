// I M P O R T:   F I L E S
import "./styles/app.scss";

// I M P O R T:  T Y P E S

// I M P O R T:   P A C K A G E S
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeContext from "./context/ThemeContext";
import ThemeClickCountContext from "./context/ThemeClickCountContext";
// import { ThemeClickCountContextType } from "./types/types";
import MobileViewContext from "./context/MobileViewContext";

// I M P O R T:   F U N C T I O N S
import Spotlight from "./components/Spotlight";
import Header from "./views/Header";
import SubNavigation from "./components/Sub-Navigation";
import CombinedLP from "./views/CombinedLP";
import Feed from "./views/Feed";
import Contact from "./views/Contact";
// import LandingPage from "./components/LandingPage";
// import About from "./components/About";

// C O D E
function App() {
  const [theme, setTheme] = useState<boolean>(true);
  const [clickCount, setClickCount] = useState<number>(0);
  const [mobileView, setMobileView] = useState<boolean>(false);

  const toggleThemeClass = () => {
    document.documentElement.classList.toggle("light-theme");
  };

  useEffect(() => {
    toggleThemeClass();
  }, [theme]);

  const switchTheme = () => {
    setTheme(!theme);
  };

  return (
    <MobileViewContext.Provider value={[mobileView, setMobileView]}>
      <ThemeClickCountContext.Provider value={[clickCount, setClickCount]}>
        <ThemeContext.Provider value={[theme, setTheme]}>
          <div className="App">
            <Header />
            <div className="main__content">
              <Routes>
                <Route path="/" element={<CombinedLP />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Spotlight />
          </div>
        </ThemeContext.Provider>
      </ThemeClickCountContext.Provider>
    </MobileViewContext.Provider>
  );
}

export default App;

// I M P O R T:   F I L E S

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S

// C O D E
