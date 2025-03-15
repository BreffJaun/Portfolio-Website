// I M P O R T:   F I L E S
import "../../styles/stack.scss";
// import htmlLogo from "../../images/html.png";
// import cssLogo from "../../images/css.png";
// import sass from "../../images/sass.png";
// import bootstrapLogo from "../../images/bootstrap.png";
// import jsLogo from "../../images/javascript.png";
// import tsLogo from "../../images/typescript.png";
// import reactLogo from "../../images/react.png";
// import nodeLogo from "../../images/nodejs.png";
// import expressLogo from "../../images/expressjs.png";
// import mongoLogo from "../../images/mongodb.png";
// import gitLogo from "../../images/git.png";
// import githubLogo from "../../images/github.png";

// I M P O R T:  T Y P E S
import { StackItem, Stack_Content } from "../../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Tilt from "react-parallax-tilt";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_ST } from "../../api/host";
import {
  initialContentLoad,
  loadImageDimensions,
  renderStackItem,
  openModal,
  closeModal,
} from "../../utils/utils";
import MobileViewContext from "../../context/MobileViewContext";
import DeviceContext from "../../context/DeviceContext";
import LoggedInContext from "../../context/LoginContext";
import PendingContext from "../../context/PendingContext";
import { detectDevice } from "../../utils/utils";
import EditBtn from "../EditBtn";
import EditStackModal from "../EditStackModal";

// C O D E

const Stack = () => {
  const navigate = useNavigate();
  const [mobileView, setMobileView] = useContext(MobileViewContext);
  const [device, setDevice] = useContext(DeviceContext);

  // WND => With Natural Dimensions
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn] = useContext(LoggedInContext);
  const [isPending] = useContext(PendingContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fakeContent, setFakeContent] = useState<Stack_Content | null>(null);
  const [content, setContent] = useState<Stack_Content | null>(null);
  const [stackArrayWND, setStackArrayWND] = useState<StackItem[] | null>(null);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    initialContentLoad(URL_ST, setFakeContent, navigate);
  }, []);

  useEffect(() => {
    if (!fakeContent) return;
    const fetchImageDimensions = async () => {
      const updatedStackArray = await loadImageDimensions(fakeContent.stack);
      setStackArrayWND(updatedStackArray);
      setContent({ ...fakeContent, stack: updatedStackArray });
    };
    fetchImageDimensions();
  }, [fakeContent]);

  const handleUpdate = () => {
    closeModal(setIsModalOpen);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <>
      {isPending || !content || !stackArrayWND ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        <div className={`stack ${device === "desktop" ? "desktopMode" : ""}`}>
          <section id="stack">
            <h1>{content.headline}</h1>
            <div className="edit__container">
              <p>{content.description}</p>
              <EditBtn onClick={() => openModal(setIsModalOpen)} />
            </div>

            <div
              className={`outer__element ${mobileView ? "mobile__view" : ""}`}
            >
              {device === "mobile" ? (
                <Carousel
                  autoPlay={true}
                  interval={3000}
                  infiniteLoop={true}
                  showArrows={true}
                  showIndicators={false}
                  showStatus={false}
                  swipeable={true}
                  stopOnHover={true}
                  showThumbs={false}
                >
                  {stackArrayWND?.map((el) => (
                    <div key={el.name}>{renderStackItem(el)}</div>
                  ))}
                </Carousel>
              ) : (
                <div className="carousel-track top-slide">
                  {stackArrayWND?.map(renderStackItem)}
                  {stackArrayWND?.map(renderStackItem)}
                  {stackArrayWND?.map(renderStackItem)}
                  {stackArrayWND?.map(renderStackItem)}
                </div>
              )}
            </div>
          </section>
          <div className={`edit-modal-container ${isModalOpen ? "open" : ""}`}>
            <EditStackModal
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

export default Stack;
