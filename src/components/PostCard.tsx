// I M P O R T:   F I L E S
import "../styles/postCard.scss";

// I M P O R T:   T Y P E S
import { PostCardProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I M P O R T:   F U N C T I O N S

// C O D E

const PostCard: React.FC<PostCardProps> = () => {
  return (
    <div className="post__card">
      <div className="image_container"></div>
      <div className="content__container">
        <div className="quick__info">
          <h6 className="author__action"></h6>
          <p className="date"></p>
          <p className="mood"></p>
        </div>
        <article>
          <h3></h3>
          <p></p>
          <img src="" alt="" />
          <a href="" target="_blank">
            <FontAwesomeIcon icon={["fas", "link"]} />
          </a>
        </article>
      </div>
    </div>
  );
};

export default PostCard;
