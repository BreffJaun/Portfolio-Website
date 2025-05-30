// I M P O R T:   F I L E S
import "../styles/postCard.scss";

// I M P O R T:   T Y P E S
import { PostCardProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I M P O R T:   F U N C T I O N S
import { openModal, closeModal } from "../utils/utils";
import EditBtn from "../components/EditBtn";
import EditPostsModal from "../components/EditPostsModal";
import { closeSpecificModal } from "../utils/utils";

// C O D E

const PostCard: React.FC<PostCardProps> = ({
  id,
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
  // onSubmit,
}) => {
  const content = {
    postId: postId,
    avatar: avatar,
    authorId: authorId,
    authorName: authorName,
    authorAction: authorAction,
    date: date,
    vibe: vibe,
    articleTitle: articleTitle,
    articleContent: articleContent,
    articleImageSrc: articleImageSrc,
    articleLink: articleLink,
    // onSubmit: onSubmit,
  };
  const [activeModal, setActiveModal] = useState<
    "editInfo" | "editPost" | "newPost" | null
  >(null);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const maxContentLength = 300;
  const toggleExpand = () => setExpanded(!expanded);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        setTimeout(() => {
          contentRef.current!.style.maxHeight = "150px";
        }, 400);
      }
    }
  }, [expanded]);

  const handleFeedInfoUpdate = () => {
    closeSpecificModal(setActiveModal);
    window.location.reload();
  };

  return (
    <>
      {!content ? (
        <div>Loading...</div>
      ) : (
        <div
          className="post__card post-card"
          // id={id}
        >
          {/* Avatar */}
          <div className="avatar__container">
            <img src={avatar} alt={`${authorName}'s avatar`} />
          </div>
          {/* Content */}
          <div className="content__container">
            <div className="quick__info">
              <div className="info__top">
                <h6 className="author__action">
                  {authorName} {authorAction && <span>{authorAction}</span>}
                </h6>
                <span className="seperator_dot">•</span>
                <p className="date">{date}</p>
              </div>
              {vibe && <p className="mood__pill">{vibe}</p>}
            </div>
            <article>
              {articleTitle && <h3>{articleTitle}</h3>}
              <div
                className={`article__content ${expanded ? "expanded" : ""}`}
                ref={contentRef}
              >
                {expanded
                  ? articleContent
                  : `${articleContent.slice(0, maxContentLength)}${
                      articleContent.length > maxContentLength ? "..." : ""
                    }`}
              </div>
              {articleContent.length > maxContentLength && (
                <button className="toggle-button" onClick={toggleExpand}>
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
              {/* {articleImageSrc && <img src={articleImageSrc} alt="Article" />} */}
              {articleImageSrc && (
                <img
                  src={articleImageSrc}
                  alt="Article"
                  className="clickable-image"
                  onClick={() => setIsImageModalOpen(true)}
                />
              )}
              {articleLink && (
                <div className="article__link">
                  <a href={articleLink} target="_blank">
                    <FontAwesomeIcon icon={["fas", "link"]} />
                  </a>
                </div>
              )}
            </article>
          </div>
          <div>
            <EditBtn onClick={() => openModal(setIsModalOpen)} />
          </div>
          <div className={`edit-modal-container ${isModalOpen ? "open" : ""}`}>
            <EditPostsModal
              content={content}
              onClose={() => closeModal(setIsModalOpen)}
              isModalOpen={isModalOpen}
              onSubmit={handleFeedInfoUpdate}
            />
          </div>
          {isImageModalOpen && (
            <div
              className="image-modal"
              onClick={() => setIsImageModalOpen(false)}
            >
              <img
                src={articleImageSrc}
                alt="Full Size"
                className="image-modal-content"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostCard;
