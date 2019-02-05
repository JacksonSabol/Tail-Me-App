import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import logo from "../../images/tailMeLogo.png";

function Header(props) {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <img className="nav__logo--image" src={logo} alt="tailME logo" ></img>
      </div>
      <div className="nav__splash">
        <Link className="nav__splash--link" to="/">
          Home
        </Link>
      </div>
      <div className="nav__contact">
        <Link className="nav__contact--link" to="/contactTailMe">
          Contact 
        </Link>
      </div>
    </nav>
  );
}

export default Header;
