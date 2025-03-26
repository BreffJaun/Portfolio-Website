// I M P O R T:   F I L E S
import "../styles/landingPage.scss";
import "../styles/editLPModal.scss";

// I M P O R T:  T Y P E S
import { LP_Content } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_CLP } from "../api/host";
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";
import EditBtn from "./EditBtn";
import EditLPModal from "./EditLPModal";
import { closeModal, openModal, initialContentLoad } from "../utils/utils";

// C O D E
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useContext(LoggedInContext);
  const [isPending] = useContext(PendingContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [content, setContent] = useState<LP_Content | null>(null);

  useEffect(() => {
    initialContentLoad(URL_CLP, setContent, navigate);
  }, []);

  const handleUpdate = (updatedContent: LP_Content) => {
    closeModal(setIsModalOpen);
    const sendData = async () => {
      await fetch(`${BE_HOST}/${URL_CLP}`, {
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
        <div className="loading-screen">Loading...</div>
      ) : (
        <div className="landing__page">
          <section id="#">
            <h6 className="hi__my__name__is">{content.introduction}</h6>
            <h1>
              {content.name} <span>{content.connectingWords}</span>
            </h1>
            <h2>{content.jobTitle}</h2>
            <p>{content.description}</p>
            <EditBtn onClick={() => openModal(setIsModalOpen)} />
            <a
              type="button"
              className="btn btn__outline__success"
              href="mailto:braun_jeff@web.de"
            >
              Get in touch
            </a>
          </section>
          <div className={`edit-modal-container ${isModalOpen ? "open" : ""}`}>
            <EditLPModal
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

export default LandingPage;
