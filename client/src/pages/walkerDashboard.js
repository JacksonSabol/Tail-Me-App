import React, { Component } from "react";
import "../index.css";
import { Col, Row, Container } from "../components/Grid";
//import ReactDOM from 'react-dom';
import TodayWalks from '../components/TodayWalks';

class walkerDashboard extends Component {
render() {
    return(
    <Container >
   
    <TodayWalks></TodayWalks>
    </Container>
    )
}
}
export default walkerDashboard