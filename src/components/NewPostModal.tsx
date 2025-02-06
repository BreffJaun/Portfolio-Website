// I M P O R T:   F I L E S
import "../styles/createPostModal.scss";

// I M P O R T:  T Y P E S
import {
  PostCardProps,
  NewPostCardProps,
  Project_Item,
  Projects_Content,
} from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_F, URL_F_CP, URL_F_EP } from "../api/host";
import { isValidLink } from "../utils/utils";
import UserContext from "../context/UserContext";
import PendingContext from "../context/PendingContext";
import CloseBtn from "./CloseBtn";
import EditImageBtn from "./EditImageBtn";

// C O D E
const NewPostModal: React.FC<NewPostCardProps> = ({
  onClose,
  onSubmit,
  activeModal,
}) => {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  const [isPending, setIsPending] = useContext(PendingContext);
  const [newPost, setNewPost] = useState<PostCardProps>({
    title: "",
    img: "",
    description: "",
    tags: [],
    link: "",
  });
  const [error, setError] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    if (activeModal === "newPost") {
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, [activeModal]);

  // ================================ //

  // ADD NEW POST ITEM //
  const handleNewPostInfo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewCardFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Clean up
    setThumbnail(undefined);
    setThumbnailUrl("");

    // Get file
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const addNewPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // const { userName, password, email } = newData.profile;
    // const { confirmPassword } = newData;
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // if (!userName || userName.length < 1) {
    //   setError("Bitte geben Sie einen Benutzernamen ein!");
    // } else if (!email || email.length < 1) {
    //   setError("Bitte geben Sie eine E-Mail-Adresse ein!");
    // } else if (!emailRegex.test(email)) {
    //   setError("Bitte geben Sie eine gültige E-Mail-Adresse ein!");
    // } else if (password !== confirmPassword) {
    //   setError("Die Passwörter stimmen nicht überein!");
    // } else {
    //   setError("");
    // }

    // if (error) return;

    if (!newItem) return;

    const formData = new FormData();
    if (newItem) formData.append("data", JSON.stringify(newItem));
    if (thumbnailNewCard) formData.append("thumbnail", thumbnailNewCard);
    const sendProjectData = async () => {
      // Echter fetch
      // setIsPending(true);
      // await fetch(`${BE_HOST}/${URL_P_L}`, {
      //   credentials: "include",
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.status === 201) {
      //       setIsPending(false);
      //       onSubmit();
      //     }
      //   })
      //   .catch((error) => {
      //     setIsPending(false);
      //     console.error("Error:", error);
      //     setTimeout(() => navigate("/*"), 2000);
      //   });

      // Testing
      console.log("Data to send:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, {
            name: value.name,
            size: value.size,
            type: value.type,
          });
        } else {
          console.log(`${key}:`, value);
        }
      }
      onSubmit();
    };
    sendProjectData();
  };

  return (
    <div className={`edit-modal-content stack__modal`}>
      <CloseBtn onClick={onClose} />
      <h2>Create a post:</h2>
      <form onSubmit={addNewPost}>
        <div className="form-group">
          <label>Author's mood emoji:</label>
          <input
            type="text"
            name="authorAction"
            value={newPost.authorAction}
            onChange={handleNewPostInfo}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={modalData.description}
            onChange={handleInfoChange}
          />
        </div>
        <button type="submit" className="btn btn-submit">
          Save changes
        </button>
      </form>
      <hr />
      {/* Current Projects List */}
      <div className="project-list">
        <h2>Current Projects List:</h2>
        <div className="project-items">
          {modalData.projects
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              // Für Testing
              <div
                key={item.title}
                className={`project-item ${
                  selectedItem?.title === item.title ? "highlighted" : ""
                }`}
                onClick={() => setSelectedItem(item)}
                title={item.title}
              >
                {/* <img src={item.img} alt={item.title} /> */}
                <span>{item.title}</span>
              </div>
              // Für echten fetch
              // <div
              //   key={item._id}
              //   className={`project-item ${
              //     selectedItem?._id === item._id ? "highlighted" : ""
              //   }`}
              //   onClick={() => setSelectedItem(item)}
              //   title={item.title}
              // >
              //   <img src={item.img} alt={item.title} />
              //   <span>{item.title}</span>
              // </div>
            ))}
        </div>
      </div>

      <div className="modal-body">
        {/* Left: Edit Selected Item */}
        <div className="edit-section">
          <h3>Edit Selected Card:</h3>
          {selectedItem ? (
            <div className="edit__or__delete__card">
              <div className="form-group">
                <div className="label-container">
                  <label htmlFor="title">Title:</label>
                  <span
                    className={`char-counter ${
                      (newData?.title || selectedItem.title).length > 29
                        ? "warning"
                        : ""
                    }`}
                    aria-live="polite"
                  >{`${
                    (newData?.title || selectedItem.title).length
                  }/35 Zeichen`}</span>
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={newData?.title || selectedItem.title}
                  onChange={handleSelectedInfoChange}
                  maxLength={35}
                  aria-describedby="char-counter"
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectThumbnail" className="thumbnail__label">
                  Image:
                  <EditImageBtn />
                </label>
                <input
                  className="edit__card"
                  type="file"
                  id="projectThumbnail"
                  name="projectThumbnail"
                  onChange={handleSelectedFileChange}
                  accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
                  hidden
                />
                <div className="thumbnail__preview">
                  <img
                    src={thumbnailUrl || selectedItem.img}
                    alt={thumbnail ? thumbnail.name : selectedItem.title}
                  />
                </div>
                <div className="form-group">
                  <div className="label-container">
                    <label htmlFor="description">Description:</label>
                    <span
                      className={`char-counter ${
                        (newData?.description || selectedItem.description)
                          .length >= 155
                          ? "near-limit"
                          : ""
                      } ${
                        (newData?.description || selectedItem.description)
                          .length >= 175
                          ? "warning"
                          : ""
                      }`}
                      aria-live="polite"
                    >{`${
                      (newData?.description || selectedItem.description).length
                    }/175 Zeichen`}</span>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    value={newData?.description || selectedItem.description}
                    onChange={handleSelectedInfoChange}
                    maxLength={175}
                    aria-describedby="char-counter-description"
                  />
                </div>
                <div className="form-group">
                  <label>Link:</label>
                  <input
                    type="text"
                    name="link"
                    value={newData?.link || selectedItem.link}
                    onChange={handleSelectedInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tags:</label>
                  <input
                    type="text"
                    name="tags"
                    value={newData?.tags || selectedItem.tags.join(", ")}
                    onChange={handleSelectedInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label>Order:</label>
                  <input
                    type="text"
                    name="order"
                    value={newData?.order || selectedItem.order}
                    onChange={handleSelectedInfoChange}
                  />
                </div>
              </div>
              <div className="btn__group">
                <button
                  onClick={submitChangedItem}
                  className="btn-submit"
                  disabled={!(newData || thumbnail)}
                  ref={saveCardButtonRef}
                >
                  Save Project
                </button>
                <button onClick={deleteSelectedItem} className="btn-delete">
                  Delete Project
                </button>
              </div>
            </div>
          ) : (
            <p>Select a card to edit.</p>
          )}
        </div>

        {/* Right: Add New Item */}
        <div className="add-section">
          <h3>Add Card:</h3>
          <div className="edit__or__delete__card">
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="titleNewCard">Title:</label>
                <span
                  className={`char-counter ${
                    newItem?.title.length > 29 ? "warning" : ""
                  }`}
                  aria-live="polite"
                >{`${newItem?.title.length}/35 Zeichen`}</span>
              </div>
              <input
                id="titleNewCard"
                type="text"
                name="title"
                value={newItem?.title}
                placeholder="/"
                onChange={handleNewCardInfo}
                maxLength={35}
                aria-describedby="char-counter"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="projectThumbnailNewCard"
                className="thumbnail__label"
              >
                Image:
                <EditImageBtn />
              </label>
              <input
                className="add__card"
                type="file"
                id="projectThumbnailNewCard"
                name="projectThumbnailNewCard"
                onChange={handleNewCardFile}
                accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
                hidden
              />
              <div className="thumbnail__preview">
                <img src={thumbnailUrlNewCard} alt={thumbnailNewCard?.name} />
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="newProjectDescription">Description:</label>
                <span
                  className={`char-counter ${
                    newItem?.description.length >= 155 ? "near-limit" : ""
                  } ${newItem?.description.length >= 175 ? "warning" : ""}`}
                  aria-live="polite"
                >{`${newItem?.description.length}/175 Zeichen`}</span>
              </div>
              <textarea
                id="newProjectDescription"
                name="description"
                value={newItem?.description}
                onChange={handleNewCardInfo}
                maxLength={175}
                aria-describedby="char-counter-description"
              />
            </div>
            <div className="form-group">
              <label>Link:</label>
              <input
                type="text"
                name="link"
                value={newItem?.link || ""}
                onChange={handleNewCardInfo}
                placeholder="https://..."
              />
            </div>
            <div className="form-group">
              <label>Tags:</label>
              <input
                type="text"
                name="tags"
                value={newItem?.tags}
                onChange={handleNewCardInfo}
                placeholder="tag1, tag2, tag3"
              />
            </div>
            <div className="form-group">
              <label>Order:</label>
              <input
                type="text"
                name="order"
                value={newItem?.order || ""}
                onChange={handleNewCardInfo}
                placeholder={(modalData.projects.length + 1).toString()}
              />
            </div>
            {/* Fehlermeldung */}
            {error && <p className="error-message">{error}</p>}
            <div className="btn__group__single">
              <button
                onClick={addNewItem}
                className="btn-add"
                disabled={!(newItem && thumbnailNewCard)}
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
