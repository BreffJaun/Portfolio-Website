// I M P O R T:   F I L E S
import "../styles/feed.scss";

// I M P O R T:   P A C K A G E S
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I M P O R T:   F U N C T I O N S
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";

// C O D E
const Feed: React.FC = () => {
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
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Feed;
