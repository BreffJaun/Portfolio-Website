// I M P O R T:   F I L E S
import "../../styles/projects.scss";
import beTemplate from "../../images/be-template.jpg";
import terminalTacToe from "../../images/terminalTacToe.jpg";
import todoApp from "../../images/todoApp.png";
import useFetch from "../../images/useFetch.png";

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
  const projects: Project_Item[] = [
    // Maximale Zeichenanzahl:
    // title: 35 Zeichen
    // description: 175 Zeichen
    {
      order: 1,
      img: beTemplate,
      title: "Backend Template",
      link: "https://github.com/BreffJaun/backend-template-bun-ts-expressJS-mongoDB",
      description:
        "This is a simple template for a backend with express.js and for mongoDB. The template is written with bun for better perfomance and it is in TypeScript to make it more secure.",
      tags: ["Backend", "TypeScript", "MongoDB", "ExpressJS", "Bun"],
    },
    {
      order: 2,
      img: terminalTacToe,
      title: "terminalTacToe",
      link: "https://github.com/BreffJaun/terminalTacToe",
      description:
        '"terminalTacToe" is a 2 player tictactoe game for the terminal.You can play the game field with the numpad of your keyboard. Each number reflects a field on the board.',
      tags: ["JavaScript", "Terminal", "Game"],
    },
    {
      order: 3,
      img: todoApp,
      title: "todoApp",
      link: "https://todoapp-yj97.onrender.com",
      description:
        "This To-Do application helps you stay organized and manage your tasks efficiently.",
      tags: ["JavaScript", "React", "Frontend", "SCSS"],
    },
    {
      order: 4,
      img: useFetch,
      title: "useFetch",
      link: "https://www.npmjs.com/package/@breffjaun/usefetch",
      description:
        "useFetch is a simple, reusable JavaScript package designed to streamline the process of making HTTP requests in web applications. ",
      tags: ["npm", "JavaScript", "Fetch"],
    },
    // Weitere Projekte hier hinzufügen
  ];
  const [content, setContent] = useState<Projects_Content>({
    headline: "Projects",
    description: "Hier finden Sie einige meiner Projekte:",
    projects: [],
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Echter Fetch
  // useEffect(() => {
  //   initialContentLoad(URL_P, setContent, navigate);
  // }, []);

  // Dummy-Daten
  useEffect(() => {
    setContent({ ...content, projects: projects });
  }, []);

  const handleUpdate = () => {
    closeModal(setIsModalOpen);
    // initialContentLoad(URL_P, setContent, navigate);
  };

  return (
    <>
      {isPending ? (
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

// {
//   image: imagePlaceholder,
//   title: "Repo title",
//   repoLink: "",
//   description: "",
//   tags: ["", "", ""],
// },
