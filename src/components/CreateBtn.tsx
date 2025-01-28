// I M P O R T:   F I L E S
import "../styles/createBtn.scss";

// I M P O R T:   P A C K A G E S
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// I M P O R T:   F U N C T I O N S
import { CreateBtnProps } from "../types/interfaces";

// C O D E

const CreateBtn: React.FC<CreateBtnProps> = ({ onClick }) => {
  return (
    <button className="create-btn" onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
};

export default CreateBtn;
