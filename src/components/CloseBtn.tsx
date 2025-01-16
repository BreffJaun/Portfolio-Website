// I M P O R T:   F I L E S
import "../styles/closeBtn.scss";

// I M P O R T:   P A C K A G E S
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

// I M P O R T:   F U N C T I O N S
import { CloseBtnProps } from "../types/interfaces";

// C O D E

const CloseBtn: React.FC<CloseBtnProps> = ({ onClick }) => {
  return (
    <button className="close-btn" onClick={onClick}>
      <FontAwesomeIcon icon={faX} className="close-btn-icon" />
    </button>
  );
};

export default CloseBtn;
