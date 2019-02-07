import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import logo from "../../images/tailMeLogo.png";
import homeIcon from "../../images/homeIcon.png";
import mailIcon from "../../images/mailIcon.png";

function Header(props) {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <img className="nav__logo--image" src={logo} alt="tailME logo" ></img>
      </div>
      <div className="nav__splash">
        <Link className="nav__splash--link" to="/">
        <img className="nav__splash--homeIcon" src={homeIcon} alt="home icon" ></img>
        </Link>
      </div>
      <div className="nav__contact">
        <Link className="nav__contact--link" to="/contactTailMe">
        <img className="nav__contact--mailIcon" src={mailIcon} alt="mail icon" ></img> 
        </Link>
      </div>
    </nav>
  );
}

export default Header;
