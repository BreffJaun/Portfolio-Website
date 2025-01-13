// I M P O R T:   F I L E S
import "../styles/registration.scss";

// I M P O R T:   T Y P E S
import { Profile } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

// I M P O R T:   F U N C T I O N S

// C O D E
const Registration = () => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<{
    profile: Profile;
    confirmPassword: string;
  }>({
    profile: {
      username: "",
      email: "",
      password: "",
    },
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      profile: {
        ...registrationData.profile,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      registrationData.profile.password !== registrationData.confirmPassword
    ) {
      setError("Die Passwörter stimmen nicht überein!");
      return;
    }
    setError("");

    // const sendRegistrationData = async () => {
    //   await fetch(`${host}/users/register`, {
    //     method: "POST",
    //     body: JSON.stringify(registrationData),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((json) => {
    //       if (!json.status) {
    //         setTimeout(() => navigate("/*"), 4000); // Fallback-Seite
    //       } else {
    //         setTimeout(() => navigate("/login"), 4000);
    //       }
    //     });
    // };
    // sendRegistrationData();
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Erstelle deinen Account</h2>
        <div className="col">
          <input
            type="text"
            name="username"
            placeholder="Benutzername"
            required
            onChange={handleInput}
          />
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            required
            onChange={handleInput}
          />
        </div>
        <div className="col">
          <input
            title="Mind. 8 Zeichen, mindestens 1 Kleinbuchstabe, 1 Großbuchstabe, 1 Sonderzeichen und 1 Zahl"
            type="password"
            name="password"
            placeholder="Passwort"
            required
            onChange={handleInput}
          />
          <input
            title="Passwort wiederholen"
            type="password"
            name="confirmPassword"
            placeholder="Passwort bestätigen"
            required
            onChange={handleInput}
          />
        </div>
        {/* Fehlermeldung für Passwortabgleich */}
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrieren</button>
        <div className="central">
          <p>
            Schon registriert? <NavLink to="/login">Hier anmelden</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
