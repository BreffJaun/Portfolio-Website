// I M P O R T:   F I L E S
import "../styles/editFeedInfoModal.scss";

// I M P O R T:  T Y P E S
import { EditFeedModalProps, Feed_Content } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_F } from "../api/host";
import CloseBtn from "./CloseBtn";
import EditImageBtn from "./EditImageBtn";
import PendingContext from "../context/PendingContext";

// C O D E
const EditFeedInfoModal: React.FC<EditFeedModalProps> = ({
  content,
  onClose,
  onSubmit,
  activeModal,
}) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [newData, setNewData] = useState(content);
  const [newProfileImg, setNewProfileImg] = useState<File | undefined>(
    undefined
  );
  const [newProfileImgUrl, setNewProfileImgUrl] = useState("");
  const [newTitleImg, setNewTitleImg] = useState<File | undefined>(undefined);
  const [newTitleImgUrl, setNewTitleImgUrl] = useState("");

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

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange =
    (
      urlSetter: React.Dispatch<React.SetStateAction<string>>,
      imageSetter: React.Dispatch<React.SetStateAction<File | undefined>>
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Clean up
      imageSetter(undefined);
      urlSetter("");

      // Get file
      const file = event.target.files?.[0];
      if (file) {
        imageSetter(file);
        urlSetter(URL.createObjectURL(file));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newData) return;

    const formData = new FormData();
    formData.append("ghLink", newData.ghLink);
    formData.append("fullName", newData.fullName);
    formData.append("statement", newData.statement);
    formData.append("jobTitle", newData.jobTitle);
    formData.append("about", newData.about);
    if (newProfileImg) {
      formData.append("feed_profile_img", newProfileImg);
    } else {
      formData.append("feed_profile_img", content.feed_profile_img);
    }
    if (newTitleImg) {
      formData.append("feed_title_img", newTitleImg);
    } else {
      formData.append("feed_title_img", content.feed_title_img);
    }

    const sendProjectData = async () => {
      setIsPending(true);
      await fetch(`${BE_HOST}/${URL_F}`, {
        credentials: "include",
        method: "PATCH",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(
              new Error(`HTTP error! Status: ${res.status}`)
            );
          }
          return res.json();
        })
        .then((data) => {
          // console.log("Data:", data);
          setIsPending(false);
          setTimeout(() => onSubmit(), 1000);
        })
        .catch((error) => {
          setIsPending(false);
          console.error("Error:", error);
          setTimeout(() => navigate("/*"), 2000);
        });
    };
    sendProjectData();
  };

  return (
    <div className="edit-modal-content feed__info__modal">
      <CloseBtn onClick={onClose} />
      <form onSubmit={handleSubmit}>
        <h2>Edit content:</h2>
        <div className="edit__images__container">
          <div className="form-group title__image__container">
            <label htmlFor="feed__title__image" className="feed__title__label">
              Feed title image:
              <EditImageBtn />
            </label>
            <input
              className="edit__card"
              type="file"
              id="feed__title__image"
              name="feed__title__image"
              onChange={handleFileChange(setNewTitleImgUrl, setNewTitleImg)}
              accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
              hidden
            />
            <div className="feed__title__preview">
              <img
                // src={newTitleImgUrl}
                src={newTitleImgUrl || content.feed_title_img}
                alt="feed title image"
              />
            </div>
          </div>
          <div className="form-group profile__image__container">
            <label
              htmlFor="feed__profile__image"
              className="feed__profile__label"
            >
              Feed profile image:
              <EditImageBtn />
            </label>
            <input
              className="edit__card"
              type="file"
              id="feed__profile__image"
              name="feed__profile__image"
              onChange={handleFileChange(setNewProfileImgUrl, setNewProfileImg)}
              accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
              hidden
            />
            <div className="feed__profile__preview">
              <img
                // src={newTitleImgUrl}
                src={newProfileImgUrl || content.feed_profile_img}
                alt="feed title image"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>GitHub Link:</label>
          <input
            type="text"
            name="ghLink"
            value={newData.ghLink}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Fullname:</label>
          <input
            type="text"
            name="fullName"
            value={newData.fullName}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Statement:</label>
          <input
            type="text"
            name="statement"
            value={newData.statement}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Job title:</label>
          <input
            type="text"
            name="jobTitle"
            value={newData.jobTitle}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>About:</label>
          <textarea name="about" value={newData.about} onChange={handleInput} />
        </div>
        <button type="submit" className="btn btn-submit">
          Save changes
        </button>
      </form>
    </div>
  );
};

export default EditFeedInfoModal;
