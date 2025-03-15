// I M P O R T:   F I L E S
import "../styles/feed.scss";
import avatarImage from "../images/breffjaun_profile_img.jpg";
import feed_profile_img from "../images/breffjaun_profile_img.jpg";
import feed_title_img from "../../src/assets/logos/breffjaun_feed_bg_anthrazit.jpeg";

// I M P O R T:  T Y P E S
import { Feed_Content, PostCardProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { throttle } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useContext, useState, useRef } from "react";
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
  loadPosts,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scrollPos, setScrollPos] = useState(0);
  const scrollHeightBeforeLoad = useRef(0);
  const [scrollAnchor, setScrollAnchor] = useState<string | null>(null);
  const postsContainerRef = useRef<HTMLDivElement>(null);

  const getFirstVisiblePostId = (): string | null => {
    const posts = postsContainerRef.current?.querySelectorAll(".post-card");
    if (!posts) return null;

    const containerTop =
      postsContainerRef.current?.getBoundingClientRect().top || 0;
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const rect = post.getBoundingClientRect();
      if (rect.top >= containerTop) {
        return post.id;
      }
    }
    return null;
  };

  // INITIAL CONTENT LOAD AND FETCH FOR THE FIRST 10 POSTS
  useEffect(() => {
    window.scrollTo(0, 0);
    initialContentLoad(URL_F, setContent, navigate);
    const loadInitialPosts = async () => {
      try {
        await loadPosts(URL_F_GP, 1, 10, setPosts, setTotalPages, setIsPending);
        window.scrollTo(0, 0); // Sicherstellen dass oben geblieben wird
      } catch (error) {
        console.error("Error loading initial posts:", error);
      }
    };

    loadInitialPosts();
  }, []);

  // FETCH FOR MORE POSTS
  useEffect(() => {
    const loadData = async () => {
      // Speichere die ID des ersten sichtbaren Posts
      const prevFirstVisiblePost = getFirstVisiblePostId();
      console.log("Prev First Visible Post:", prevFirstVisiblePost); // <-- Hier
    
      try {
        // Lade neue Posts
        const data = await loadPosts(
          URL_F_GP,
          currentPage,
          10,
          setPosts,
          setTotalPages,
          setIsPending
        );
    
        // Stelle die Scroll-Position wieder her, nachdem neue Posts geladen wurden
        if (currentPage > 1 && data.content.length > 0) {
          setTimeout(() => {
            requestAnimationFrame(() => {
              if (prevFirstVisiblePost) {
                const anchorElement = document.getElementById(prevFirstVisiblePost);
                if (anchorElement) {
                  const containerTop =
                    postsContainerRef.current?.getBoundingClientRect().top || 0;
                  const elementTop = anchorElement.getBoundingClientRect().top;
                  console.log("Container Top:", containerTop); // <-- Hier
                  console.log("Element Top:", elementTop); // <-- Hier
                  console.log(
                    "Scroll Position:",
                    window.scrollY + (elementTop - containerTop)
                  ); // <-- Hier
    
                  window.scrollTo(
                    0,
                    window.scrollY + (elementTop - containerTop)
                  );
                }
              }
            });
          }, 100); // 100ms Verzögerung
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (isPending) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const nearBottom = scrollHeight - (scrollTop + clientHeight) < 500;

      if (nearBottom && currentPage < totalPages) {
        setScrollAnchor(getFirstVisiblePostId());
        setIsPending(true);
        setCurrentPage((prev) => prev + 1);
      }
    }, 500);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPending, currentPage, totalPages]);

  // UPDATE FEED INFO
  const handleFeedInfoUpdate = () => {
    closeSpecificModal(setActiveModal);
    window.location.reload();
  };

  // TEST FOR IPHONE
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      {isPending || !content ? (
        <div className="loading-screen">Loading feed...</div>
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
                {isPending && (
                  <div className="loading-indicator visible">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Loading more posts...
                  </div>
                )}
                {posts.map((post) => {
                  const formattedDate = new Date(
                    post.createdAt || ""
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <PostCard
                      // className={`post-card ${
                      //   i >= posts.length - 10 ? "new-post" : ""
                      // }`}
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
                })}
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
