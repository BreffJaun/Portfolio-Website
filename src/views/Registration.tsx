// I M P O R T:   F I L E S
import "../styles/registration.scss";
import default_avatar from "../images/icon_avatar.png";

// I M P O R T:   T Y P E S
import { Profile } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

// I M P O R T:   F U N C T I O N S
import { BE_HOST } from "../api/host";
import EditImageBtn from "../components/EditImageBtn";

// C O D E
const Registration = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [registrationData, setRegistrationData] = useState<{
    profile: Profile;
    confirmPassword: string;
  }>({
    profile: {
      userName: "",
      email: "",
      avatar: "",
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Clean up
    setAvatar(undefined);
    setAvatarUrl("");

    // Get file
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { userName, password, email } = registrationData.profile;
    const { confirmPassword } = registrationData;

    if (!userName) {
      setError("Bitte geben Sie einen Benutzernamen ein!");
    } else if (!email) {
      setError("Bitte geben Sie eine E-Mail-Adresse ein!");
    } else if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein!");
    } else {
      setError("");
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(registrationData));
    if (avatar) {
      formData.append("avatar", avatar);
    } else {
      formData.append("avatar", default_avatar);
    }

    const sendRegistrationData = async () => {
      await fetch(`${BE_HOST}/users/register`, {
        credentials: "include",
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            setTimeout(() => navigate("/login"), 1000);
          }
        })
        .catch((err) => {
          console.error(err);
          setTimeout(() => navigate("/*"), 1000);
        });
    };
    // sendRegistrationData();
  };

  return (
    <div className="registration">
      <form onSubmit={handleSubmit}>
        <h2>Create your account</h2>

        <div className="form-group">
          <div className="avatar__preview">
            <img
              src={avatarUrl || default_avatar}
              alt={avatar?.name || "avatar"}
            />
          </div>
          <label htmlFor="avatar" className="avatar__label">
            <EditImageBtn />
          </label>
          <input
            className="add__card"
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleFileChange}
            accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
            hidden
          />
        </div>
        <div className="col">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleInput}
          />
          <label>E-Mail:</label>
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            required
            onChange={handleInput}
          />
        </div>
        <div className="col">
          <label>Password:</label>
          <input
            title="Mind. 8 Zeichen, mindestens 1 Kleinbuchstabe, 1 Großbuchstabe, 1 Sonderzeichen und 1 Zahl"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleInput}
          />
          <label>Confirm password:</label>
          <input
            title="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
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
