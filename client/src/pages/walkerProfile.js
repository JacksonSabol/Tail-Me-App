import React, { Component } from "react";
import "../index.css";
import { Container } from "../components/Grid";
//import ReactDOM from 'react-dom';
import UserProfileInput from '../components/UserProfileInput';

class walkerProfile extends Component {
    render() {
        return (
            <Container >
                <UserProfileInput></UserProfileInput>


            </Container>
        )
    }
}
export default walkerProfile