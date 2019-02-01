import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import "../index.css";
import { Col, Row, Container } from "../components/Grid";
import UserProfileInput from '../components/UserProfileInput';
import DogProfileInfo from '../components/DogProfileInfo';

class ownerProfile extends Component {
    render() {
        return(
        <Container >
            <UserProfileInput></UserProfileInput>
            <DogProfileInfo></DogProfileInfo>
          
        </Container>
        )
    }
}
export default ownerProfile