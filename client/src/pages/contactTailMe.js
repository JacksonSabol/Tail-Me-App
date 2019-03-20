import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import "../index.css";
// import logo from "../images/tailMeLogo.png";
import Header from "../components/Header";
import ContactWalker from "../components/ContactWalker";
import Footer from "../components/Footer";


class contactTailMe extends Component {
    render() {
        return (
            <div className="contactTailMe">
            <Header/>
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
export default contactTailMe