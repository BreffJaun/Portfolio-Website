// I M P O R T:   F I L E S
import "../styles/contact.scss";

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S
import Footer from "./Footer";

// C O D E
const Contact = () => {
  return (
    <div className="contact">
      <section id="contact">
        <h1>Contact</h1>
        <p>
          Gefällt Ihnen, was ich mache und möchten Sie jetzt mit mir in Kontakt
          treten? Zögern Sie nicht und schreiben Sie mir eine E-Mail:
        </p>
        <a
          type="button"
          className="btn btn__outline__success"
          href="mailto:braun_jeff@web.de"
        >
          In Kontakt treten
        </a>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
