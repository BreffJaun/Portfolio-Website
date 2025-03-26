// I M P O R T:   F I L E S
import "../styles/contact.scss";

// I M P O R T:   P A C K A G E S
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I M P O R T:   F U N C T I O N S
import Footer from "./Footer";

// C O D E
const Contact = () => {
  return (
    <div className="contact">
      <section id="contact">
        <h1>Contact</h1>
        <p>
          Do you like what I do and would you like to get in touch? Don’t
          hesitate to reach out via:
        </p>
        <div className="link__container">
          <div className="link__button__container">
            <a
              type="button"
              className="btn btn__outline__success"
              href="mailto:breffjaun@mail.de"
            >
              <FontAwesomeIcon
                icon={["far", "envelope"]}
                className="socialmedia__icons"
              />
              E-Mail
            </a>
            <a
              href="https://www.linkedin.com/in/jeff-braun-0959091a4/"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={["fab", "linkedin-in"]}
                className="socialmedia__icons"
              />
              LinkedIn
            </a>
            <a
              href="https://www.xing.com/profile/Jeff_Braun2/web_profiles?expandNeffi=true"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={["fab", "xing"]}
                className="socialmedia__icons"
              />{" "}
              Xing
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
