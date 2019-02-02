import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import "../index.css";
import { Container } from "../components/Grid";
import UserProfileInput from '../components/UserProfileInput';
import DogProfileInfo from '../components/DogProfileInfo';

class ownerProfile extends Component {
    render() {
        return(
        <Container >
            <UserProfileInput />
            <DogProfileInfo />
          
        </Container>
        )
    }
}
export default ownerProfile