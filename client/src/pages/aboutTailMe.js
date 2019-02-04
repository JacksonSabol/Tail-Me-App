import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import ReactDOM from 'react-dom';
import "../index.css";
import Header from "../components/Header";



class aboutTailMe extends Component {
    render() {
        return (
            <div className="aboutTailMe">
                <Header />
                <div className="aboutTailMe__grid">
                    <div className="aboutTailMe__grid--heading">
                        Welcome to tailME!
        </div>
                    <div className="aboutTailMe__grid--text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                         consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                         cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
                </div>
            </div>
        )
    }
}
export default aboutTailMe