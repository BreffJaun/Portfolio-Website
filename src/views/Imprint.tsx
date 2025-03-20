// I M P O R T:   F I L E S
import "../styles/imprint.scss";

// I M P O R T:   T Y P E S

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S
import Footer from "./Footer";

// C O D E
const Imprint = () => {
  return (
    <>
      <div className="imprint-container">
        <div className="imprint-content">
          <h2>Impressum</h2>
          <p>Angaben gemäß § 5 TMG</p>
          <p>
            <strong>Dein Name</strong>
          </p>
          <p>Straße Hausnummer</p>
          <p>PLZ Stadt</p>
          <p>Deutschland</p>

          <h3>Kontakt</h3>
          <p>Telefon: +49 123 456789</p>
          <p>E-Mail: deine.email@example.com</p>

          <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p>Dein Name</p>
          <p>Straße Hausnummer</p>
          <p>PLZ Stadt</p>

          <h3>Haftung für Inhalte</h3>
          <p>Hier kommt dein Haftungshinweis...</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Imprint;
