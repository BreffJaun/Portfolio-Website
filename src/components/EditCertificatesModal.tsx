// I M P O R T:   F I L E S
import "../styles/editStackModal.scss";

// I M P O R T:  T Y P E S
import {
  EditCertificatesModalProps,
  Certificates_Content,
  CertificateItem,
} from "../types/interfaces";
import { CertificateCategory, CertificateItemDraft } from "../types/types";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_C_D, URL_C_C } from "../api/host";
import PendingContext from "../context/PendingContext";
import CloseBtn from "./CloseBtn";
import EditImageBtn from "./EditImageBtn";

const DEFAULT_CATEGORY: CertificateCategory = "web-development";

// C O D E
const EditCertificatesModal: React.FC<EditCertificatesModalProps> = ({
  content,
  onClose,
  onSubmit,
  isModalOpen,
}) => {
  const [isPending, setIsPending] = useContext(PendingContext);

  const [modalData, setModalData] = useState<Certificates_Content>(content);
  const [selectedItem, setSelectedItem] = useState<CertificateItem | null>(
    null
  );

  const [editDraft, setEditDraft] = useState<CertificateItemDraft | null>(null);
  const [newItem, setNewItem] = useState<CertificateItemDraft>({
    title: "",
    category: DEFAULT_CATEGORY,
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);
  const [newThumbnailUrl, setNewThumbnailUrl] = useState<string>("");

  useEffect(() => {
    document.documentElement.classList.toggle("modal-open", isModalOpen);
    return () => document.documentElement.classList.remove("modal-open");
  }, [isModalOpen]);

  // ---------------- CERTIFICATE INFO ----------------
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${BE_HOST}/${URL_C_D}`, {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headline: modalData.headline,
        description: modalData.description,
      }),
    });
    onSubmit();
  };

  // -------- EDIT EXISTING --------
  const submitChangedItem = async () => {
    if (!selectedItem) return;

    const data: CertificateItem = {
      ...selectedItem,
      ...editDraft,
    };
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);

    if (data.order !== undefined) {
      formData.append("order", data.order.toString());
    }

    if (thumbnail) {
      formData.append("img", thumbnail);
    } else {
      formData.append("img", selectedItem.img);
    }

    setIsPending(true);
    await fetch(`${BE_HOST}/${URL_C_C}/${selectedItem._id}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });
    setIsPending(false);
    onSubmit();
  };

  // -------- CREATE NEW --------
  const addNewItem = async () => {
    if (
      !newItem.title ||
      newItem.order === undefined ||
      !newItem.category ||
      !newThumbnail
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("title", newItem.title);
    formData.append("category", newItem.category);
    formData.append("order", newItem.order.toString());
    formData.append("img", newThumbnail);

    setIsPending(true);
    await fetch(`${BE_HOST}/${URL_C_C}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    setIsPending(false);
    onSubmit();
  };

  return (
    <div className="edit-modal-content stack__modal">
      <CloseBtn onClick={onClose} />

      <h2>Edit Certificates</h2>

      {/* PAGE INFO */}
      <form onSubmit={handleInfoSubmit}>
        <div className="form-group">
          <input
            name="headline"
            value={modalData.headline}
            onChange={handleInfoChange}
          />
          <input
            name="description"
            value={modalData.description}
            onChange={handleInfoChange}
          />
        </div>
        <button className="btn-submit">Save changes</button>
      </form>

      <hr />

      {/* Current Certificates List */}
      <div className="stack-list">
        <h2>Current Certificates List</h2>
        <div className="stack-items">
          {modalData.certificates
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <div
                key={item._id}
                className={`stack-item ${
                  selectedItem?._id === item._id ? "highlighted" : ""
                }`}
                onClick={() => {
                  setSelectedItem(item);
                  setEditDraft(null);
                  setThumbnail(null);
                  setThumbnailUrl("");
                }}
              >
                <img src={item.img} alt={item.title} />
                <span>{item.title}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="modal-body">
        {/* EDIT */}
        <div className="edit-section">
          <h3>Edit Selected Card</h3>

          {selectedItem ? (
            <div className="edit__or__delete__card">
              <div className="form-group">
                <label>Title:</label>
                <input
                  value={editDraft?.title ?? selectedItem.title}
                  onChange={(e) =>
                    setEditDraft((prev) => ({
                      ...(prev ?? selectedItem),
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label className="thumbnail__label" htmlFor="editCertImage">
                  Image: <EditImageBtn />
                </label>

                <input
                  id="editCertImage"
                  type="file"
                  hidden
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setThumbnail(file);
                    setThumbnailUrl(URL.createObjectURL(file));
                  }}
                />

                <div className="thumbnail__preview">
                  <img
                    src={thumbnailUrl || selectedItem.img}
                    alt={thumbnail ? thumbnail.name : selectedItem.title}
                  />
                </div>
              </div>

              <div className="form-group category-select">
                <label>Category:</label>
                <select
                  value={editDraft?.category ?? selectedItem.category}
                  onChange={(e) =>
                    setEditDraft((prev) => ({
                      ...(prev ?? selectedItem),
                      category: e.target.value as CertificateCategory,
                    }))
                  }
                >
                  <option value="hard-skills">Hard Skills</option>
                  <option value="soft-skills">Soft Skills</option>
                  <option value="courses">Courses</option>
                  <option value="events">Events</option>
                </select>
              </div>

              <div className="form-group">
                <label>Order:</label>
                <input
                  type="text"
                  name="order"
                  value={editDraft?.order ?? selectedItem.order}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    const duplicate = modalData.certificates.find(
                      (c) =>
                        c.order === value &&
                        c._id !== selectedItem._id &&
                        c.category ===
                          (editDraft?.category ?? selectedItem.category)
                    );

                    if (duplicate) {
                      alert(`Order ${value} already exists in this category.`);
                      return;
                    }

                    setEditDraft((prev) => ({
                      ...(prev ?? selectedItem),
                      order: value,
                    }));
                  }}
                />
              </div>

              <div className="btn__group">
                <button
                  onClick={submitChangedItem}
                  className="btn-submit"
                  disabled={!editDraft && !thumbnail}
                >
                  Save Card
                </button>

                <button
                  onClick={async () => {
                    setIsPending(true);
                    await fetch(`${BE_HOST}/${URL_C_C}/${selectedItem._id}`, {
                      method: "DELETE",
                      credentials: "include",
                    });
                    setIsPending(false);
                    onSubmit();
                  }}
                  className="btn-delete"
                >
                  Delete Card
                </button>
              </div>
            </div>
          ) : (
            <p>Select a certificate to edit.</p>
          )}
        </div>

        {/* ADD */}
        <div className="add-section">
          <h3>Add Certificate</h3>

          <div className="edit__or__delete__card">
            <div className="form-group">
              <label>Title:</label>
              <input
                value={newItem.title}
                onChange={(e) =>
                  setNewItem((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="/"
              />
            </div>

            <div className="form-group">
              <label className="thumbnail__label" htmlFor="newCertImage">
                Image: <EditImageBtn />
              </label>

              <input
                id="newCertImage"
                type="file"
                hidden
                accept=".png,.jpg,.jpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setNewThumbnail(file);
                  setNewThumbnailUrl(URL.createObjectURL(file));
                }}
              />

              <div className="thumbnail__preview">
                {newThumbnailUrl && (
                  <img
                    src={newThumbnailUrl}
                    alt={newThumbnail?.name || "Preview"}
                  />
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem((p) => ({
                    ...p,
                    category: e.target.value as CertificateCategory,
                  }))
                }
              >
                <option value="hard-skills">Hard Skills</option>
                <option value="soft-skills">Soft Skills</option>
                <option value="courses">Courses</option>
                <option value="events">Events</option>
              </select>
            </div>

            <div className="form-group">
              <label>Order:</label>
              <input
                type="text"
                value={newItem.order ?? ""}
                placeholder={(modalData.certificates.length + 1).toString()}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  const duplicate = modalData.certificates.find(
                    (c) => c.order === value && c.category === newItem.category
                  );

                  if (duplicate) {
                    alert(`Order ${value} already exists in this category.`);
                    return;
                  }

                  setNewItem((p) => ({ ...p, order: value }));
                }}
              />
            </div>

            <div className="btn__group__single">
              <button
                onClick={addNewItem}
                className="btn-add"
                disabled={
                  !newItem.title ||
                  newItem.order === undefined ||
                  !newItem.category ||
                  !newThumbnail
                }
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCertificatesModal;
