// IMPORT: FILES
import "../styles/certificateCard.scss";

// IMPORT: TYPES
import { CertificateItem } from "../types/interfaces";

// IMPORT: PACKAGES
import { useState } from "react";

// IMPORT: FUNCTIONS

// IMPORT: CONTEXT

// IMPORT: COMPONENTS

// CODE
const CertificateCard: React.FC<CertificateItem> = ({ title, img }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="certificate-card" onClick={() => setIsOpen(true)}>
        <div className="certificate-card__title">{title}</div>

        <div className="certificate-card__image-slot">
          <img src={img} alt={title} loading="lazy" />
        </div>
      </div>

      {isOpen && (
        <div className="image-modal" onClick={() => setIsOpen(false)}>
          <img className="image-modal-content" src={img} alt={title} />
        </div>
      )}
    </>
  );
};

export default CertificateCard;
