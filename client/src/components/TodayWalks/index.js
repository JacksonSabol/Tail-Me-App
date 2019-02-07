import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import API from "../../utils/API";
import Moment from "moment";
import GoogleMapReact from "google-map-react"

//import "../index.css";

const AnyReactComponent = ({ id, icon, imageClick, lat, lng }) => (
  <div style={{
    color: 'white',
    // background: 'blue',
    padding: '10px 15px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)',
  }}
    onClick={() => imageClick(id)}
  >
    <img src={icon}></img>

  </div>
);


class TodayWalks extends Component {
  state = {
    currentLocation: {
      lat: 37.7924791,
      lng: -122.1818368
    },
    zoom: 14,
    activeImage: "",
    walks: [],
    errorMessage: "",
    onClickButton: false,
    walkId: "",
    images: [],
    pastWalks: []

  }
  // Life-cycle function that executes when the components mount (page loads)



  componentDidMount() {
    this.loadWalks();
  }
  // Function to load all TodayWalks from the database
  loadWalks = () => {

    const id = 1
    API.getWalkerWalks(id)
      .then(res => {

        const dataFormat = res.data.map(data => {

          const start_time = Moment(data.checkInTime);
          const end_time = Moment(data.checkOutTime);
          const difference = end_time.diff(start_time, 'minutes', true);

          const finishedWalk = data.checkInTime === null ? false : true

          const dataFormatted = {
            checkInTime: data.checkInTime,
            checkOutTime: data.checkOutTime,
            totalTime: this.convertMinsToHrsMins(difference),
            id: data.id,
            walkDate: data.walkDate,
            finishedWalk: finishedWalk

          }


          return (dataFormatted)
        });
        console.log("Data Format", dataFormat)

        const finishedWalks = dataFormat.filter(data => data.finishedWalk === true)
        const UpcommingWalks = dataFormat.filter(data => data.finishedWalk === false)
        console.log("UpcommingWalks", UpcommingWalks)
        this.setState({
          walks: UpcommingWalks,
          pastWalks: finishedWalks
        })

      })

      .catch(err => console.log(err));
  };

  handleOnClick = (walkId) => {
    console.log("walkId", walkId)
    API.getImagesWalk(walkId)
      .then(res => {
        console.log("back from getpics")
        console.log("getpics: ", res.data)
        // this.setState({
        //   walks: res.data
        // });

        //console.log("data[0]: ", res.data[0].GPSLatitude)
        this.setState({
          onClickButton: true,
          walkId: walkId,
          images: res.data
          /* currentLocation: {
               lat:res.data[0].GPSLatitude,
               lng:res.data[0].GPSLongitude
           } */
        })
      }).catch(err => {
        console.log(err)
      });

  }

  handleImgClick = (id) => {

    console.log("id: ", id)
    let clickWalk = this.state.images.filter(image => image.id === id)
    console.log(clickWalk)
    this.setState({ activeImage: clickWalk[0].url })

  }

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
                <b>Upcomming Walks:</b>
                {this.state.walks.map(walk => (


                  <ListItem key={walk.id}>

                    <p className="list-publish"> Walk Date:
                                         {Moment(walk.walkDate, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:MM")}
                                         
                      <button onClick={() => this.handleCheckin()}>Check-in </button>
                      <button onClick={() => this.handleCheckout()}>Check-out</button>
                    </p>
                  </ListItem>

                ))}

              </List>

            ) : (
                <p className="search__form--alert"> You don't have any upcomming walks!</p>
              )}

          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">

            {this.state.walks.length ? (
              <List> <br></br>
                <b>  History Walks:</b>
                {this.state.pastWalks.map(walk => (


                  <ListItem key={walk.id}>

                    <p className="list-publish"> Walk Date:
                                         {Moment(walk.walkDate, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:MM")}
                    </p>
                    <p className="list-publish"> Check In Time: {Moment(walk.checkInTime, "YYYY-MM-DD  HH:mm:ss").format("HH:MM:ss")}</p>

                    <p className="list-publish"> Check Out Time: {Moment(walk.checkOutTime, "YYYY-MM-DD  HH:mm:ss").format("HH:MM:ss")} </p>

                    <p className="list-publish"> Total Time: {walk.totalTime} </p>
                    <button onClick={this.handleOnClick.bind(this, walk.id)}>Walk Map</button>


                  </ListItem>

                ))}

              </List>

            ) : (
                <p className="search__form--alert"> You don't have any walks!</p>
              )}

          </Col>
        </Row>

        {this.state.onClickButton ? (

          <div style={{
            display: "flex",

          }}>
            <div style={{ height: '50vh', width: '50%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={this.state.currentLocation}
                defaultZoom={this.state.zoom}
              >

                {this.state.images.map(image => (<AnyReactComponent ///all of the props ie walk.img/walk.lat))}
                  id={image.id}
                  icon="../paw-green-2020.svg"
                  lat={image.GPSLatitude}
                  lng={image.GPSLongitude}
                  imageClick={this.handleImgClick}
                />))}
              </GoogleMapReact>
            </div>

            <div style={{ postition: "relative" }}>
              {this.state.activeImage ?
                <img width={'300px'} src={this.state.activeImage}></img> : null}
            </div>
          </div>

        ) : null}


      </Container>
    );
  }
}

export default TodayWalks;