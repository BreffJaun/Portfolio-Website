// I M P O R T:   F I L E S
import "../styles/login.scss";

// I M P O R T:   P A C K A G E S
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

// I M P O R T:   F U N C T I O N S
import { BE_HOST } from "../api/host";
import { checkLogin } from "../utils/utils";
import Footer from "./Footer";
import LoggedInContext from "../context/LoginContext";
import PendingContext from "../context/PendingContext";
import UserContext from "../context/UserContext";

// C O D E
const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [isPending, setIsPending] = useContext(PendingContext);
  const [user, setUser] = useContext(UserContext);
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      window.scrollTo(0, 0);
    }
  }, [isLoggedIn, navigate]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const sendData = async () => {
      await fetch(`${BE_HOST}/users/login`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
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
          setIsLoggedIn(true);
          setUser(data.user);
          setTimeout(() => navigate("/"), 1000);
        })
        .catch((error) => {
          console.error("Error:", error);
          setTimeout(() => navigate("/*"), 1000);
        });
    };
    sendData();
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <input
              type="text"
              name="email"
              placeholder="E-Mail"
              required
              autoComplete="email"
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Passwort"
              required
              autoComplete="current-password"
              onChange={handleInput}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Einloggen</button>
          </div>
          <div className="form-footer">
            <p>
              Account erstellen?{" "}
              <NavLink to="/registration">Hier klicken</NavLink>
            </p>
            <p>
              Passwort vergessen?{" "}
              <NavLink to="/forgottpassword">Hier klicken</NavLink>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
