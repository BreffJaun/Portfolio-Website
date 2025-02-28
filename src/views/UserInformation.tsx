// I M P O R T:   F I L E S
import "../styles/userInformation.scss";
import default_avatar from "../images/icon_avatar.png";

// I M P O R T:   T Y P E S
import { User } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";

// I M P O R T:   F U N C T I O N S
import { BE_HOST } from "../api/host";
import EditImageBtn from "../components/EditImageBtn";
import { checkLogin } from "../utils/utils";

// C O D E
const UserInformation = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [isPending, setIsPending] = useContext(PendingContext);
  const [user, setUser] = useContext(UserContext);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newData, setNewData] = useState<User>({
    _id: user?._id || "",
    userName: user?.userName || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    password: "",
    newPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  // useEffect(() => {
  //   console.log(newData);
  // }, [newData]);

  const hasChanges = () => {
    // console.log(newData.userName !== user?.userName);
    // console.log(newData.email !== user?.email);
    // console.log(newData.avatar !== user?.avatar);
    // console.log(newData.password !== "");
    // console.log(newData.newPassword !== "");
    // console.log("New Data:", newData);
    // console.log("Current User:", user);
    return (
      newData.userName !== user?.userName ||
      newData.email !== user?.email ||
      avatar !== undefined ||
      newData.password !== "" ||
      newData.newPassword !== ""
    );
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewData((prevData: User) => ({ ...prevData, [name]: value }));
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
    const { userName, email, password, newPassword } = newData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!userName || userName.length < 1) {
      setError("Bitte geben Sie einen Benutzernamen ein!");
      return;
    } else if (!email || email.length < 1) {
      setError("Bitte geben Sie eine E-Mail-Adresse ein!");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein!");
      return;
    } else {
      setError("");
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("userName", userName);
    if (password) formData.append("password", password);
    if (newPassword) formData.append("newPassword", newPassword);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    const sendNewData = async () => {
      await fetch(`${BE_HOST}/users/${user?._id}`, {
        credentials: "include",
        method: "PATCH",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(
              new Error(`HTTP error! Status: ${res.status}`)
            );
          }
          return res.json();
        })
        .then((data) => {
          setSuccessMessage("Daten erfolgreich geändert!");
          setTimeout(() => {
            setSuccessMessage("");
            window.location.href = "/userinformation?redirect=true";
          }, 4000);
        })
        .catch((err) => {
          console.error(err);
          setTimeout(() => navigate("/*"), 1000);
        });
    };
    await sendNewData();
  };

  const handleLogout = async () => {
    await fetch(`${BE_HOST}/users/logout`, {
      credentials: "include",
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Logout fehlgeschlagen");
        }
      })
      .then((data) => {
        setUser(undefined);
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Fehler beim Logout:", err);
        setError("Logout fehlgeschlagen. Bitte versuchen Sie es erneut.");
        navigate("/*");
      });
  };

  return (
    <div className="userInformation-container">
      <form onSubmit={handleSubmit}>
        <h2>Manage your account</h2>
        {/* Erfolgsmeldung */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-group">
          <div className="avatar__preview">
            <img src={avatarUrl || user?.avatar} alt="avatar" />
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
            name="userName"
            placeholder="Username"
            required
            value={newData.userName}
            onChange={handleInput}
            autoComplete="username"
          />
          <label>E-Mail:</label>
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            required
            value={newData.email}
            onChange={handleInput}
            autoComplete="email"
          />
        </div>
        <div className="col">
          <label>Current password:</label>
          <input
            title="Mind. 8 Zeichen, mindestens 1 Kleinbuchstabe, 1 Großbuchstabe, 1 Sonderzeichen und 1 Zahl"
            type="password"
            name="password"
            placeholder="Current Passwort"
            required
            onChange={handleInput}
            autoComplete="current-password"
          />
          <label>New password:</label>
          <input
            title="New password"
            type="password"
            name="newPassword"
            placeholder="New password"
            required
            onChange={handleInput}
            autoComplete="new-password"
          />
        </div>
        {/* Fehlermeldung */}
        {error && <p className="error-message">{error}</p>}
        <div className="btn__group">
          <button
            onClick={handleSubmit}
            className="btn-submit"
            disabled={!hasChanges()}
          >
            Save Changes
          </button>
          <button onClick={handleLogout} className="btn-delete">
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInformation;
