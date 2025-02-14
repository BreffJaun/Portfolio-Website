// I M P O R T:   F I L E S
import "../styles/emojiBtn.scss";

// I M P O R T:  T Y P E S
import { EditBtnProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

// I M P O R T:   F U N C T I O N S
// import { isButtonElement } from "react-router-dom/dist/dom";
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";

// C O D E
const EmojiBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [isPending, setIsPending] = useContext(PendingContext);

  return isLoggedIn ? (
    <div className="description__container">
      <div className="emoji__btn">
        <FontAwesomeIcon icon={["far", "face-smile"]} />
      </div>
    </div>
  ) : null;
};

export default EmojiBtn;
