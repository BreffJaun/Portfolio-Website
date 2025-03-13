// I M P O R T:   F I L E S
import "../styles/editPostsModal.scss";
import "../styles/deleteImgBtn.scss";

// I M P O R T:  T Y P E S
import {
  PostCardProps,
  NewPostCardProps,
  Project_Item,
  Projects_Content,
} from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext, useRef, useReducer } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_F, URL_F_CP, URL_F_EP, URL_F_DP } from "../api/host";
import { isValidLink } from "../utils/utils";
import ThemeContext from "../context/ThemeContext";
import UserContext from "../context/UserContext";
import PendingContext from "../context/PendingContext";
import CloseBtn from "./CloseBtn";
import EditImageBtn from "./EditImageBtn";
import EmojiBtn from "./EmojiBtn";

// C O D E
const EditPostsModal: React.FC<NewPostCardProps> = ({
  content,
  onClose,
  onSubmit,
  isModalOpen,
}) => {
  const navigate = useNavigate();
  const [theme] = useContext(ThemeContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [user] = useContext(UserContext);
  const [isPending, setIsPending] = useContext(PendingContext);
  const [modalData, setModalData] = useState<PostCardProps>(
    content || {
      postId: "",
      avatar: "",
      authorId: "",
      authorName: "",
      authorAction: "",
      date: "",
      vibe: "",
      articleTitle: "",
      articleContent: "",
      articleImageSrc: "",
      articleLink: "",
    }
  );
  const [error, setError] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [activeEmojiField, setActiveEmojiField] = useState<string | null>(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    setModalData(content!);
    if (isModalOpen) {
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, [isModalOpen]);

  // EMOJI PICKER //
  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    if (activeEmojiField) {
      setModalData((prev) => ({
        ...prev,
        [activeEmojiField]: prev[activeEmojiField] + emojiObject.emoji,
      }));
    }
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = (field: string) => {
    setActiveEmojiField(field);
    setShowEmojiPicker((prev) => !prev);
  };

  // UPDATE POST //
  const handlePostInfo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  // IMAGE FILE //
  const handleCardFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Clean up
    setThumbnail(undefined);
    setThumbnailUrl("");

    // Get file
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailUrl(URL.createObjectURL(file));
      setForceUpdate((prev) => !prev);
    }
  };

  const addPostChanges = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const {
      postId,
      avatar,
      authorId,
      authorName,
      authorAction,
      date,
      vibe,
      articleTitle,
      articleContent,
      articleImageSrc,
      articleLink,
    } = modalData;

    if (articleLink && !isValidLink(articleLink)) {
      setError("Bitte geben Sie einen gültigen Link ein!");
      return;
    }

    if (error) return;

    if (!modalData || !user) return;

    const formData = new FormData();
    if (authorId) formData.append("authorId", authorId);
    if (authorName) formData.append("authorName", authorName);
    if (avatar) formData.append("authorAvatar", avatar);
    if (authorAction) formData.append("authorAction", authorAction);
    if (vibe) formData.append("vibe", vibe);
    if (articleTitle) formData.append("articleTitle", articleTitle);
    if (articleContent) formData.append("articleContent", articleContent);
    if (articleLink) formData.append("articleLink", articleLink);
    if (thumbnail) {
      formData.append("articleImageSrc", thumbnail);
    } else if (articleImageSrc) {
      formData.append("articleImageSrc", articleImageSrc);
    } else {
      formData.append("articleImageSrc", "");
    }

    // console.log("thumbnail:", thumbnail);
    // console.log("thumbnailUrl:", thumbnailUrl);
    // console.log("articleImageSrc:", articleImageSrc);

    const sendProjectData = async () => {
      setIsPending(true);
      await fetch(`${BE_HOST}/${URL_F_EP}/${postId}`, {
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

  // DELETE POST //
  const deletePost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!content) return;
    setIsPending(true);
    await fetch(`${BE_HOST}/${URL_F_DP}/${content.postId}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        setIsPending(false);
        if (!res.ok) {
          throw new Error(`Fehler: ${res.status} ${res.statusText}`);
        }
        return res.status === 204 ? null : res.json();
      })
      .then((data) => {
        onSubmit();
      })
      .catch((error) => {
        setIsPending(false);
        console.error("Error:", error);
        setTimeout(() => navigate("/*"), 2000);
      });
  };

  const deletePostImage = async () => {
    if (modalData?.articleImageSrc) {
      setModalData((prev) => ({ ...prev, articleImageSrc: "" }));
    }
    if (thumbnail) {
      setThumbnail(undefined);
    }
    if (thumbnailUrl) {
      setThumbnailUrl("");
    }
    setForceUpdate((prev) => !prev);
    console.log("IMAGE DELETED");
  };

  return (
    <>
      {isPending || !modalData ? (
        <div>Loading...</div>
      ) : (
        <div className={`edit-modal-content stack__modal`}>
          <CloseBtn onClick={onClose} />
          <h2>Edit your post:</h2>
          <form>
            {/* AUTHORACTION */}
            <div className="form-group">
              <label className="emoji__label ">
                Your current mood emoji (optional):
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => toggleEmojiPicker("authorAction")}
                >
                  <EmojiBtn />
                </button>
              </label>
              <div className="emoji-container">
                <input
                  type="text"
                  name="authorAction"
                  value={modalData.authorAction}
                  onChange={handlePostInfo}
                />
              </div>
              {showEmojiPicker && activeEmojiField === "authorAction" && (
                <div className="emoji-picker authorAction__label">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={theme ? Theme.DARK : Theme.LIGHT}
                  />
                </div>
              )}
            </div>
            {/* VIBE */}
            <div className="form-group">
              <label className="emoji__label">
                Your current vibe (optional):
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => toggleEmojiPicker("vibe")}
                >
                  <EmojiBtn />
                </button>
              </label>
              <input
                type="text"
                name="vibe"
                value={modalData.vibe}
                onChange={handlePostInfo}
              />
              {showEmojiPicker && activeEmojiField === "vibe" && (
                <div className="emoji-picker vibe__label">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={theme ? Theme.DARK : Theme.LIGHT}
                  />
                </div>
              )}
            </div>
            {/* Article Title */}
            <div className="form-group">
              <label className="emoji__label">
                Post title (optional):
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => toggleEmojiPicker("articleTitle")}
                >
                  <EmojiBtn />
                </button>
              </label>
              <input
                type="text"
                name="articleTitle"
                value={modalData.articleTitle}
                onChange={handlePostInfo}
              />
              {showEmojiPicker && activeEmojiField === "articleTitle" && (
                <div className="emoji-picker articleTitle__label">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={theme ? Theme.DARK : Theme.LIGHT}
                  />
                </div>
              )}
            </div>
            {/* Article Content */}
            <div className="form-group">
              <label className="emoji__label">
                Post Content:
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => toggleEmojiPicker("articleContent")}
                >
                  <EmojiBtn />
                </button>
              </label>

              <textarea
                name="articleContent"
                value={modalData?.articleContent}
                onChange={handlePostInfo}
                maxLength={3000}
                aria-describedby="char-counter-description"
              />
              {showEmojiPicker && activeEmojiField === "articleContent" && (
                <div className="emoji-picker articleContent__label">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={theme ? Theme.DARK : Theme.LIGHT}
                  />
                </div>
              )}
            </div>
            <div className="horizontal__border"></div>
            {/* Article Image */}
            <div className="form-group thumbnail__group">
              <div className="label__group">
                <label
                  htmlFor="articleImageSrcEdit"
                  className="thumbnail__label"
                >
                  Image (optional):
                  <EditImageBtn />
                </label>
                <label>
                  <div className="description__container">
                    <button
                      className={`delete__img__btn ${
                        !modalData?.articleImageSrc && !thumbnailUrl
                          ? "disabled"
                          : ""
                      }`}
                      onClick={deletePostImage}
                      disabled={!modalData?.articleImageSrc && !thumbnailUrl}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </label>
              </div>
              <input
                className="edit__card"
                type="file"
                id="articleImageSrcEdit"
                name="articleImageSrc"
                onChange={handleCardFile}
                accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
                hidden
              />

              <div
                className={
                  thumbnail || modalData.articleImageSrc
                    ? "full__post__thumbnail__preview"
                    : "empty__post__thumbnail__preview"
                }
              >
                {thumbnailUrl ? (
                  <img src={thumbnailUrl} alt="new post image" />
                ) : modalData?.articleImageSrc ? (
                  <img src={modalData?.articleImageSrc} alt="new post image" />
                ) : (
                  <span>No image selected</span>
                )}
              </div>
            </div>
            <div className="horizontal__border"></div>
            {/* Article Link */}
            <div className="form-group">
              <label>Post Link:</label>
              <input
                type="text"
                name="articleLink"
                value={modalData?.articleLink}
                onChange={handlePostInfo}
              />
            </div>
          </form>
          {/* Fehlermeldungs Nachricht */}
          {error && <p className="error-message">{error}</p>}
          <div className="btn__group">
            <button
              onClick={addPostChanges}
              className="btn-submit"
              disabled={!(modalData !== content || thumbnail)}
            >
              Save Changes
            </button>
            <button onClick={deletePost} className="btn-delete">
              Delete Post
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPostsModal;
