// I M P O R T:   F I L E S
import "../styles/editMySelfModal.scss";

// I M P O R T:  T Y P E S
import { EditFeedModalProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect } from "react";

// I M P O R T:   F U N C T I O N S
import CloseBtn from "./CloseBtn";

// C O D E
const EditFeedInfoModal: React.FC<EditFeedModalProps> = ({
  content,
  onClose,
  onSubmit,
  activeModal,
}) => {
  const [formData, setFormData] = useState(content);

  useEffect(() => {
    if (activeModal === "editInfo") {
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, [activeModal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="edit-modal-content mySelf__modal">
      <CloseBtn onClick={onClose} />
      <form onSubmit={handleSubmit}>
        <h2>Edit content:</h2>
        <div className="form-group">
          <label>GitHub Link:</label>
          <input
            type="text"
            name="ghLink"
            value={formData.ghLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fullname:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Statement:</label>
          <input
            type="text"
            name="statement"
            value={formData.statement}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Job title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>About:</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-submit">
          Save changes
        </button>
      </form>
    </div>
  );
};

export default EditFeedInfoModal;
