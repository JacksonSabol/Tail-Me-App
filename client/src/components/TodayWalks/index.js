import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
//import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../List";
// import DeleteBtn from "../components/DeleteBtn";
import API from "../../utils/API";
import Moment from "moment";
//import "../index.css";

class TodayWalks extends Component {
  state = {
    walks: [],
    errorMessage: ""
  };
  // Life-cycle function that executes when the components mount (page loads)
  componentDidMount() {
    this.loadWalks();
  }
  // Function to load all TodayWalks from the database
  loadWalks = () => {
    API.getTodayWalks()
      .then(res => this.setState({ walks: res.data }))
      .catch(err => console.log(err));
  };

  
  render() {
    return (
      
        <Row>
          <Col size="md-12 sm-12">
            {this.state.walks.length ? (
              <List>
                {this.state.walks.map(walk => (
                  <ListItem key={walk.id}>
                    
                    <p className="list-publish">Walk Date: {Moment(walk.walkDate, "YYYY-MM-DDTHh:mm:ss").format("MM/DD/YYYY")}</p>
                   
                  </ListItem>
                ))}
              </List>
            ) : (
              <p className="search__form--alert"> you don't have any walks!</p>
              )}
          </Col>
        </Row>
     
    );
  }
}

export default TodayWalks;
