import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const mockUser = {
    username: "dulanja",
    password: "dulanja@123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === mockUser.username && password === mockUser.password) {
      setError("");
      navigate("/app/HomePage");
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <main>
        <h1>Welcome to HR App</h1>
        <form onSubmit={handleLogin}>
          <div className={styles["form-group"]}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="button-primary">
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
