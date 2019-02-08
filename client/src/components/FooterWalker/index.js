import React from "react";
import "../../index.css";
import logo from "../../images/tailMeLogo.png";

const FooterWalker = (props) => (
    <footer className="walkerfooter">
        <div className="walkerfooter__text">
          ©2019  tailME enterprises
          <img className="walkerfooter__logo" src={logo}alt="tailME logo" ></img>
        </div>
    </footer>
)

export default FooterWalker;