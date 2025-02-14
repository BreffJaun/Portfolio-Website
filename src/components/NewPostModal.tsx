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
  // onSubmit,
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
  // export const URL_F_CP = "content/feed/post"; // Create Post

  // EMOJI PICKER //
  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setNewPost((prev) => ({
      ...prev,
      authorAction: prev.authorAction + emojiObject.emoji,
    }));
    setShowEmojiPicker(false);
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

    if (error) return;

    if (!newPost) return;

    const formData = new FormData();
    if (newPost) formData.append("data", JSON.stringify(newPost));
    if (thumbnail) formData.append("thumbnail", thumbnail);
    const sendProjectData = async () => {
      // Echter fetch
      // setIsPending(true);
      // await fetch(`${BE_HOST}/${URL_F_CP}`, {
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
      // onSubmit();
    };
    sendProjectData();
  };

  return (
    <div className={`edit-modal-content stack__modal`}>
      <CloseBtn onClick={onClose} />
      <h2>Create a post:</h2>
      <form onSubmit={addNewPost}>
        <div className="form-group">
          <label className="emoji__label">
            Your current mood emoji (optional):
            <button
              type="button"
              className="emoji-btn"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {/* 😀 */}
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
          {showEmojiPicker && (
            <div className="emoji-picker">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                Theme={`${theme ? "dark" : "light"}`}
                // className={`${theme ? "dark-theme" : "light-theme"}`}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Your current vibe (optional): </label>
          <input
            type="text"
            name="vibe"
            value={newPost.vibe}
            onChange={handleNewPostInfo}
          />
        </div>
        <div className="form-group">
          <label>Post title (optional): </label>
          <input
            type="text"
            name="vibe"
            value={newPost.vibe}
            onChange={handleNewPostInfo}
          />
        </div>
        <div className="form-group">
          <label>Post Content:</label>
          <textarea
            name="articleContent"
            value={newPost?.articleContent}
            onChange={handleNewPostInfo}
            maxLength={3000}
            aria-describedby="char-counter-description"
          />
        </div>
        <div className="horizontal__border"></div>
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
        <div className="form-group">
          <label>Post Link:</label>
          <input
            type="text"
            name="artcileLink"
            value={newPost?.articleLink}
            onChange={handleNewPostInfo}
          />
        </div>
        <button type="submit" className="btn btn-submit">
          Save changes
        </button>
      </form>
    </div>
  );
};

export default NewPostModal;
