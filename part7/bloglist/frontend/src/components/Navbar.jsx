import { useNavigate, Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const Navbar = ({ user, userDispatch }) => {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <em>{user.name} logged in</em>

        <Button
          color="inherit"
          onClick={() => {
            userDispatch({ type: "LOGOUT" });
            window.localStorage.removeItem("loginDetails");
            navigate("/login");
          }}
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
