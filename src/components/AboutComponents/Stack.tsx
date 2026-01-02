// // I M P O R T:   F I L E S
// import "../../styles/stack.scss";

// // I M P O R T:  T Y P E S
// import { StackItem, Stack_Content } from "../../types/interfaces";

// // I M P O R T:   P A C K A G E S
// import { useState, useEffect, useRef, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// // import Tilt from "react-parallax-tilt";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// // I M P O R T:   F U N C T I O N S
// import { BE_HOST, URL_ST } from "../../api/host";
// import {
//   initialContentLoad,
//   loadImageDimensions,
//   renderStackItem,
//   openModal,
//   closeModal,
// } from "../../utils/utils";
// import MobileViewContext from "../../context/MobileViewContext";
// import DeviceContext from "../../context/DeviceContext";
// import LoggedInContext from "../../context/LoginContext";
// import PendingContext from "../../context/PendingContext";
// import { detectDevice } from "../../utils/utils";
// import EditBtn from "../EditBtn";
// import EditStackModal from "../EditStackModal";

// // C O D E

// const Stack = () => {
//   const navigate = useNavigate();
//   const [mobileView, setMobileView] = useContext(MobileViewContext);
//   const [device, setDevice] = useContext(DeviceContext);

//   // WND => With Natural Dimensions
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [isLoggedIn] = useContext(LoggedInContext);
//   const [isPending] = useContext(PendingContext);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [fakeContent, setFakeContent] = useState<Stack_Content | null>(null);
//   const [content, setContent] = useState<Stack_Content | null>(null);
//   const [stackArrayWND, setStackArrayWND] = useState<StackItem[] | null>(null);
//   const [isContentLoaded, setIsContentLoaded] = useState(false);

//   useEffect(() => {
//     initialContentLoad(URL_ST, setFakeContent, navigate);
//   }, []);

//   useEffect(() => {
//     if (!fakeContent) return;
//     const fetchImageDimensions = async () => {
//       const updatedStackArray = await loadImageDimensions(fakeContent.stack);
//       setStackArrayWND(updatedStackArray);
//       setContent({ ...fakeContent, stack: updatedStackArray });
//     };
//     fetchImageDimensions();
//   }, [fakeContent]);

//   const handleUpdate = () => {
//     closeModal(setIsModalOpen);
//     window.scrollTo(0, 0);
//     window.location.reload();
//   };

//   return (
//     <>
//       {isPending || !content || !stackArrayWND ? (
//         <div className="loading-screen">Loading...</div>
//       ) : (
//         <div className={`stack ${device === "desktop" ? "desktopMode" : ""}`}>
//           <section id="stack">
//             <h1>{content.headline}</h1>
//             <div className="edit__container">
//               <p>{content.description}</p>
//               <EditBtn onClick={() => openModal(setIsModalOpen)} />
//             </div>

//             <div
//               className={`outer__element ${mobileView ? "mobile__view" : ""}`}
//             >
//               {device === "mobile" ? (
//                 <Carousel
//                   autoPlay={true}
//                   interval={3000}
//                   infiniteLoop={true}
//                   showArrows={true}
//                   showIndicators={false}
//                   showStatus={false}
//                   swipeable={true}
//                   stopOnHover={true}
//                   showThumbs={false}
//                 >
//                   {stackArrayWND?.map((el) => (
//                     <div key={el.name}>{renderStackItem(el)}</div>
//                   ))}
//                 </Carousel>
//               ) : (
//                 <div className="carousel-track top-slide">
//                   {stackArrayWND?.map(renderStackItem)}
//                   {stackArrayWND?.map(renderStackItem)}
//                   {stackArrayWND?.map(renderStackItem)}
//                   {stackArrayWND?.map(renderStackItem)}
//                 </div>
//               )}
//             </div>
//           </section>
//           <div className={`edit-modal-container ${isModalOpen ? "open" : ""}`}>
//             <EditStackModal
//               content={content}
//               onClose={() => closeModal(setIsModalOpen)}
//               onSubmit={handleUpdate}
//               isModalOpen={isModalOpen}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Stack;

// IMPORT: FILES
import "../../styles/stack.scss";

// IMPORT: TYPES
import { StackItem, Stack_Content } from "../../types/interfaces";

// IMPORT: PACKAGES
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// IMPORT: FUNCTIONS
import {
  initialContentLoad,
  loadImageDimensions,
  renderStackItem,
  openModal,
  closeModal,
} from "../../utils/utils";
import { URL_ST } from "../../api/host";

// IMPORT: CONTEXT
import LoggedInContext from "../../context/LoginContext";
import PendingContext from "../../context/PendingContext";

// IMPORT: COMPONENTS
import EditBtn from "../EditBtn";
import EditStackModal from "../EditStackModal";

// CODE
const Stack = () => {
  const navigate = useNavigate();

  const [isLoggedIn] = useContext(LoggedInContext);
  const [isPending] = useContext(PendingContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<Stack_Content | null>(null);
  const [stackItems, setStackItems] = useState<StackItem[]>([]);

  // Initial load
  useEffect(() => {
    initialContentLoad(URL_ST, setContent, navigate);
  }, []);

  // Load image dimensions
  useEffect(() => {
    if (!content) return;

    const loadImages = async () => {
      const withDimensions = await loadImageDimensions(content.stack);
      setStackItems(withDimensions);
    };

    loadImages();
  }, [content]);

  // Grouped stacks
  const webStack = stackItems.filter((i) => i.category === "web");
  const iosStack = stackItems.filter((i) => i.category === "mobile-ios");
  const androidStack = stackItems.filter(
    (i) => i.category === "mobile-android"
  );
  const uxStack = stackItems.filter((i) => i.category === "ux");
  const toolsStack = stackItems.filter((i) => i.category === "tools");

  const handleUpdate = () => {
    closeModal(setIsModalOpen);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  if (isPending || !content) {
    return <div className="loading-screen">Loading…</div>;
  }

  return (
    <div className="stack">
      <section id="stack">
        <h1>{content.headline}</h1>

        <div className="edit__container">
          <p>{content.description}</p>
          {isLoggedIn && <EditBtn onClick={() => openModal(setIsModalOpen)} />}
        </div>

        {/* Web */}
        <section className="stack-section">
          <h2>Web Development</h2>
          <div className="stack-grid">{webStack.map(renderStackItem)}</div>
        </section>

        {/* Mobile */}
        <section className="stack-section">
          <h2>Mobile Development</h2>

          <div className="mobile-grid">
            <div>
              <h3>iOS</h3>
              <div className="stack-grid">{iosStack.map(renderStackItem)}</div>
            </div>

            <div>
              <h3>Android</h3>
              <div className="stack-grid">
                {androidStack.map(renderStackItem)}
              </div>
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="stack-section">
          <h2>Tools</h2>

          <div className="mobile-grid">
            <div>
              <h3>UX / UI</h3>
              <div className="stack-grid">{uxStack.map(renderStackItem)}</div>
            </div>

            <div>
              <h3>Versioning & Collaboration</h3>
              <div className="stack-grid">
                {toolsStack.map(renderStackItem)}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Edit Modal */}
      <div className={`edit-modal-container ${isModalOpen ? "open" : ""}`}>
        <EditStackModal
          content={content}
          isModalOpen={isModalOpen}
          onClose={() => closeModal(setIsModalOpen)}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Stack;
