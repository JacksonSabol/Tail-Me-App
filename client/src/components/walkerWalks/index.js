import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import API from "../../utils/API";
import Moment from "moment";

//import "../index.css";



class walkerWalks extends Component {
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
      .then(res => {

        const dataFormat = res.data.map(data => {

          const start_time = Moment(data.checkInTime);
          const end_time = Moment(data.checkOutTime);
          const difference = end_time.diff(start_time, 'minutes', true)

          const dataFormatted = {
            checkInTime: data.checkInTime,
            checkOutTime: data.checkOutTime,
            totalTime: this.convertMinsToHrsMins(difference),
            id: data.id,
            walkDate: data.walkDate

          }


          return (dataFormatted)
        });
        console.log("Data Format", dataFormat)

        this.setState({ walks: dataFormat })
      })

      .catch(err => console.log(err));
  };

  convertMinsToHrsMins = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}h:${m}m`;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12 sm-12">
            {this.state.walks.length ? (
              <List>
                TodayWalks:
                {this.state.walks.map(walk => (

                  <ListItem key={walk.id}>

                    <p className="list-publish"> Walk Date:
                    {Moment(walk.walkDate, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:MM")}
                    </p>
                    <p className="list-publish"> Check In Time: {Moment(walk.checkInTime, "YYYY-MM-DD  HH:mm:ss").format("HH:MM:ss")}</p>

                    <p className="list-publish"> Check Out Time: {Moment(walk.checkOutTime, "YYYY-MM-DD  HH:mm:ss").format("HH:MM:ss")} </p>

                    <p className="list-publish"> Total Time: {walk.totalTime} </p>

                  </ListItem>
                ))}

              </List>

            ) : (
                <p className="search__form--alert"> You don't have any upcoming walks!</p>
              )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default walkerWalks;
