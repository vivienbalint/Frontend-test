import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import AuthContext from "../auth/auth.context";

type NavlinkProps = {
  isLoggedIn: boolean;
};

export default function Navlink(props: NavlinkProps) {
  let history = useHistory();
  const { dispatch } = React.useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  if (!props.isLoggedIn) {
    return (
      <div className="d-flex">
        <Link to="/login">
          <Button variant="primary" size="lg" className="btn-nav m-1">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="outline-primary" size="lg" className="btn-nav m-1">
            Register
          </Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="d-flex">
        <Link to="/" className="nav-link">
          Articles
        </Link>
        <Link to="/create-article" className="nav-link">
          Create Article
        </Link>
        <Link to="user-page" className="nav-link">
          My Site
        </Link>
        <button onClick={handleLogout} type="button" className="nav-link">
          Log out
        </button>
      </div>
    );
  }
}
