// I M P O R T:   F I L E S
import "../styles/setNewPassword.scss";

// I M P O R T:   P A C K A G E S
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// I M P O R T:   F U N C T I O N S
import { BE_HOST } from "../api/host";

// C O D E
const SetNewPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const INITIAL = {
    password: "",
    confirmPassword: "",
  };
  const [newData, setNewData] = useState(INITIAL);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewData({ ...newData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newData.password !== newData.confirmPassword) {
      setError("Passwörter stimmen nicht überein");
      setTimeout(() => setError(""), 8000);
      return;
    }
    const sendData = async () => {
      await fetch(`${BE_HOST}/users/forgottpassword`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newData.password),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then(() => {
          setTimeout(() => navigate("/"), 4000);
        })
        .catch((err) => {
          setError(err.message || "Ein unerwarteter Fehler ist aufgetreten");
          setTimeout(() => setError(""), 4000);
          console.error(err); // Für Debugging-Zwecke
        });
    };

    sendData();
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2 className="form-title">Neues Passwort setzen</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              type="password"
              name="password"
              placeholder="Neues Passwort"
              required
              className="form-input"
              onChange={handleInput}
            />
          </div>
          <div className="form-field">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Passwort bestätigen"
              required
              className="form-input"
              onChange={handleInput}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-button-container">
            <button type="submit" className="form-button">
              Bestätigen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
