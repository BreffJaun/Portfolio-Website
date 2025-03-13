// I M P O R T:   F I L E S
import "../styles/feed.scss";
import avatarImage from "../images/breffjaun_profile_img.jpg";
import feed_profile_img from "../images/breffjaun_profile_img.jpg";
import feed_title_img from "../../src/assets/logos/breffjaun_feed_bg_anthrazit.jpeg";

// I M P O R T:  T Y P E S
import { Feed_Content, PostCardProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import {
  BE_HOST,
  URL_F,
  URL_F_GP,
  URL_F_CP,
  URL_F_EP,
  URL_F_DP,
} from "../api/host";
import Footer from "./Footer";
import PostCard from "../components/PostCard";
import BackToTopBtn from "../components/BackToTopBtn";
import EditBtn from "../components/EditBtn";
import CreateBtn from "../components/CreateBtn";
// import EditPostsModal from "../components/EditPostsModal";
import NewPostModal from "../components/NewPostModal";
import EditFeedInfoModal from "../components/EditFeedInfoModal";
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";
import UserContext from "../context/UserContext";
import {
  formatCurrentDate,
  initialContentLoad,
  openSpecificModal,
  closeSpecificModal,
} from "../utils/utils";

// C O D E
const Feed: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useContext(LoggedInContext);
  const [isPending, setIsPending] = useContext(PendingContext);
  const user = useContext(UserContext);
  const [activeModal, setActiveModal] = useState<
    "editInfo" | "editPost" | "newPost" | null
  >(null);
  const [content, setContent] = useState<Feed_Content | null>(null);
  const [posts, setPosts] = useState<PostCardProps[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    initialContentLoad(URL_F, setContent, navigate);
    initialContentLoad(URL_F_GP, setPosts, navigate);
  }, []);

  // UPDATE FEED INFO
  const handleFeedInfoUpdate = () => {
    closeSpecificModal(setActiveModal);
    window.location.reload();
  };

  return (
    <>
      {isPending || !content ? (
        <div>Loading...</div>
      ) : (
        <div className="feed">
          <section id="feed">
            <div className="bg__img__container">
              <img src={content.feed_title_img} alt="feed title image" />
              <div className="avatar__img__container">
                <img src={content.feed_profile_img} alt="feed profile image" />
              </div>
            </div>
            <div className="infobar__container">
              <div className="positioning__container">
                <a href={content.ghLink} target="_blank">
                  <button>
                    Follow{" "}
                    <FontAwesomeIcon icon={["fab", "github"]} id="gh__icon" />
                  </button>
                </a>

                <h1>{content.fullName}</h1>
                <p>{content.statement}</p>
                <p>
                  <span>{content.jobTitle}</span>
                  {content.about}
                </p>
                <div className="link__container">
                  <div className="link__button__container">
                    <a
                      href="https://www.linkedin.com/in/jeff-braun-0959091a4/"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={["fab", "linkedin-in"]}
                        className="socialmedia__icons"
                      />
                      LinkedIn
                    </a>
                    <a
                      href="https://www.xing.com/profile/Jeff_Braun2/web_profiles?expandNeffi=true"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={["fab", "xing"]}
                        className="socialmedia__icons"
                      />{" "}
                      Xing
                    </a>
                    <a className="bd__icon">
                      <FontAwesomeIcon
                        icon={["fas", "cake-candles"]}
                        className="socialmedia__icons"
                      />{" "}
                      April 24th
                    </a>
                  </div>
                  {isLoggedIn && (
                    <div className="modal__button__container">
                      <EditBtn
                        onClick={() =>
                          openSpecificModal(setActiveModal, "editInfo")
                        }
                      />
                      <CreateBtn
                        onClick={() =>
                          openSpecificModal(setActiveModal, "newPost")
                        }
                      />
                    </div>
                  )}
                </div>
                {/* MODALS */}
                {/* EDIT INFO */}
                <div
                  className={`edit-modal-container ${
                    activeModal === "editInfo" ? "open" : ""
                  }`}
                >
                  <EditFeedInfoModal
                    content={content}
                    onClose={() => closeSpecificModal(setActiveModal)}
                    onSubmit={handleFeedInfoUpdate}
                    activeModal={activeModal}
                  />
                </div>
                {/* NEW POST */}
                <div
                  className={`edit-modal-container ${
                    activeModal === "newPost" ? "open" : ""
                  }`}
                >
                  <NewPostModal
                    onClose={() => closeSpecificModal(setActiveModal)}
                    activeModal={activeModal}
                    onSubmit={handleFeedInfoUpdate}
                  />
                </div>
                <div className="horizontal__border"></div>
              </div>
            </div>
            <div className="post__container">
              <div className="post__positioning__container">
                {/* <div className="horizontal__border"></div> */}
                {posts
                  .map((post, i) => {
                    const formattedDate = new Date(
                      post.createdAt || ""
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    return (
                      <PostCard
                        key={post._id}
                        postId={post._id}
                        authorId={post.authorId}
                        authorName={post.authorName}
                        avatar={post.authorAvatar}
                        authorAction={post.authorAction}
                        date={formattedDate}
                        vibe={post.vibe}
                        articleTitle={post.articleTitle}
                        articleContent={post.articleContent}
                        articleImageSrc={post.articleImageSrc}
                        articleLink={post.articleLink}
                        // onSubmit={handleFeedInfoUpdate}
                      />
                    );
                  })
                  .reverse()}
              </div>
            </div>
          </section>
          <BackToTopBtn watchElementSelector=".bg__img__container" />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Feed;
