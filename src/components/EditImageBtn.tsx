// I M P O R T:   F I L E S
import "../styles/editBtn.scss";

// I M P O R T:  T Y P E S
import { EditImageBtnProps } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I M P O R T:   F U N C T I O N S
// import { isButtonElement } from "react-router-dom/dist/dom";
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";

// C O D E
const EditImageBtn: React.FC<EditImageBtnProps> = ({ onClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [isPending, setIsPending] = useContext(PendingContext);

  return (
    <div className="description__container">
      <div className="edit__btn">
        <FontAwesomeIcon icon={["far", "image"]} />
      </div>
    </div>
  );
};

export default EditImageBtn;
