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
import LoggedInContext from "./context/LoginContext";
import PendingContext from "./context/PendingContext";
import UserContext from "./context/UserContext";

// I M P O R T:   F U N C T I O N S
import Spotlight from "./components/Spotlight";
import Header from "./views/Header";
import CombinedLP from "./views/CombinedLP";
import Feed from "./views/Feed";
import Contact from "./views/Contact";
import Login from "./views/Login";
import Registration from "./views/Registration";
import ForgottPassword from "./views/ForgottPassword";
import SetNewPassword from "./views/SetNewPassword";
import CustomErrorPage from "./views/CustomErrorPage";
import UserInformation from "./views/UserInformation";
import { detectDevice } from "./utils/utils";
import { checkLogin } from "./utils/utils";

// C O D E
function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<boolean>(true);
  const [clickCount, setClickCount] = useState<number>(0);
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [device, setDevice] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [user, setUser] = useState<any>({}); // any type

  useEffect(() => {
    checkLogin(setIsLoggedIn, setIsPending);
  }, []);

  useEffect(() => {
    const detectedDeviceType = detectDevice();
    setDevice(detectedDeviceType);
  }, []);

  useEffect(() => {
    // detect if mobile view
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
    // console.log("Detected device:", device);
  }, [location]);
  // console.log("isLoggedIn:", isLoggedIn);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <PendingContext.Provider value={[isPending, setIsPending]}>
        <LoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
          <DeviceContext.Provider value={[device, setDevice]}>
            <MobileViewContext.Provider value={[mobileView, setMobileView]}>
              <ThemeClickCountContext.Provider
                value={[clickCount, setClickCount]}
              >
                <ThemeContext.Provider value={[theme, setTheme]}>
                  <div className="App">
                    <Header />
                    <div className="main__content">
                      <Routes>
                        <Route path="/" element={<CombinedLP />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                          path="/registration"
                          element={<Registration />}
                        />
                        <Route
                          path="/forgottpassword"
                          element={<ForgottPassword />}
                        />
                        <Route
                          path="/setnewpassword"
                          element={<SetNewPassword />}
                        />
                        <Route
                          path="/userinformation"
                          element={<UserInformation />}
                        />
                        <Route path="*" element={<CustomErrorPage />} />
                      </Routes>
                    </div>
                    <Spotlight />
                  </div>
                  {/* <div className="App">
              {isDeviceReady ? (
                <>
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
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div> */}
                </ThemeContext.Provider>
              </ThemeClickCountContext.Provider>
            </MobileViewContext.Provider>
          </DeviceContext.Provider>
        </LoggedInContext.Provider>
      </PendingContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
