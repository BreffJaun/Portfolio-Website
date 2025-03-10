// I M P O R T:   F I L E S
import "../styles/editProjectsModal.scss";

// I M P O R T:  T Y P E S
import {
  EditProjectsModalProps,
  Project_Item,
  Projects_Content,
  Projects_ItemFromDB,
} from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_P, URL_P_D, URL_P_P } from "../api/host";
import { getImageDimensions, isValidLink } from "../utils/utils";
import PendingContext from "../context/PendingContext";
import CloseBtn from "./CloseBtn";
import EditImageBtn from "./EditImageBtn";

// C O D E
const EditProjectsModal: React.FC<EditProjectsModalProps> = ({
  content,
  onClose,
  onSubmit,
  isModalOpen,
}) => {
  const navigate = useNavigate();
  const saveCardButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isPending, setIsPending] = useContext(PendingContext);
  const [modalData, setModalData] = useState<Projects_Content>(content);
  const [selectedItem, setSelectedItem] = useState<Projects_ItemFromDB | null>(
    null
  );
  const [newData, setNewData] = useState<Projects_ItemFromDB | null>(
    selectedItem
  );
  const [newItem, setNewItem] = useState<Project_Item>({
    title: "",
    img: "",
    description: "",
    tags: "",
    link: "",
  });
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  // const [thumbnailDimensions, setThumbnailDimensions] = useState({
  //   width: "",
  //   height: "",
  // });
  const [thumbnailNewCard, setThumbnailNewCard] = useState<File | undefined>(
    undefined
  );
  const [thumbnailUrlNewCard, setThumbnailUrlNewCard] = useState("");
  // const [thumbnailDimensionsNewCard, setThumbnailDimensionsNewCard] = useState({
  //   width: "",
  //   height: "",
  // });

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
  }, [isModalOpen]);

  useEffect(() => {
    setNewData(selectedItem);
  }, [selectedItem]);

  // useEffect(() => {
  //   console.log("New data:", newData);
  // }, [newData]);

  // ** UPDATE PROJECTS ** //
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
      await fetch(`${BE_HOST}/${URL_P_D}`, {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify({
          headline: modalData.headline,
          description: modalData.description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
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
          setModalData(data.content);
          onSubmit();
        })
        .catch((err) => {
          console.error(err);
          setTimeout(() => navigate("/*"), 1000);
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
      setNewData(
        (prev) => ({ ...prev, [name]: +value } as Projects_ItemFromDB)
      );
      return;
    }

    if (name === "link") {
      if (!isValidLink(value)) {
        alert("The entered value is not a valid link. Please correct it.");
        return;
      }
    }

    if (name === "tags") {
      const tagsArray = value.split(", ");
      setNewData(
        (prev) =>
          ({
            ...prev,
            [name]: tagsArray,
          } as Projects_ItemFromDB)
      );
      return;
    }

    setNewData((prev) => ({ ...prev, [name]: value } as Projects_ItemFromDB));
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
    if (!newData) return;
    if (!selectedItem) return;
    const { title, description, link, tags, order } = newData;
    if (!title || !description || !link || !tags || !order) {
      alert("Please fill out all fields.");
      return;
    }

    console.log("New data:", newData);
    console.log("tags:", tags);
    const tagsString = tags.join(", ");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("tags", tagsString);
    formData.append("order", order.toString());
    if (thumbnail) {
      formData.append("img", thumbnail);
    } else {
      formData.append("img", selectedItem.img);
    }
    console.log("New item:", formData);
    const sendProjectData = async () => {
      // Echter fetch
      setIsPending(true);
      await fetch(`${BE_HOST}/${URL_P_P}/${selectedItem._id}`, {
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
          setSelectedItem(null);
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

  // DELETE PROJECT ITEM //
  const deleteSelectedItem = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!selectedItem) return;
    // Echter fetch
    setIsPending(true);
    await fetch(`${BE_HOST}/${URL_P_P}/${selectedItem._id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setSelectedItem(null);
          setIsPending(false);
          onSubmit();
        }
      })
      .catch((error) => {
        setIsPending(false);
        console.error("Error:", error);
        setTimeout(() => navigate("/*"), 2000);
      });

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
    const { title, description, link, tags, order } = newItem;
    if (!title || !description || !link || !tags || !order) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("tags", tags);
    formData.append("order", order.toString());
    if (thumbnailNewCard) formData.append("img", thumbnailNewCard);
    console.log("New item:", formData);
    const sendProjectData = async () => {
      // Echter fetch
      setIsPending(true);
      await fetch(`${BE_HOST}/${URL_P_P}`, {
        credentials: "include",
        method: "POST",
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
              <div
                key={item.title}
                className={`project-item ${
                  selectedItem?.title === item.title ? "highlighted" : ""
                }`}
                onClick={() => setSelectedItem(item)}
                title={item.title}
              >
                <span>{item.title}</span>
              </div>
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
                    value={newData?.tags.join(", ") || selectedItem.tags}
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

export default EditProjectsModal;
