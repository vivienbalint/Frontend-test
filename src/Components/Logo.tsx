import useWindowSize from "./UseWindowSize";
import { Navbar } from "react-bootstrap";
import logo from "../img/project-logo.png";
import mobileLogo from "../img/project-logo-mobile.png";

export default function Logo() {
  let isSmall = useWindowSize();

  if (isSmall) {
    return (
      <Navbar.Brand>
        <img
          src={mobileLogo}
          alt="Click here to get all articles"
          className="d-inline-block align-top"
          id="logo-mobile"
        />
      </Navbar.Brand>
    );
  } else {
    return (
      <Navbar.Brand>
        <img
          src={logo}
          alt="Click here to get all articles"
          className="d-inline-block align-top"
          id="logo"
        />
      </Navbar.Brand>
    );
  }
}
