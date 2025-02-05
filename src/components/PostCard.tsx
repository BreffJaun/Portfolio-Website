// I M P O R T:   F I L E S
import "../styles/postCard.scss";

// I M P O R T:   T Y P E S
import { PostCardProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I M P O R T:   F U N C T I O N S

// C O D E

const PostCard: React.FC<PostCardProps> = ({
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
}) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const maxContentLength = 300;

  // const toggleExpand = () => setExpanded((prev) => !prev);
  const toggleExpand = () => setExpanded(!expanded);

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

  return (
    <div className="post__card">
      {/* Avatar */}
      <div className="avatar__container">
        <img src={avatar} alt={avatar} />
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
          {/* ======================================== */}
          {articleTitle && <h3>{articleTitle}</h3>}

          {/* FUNKTIONIERT ! ! !  */}
          {/* <div className={`article__content ${expanded ? "expanded" : ""}`}>
            {expanded
              ? articleContent
              : `${articleContent.slice(0, maxContentLength)}${
                  articleContent.length > maxContentLength ? "..." : ""
                }`}
          </div> */}
          <div
            className={`article__content ${expanded ? "expanded" : ""}`}
            ref={contentRef} // Referenz hinzufügen
          >
            {expanded
              ? articleContent
              : `${articleContent.slice(0, maxContentLength)}${
                  articleContent.length > maxContentLength ? "..." : ""
                }`}
          </div>

          {articleContent.length > maxContentLength && (
            <button className="toggle-button" onClick={toggleExpand}>
              {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
            </button>
          )}

          {/* ======================================== */}
          {articleImageSrc && <img src={articleImageSrc} alt="Article" />}
          {articleLink && (
            <div className="article__link">
              <a href={articleLink} target="_blank">
                <FontAwesomeIcon icon={["fas", "link"]} />
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default PostCard;
