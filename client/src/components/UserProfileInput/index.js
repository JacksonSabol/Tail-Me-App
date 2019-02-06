import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row,  } from "../Grid";

// import DeleteBtn from "../components/DeleteBtn";
import API from "../../utils/API";


class UserProfileInput extends Component {
    state = {
      userProfile:[],
      errorMessage: ""
    };
    // Life-cycle function that executes when the components mount (page loads)
    
  
  
    componentDidMount() {
      this.loadUserProfile();
    }
    // Function to load all TodayWalks from the database
    loadUserProfile = () => {
  
      
      API.getUserProfile(1)
        .then(res => {this.setState({ userProfile: res.data})
        }).catch(err => console.log(err));
    };
  
    
    render() {
      return (
  
        <Row>
          <Col size="md-12 sm-12">
          
          {this.state.userProfile.firstName}      {this.state.userProfile.lastName}
          {this.state.userProfile.aboutMe}
          {this.state.userProfile.address}
          {this.state.userProfile.City}
          {this.state.userProfile.State}
          {this.state.userProfile.zipCode}
          {this.state.userProfile.country}
        
  
          </Col>
        </Row>
  
  
      );
    }
  }
  
  export default UserProfileInput;