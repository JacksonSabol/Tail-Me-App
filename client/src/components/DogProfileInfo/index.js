import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, } from "../Grid";

// import DeleteBtn from "../components/DeleteBtn";
import API from "../../utils/API";


class DogProfileInput extends Component {
    state = {
      dogProfile:[],
      errorMessage: ""
    };
    // Life-cycle function that executes when the components mount (page loads)
    
  
  
    componentDidMount() {
      this.loadDogProfile();
    }
    // Function to load all TodayWalks from the database
    loadDogProfile = () => {
  
      
      API.getDogProfile(1)
        .then(res => {this.setState({ dogProfile: res.data})
        }).catch(err => console.log(err));
    };
  
    
    render() {
      return (
  
        <Row>
          <Col size="md-12 sm-12">
          
          {this.state.dogProfile.dogName}       {this.state.dogProfile.emergencyContact}   
          
         
        
  
          </Col>
        </Row>
  
  
      );
    }
  }
  
  export default DogProfileInput;