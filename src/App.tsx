// I M P O R T:   F I L E S
import "./styles/app.scss";

// I M P O R T:  T Y P E S

// I M P O R T:   P A C K A G E S
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeContext from "./context/ThemeContext";
import ThemeClickCountContext from "./context/ThemeClickCountContext";
import MobileViewContext from "./context/MobileViewContext";
import DeviceContext from "./context/DeviceContext";

// I M P O R T:   F U N C T I O N S
import Spotlight from "./components/Spotlight";
import Header from "./views/Header";
import CombinedLP from "./views/CombinedLP";
import Feed from "./views/Feed";
import Contact from "./views/Contact";
import Login from "./views/Login";

// C O D E
function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<boolean>(true);
  const [clickCount, setClickCount] = useState<number>(0);
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [device, setDevice] = useState<string>("");

  useEffect(() => {
    const mainContentElement = document.querySelector(
      ".main__content"
    ) as HTMLElement; // Typumwandlung zu HTMLElement

    if (mainContentElement) {
      if (location.pathname === "/feed") {
        mainContentElement.style.top = "125px";
      } else {
        mainContentElement.style.top = "165px";
      }
    }
  }, [location]);

  return (
    <DeviceContext.Provider value={[device, setDevice]}>
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
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
              <Spotlight />
            </div>
          </ThemeContext.Provider>
        </ThemeClickCountContext.Provider>
      </MobileViewContext.Provider>
    </DeviceContext.Provider>
  );
}

export default App;

// I M P O R T:   F I L E S

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S

// C O D E
