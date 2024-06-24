// I M P O R T:   F I L E S
import "../styles/landingPage.scss";

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S

// C O D E
const LandingPage = () => {
  return (
    <div className="landing__page">
      <section id="#">
        <h6 className="hi__my__name__is">Hallo, mein Name ist</h6>
        <h1>Jeff Braun.</h1>
        <h2>Ich bin Fullstack Web Developer.</h2>
        <p>
          Ich bin ein Web Developer aus Nordrhein-Westfalen, DE. Ich bemühe mich
          Einfachheit und Effektivität auf meine Projekte zu übertragen.
          Programme und Code müssen für mich so benutzerfreundlich wie möglich
          gestaltet und unnötige Designelemente sowie überflüssiger Code
          vermieden werden.
        </p>
        <a
          type="button"
          className="btn btn__outline__success"
          href="mailto:braun_jeff@web.de"
        >
          In Kontakt treten
        </a>
      </section>
    </div>
  );
};

export default LandingPage;
