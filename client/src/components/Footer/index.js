import React from "react";
import "../../index.css";
import logo from "../../images/tailMeLogo.png";

const Footer = (props) => (
    <footer className="footer">
        <div className="footer__text">
          ©2019  tailME enterprises
          <img className="footer__logo" src={logo}alt="tailME logo" ></img>
        </div>
    </footer>
)

export default Footer;