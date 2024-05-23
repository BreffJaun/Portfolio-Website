// I M P O R T:   F I L E S
import "../styles/footer.scss";

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S

// C O D E
const Footer = () => {
  return (
    <div className="footer">
      <p>
        Designed & Built by{" "}
        <a href="https://github.com/BreffJaun" target="_blank">
          Jeff Braun
        </a>
      </p>
      <p>
        Inspired by{" "}
        <a href="https://brittanychiang.com" target="_blank">
          Brittany Chang
        </a>{" "}
        &{" "}
        <a href="https://markuskooche.com" target="_blank">
          Markus Koch
        </a>
        . Logo by{" "}
        <a href="https://grossesbewirken.de/" target="_blank">
          grossesbewirken
        </a>
      </p>
    </div>
  );
};

export default Footer;
