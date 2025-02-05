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
import { BE_HOST, URL_F, URL_F_CP, URL_F_EP } from "../api/host";
import Footer from "./Footer";
import PostCard from "../components/PostCard";
import BackToTopBtn from "../components/BackToTopBtn";
import EditBtn from "../components/EditBtn";
import CreateBtn from "../components/CreateBtn";
import EditPostsModal from "../components/EditPostModal";
// import NewPostModal from "../components/NewPostModal";
import EditFeedInfoModal from "../components/EditFeedInfoModal";
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";
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
  const [isPending] = useContext(PendingContext);
  const [activeModal, setActiveModal] = useState<
    "editInfo" | "editPost" | "newPost" | null
  >(null);
  const fakeUser = {
    _id: "1",
    userName: "breffjaun",
    email: "breffjaun@test.de",
    avatar: avatarImage,
    password: "12345678",
  };
  const testPosts = [
    {
      postId: "896544",
      authorId: fakeUser._id,
      authorName: fakeUser.userName,
      avatar: avatarImage,
      // avatar: user?.avatar,
      authorAction: ``,
      date: formatCurrentDate(),
      vibe: "",
      articleTitle: "",
      articleContent: `This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like th
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with
          This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like th
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with
          This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like th
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with 
          This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like th
        This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊 This is my FIFTH post on my portfolio. I'm so excited to share my projects with
        you. I hope you like th END OF THE FUCKING TEXT
        `,
      articleImageSrc: avatarImage,
      articleLink: "",
    },
    {
      postId: "453454",
      authorId: fakeUser._id,
      authorName: fakeUser.userName,
      avatar: avatarImage,
      // avatar: user?.avatar,
      authorAction: ``,
      date: formatCurrentDate(),
      vibe: "",
      articleTitle: "",
      articleContent:
        "This is my FOURTH post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊",
      articleImageSrc: "",
      articleLink: "",
    },
    {
      postId: "866",
      authorId: fakeUser._id,
      authorName: fakeUser.userName,
      avatar: avatarImage,
      // avatar: user?.avatar,
      authorAction: `😊`,
      date: formatCurrentDate(),
      vibe: "🌴 Feelin fresh",
      articleTitle: "Welcome to my portfolio!",
      articleContent:
        "This is my THIRD post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊",
      articleImageSrc: avatarImage,
      articleLink: "",
    },
    {
      postId: "1255424",
      authorId: fakeUser._id,
      authorName: fakeUser.userName,
      avatar: avatarImage,
      // avatar: user?.avatar,
      authorAction: `${"🌴"}`,
      date: formatCurrentDate(),
      vibe: "🙌 Excited",
      articleTitle: "",
      articleContent:
        "This is my SECOND post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊",
      articleImageSrc: avatarImage,
      articleLink: "test",
    },
    {
      postId: "7542458",
      authorId: fakeUser._id,
      authorName: fakeUser.userName,
      avatar: avatarImage,
      // avatar: user?.avatar,
      authorAction: `${"🌴"}`,
      date: formatCurrentDate(),
      vibe: "🙌 Excited",
      articleTitle: "",
      articleContent:
        "This is my first post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊",
      articleImageSrc: avatarImage,
      articleLink: "",
    },
  ];
  const [content, setContent] = useState<Feed_Content>({
    feed_title_img: feed_title_img,
    feed_profile_img: feed_profile_img,
    ghLink: "https://github.com/BreffJaun",
    fullName: "Jeff Braun",
    statement: "In ❤️ with programming.",
    jobTitle: "Fullstack Web Developer",
    about: ", Assistant Teacher for Web Development and a lot more.",
    posts: testPosts,
  });

  // Echter Fetch
  useEffect(() => {
    window.scrollTo(0, 0);
    // initialContentLoad(URL_F, setContent, navigate);
  }, []);

  // Dummy-Daten
  useEffect(() => {
    setContent({ ...content, posts: testPosts });
  }, []);

  // UPDATE COMPLETE FEED
  const handleUpdate = () => {
    closeSpecificModal(setActiveModal);
    // initialContentLoad(URL_F, setContent, navigate);
  };

  // ===========================================

  // UPDATE FEED INFO
  const handleFeedInfoUpdate = (updatedContent: Feed_Content) => {
    closeSpecificModal(setActiveModal);
    const sendData = async () => {
      await fetch(`${BE_HOST}/${URL_F}`, {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(updatedContent),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            setContent(data.content);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setTimeout(() => navigate("/*"), 2000);
        });
    };
    sendData();
  };

  // CREATE NEW POST
  const handleNewPost = (newContent: PostCardProps) => {};

  return (
    <div className="feed">
      <section id="feed">
        <div className="bg__img__container">
          <img src={feed_title_img} alt="feed title image" />
          <div className="avatar__img__container">
            <img src={feed_profile_img} alt="feed profile image" />
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
                    onClick={() => openSpecificModal(setActiveModal, "newPost")}
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
            {/* <div
              className={`edit-modal-container ${
                activeModal === "newPost" ? "open" : ""
              }`}
            >
              <NewPostModal
                onClose={() => closeSpecificModal(setActiveModal)}
                onSubmit={handleNewPost}
                activeModal={activeModal}
              />
            </div> */}
            <div className="horizontal__border"></div>
          </div>
        </div>
        <div className="post__container">
          <div className="post__positioning__container">
            {/* <div className="horizontal__border"></div> */}
            {testPosts.map((post, i) => (
              <PostCard
                key={post.postId}
                authorId={post.authorId}
                authorName={post.authorName}
                avatar={post.avatar}
                authorAction={post.authorAction}
                date={post.date}
                vibe={post.vibe}
                articleTitle={post.articleTitle}
                articleContent={post.articleContent}
                articleImageSrc={post.articleImageSrc}
                articleLink={post.articleLink}
              />
            ))}
          </div>
        </div>
      </section>
      <BackToTopBtn watchElementSelector=".bg__img__container" />
      <Footer />
    </div>
  );
};

export default Feed;
