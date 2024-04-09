// I M P O R T:   F I L E S
import "./styles/app.scss";

// I M P O R T:   P A C K A G E S
import { Route, Routes, Navigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import Header from "./views/Header";
import SubNavigation from "./components/Sub-Navigation";
import CombinedLP from "./views/CombinedLP";
import Feed from "./views/Feed";
import Contact from "./views/Contact";
// import LandingPage from "./components/LandingPage";
// import About from "./components/About";

// C O D E
function App() {
  return (
    <div className="App">
      <Header />
      <div className="main__content">
        <Routes>
          <Route path="/" element={<CombinedLP />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// I M P O R T:   F I L E S

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S

// C O D E
