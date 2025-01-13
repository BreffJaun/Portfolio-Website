// I M P O R T:   F I L E S
import "../styles/login.scss";

// I M P O R T:   P A C K A G E S
import { NavLink } from "react-router-dom";

// C O D E
const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Benutzername"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Einloggen</button>
        </div>
        <div className="form-footer">
          <p>
            Noch keinen Account?{" "}
            <NavLink to="/registration">Hier registrieren</NavLink>
          </p>
          <p>
            Passwort vergessen?{" "}
            <NavLink to="/forgottpassword">Hier klicken</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
