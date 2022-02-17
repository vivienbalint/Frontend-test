import { useState } from "react";
import { Link } from "react-router-dom";
import Navlink from "./Navlink";
import Logo from "./Logo";
import useWindowSize from "./UseWindowSize";

type NavlinkProps = {
  isLoggedIn: boolean;
};

export default function Header(props: NavlinkProps) {
  let isSmall = useWindowSize();

  const [isToggled, setToggled] = useState(false);

  function getClass() {
    if (isSmall) {
      return isToggled ? "header-container full-height" : "header-container";
    } else {
      return "header-container header-container-flex";
    }
  }

  return (
    <div>
      <nav id="navbar">
        <div className={getClass()}>
          <div className="hamburger-container">
            <Link to="/">
              <Logo />
            </Link>
            <div className="hamburger-menu">
              <button
                className={
                  isToggled
                    ? "hamburger hamburger--squeeze is-active"
                    : "hamburger hamburger--squeeze"
                }
                type="button"
                onClick={() => setToggled(!isToggled)}
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
          <div
            className={isToggled ? "nav full-height nav-mobile" : "nav flex"}
          >
            <Navlink isLoggedIn={props.isLoggedIn} />
          </div>
        </div>
      </nav>
    </div>
  );
}
