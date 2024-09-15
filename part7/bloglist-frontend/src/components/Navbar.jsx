import styles from "./Navbar.module.css";
import { useNavigate, Link } from "react-router-dom";
const Navbar = ({ user, userDispatch }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <span>
        <Link to="/">Blogs</Link>
      </span>
      <span>
        <Link to="/users">Users</Link>
      </span>
      <span className={styles.user}>
        {user.name} logged in
        <button
          onClick={() => {
            userDispatch({ type: "LOGOUT" });
            window.localStorage.removeItem("loginDetails");
            navigate("/login");
          }}
        >
          Log out
        </button>
      </span>
    </div>
  );
};

export default Navbar;
