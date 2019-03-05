import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../images/tailMeLogo.png";
import Footer from "../components/Footer";
import Background from "../images/splashImage_01.jpg";


class splash extends Component {
    render() {
        return (
            <div className="splash">
            <div className="splash__bg">
            <img className="splash__bg--image"src={Background} alt="open field"></img>
                <div className="splash__grid">
                    <img className="splash__logo" src={logo} alt="tailME logo" ></img>
                    <div className="splash__about">
                        <div className="splash__about--text">
                            Click here to find out more about tailME
                    </div>
                        <Link className="splash__about--link" to="/aboutTailMe">
                            about tailME
                    </Link>
                    </div>
                    <div className="splash__user">
                        <div className="splash__user--text">
                            Click here to sign up or log in if you are already a tailME member
                    </div>
                        <Link className="splash__user--authentification" to="/owner/signup">
                            owner sign up
                    </Link>
                        <Link className="splash__user--registration" to="/user/Login">
                            owner log in
                    </Link>
                    </div>
                    <div className="splash__walker">
                        <div className="splash__walker--text">
                            Click here to sign up or log in if you are already a tailME affiliated walker
                    </div>
                        <Link className="splash__walker--authentification" to="/walker/signup">
                            walker sign up
                    </Link>
                        <Link className="splash__walker--registration" to="/user/LoginWalker">
                            walker log in
                    </Link>
                    </div> 
                    </div>
                    <div className="splash__footer">
                    <Footer/>
                    </div>
                </div>
            </div>

        )
    }
}
export default splash