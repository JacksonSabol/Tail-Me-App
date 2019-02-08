import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import logo from "../../images/tailMeLogo.png";
import homeIcon from "../../images/homeIcon.png";
import mailIcon from "../../images/mailIcon.png";

function HeaderWalker(props) {
  return (
    <nav className="walkernav">
      <div className="walkernav__logo">
        <img className="walkernav__logo--image" src={logo} alt="tailME logo" ></img>
      </div>
      <div className="walkernav__splash">
        <Link className="walkernav__splash--link" to="/">
        <img className="walkernav__splash--homeIcon" src={homeIcon} alt="home icon" ></img>
        </Link>
      </div>
      <div className="walkernav__contact">
        <Link className="walkernav__contact--link" to="/contactTailMeWalker">
        <img className="walkernav__contact--mailIcon" src={mailIcon} alt="mail icon" ></img> 
        </Link>
      </div>
    </nav>
  );
}

export default HeaderWalker;