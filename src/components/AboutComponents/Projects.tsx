// I M P O R T:   F I L E S
import "../../styles/projects.scss";
import beTemplate from "../../images/be-template.jpg";
import terminalTaToe from "../../images/terminalTacToe.jpg";
import todoApp from "../../images/todoApp.png";
import useFetch from "../../images/useFetch.png";

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S
import ProjectCard from "../ProjectCard";

// C O D E
// Maximale Zeichenanzahl:
// title: 35 Zeichen
// description: 175 Zeichen
const projects = [
  {
    image: beTemplate,
    title: "Backend Template",
    repoLink:
      "https://github.com/BreffJaun/backend-template-bun-ts-expressJS-mongoDB",
    description:
      "This is a simple template for a backend with express.js and for mongoDB. The template is written with bun for better perfomance and it is in TypeScript to make it more secure.",
    tags: ["Backend", "TypeScript", "MongoDB", "ExpressJS", "Bun"],
  },
  {
    image: terminalTaToe,
    title: "terminalTacToe",
    repoLink: "https://github.com/BreffJaun/terminalTacToe",
    description:
      '"terminalTacToe" is a 2 player tictactoe game for the terminal.You can play the game field with the numpad of your keyboard. Each number reflects a field on the board.',
    tags: ["JavaScript", "Terminal", "Game"],
  },
  {
    image: todoApp,
    title: "todoApp",
    repoLink: "https://todoapp-yj97.onrender.com",
    description:
      "This To-Do application helps you stay organized and manage your tasks efficiently.",
    tags: ["JavaScript", "React", "Frontend", "SCSS"],
  },
  {
    image: useFetch,
    title: "useFetch",
    repoLink: "https://www.npmjs.com/package/@breffjaun/usefetch",
    description:
      "useFetch is a simple, reusable JavaScript package designed to streamline the process of making HTTP requests in web applications. ",
    tags: ["npm", "JavaScript", "Fetch"],
  },
  // Weitere Projekte hier hinzufügen
];

const Projects = () => {
  return (
    <div className="projects">
      <section id="projects">
        <h1>Projects</h1>
        <p>Hier finden Sie einige meiner Projekte:</p>
        <div className="project-cards-container">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              image={project.image}
              title={project.title}
              link={project.repoLink}
              description={project.description}
              tags={project.tags}
            />
          ))}
        </div>
      </section>
    </div>
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
