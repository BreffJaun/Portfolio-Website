// I M P O R T:   F I L E S
import "../styles/footer.scss";

// I M P O R T:   P A C K A G E S
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// I M P O R T:   F U N C T I O N S
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";
import { BE_HOST } from "../api/host";

// C O D E
const Footer = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [isPending, setIsPending] = useContext(PendingContext);

  const handleLoginClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleLogoutClick = async () => {
    await fetch(`${BE_HOST}/users/logout`, { credentials: "include" })
      .then((res) => res.json())
      .then((json) => {
        setIsLoggedIn(false);
        navigate("/login");
      });
  };

  return (
    <div className="footer">
      <div className="credits__container">
        <p>
          Designed & Built by{" "}
          <a href="https://github.com/BreffJaun" target="_blank">
            Jeff Braun
          </a>
        </p>
        <p>
          Inspired by{" "}
          <a href="https://brittanychiang.com" target="_blank">
            Brittany Chang
          </a>{" "}
          &{" "}
          <a href="https://markuskooche.com" target="_blank">
            Markus Koch
          </a>
          . Logo by{" "}
          <a href="https://grossesbewirken.de/" target="_blank">
            grossesbewirken
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
