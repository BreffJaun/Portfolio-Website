// I M P O R T:   F I L E S
import "../styles/editMySelfModal.scss";

// I M P O R T:  T Y P E S
import { EditMySelfModalProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect } from "react";

// I M P O R T:   F U N C T I O N S
import CloseBtn from "./CloseBtn";

// C O D E
const EditMSModal: React.FC<EditMySelfModalProps> = ({
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

    if (name.startsWith("paragraph")) {
      setFormData((prev) => ({
        ...prev,
        description: {
          ...prev.description,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
          <label>Headline:</label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Motto:</label>
          <input
            type="text"
            name="motto"
            value={formData.motto}
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
          <label>Description Paragraph 1:</label>
          <textarea
            name="paragraph1"
            value={formData.description.paragraph1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description Paragraph 2:</label>
          <textarea
            name="paragraph2"
            value={formData.description.paragraph2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description Paragraph 3:</label>
          <textarea
            name="paragraph3"
            value={formData.description.paragraph3}
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

export default EditMSModal;
