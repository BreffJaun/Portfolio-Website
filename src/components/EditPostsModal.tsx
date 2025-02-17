// I M P O R T:   F I L E S
import "../styles/editPostsModal.scss";

// I M P O R T:  T Y P E S
import {
  PostCardProps,
  NewPostCardProps,
  Project_Item,
  Projects_Content,
} from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import { BE_HOST, URL_F, URL_F_CP, URL_F_EP } from "../api/host";
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
  // onSubmit,
  isModalOpen,
}) => {
  const navigate = useNavigate();
  const [theme] = useContext(ThemeContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [user] = useContext(UserContext);
  const [isPending, setIsPending] = useContext(PendingContext);
  const [modalData, setModalData] = useState<PostCardProps>({
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
  });
  const [error, setError] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [activeEmojiField, setActiveEmojiField] = useState<string | null>(null);

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

  // ================================ //
  // export const URL_F_CP = "content/feed/post"; // Create Post
  // export const URL_F_EP = "content/feed/post/"; // Edit Post
  // export const URL_F_DP = "content/feed/post/"; // Delete Post

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

  const handleCardFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    // console.log("HALLO", newPost);

    if (articleLink && !isValidLink(articleLink)) {
      setError("Bitte geben Sie einen gültigen Link ein!");
      return;
    }

    if (error) return;

    if (!modalData) return;

    const formData = new FormData();
    if (modalData) formData.append("data", JSON.stringify(modalData));
    if (thumbnail) formData.append("thumbnail", thumbnail);
    const sendProjectData = async () => {
      // Echter fetch
      // setIsPending(true);
      // await fetch(`${BE_HOST}/${URL_F_EP}`, {
      //   credentials: "include",
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.status === 201) {
      //       setIsPending(false);
      //       onClose();
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
      onClose();
    };
    sendProjectData();
  };

  // DELETE POST //
  const deletePost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Echter fetch
    // setIsPending(true);
    // await fetch(`${BE_HOST}/${URL_F_DP}/${content.postId}`, {
    //   credentials: "include",
    //   method: "DELETE",
    //   // body: JSON.stringify({
    //   //   postId: content.postId,
    //   // }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.status === 201) {
    //       setIsPending(false);
    //       onClose();
    //     }
    //   })
    //   .catch((error) => {
    //     setIsPending(false);
    //     console.error("Error:", error);
    //     setTimeout(() => navigate("/*"), 2000);
    //   });

    // Testing
    console.log("Data to delete:", modalData);
    onClose();
  };

  return (
    <div className={`edit-modal-content stack__modal`}>
      <CloseBtn onClick={onClose} />
      <h2>Create a post:</h2>
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
          <label htmlFor="articleImageSrc" className="thumbnail__label">
            Image (optional):
            <EditImageBtn />
          </label>
          <input
            className="edit__card"
            type="file"
            id="articleImageSrc"
            name="articleImageSrc"
            onChange={handleCardFile}
            accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
            hidden
          />
          <div
            className={
              thumbnail || content?.articleImageSrc
                ? "full__post__thumbnail__preview"
                : "empty__post__thumbnail__preview"
            }
          >
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="new post image" />
            ) : content?.articleImageSrc ? (
              <img src={content?.articleImageSrc} alt="new post image" />
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
  );
};

export default EditPostsModal;
