import React from "react";
import { Link } from "react-router-dom";
import Navlink from "./Navlink";
import { Navbar, Container } from "react-bootstrap";
import logo from "../img/project-logo.png";

type NavlinkProps = {
  isLoggedIn: boolean;
};

export default function Header(props: NavlinkProps) {
  return (
    <div>
      <Navbar id="navbar">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="Click here to get all articles"
                className="d-inline-block align-top"
                id="logo"
              />
            </Navbar.Brand>
          </Link>
          <Navlink isLoggedIn={props.isLoggedIn} />
        </Container>
      </Navbar>
    </div>
  );
}
