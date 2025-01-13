// I M P O R T:   F I L E S
import "../styles/forgottpassword.scss";

// I M P O R T:   T Y P E S

// I M P O R T:   P A C K A G E S
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

// I M P O R T:   F U N C T I O N S

// C O D E
const ForgottPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const INITIAL = {
    email: "",
  };
  const [email, setEmail] = useState(INITIAL);

  // const handleInput = (event) => {
  //   setEmail({ ...email, email: event.target.value });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const sendData = async () => {
  //     await fetch(`${host}/users/forgottpassword`, {
  //       credentials: "include",
  //       method: "POST",
  //       body: JSON.stringify(email),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     })
  //       .then((json) => json.json())
  //       .then((data) => {
  //         if (data.error) {
  //           setError("Kein Account mit dieser E-Mail gefunden");
  //           setTimeout(() => setError(""), 8000);
  //           return;
  //         }
  //         if (data.message) {
  //           navigate("/");
  //         }
  //       });
  //   };
  //   sendData();
  // setError("Kein Account mit dieser E-Mail gefunden");
  // setTimeout(() => setError(""), 8000);
  // };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2 className="form-title">Setze dein Passwort zurück</h2>

        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <div className="form-field">
            <input
              type="email"
              name="email"
              placeholder="Gib deine E-Mail-Adresse ein"
              required
              className="form-input"
              // onChange={handleInput}
            />
          </div>
          {/* Fehlermeldung für E-Mailabgleich */}
          {error && <p className="error-message">{error}</p>}
          <div className="form-button-container">
            <button type="submit" className="form-button">
              Reset E-Mail senden
            </button>
          </div>
          <div className="form-link">
            <p>
              Du erinnerst dich an dein Passwort?{" "}
              <span>
                <NavLink to="/login">Zurück zum Login</NavLink>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgottPassword;
