// I M P O R T:   F I L E S
import "../styles/editStackModal.scss";

// I M P O R T:  T Y P E S
import {
  EditStackModalProps,
  StackItem,
  Stack_Content,
} from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_ST_D, URL_ST_T } from "../api/host";
import { getImageDimensions } from "../utils/utils";
import PendingContext from "../context/PendingContext";
import CloseBtn from "./CloseBtn";
import EditImageBtn from "./EditImageBtn";

// C O D E
const EditStackModal: React.FC<EditStackModalProps> = ({
  content,
  onClose,
  onSubmit,
  isModalOpen,
}) => {
  const navigate = useNavigate();
  const saveCardButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isPending, setIsPending] = useContext(PendingContext);
  const [modalData, setModalData] = useState<Stack_Content>(content);
  const [selectedItem, setSelectedItem] = useState<StackItem | null>(null);
  const [newData, setNewData] = useState<StackItem | null>(null);
  const [newItem, setNewItem] = useState<StackItem>({ name: "", img: "" });
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailDimensions, setThumbnailDimensions] = useState({
    width: "",
    height: "",
  });
  const [thumbnailNewCard, setThumbnailNewCard] = useState<File | undefined>(
    undefined
  );
  const [thumbnailUrlNewCard, setThumbnailUrlNewCard] = useState("");
  const [thumbnailDimensionsNewCard, setThumbnailDimensionsNewCard] = useState({
    width: "",
    height: "",
  });

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

  // useEffect(() => {
  //   console.log(selectedItem);
  // }, [selectedItem]);

  // ** UPDATE STACK ** //
  // UPDATE STACK INFO //
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sendData = async () => {
      await fetch(`${BE_HOST}/${URL_ST_D}`, {
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

  // UPDATE STACK ITEM //
  // TEXT INPUT
  const handleSelectedNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

      // Get images scales and set them
      try {
        const dimensions = await getImageDimensions(file);
        setThumbnailDimensions(dimensions);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // SAVE BOOTH => FETCH
  const submitChangedItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedItem) return;

    const formData = new FormData();
    if (newData) {
      const { name, img } = newData;
      if (name) formData.append("name", name);
      if (img) formData.append("img", img);
    } else {
      const { name, img } = selectedItem;
      if (name) formData.append("name", name);
      if (img) formData.append("img", img);
    }

    if (thumbnail) formData.append("img", thumbnail);
    const sendProjectData = async () => {
      // Echter fetch
      setIsPending(true);
      await fetch(`${BE_HOST}/${URL_ST_T}/${selectedItem._id}`, {
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

  // DELETE STACK ITEM //
  const deleteSelectedItem = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!selectedItem) return;
    // Echter fetch
    setIsPending(true);
    await fetch(`${BE_HOST}/${URL_ST_T}/${selectedItem._id}`, {
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

    onSubmit();
    console.log("Data to delete:", selectedItem);
    setSelectedItem(null);
  };

  // ================================ //

  // ADD NEW ITEM //
  const handleNewCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

      // Get images scales and set them
      try {
        const dimensions = await getImageDimensions(file);
        setThumbnailDimensionsNewCard(dimensions);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addNewItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!newItem.name || !thumbnailNewCard) {
      alert("Bitte geben Sie einen Namen ein und laden Sie ein Bild hoch!");
      return;
    }
    const { name } = newItem;

    const formData = new FormData();
    if (name) formData.append("name", name);
    if (thumbnailNewCard) formData.append("img", thumbnailNewCard);
    setIsPending(true);
    const sendProjectData = async () => {
      await fetch(`${BE_HOST}/${URL_ST_T}`, {
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
    <>
      {isPending || !content ? (
        <div>Loading...</div>
      ) : (
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
          {/* Current Stack List */}
          <div className="stack-list">
            <h2>Current Stack List:</h2>
            <div className="stack-items">
              {modalData.stack.map((item) => (
                <div
                  key={item._id}
                  className={`stack-item ${
                    selectedItem?._id === item._id ? "highlighted" : ""
                  }`}
                  onClick={() => setSelectedItem(item)}
                  title={item.name}
                >
                  <img src={item.img} alt={item.name} />
                  <span>{item.name}</span>
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
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={newData?.name || selectedItem.name}
                      onChange={handleSelectedNameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="stackThumbnail"
                      className="thumbnail__label"
                    >
                      Image:
                      <EditImageBtn />
                    </label>
                    <input
                      className="edit__card"
                      type="file"
                      id="stackThumbnail"
                      name="img"
                      onChange={handleSelectedFileChange}
                      accept=".png, .gif, .svg"
                      hidden
                    />
                    <div className="thumbnail__preview">
                      <img
                        src={thumbnailUrl || selectedItem.img}
                        alt={thumbnail ? thumbnail.name : selectedItem.name}
                        width={
                          thumbnailDimensions.width || selectedItem.scaledWidth
                        }
                        height={
                          thumbnailDimensions.height ||
                          selectedItem.scaledHeight
                        }
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
                      Save Card
                    </button>
                    <button onClick={deleteSelectedItem} className="btn-delete">
                      Delete Card
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
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newItem?.name}
                    placeholder="/"
                    onChange={handleNewCardName}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="stackThumbnailNewCard"
                    className="thumbnail__label"
                  >
                    Image:
                    <EditImageBtn />
                  </label>
                  <input
                    className="edit__card"
                    type="file"
                    id="stackThumbnailNewCard"
                    name="stackThumbnailNewCard"
                    onChange={handleNewCardFile}
                    accept=".png, .gif, .svg"
                    hidden
                  />
                  <div className="thumbnail__preview">
                    <img
                      src={thumbnailUrlNewCard}
                      alt={thumbnailNewCard?.name}
                      width={thumbnailDimensionsNewCard.width}
                      height={thumbnailDimensionsNewCard.height}
                    />
                  </div>
                </div>
                <div className="btn__group__single">
                  <button
                    onClick={addNewItem}
                    className="btn-add"
                    disabled={!(newItem && thumbnailNewCard)}
                  >
                    Add Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStackModal;
