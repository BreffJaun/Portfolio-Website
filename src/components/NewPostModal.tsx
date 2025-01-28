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

  const [isPending, setIsPending] = useContext(PendingContext);
  const [modalData, setModalData] = useState<Projects_Content>();
  const [newItem, setNewItem] = useState<PostCardProps>({
    title: "",
    img: "",
    description: "",
    tags: [],
    link: "",
  });
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [thumbnailNewCard, setThumbnailNewCard] = useState<File | undefined>(
    undefined
  );
  const [thumbnailUrlNewCard, setThumbnailUrlNewCard] = useState("");

  useEffect(() => {
    setModalData(content);
    if (isModalOpen) {
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, [activeModal]);

  // ** UPDATE POSTS ** //
  // UPDATE PROJECT INFO //
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sendData = async () => {
      await fetch(`${BE_HOST}/${URL_F_EP}`, {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify({
          // headline: modalData.headline,
          // description: modalData.description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            onSubmit();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setTimeout(() => navigate("/*"), 2000);
        });
    };
    sendData();
  };

  // UPDATE PROJECT ITEM //
  // TEXT INPUT
  const handleSelectedInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!selectedItem) return; // Sicherheit
    if (name === "order") {
      const checkOrder = modalData.projects.find(
        (item) => item.order === +value
      );
      if (checkOrder) {
        alert(
          `Order number ${value} already exists. Please choose another one`
        );
        return;
      }
      setNewData(() => ({ ...selectedItem, [name]: +value }));
      return;
    }

    if (name === "link") {
      if (!isValidLink(value)) {
        alert("The entered value is not a valid link. Please correct it.");
        return;
      }
    }

    setNewData(() => ({ ...selectedItem, [name]: value }));
  };

  // IMAGE FILE
  const handleSelectedFileChange = async (
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

  // SAVE BOOTH => FETCH
  const submitChangedItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedItem) return;

    const formData = new FormData();
    if (newData) formData.append("data", JSON.stringify(newData));
    if (thumbnail) formData.append("thumbnail", thumbnail);
    const sendProjectData = async () => {
      // Echter fetch
      // setIsPending(true);
      // await fetch(`${BE_HOST}/${URL_P_L}/${selectedItem._id}`, {
      //   credentials: "include",
      //   method: "PATCH",
      //   body: formData,
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.status === 201) {
      //       setSelectedItem(null);
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
      setSelectedItem(null);
      onSubmit();
    };
    sendProjectData();
  };

  // DELETE PROJECT ITEM //
  const deleteSelectedItem = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!selectedItem) return;
    // Echter fetch
    // setIsPending(true);
    // await fetch(`${BE_HOST}/${URL_ST_L}/${selectedItem._id}`, {
    //   credentials: "include",
    //   method: "DELETE",
    //   // body: JSON.stringify({
    //   //   stackId: selectedItem._id,
    //   // }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.status === 201) {
    //       setSelectedItem(null);
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
    onSubmit();
    console.log("Data to delete:", selectedItem);
    setSelectedItem(null);
  };

  // ================================ //

  // ADD NEW PROJECT ITEM //
  const handleNewCardInfo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (!selectedItem) return; // Sicherheit
    if (name === "order") {
      const checkOrder = modalData.projects.find(
        (item) => item.order === +value
      );
      if (checkOrder) {
        alert(
          `Order number ${value} already exists. Please choose another one`
        );
        return;
      }
      setNewItem((prev) => ({ ...prev, [name]: +value }));
      return;
    }

    if (name === "link") {
      if (!isValidLink(value)) {
        alert("The entered value is not a valid link. Please correct it.");
        return;
      }
    }
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewCardFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Clean up
    setThumbnailNewCard(undefined);
    setThumbnailUrlNewCard("");

    // Get file
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailNewCard(file);
      setThumbnailUrlNewCard(URL.createObjectURL(file));
    }
  };

  const addNewItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
      <h2>Edit content:</h2>
      <form onSubmit={handleInfoSubmit}>
        <div className="form-group">
          <label>Headline:</label>
          <input
            type="text"
            name="headline"
            value={modalData.headline}
            onChange={handleInfoChange}
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
