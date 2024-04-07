// I M P O R T:   F I L E S

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S
import LandingPage from "../components/LandingPage";
import About from "../components/About";
import Contact from "./Contact";

// C O D E
const CombinedLP = () => {
  return (
    <div>
      <LandingPage />
      <About />
      <Contact />
    </div>
  );
};

export default CombinedLP;
