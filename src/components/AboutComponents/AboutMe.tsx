// I M P O R T:   F I L E S
import bw__image from "../../images/breffjaun_bw.png";
import cd__image from "../../images/breffjaun_cd.png";

// I M P O R T:   P A C K A G E S
import { useState } from "react";

// I M P O R T:   F U N C T I O N S

// C O D E
const AboutMe = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="about__me">
      <section id="aboutme">
        <img
          src={hovered ? cd__image : bw__image}
          alt="personal portrait"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <div>
          <h1>My Self</h1>
          <p>
            <cite>
              "Aus den eigenen und vor allem aus den Fehlern anderer lernen"
            </cite>
            lautet mein Motto.
          </p>
          <p>
            Im Web Development habe ich nicht nur eine neue berufliche
            Herausforderung gefunden, sondern auch meine wahre Leidenschaft
            entdeckt. Es ist wie ein ständiges Spiel, bei dem ich kreativ sein
            und gleichzeitig technische Probleme lösen kann. Jeden Tag gibt es
            etwas Neues zu lernen und zu erforschen, und das hält mich auf Trab.
            Es ist einfach unglaublich befriedigend, zu sehen, wie meine Codes
            zum Leben erwachen und tatsächlich etwas bewirken können. Der
            IT-Bereich ist mein Spielfeld, und ich liebe es, darin zu spielen.
          </p>
          <p>
            Nachdem ich mehrere Jahre Berufserfahrung im kaufmännischen Bereich
            gesammelt und auch in einer Führungsposition mein Können unter
            Beweis gestellt habe, bin ich den nächsten Schritt gegangen und habe
            die nächste Herausforderung im IT-Bereich gewagt.
          </p>
          <p>
            Darum bildete ich mich beim{" "}
            <a href="https://digitalcareerinstitute.org/" target="_blank">
              Digital Career Institut
            </a>{" "}
            zum Web-Developer fort und habe dort nach erfolgreichem Abschluss
            des Kurses meine Karriere im Bereich Web Development als Assistant
            Teacher angefangen.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;

/* 
"Aus den eigenen und vor allem aus den Fehlern anderer lernen" lautet mein Motto.

Nachdem ich mehrere Jahre Berufserfahrung im kaufmännischen Bereich gesammelt und auch in einer Führungsposition mein Können unter Beweis gestellt habe, bin ich den nächsten Schritt gegangen und habe die nächste Herausforderung im IT-Bereich gewagt. 

Darum bildete ich mich beim Digital Career Institut zum Web-Developer fort und habe dort nach erfolgreichem Abschluss des Kurses meine Karriere im Bereich Web Development als Assistant Teacher angefangen. 

Im Web Development habe ich nicht nur eine neue berufliche Herausforderung gefunden, sondern auch meine wahre Leidenschaft entdeckt. Es ist wie ein ständiges Spiel, bei dem ich kreativ sein und gleichzeitig technische Probleme lösen kann. Jeden Tag gibt es etwas Neues zu lernen und zu erforschen, und das hält mich auf Trab. Es ist einfach unglaublich befriedigend, zu sehen, wie meine Codes zum Leben erwachen und tatsächlich etwas bewirken können. Der IT-Bereich ist mein Spielfeld, und ich liebe es, darin zu spielen.

Im Web Development habe ich nicht nur eine neue berufliche Herausforderung gefunden, sondern auch meine wahre Leidenschaft entdeckt. Es ist ein ständiges Spiel aus Kreativität und Problemlösung, das mich täglich begeistert. Der IT-Bereich ist mein Spielfeld, und ich liebe es, darin zu spielen.

*/
