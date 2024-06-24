// I M P O R T:   F I L E S
import "../styles/feed.scss";
import avatarImage from "../images/breffjaun_profile_img.jpg";

// I M P O R T:   P A C K A G E S
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

// I M P O R T:   F U N C T I O N S
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import BackToTopBtn from "../components/BackToTopBtn";
import { formatCurrentDate } from "../utils/utils";

const testPosts = [
  {
    avatar: avatarImage,
    authorAction: `${"breffjaun"}`,
    date: formatCurrentDate(),
    mood: "🌴 Feelin fresh",
    articleTitle: "Welcome to my portfolio!",
    articleContent:
      "This is my first post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊",
    articleImageSrc: avatarImage,
    articleLink: "",
  },
  {
    avatar: avatarImage,
    authorAction: `${"breffjaun"}`,
    date: formatCurrentDate(),
    mood: "🙌 Excited",
    articleTitle: "",
    articleContent:
      "This is my first post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊",
    articleImageSrc: avatarImage,
    articleLink: "",
  },
  {
    avatar: avatarImage,
    authorAction: `${"breffjaun"}`,
    date: formatCurrentDate(),
    mood: "🙌 Excited",
    articleTitle: "",
    articleContent:
      "This is my first post on my portfolio. I'm so excited to share my projects with you. I hope you like them! 😊",
    articleImageSrc: avatarImage,
    articleLink: "",
  },
];
// console.log(testPosts[0]);

// C O D E
const Feed: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="feed">
      <section id="feed">
        <div className="bg__img__container">
          <div className="avatar__img__container"></div>
        </div>
        <div className="infobar__container">
          <div className="positioning__container">
            <a href="https://github.com/BreffJaun" target="_blank">
              <button>
                Follow{" "}
                <FontAwesomeIcon icon={["fab", "github"]} id="gh__icon" />
              </button>
            </a>

            <h1>Jeff Braun</h1>
            <p>In &nbsp;❤️ &nbsp;with programming.</p>
            <p>
              <span>Fullstack Web Developer</span>, Assistant Teacher for Web
              Development and a lot more.
            </p>
            <div className="link__container">
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
          </div>
        </div>
        <div className="post__container">
          <div className="horizontal__border"></div>
          {testPosts.map((post, i) => (
            <PostCard
              key={i}
              avatar={post.avatar}
              authorAction={post.authorAction}
              date={post.date}
              mood={post.mood}
              articleTitle={post.articleTitle}
              articleContent={post.articleContent}
              articleImageSrc={post.articleImageSrc}
              articleLink={post.articleLink}
            />
          ))}
        </div>
      </section>
      <BackToTopBtn watchElementSelector=".bg__img__container" />
      <Footer />
    </div>
  );
};

export default Feed;
