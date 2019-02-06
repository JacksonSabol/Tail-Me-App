import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import "../index.css";
// import logo from "../images/tailMeLogo.png";
import Header from "../components/Header";
import Contact from "../components/Contact";
import Footer from "../components/Footer";


class contactTailMe extends Component {
    render() {
        return (
            <div className="contactTailMe">
            <Header/>
                <div className="contactTailMe__grid">
                   
            <Contact/>
                    <div>
            </div>
                </div>
                <Footer/>
            </div>

        )
    }
}
export default contactTailMe