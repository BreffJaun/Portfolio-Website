// I M P O R T:   F I L E S
import "../styles/backToTopBtn.scss";

// I M P O R T:  T Y P E S
import { BackToTopBtnProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I M P O R T:   F U N C T I O N S

// C O D E

const BackToTopBtn = ({ watchElementSelector }: BackToTopBtnProps) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    const watchElement = document.querySelector(watchElementSelector);
    if (watchElement) {
      const { bottom } = watchElement.getBoundingClientRect();
      setShowScroll(bottom < 0);
    } else {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    checkScrollTop();
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [watchElementSelector]);

  return (
    showScroll && (
      <div className="back__to__top" onClick={scrollTop}>
        <FontAwesomeIcon
          icon={["fas", "arrow-up"]}
          className="socialmedia__icons"
        />
      </div>
    )
  );
};

export default BackToTopBtn;
