import React, { Component } from 'react';
// import { Link } from "react-router-dom";
//import ReactDOM from 'react-dom';
import "../index.css";
import HeaderWalker from "../components/HeaderWalker";
import Footer from "../components/Footer";



class aboutTailMeWalker extends Component {
    render() {
        return (
            <div className="walkeraboutTailMe">
                <HeaderWalker />
                <div className="walkeraboutTailMe__grid">
                    <div className="walkeraboutTailMe__grid--heading">
                        Welcome to tailME!
        </div>
                    <div className="walkeraboutTailMe__grid--text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                         consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                         cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
                </div>
                <div className="walkeraboutTailMe__grid--footer">
                    <Footer />
                </div>
            </div>
        )
    }
}
export default aboutTailMeWalker