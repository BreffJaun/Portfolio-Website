// I M P O R T:   F I L E S
import "../styles/postCard.scss";

// I M P O R T:   T Y P E S
import { PostCardProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I M P O R T:   F U N C T I O N S

// C O D E

const PostCard: React.FC<PostCardProps> = ({
  avatar,
  authorAction,
  date,
  mood,
  articleTitle,
  articleContent,
  articleImageSrc,
  articleLink,
}) => {
  return (
    <div className="post__card">
      <div className="avatar__container">
        <img src={avatar} alt={avatar} />
      </div>
      <div className="content__container">
        <div className="quick__info">
          <div className="info__top">
            <h6 className="author__action">{authorAction}</h6>
            <span>•</span>
            <p className="date">{date}</p>
          </div>
          <p className="mood__pill">{mood}</p>
        </div>
        <article>
          <h3>{articleTitle}</h3>
          <p>{articleContent}</p>
          <img src={articleImageSrc} alt={articleImageSrc} />
          {/* <a href="" target="_blank">
            <FontAwesomeIcon icon={["fas", "link"]} />
          </a> */}
        </article>
      </div>
    </div>
  );
};

export default PostCard;
