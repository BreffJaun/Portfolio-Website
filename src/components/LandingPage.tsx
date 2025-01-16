// I M P O R T:   F I L E S
import "../styles/landingPage.scss";
import "../styles/editLPModal.scss";

// I M P O R T:  T Y P E S
import { Content } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useContext } from "react";

// I M P O R T:   F U N C T I O N S
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";
import EditBtn from "./EditBtn";
import EditLPModal from "./EditLPModal";

// C O D E
const LandingPage: React.FC = () => {
  const [isLoggedIn] = useContext(LoggedInContext);
  const [isPending] = useContext(PendingContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [content, setContent] = useState<Content>({
    introduction: "Hallo, ich bin",
    name: " Jeff Braun",
    connectingWords: "und ich bin ein",
    jobTitle: "Fullstack-Web-Developer",
    description:
      "aus Meppen in Niedersachsen, DE. Ich bemühe mich Einfachheit und Effektivität auf meine Projekte zu übertragen. Programme und Code müssen für mich so benutzerfreundlich wie möglich gestaltet und unnötige Designelemente sowie überflüssiger Code vermieden werden.",
  });
  // const openModal = () => setIsModalOpen(true);
  const openModal = () => {
    console.log("Modal geöffnet!");
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const fakeLoggedIn = true;

  const handleUpdate = (updatedContent: Content) => {
    setContent(updatedContent);
    closeModal();
    // const handleSubmit = (event: React.FormEvent) => {
    //     event.preventDefault();
    //     const sendData = async () => {
    //       await fetch(`${BE_HOST}/users/login`, {
    //         credentials: "include",
    //         method: "POST",
    //         body: JSON.stringify(loginData),
    //         headers: {
    //           "Content-type": "application/json; charset=UTF-8",
    //         },
    //       })
    //         .then((res) => res.json())
    //         .then((data) => {
    //           if (data.status === 201) {
    //             setIsLoggedIn(true);
    //           }
    //         })
    //         .catch((error) => {
    //           console.error("Error:", error);
    //           setTimeout(() => navigate("/*"), 4000);
    //         });
    //     };
    //     sendData();
    //   };
  };

  return (
    <div className="landing__page">
      <section id="#">
        <h6 className="hi__my__name__is">{content.introduction}</h6>
        <h1>
          {content.name} <span>{content.connectingWords}</span>
        </h1>

        <h2>{content.jobTitle}</h2>
        <p className="description__container">
          <span>{content.description}</span>
          {fakeLoggedIn && <EditBtn onClick={openModal} />}
        </p>
        <a
          type="button"
          className="btn btn__outline__success"
          href="mailto:braun_jeff@web.de"
        >
          In Kontakt treten
        </a>
      </section>
      {/* {isModalOpen && (
        <EditLPModal
          content={content}
          onClose={closeModal}
          onSubmit={handleUpdate}
        />
      )} */}
      <div className={`edit-modal-container ${isModalOpen ? "open" : ""}`}>
        <EditLPModal
          content={content}
          onClose={closeModal}
          onSubmit={handleUpdate}
          isModalOpen={isModalOpen}
        />
      </div>
    </div>
  );
};

export default LandingPage;
