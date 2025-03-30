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
const NewPostModal: React.FC<NewPostCardProps> = ({
  onClose,
  onSubmit,
  activeModal,
}) => {
  const navigate = useNavigate();
  const [theme] = useContext(ThemeContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [user] = useContext(UserContext);
  const [isPending, setIsPending] = useContext(PendingContext);
  const [newPost, setNewPost] = useState<PostCardProps>({
    authorAction: "",
    vibe: "",
    articleTitle: "",
    articleContent: "",
    articleImageSrc: "",
    articleLink: "",
    authorId: "",
    authorName: "",
    avatar: "",
    date: "",
    postId: "",
  });
  const [error, setError] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [activeEmojiField, setActiveEmojiField] = useState<string | null>(null);

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

  // EMOJI PICKER //
  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    if (activeEmojiField) {
      setNewPost((prev) => ({
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

  const addNewPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      authorAction,
      vibe,
      articleTitle,
      articleContent,
      articleImageSrc,
      articleLink,
    } = newPost;

    if (articleLink && !isValidLink(articleLink)) {
      setError("Bitte geben Sie einen gültigen Link ein!");
      return;
    }

    if (error) return;

    if (!newPost || !user) return;

    const formData = new FormData();
    formData.append("authorId", user._id);
    formData.append("authorName", user.userName);
    formData.append("authorAvatar", user.avatar);
    formData.append("authorAction", authorAction || "");
    formData.append("vibe", vibe || "");
    formData.append("articleTitle", articleTitle || "");
    formData.append("articleContent", articleContent);
    formData.append("articleLink", articleLink || "");
    if (thumbnail) {
      formData.append("articleImageSrc", thumbnail);
    } else {
      formData.append("articleImageSrc", "");
    }

    const sendProjectData = async () => {
      setIsPending(true);
      await fetch(`${BE_HOST}/${URL_F_CP}`, {
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
      <h2>Create a post:</h2>
      <form onSubmit={addNewPost}>
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
              value={newPost.authorAction}
              onChange={handleNewPostInfo}
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
            value={newPost.vibe}
            onChange={handleNewPostInfo}
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
            value={newPost.articleTitle}
            onChange={handleNewPostInfo}
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
            value={newPost?.articleContent}
            onChange={handleNewPostInfo}
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
          <label htmlFor="articleImageSrcNew" className="thumbnail__label">
            Image (optional):
            <EditImageBtn />
          </label>
          <input
            className="edit__card"
            type="file"
            id="articleImageSrcNew"
            name="articleImageSrc"
            onChange={handleNewCardFile}
            accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
            hidden
          />
          <div
            className={
              thumbnail
                ? "full__post__thumbnail__preview"
                : "empty__post__thumbnail__preview"
            }
          >
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="new post image" />
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
            value={newPost?.articleLink}
            onChange={handleNewPostInfo}
          />
        </div>
        {/* Fehlermeldungs Nachricht */}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-submit">
          Save changes
        </button>
      </form>
    </div>
  );
};

export default NewPostModal;
