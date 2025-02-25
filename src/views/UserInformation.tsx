// I M P O R T:   F I L E S
import "../styles/userInformation.scss";
import default_avatar from "../images/icon_avatar.png";

// I M P O R T:   T Y P E S
import { User } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

// I M P O R T:   F U N C T I O N S
import { BE_HOST } from "../api/host";
import EditImageBtn from "../components/EditImageBtn";
import UserContext from "../context/UserContext";
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";

// C O D E
const UserInformation = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [isPending] = useContext(PendingContext);
  const [user, setUser] = useContext(UserContext);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newData, setNewData] = useState<{
    profile: User;
    confirmPassword: string;
  }>({
    profile: {
      _id: user?._id || "",
      userName: user?.userName || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      password: "",
    },
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  const hasChanges = () => {
    // console.log(newData.profile.userName !== user?.userName);
    // console.log(newData.profile.email !== user?.email);
    // console.log(newData.profile.avatar !== user?.avatar);
    // console.log(newData.profile.password !== "");
    // console.log(newData.confirmPassword !== "");
    // console.log("New Data:", newData);
    // console.log("Current User:", user);
    return (
      newData.profile.userName !== user?.userName ||
      newData.profile.email !== user?.email ||
      newData.profile.avatar !== user?.avatar ||
      newData.profile.password !== "" ||
      newData.confirmPassword !== ""
    );
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        [name]: value,
      },
    }));
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
    const { userName, password, email } = newData.profile;
    const { confirmPassword } = newData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!userName || userName.length < 1) {
      setError("Bitte geben Sie einen Benutzernamen ein!");
    } else if (!email || email.length < 1) {
      setError("Bitte geben Sie eine E-Mail-Adresse ein!");
    } else if (!emailRegex.test(email)) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein!");
    } else if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein!");
    } else {
      setError("");
    }

    if (error) return;

    const formData = new FormData();
    formData.append("data", JSON.stringify(newData));
    if (avatar) {
      formData.append("avatar", avatar);
    } else {
      formData.append("avatar", default_avatar);
    }
    console.log(error);
    // console.log("EXECUTED");
    const sendNewData = async () => {
      await fetch(`${BE_HOST}/users/${user?._id}`, {
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
    sendNewData();
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
            value={newData.profile.userName}
            onChange={handleInput}
            autoComplete="username"
          />
          <label>E-Mail:</label>
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            required
            value={newData.profile.email}
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
