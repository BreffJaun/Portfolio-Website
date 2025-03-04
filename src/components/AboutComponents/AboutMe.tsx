// I M P O R T:   F I L E S
import bw__image from "../../images/breffjaun_bw.png";
import cd__image from "../../images/breffjaun_cd.png";

// I M P O R T:  T Y P E S
import { MySelf_Content } from "../../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_MS } from "../../api/host";
import LoggedInContext from "../../context/LoginContext";
import PendingContext from "../../context/PendingContext";
import EditBtn from "../EditBtn";
import EditMySelfModal from "../EditMySelfModal";
import { openModal, closeModal, initialContentLoad } from "../../utils/utils";

// C O D E
const AboutMe = () => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn] = useContext(LoggedInContext);
  const [isPending] = useContext(PendingContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [content, setContent] = useState<MySelf_Content>({
  //   headline: "My Self",
  //   motto: `"Aus den eigenen und vor allem aus den Fehlern anderer lernen"`,
  //   connectingWords: " lautet mein Motto.",
  //   description: {
  //     paragraph1:
  //       "Im Web Development habe ich nicht nur eine neue berufliche    Herausforderung gefunden, sondern auch meine wahre Leidenschaft    entdeckt. Es ist wie ein ständiges Spiel, bei dem ich kreativ sein    und gleichzeitig technische Probleme lösen kann. Jeden Tag gibt es    etwas Neues zu lernen und zu erforschen, und das hält mich auf Trab.    Es ist einfach unglaublich befriedigend, zu sehen, wie meine Codes    zum Leben erwachen und tatsächlich etwas bewirken können. Der    IT-Bereich ist mein Spielfeld, und ich liebe es, darin zu spielen.",
  //     paragraph2:
  //       "Nachdem ich mehrere Jahre Berufserfahrung im kaufmännischen Bereich gesammelt und auch in einer Führungsposition mein Können unter    Beweis gestellt habe, bin ich den nächsten Schritt gegangen und habe die nächste Herausforderung im IT-Bereich gewagt.",
  //     paragraph3:
  //       "Darum bildete ich mich beim Digital Career Institut zum    Web-Developer fort und habe dort nach erfolgreichem Abschluss des    Kurses meine Karriere im Bereich Web Development als Assistant Teacher angefangen.",
  //   },
  // });
  const [content, setContent] = useState<MySelf_Content | null>(null);

  useEffect(() => {
    initialContentLoad(URL_MS, setContent, navigate);
  }, []);

  const handleUpdate = (updatedContent: MySelf_Content) => {
    closeModal(setIsModalOpen);
    const sendData = async () => {
      await fetch(`${BE_HOST}/${URL_MS}`, {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(updatedContent),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(
              new Error(`HTTP error! Status: ${res.status}`)
            );
          }
          return res.json();
        })
        .then((data) => {
          setContent(data.content);
        })
        .catch((err) => {
          console.error(err);
          setTimeout(() => navigate("/*"), 1000);
        });
    };
    sendData();
  };

  return (
    <>
      {isPending || !content ? (
        <div>Loading...</div>
      ) : (
        <div className="about__me">
          <section id="aboutme">
            <img
              src={hovered ? cd__image : bw__image}
              alt="personal portrait"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
            <div>
              <h1>{content.headline}</h1>
              <p>
                <cite>{content.motto}</cite>
                <span>{content.connectingWords}</span>
              </p>
              <p>{content.description.paragraph1}</p>
              <p>{content.description.paragraph2}</p>
              <p className="description__container">
                {content.description.paragraph3}
              </p>
            </div>
            <EditBtn onClick={() => openModal(setIsModalOpen)} />
          </section>
          <div className={`edit-modal-container ${isModalOpen ? "open" : ""}`}>
            <EditMySelfModal
              content={content}
              onClose={() => closeModal(setIsModalOpen)}
              onSubmit={handleUpdate}
              isModalOpen={isModalOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AboutMe;
