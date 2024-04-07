// I M P O R T:   F I L E S
import "../styles/about.scss";

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S
import AboutMe from "./AboutComponents/AboutMe";
import Stack from "./AboutComponents/Stack";
import Projects from "./AboutComponents/Projects";

// C O D E
const About = () => {
  return (
    <div>
      <AboutMe />
      <Stack />
      <Projects />
    </div>
  );
};

export default About;
