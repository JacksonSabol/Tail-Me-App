import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../images/tailMeLogo.png";
import Footer from "../components/Footer";


class splashWalker extends Component {
    render() {
        return (
            <div className="walkersplash">
                <div className="walkersplash__grid">
                    <img className="walkersplash__logo" src={logo} alt="tailME logo" ></img>
                    <div className="walkersplash__about">
                        <div className="walkersplash__about--text">
                            Click here to find out more about tailME
                    </div>
                        <Link className="walkersplash__about--link" to="/aboutTailMeWalker">
                            about tailME
                    </Link>
                        <Link className="walkersplash__about--userregistration" to="/user/Login">
                            owner log in
                </Link>
                    </div>
                    {/* <div className="walkersplash__user">
                        <div className="walkersplash__user--text">
                            Click here to sign up or log in if you are already a tailME member
                    </div> */}
                    {/* <Link className="walkersplash__user--authentification" to="/owner/signup">
                            owner sign up
                    </Link> */}
               
                <div className="walkersplash__walker">
                    <div className="walkersplash__walker--text">
                        Click here to sign up or log in if you are already a tailME affiliated walker
                    </div>
                    <Link className="walkersplash__walker--authentification" to="/walker/signup">
                        walker sign up
                    </Link>
                    <Link className="walkersplash__walker--registration" to="/user/LoginWalker">
                        walker log in
                    </Link>
                </div>
                <div className="walkersplash__footer">
                    <Footer />
                </div>
            </div>
         </div>

        )
    }
}
export default splashWalker