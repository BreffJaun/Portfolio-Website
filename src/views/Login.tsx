// I M P O R T:   F I L E S
import "../styles/login.scss";

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S

// C O D E
const Login = () => {
  return (
    <div className="login">
      <form className="login__form">
        <h2>Login</h2>
        <div className="form__group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
