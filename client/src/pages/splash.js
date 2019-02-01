import React, {Component } from 'react';
//import ReactDOM from 'react-dom';
import "../index.css";
// import Container from "../components/Container";
import { Col, Row, Container } from "../components/Grid";
// import Footer from "../components/Footer";
import logo from "../images/tailMeLogo.png";


class splash extends Component {
    render() {
        return (
        <Container >
            <div className="splash">
            <img className="splash__logo" src={logo}alt="tailME logo" ></img>
           
            </div>
        </Container>
        )
    }
}
export default splash