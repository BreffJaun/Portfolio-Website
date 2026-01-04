// IMPORT: FILES
import "../../styles/stack.scss";

// IMPORT: TYPES
import { Certificates_Content, CertificateItem } from "../../types/interfaces";

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
import { URL_C } from "../../api/host";

// IMPORT: CONTEXT
import LoggedInContext from "../../context/LoginContext";
import PendingContext from "../../context/PendingContext";

// IMPORT: COMPONENTS
import EditBtn from "../EditBtn";
import EditCertificatesModal from "../EditCertificatesModal";
import CertificateCard from "../CertificatesCard";

// CODE
const Certificates = () => {
  const navigate = useNavigate();

  const [isLoggedIn] = useContext(LoggedInContext);
  const [isPending] = useContext(PendingContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<Certificates_Content | null>(null);

  // Initial load
  useEffect(() => {
    initialContentLoad(URL_C, setContent, navigate);
  }, []);

  const handleUpdate = () => {
    closeModal(setIsModalOpen);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  if (isPending || !content) {
    return <div className="loading-screen">Loading…</div>;
  }

  // Grouped certificates
  const webDevelopment = content.certificates.filter(
    (i) => i.category === "web-development"
  );

  const appDevelopment = content.certificates.filter(
    (i) => i.category === "app-development"
  );

  const softSkills = content.certificates.filter(
    (i) => i.category === "soft-skills"
  );

  const events = content.certificates.filter((i) => i.category === "events");

  return (
    <div className="stack">
      <section id="certificates">
        <h1>{content.headline}</h1>

        <div className="edit__container">
          <p>{content.description}</p>
          {isLoggedIn && <EditBtn onClick={() => openModal(setIsModalOpen)} />}
        </div>

        {/* Web Development */}
        <section className="stack-section">
          <h2>Web Development</h2>
          <div className="stack-grid">
            {webDevelopment.map((cert) => (
              <CertificateCard key={cert._id} {...cert} />
            ))}
          </div>
        </section>

        {/* App Development */}
        <section className="stack-section">
          <h2>App Development</h2>
          <div className="stack-grid">
            {appDevelopment.map((cert) => (
              <CertificateCard key={cert._id} {...cert} />
            ))}
          </div>
        </section>

        {/* Soft Skills */}
        <section className="stack-section">
          <h2>Soft Skills</h2>
          <div className="stack-grid">
            {softSkills.map((cert) => (
              <CertificateCard key={cert._id} {...cert} />
            ))}
          </div>
        </section>

        {/* Events */}
        <section className="stack-section">
          <h2>Events</h2>
          <div className="stack-grid">
            {events.map((cert) => (
              <CertificateCard key={cert._id} {...cert} />
            ))}
          </div>
        </section>
      </section>

      {/* Edit Modal */}
      <div className={`edit-modal-container ${isModalOpen ? "open" : ""}`}>
        <EditCertificatesModal
          content={content}
          isModalOpen={isModalOpen}
          onClose={() => closeModal(setIsModalOpen)}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Certificates;
