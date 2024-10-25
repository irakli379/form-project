import { Link, Outlet } from "react-router-dom";
import { UseUsersContext } from "../contexts/UsersContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = UseUsersContext();
  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.link} key="Home">
          Home
        </Link>
        <Link to="/users" className={styles.link} key="Users">
          Users List
        </Link>
        {!isLoggedIn ? (
          <div className={styles.authLinks}>
            <Link to="/register" className={styles.link} key="Register">
              Register
            </Link>
            <Link to="/login" className={styles.link} key="Login">
              Login
            </Link>
          </div>
        ) : (
          <div>
            <button
              className={styles.logoutButton}
              onClick={() => setIsLoggedIn(false)}
            >
              Log Out
            </button>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
