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

// I M P O R T:  T Y P E S
import { StackItem } from "../../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useRef, useContext } from "react";
import Tilt from "react-parallax-tilt";

// I M P O R T:   F U N C T I O N S
import { scaleImageToFitCircle } from "../../utils/utils";
import MobileViewContext from "../../context/MobileViewContext";

// C O D E
const stackArray: StackItem[] = [
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
  {
    name: "JavaScript",
    logo: jsLogo,
    style: "js__logo",
  },
  {
    name: "TypeScript",
    logo: tsLogo,
    style: "ts__logo",
  },
  {
    name: "React",
    logo: reactLogo,
    style: "react__logo",
  },
  {
    name: "Node.js",
    logo: nodeLogo,
    style: "node__logo",
  },
  {
    name: "Express.js",
    logo: expressLogo,
    style: "express__logo",
  },
  {
    name: "MongoDB",
    logo: mongoLogo,
    style: "mongo__logo",
  },
  {
    name: "Git",
    logo: gitLogo,
    style: "git__logo",
  },
  {
    name: "GitHub",
    logo: githubLogo,
    style: "github__logo",
  },
];
const Stack = () => {
  const [mobileView, setMobileView] = useContext(MobileViewContext);
  const [stackArrayWND, setStackArrayWND] = useState<StackItem[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImageDimensions = async () => {
      const promises = stackArray.map((image) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const { naturalWidth, naturalHeight } = img;
            const { scaledWidth, scaledHeight } = scaleImageToFitCircle(
              naturalWidth,
              naturalHeight
            );
            resolve({
              ...image,
              naturalWidth,
              naturalHeight,
              scaledWidth,
              scaledHeight,
            });
          };
          img.src = image.logo;
        });
      });

      const updatedStackArray = (await Promise.all(promises)) as StackItem[];
      setStackArrayWND(updatedStackArray);
    };
    loadImageDimensions();
  }, []);

  return (
    <div className="stack">
      <section id="stack">
        <h1>Stack</h1>
        <p>
          Hier sind ein paar Technologien und Programmiersprachen, mit denen ich
          in letzter Zeit gearbeitet habe:
        </p>
        <div className="outer__element">
          {mobileView ? (
            <div>Loading...</div>
          ) : (
            <div className="carousel-track top-slide">
              {stackArrayWND.map((el, index) => (
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
                      <img
                        src={el.logo}
                        alt={el.name}
                        height={`${el.scaledHeight}px`}
                        width={`${el.scaledWidth}px`}
                        className="stack__logo"
                      />
                    </div>
                  </div>
                </Tilt>
              ))}
              {stackArrayWND.map((el, index) => (
                <Tilt
                  key={index}
                  className="parallax-effect-glare-scale carousel-card"
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
                      <img
                        src={el.logo}
                        alt={el.name}
                        height={`${el.scaledHeight}px`}
                        width={`${el.scaledWidth}px`}
                        className="stack__logo"
                      />
                    </div>
                  </div>
                </Tilt>
              ))}
              {stackArrayWND.map((el, index) => (
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
                      <img
                        src={el.logo}
                        alt={el.name}
                        height={`${el.scaledHeight}px`}
                        width={`${el.scaledWidth}px`}
                        className="stack__logo"
                      />
                    </div>
                  </div>
                </Tilt>
              ))}
              {stackArrayWND.map((el, index) => (
                <Tilt
                  key={index}
                  className="parallax-effect-glare-scale carousel-card"
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
                      <img
                        src={el.logo}
                        alt={el.name}
                        height={`${el.scaledHeight}px`}
                        width={`${el.scaledWidth}px`}
                        className="stack__logo"
                      />
                    </div>
                  </div>
                </Tilt>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Stack;
