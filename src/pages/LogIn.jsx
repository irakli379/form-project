import { useState } from "react";
import { UseUsersContext } from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";

function LogIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();
  const { getUsers, setIsLoggedIn, setCurUser } = UseUsersContext();

  const { data, error, isLoading } = getUsers;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const includesName = data.items.some((user) => user.firstName === name);
    const includesEmail = data.items.some((user) => user.email === email);

    if (includesName && includesEmail) {
      setIsLoggedIn(true);
      navigate("/");
      setLoginError(false);
      setName("");
      setEmail("");
      setCurUser(email);
    } else {
      setLoginError(true);
      setName("");
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className={styles.inputField}
          required
        />
      </label>
      <label htmlFor="email">
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
          required
        />
      </label>
      <button type="submit" className={styles.button}>
        Log In
      </button>
      {loginError && (
        <div className={styles.errorMessage}>
          Invalid credentials. Please try again.
        </div>
      )}
    </form>
  );
}

export default LogIn;
