// I M P O R T:   F I L E S
import "../styles/editLPModal.scss";

// I M P O R T:  T Y P E S
import { EditLPModalProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect } from "react";

// I M P O R T:   F U N C T I O N S
import CloseBtn from "./CloseBtn";

// C O D E
const EditLPModal: React.FC<EditLPModalProps> = ({
  content,
  onClose,
  onSubmit,
  isModalOpen,
}) => {
  const [formData, setFormData] = useState(content);

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, [isModalOpen]);

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
    <div className="edit-modal-content lp__modal">
      <CloseBtn onClick={onClose} />
      <form onSubmit={handleSubmit}>
        <h2>Edit content</h2>
        <div className="form-group">
          <label>Introduction:</label>
          <input
            type="text"
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Connecting words:</label>
          <input
            type="text"
            name="connectingWords"
            value={formData.connectingWords}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
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

export default EditLPModal;
