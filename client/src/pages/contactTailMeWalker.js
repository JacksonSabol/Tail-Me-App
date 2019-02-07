import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import "../index.css";
// import logo from "../images/tailMeLogo.png";
import HeaderWalker from "../components/HeaderWalker";
import ContactWalker from "../components/ContactWalker";
import Footer from "../components/Footer";


class contactTailMeWalker extends Component {
    render() {
        return (
            <div className="contactTailMe">
            <HeaderWalker/>
                <div className="contactTailMe__grid">
                   
            <ContactWalker/>
                    <div>
            </div>
                </div>
                <Footer/>
            </div>

        )
    }
}
export default contactTailMeWalker