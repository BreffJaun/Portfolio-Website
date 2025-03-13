// I M P O R T:   F I L E S
import "../../styles/projects.scss";
// import beTemplate from "../../images/be-template.jpg";
// import terminalTacToe from "../../images/terminalTacToe.jpg";
// import todoApp from "../../images/todoApp.png";
// import useFetch from "../../images/useFetch.png";

// I M P O R T:  T Y P E S
import { Projects_Content, Project_Item } from "../../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { URL_P } from "../../api/host";
import { initialContentLoad, openModal, closeModal } from "../../utils/utils";
import ProjectCard from "../ProjectCard";
import EditBtn from "../EditBtn";
import EditProjectsModal from "../EditProjectsModal";
import PendingContext from "../../context/PendingContext";

// C O D E

const Projects = () => {
  const navigate = useNavigate();
  const [isPending] = useContext(PendingContext);
  const [content, setContent] = useState<Projects_Content | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    initialContentLoad(URL_P, setContent, navigate);
  }, []);

  const handleUpdate = () => {
    closeModal(setIsModalOpen);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <>
      {isPending || !content ? (
        <div>Loading...</div>
      ) : (
        <div className="projects">
          <section id="projects">
            <h1>{content.headline}</h1>
            <div className="edit__container">
              <p className="edit__description">{content.description}</p>
              <EditBtn onClick={() => openModal(setIsModalOpen)} />
            </div>
            <div className="project-cards-container">
              {content.projects
                .sort((a, b) => a.order - b.order)
                .map((project, index) => (
                  <ProjectCard
                    key={index}
                    _id={project._id}
                    order={project.order}
                    img={project.img}
                    title={project.title}
                    link={project.link}
                    description={project.description}
                    tags={project.tags}
                  />
                ))}
            </div>
          </section>
          <div className={`edit-modal-container ${isModalOpen ? "open" : ""}`}>
            <EditProjectsModal
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

export default Projects;
