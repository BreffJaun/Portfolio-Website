// I M P O R T:   F I L E S
import "../styles/imprint.scss";

// I M P O R T:   T Y P E S

// I M P O R T:   P A C K A G E S
import { useEffect } from "react";

// I M P O R T:   F U N C T I O N S
import Footer from "./Footer";
import { scrollToTop } from "../utils/utils";

// C O D E
const Imprint = () => {
  scrollToTop();

  return (
    <>
      <div className="imprint-container">
        <div className="imprint-content">
          <h1>Impressum</h1>
          <h2>Kontakt</h2>
          <p>
            Hasime__ - Jeff Braun
            <br />
            c/o Online-Impressum.de #28978
            <br />
            Europaring 90
            <br />
            53757 Sankt Augustin
          </p>
          <p>Telefon: 015511019500</p>
          <p>
            E-Mail: <a href="mailto:breffjaun@mail.de">breffjaun@mail.de</a>
          </p>
          <p>
            <a
              href="https://www.mein.online-impressum.de/hasime__/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zweiter Kontaktweg
            </a>
          </p>
          <p>
            Zuständige Regulierungs- und Aufsichtsbehörde:
            <br /> Niedersächsische Landesmedienanstalt <br />
            Sitz: Deutschland
          </p>
          <p>
            Quelle:{" "}
            <a
              href="https://www.e-recht24.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.e-recht24.de
            </a>
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf dieser Website nach den allgemeinen Gesetzen verantwortlich.
            Nach §§ 8 bis 10 TMG bin ich jedoch nicht verpflichtet, übermittelte
            oder gespeicherte fremde Informationen zu überwachen oder nach
            Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine Haftung ist jedoch erst ab dem Zeitpunkt der
            Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
            von entsprechenden Rechtsverletzungen werde ich diese Inhalte
            umgehend entfernen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Diese Website enthält Links zu externen Websites Dritter, auf deren
            Inhalte ich keinen Einfluss habe. Daher übernehme ich keine Gewähr
            für diese fremden Inhalte. Für die Inhalte der verlinkten Seiten ist
            stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
            Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
            Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          </p>
          <p>
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
            jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
            zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich
            derartige Links umgehend entfernen.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch mich erstellten Inhalte und Werke auf dieser Website
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
            Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
            jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
            sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p>
            Soweit die Inhalte auf dieser Website nicht von mir erstellt wurden,
            werden die Urheberrechte Dritter beachtet. Insbesondere werden
            Inhalte Dritter als solche gekennzeichnet. Solltest du auf eine
            Urheberrechtsverletzung aufmerksam werden, bitte ich um einen
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werde ich derartige Inhalte umgehend entfernen.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Imprint;
