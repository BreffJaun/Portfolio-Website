// I M P O R T:   F I L E S
import "../../styles/stack.scss";
import htmlLogo from "../../images/html.png";
import cssLogo from "../../images/css.png";
import sass from "../../images/sass.png";
import bootstrapLogo from "../../images/bootstrap.png";
import jsLogo from "../../images/javascript.png";
import tsLogo from "../../images/typescript.png";
import reactLogo from "../../images/react.png";
import nodeLogo from "../../images/nodejs.png";
import expressLogo from "../../images/expressjs.png";
import mongoLogo from "../../images/mongodb.png";
import gitLogo from "../../images/git.png";
import githubLogo from "../../images/github.png";

// I M P O R T:   P A C K A G E S
import Tilt from "react-parallax-tilt";

// I M P O R T:   F U N C T I O N S

// C O D E
const Stack = () => {
  const stackArray = [
    {
      name: "HTML",
      logo: htmlLogo,
      style: "html__logo",
    },
    {
      name: "CSS",
      logo: cssLogo,
      style: "css__logo",
    },
    {
      name: "Sass",
      logo: sass,
      style: "sass__logo",
    },
    {
      name: "Bootstrap",
      logo: bootstrapLogo,
      style: "bootstrap__logo",
    },
    // {
    //   name: "JavaScript",
    //   logo: jsLogo,
    // },
    // {
    //   name: "TypeScript",
    //   logo: tsLogo,
    // },
    // {
    //   name: "React",
    //   logo: reactLogo,
    // },
    // {
    //   name: "Node.js",
    //   logo: nodeLogo,
    // },
    // {
    //   name: "Express.js",
    //   logo: expressLogo,
    // },
    // {
    //   name: "MongoDB",
    //   logo: mongoLogo,
    // },
    // {
    //   name: "Git",
    //   logo: gitLogo,
    // },
    // {
    //   name: "GitHub",
    //   logo: githubLogo,
    // }
  ];

  return (
    <div className="stack">
      <section id="stack">
        <h1>Stack</h1>
        <p>
          Hier sind ein paar Technologien und Programmiersprachen, mit denen ich
          in letzter Zeit gearbeitet habe:
        </p>
        <div className="outer__element">
          {stackArray.map((el, index) => (
            <Tilt
              key={index}
              className="parallax-effect-glare-scale"
              perspective={500}
              glareEnable={true}
              glarePosition="all"
              glareMaxOpacity={0.45}
              glareColor="var(--teal)"
              scale={1.02}
              gyroscope={true}
              glareBorderRadius="20px"
            >
              <div className="inner__element">
                <h2>{el.name}</h2>
                <div className="white__circle">
                  <img src={el.logo} alt={el.name} className={el.style} />
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Stack;
