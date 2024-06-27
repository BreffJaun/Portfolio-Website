// I M P O R T:   F I L E S
import "../styles/footer.scss";

// I M P O R T:   P A C K A G E S
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S

// C O D E
const Footer = () => {
  const navigate = useNavigate();

  const handleLoginClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="footer">
      <div className="left__placeholder"></div>
      <div className="credits__container">
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

      <div className="right__placeholder">
        <a href="" onClick={handleLoginClick}>
          Login
        </a>
      </div>
    </div>
  );
};

export default Footer;
