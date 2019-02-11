import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import API from "../../utils/API";
import Moment from "moment";
import GoogleMapReact from "google-map-react"
import "../../index.css";



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


class ownerWalks extends Component {
    state = {
        currentLocation: {
            lat: 37.7924791,
            lng: -122.1818368
        },
        center: {
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
        API.getOwnerWalks(id)
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
                let picsWithGpsInfo = res.data.filter(image =>
                    image.GPSLatitude != null)
                  console.log("PICS GPS: ", picsWithGpsInfo)
                  console.log("PICS GPS loc: ", picsWithGpsInfo[0].GPSLatitude)
                  console.log("PICS GPS loc: ", picsWithGpsInfo[0].GPSLongitude)
                //console.log("data[0]: ", res.data[0].GPSLatitude)
                this.setState({
                    onClickButton: true,
                    walkId: walkId,
                    images: picsWithGpsInfo,
                    currentLocation: {
                        lat: parseFloat(picsWithGpsInfo[0].GPSLatitude),
                        lng: parseFloat(picsWithGpsInfo[0].GPSLongitude)
                    }
                    /* currentLocation: {
                         lat:res.data[0].GPSLatitude,
                         lng:res.data[0].GPSLongitude
                     } */
                })
            }).catch(err => {
                console.log(err)
            });

    };

    _onChange = ({ center, zoom }) => {
        console.log("Center", this.state.center)
        console.log("zoom", this.state.zoom)
        this.setState({
            center: center,
            zoom: zoom
        });
    };

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
                 <div className="ownerWalks">
                

                        {this.state.walks.length ? (
                            <div className="ownerWalks__upcoming">
                            <List>
                            <div className="ownerWalks__upcoming--title">Upcoming Walks: </div>
                                {this.state.walks.map(walk => (


                                    <ListItem key={walk.id}>

                                        <div className="ownerWalks__upcoming--list-publish"> Walk Date: 
                                         {Moment(walk.walkDate, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}
                                        </div>
                                    </ListItem>

                                ))}

                            </List>
                            </div>
                        ) : (
                                <p className="ownerWalks__alert"> You don't have any upcomming walks!</p>
                            )}

                

                        {this.state.walks.length ? (
                            <div className="ownerWalks__past">
                            <List> 
                            <div className="ownerWalks__past--title">Walks History: </div>
                                {this.state.pastWalks.map(walk => (


                                    <ListItem key={walk.id}>

                                        <div className="ownerWalks__past--list-publish"> Walk Date:
                                         {Moment(walk.walkDate, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}
                                        </div>



                                        <div className="ownerWalks__past--list-publish"> Check In Time: {Moment(walk.checkInTime, "YYYY-MM-DD  HH:mm:ss").format("HH:mm:ss")}</div>

                                        <div className="ownerWalks__past--list-publish"> Check Out Time: {Moment(walk.checkOutTime, "YYYY-MM-DD  HH:mm:ss").format("HH:mm:ss")} </div>

                                        <div className="ownerWalks__past--list-publish"> Total Time: {Moment(walk.totalTime, "HH:mm").format("HH:mm")}</div>
                                        <button className="ownerWalks__past--list-publish-button" onClick={this.handleOnClick.bind(this, walk.id)}>Walk Map</button>


                                    </ListItem>

                                ))}

                            </List>
                            </div>
                        ) : (
                                <p className="ownerWalks__alert"> You don't have any walks!</p>
                            )}

              

                {this.state.onClickButton ? (

                    <div className="TodayWalks__past--map" style={{ display: "flex" }}>
                        <div className="TodayWalks__past--mapmap" style={{ height: '50vh', width: '50%' }}>
                            <GoogleMapReact
                               bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                               defaultCenter={this.state.currentLocation}
                               defaultZoom={this.state.zoom}
                               zoom={this.state.zoom}
                               center={this.props.center}
                               onClick={this._onChange}
                            >

                                {this.state.images.map(image => (
                                   
                                        <AnyReactComponent key={image.id} ///all of the props ie walk.img/walk.lat))}
                                            id={image.id}
                                            icon="../paw-tailme-2020.svg"
                                            lat={image.GPSLatitude}
                                            lng={image.GPSLongitude}
                                            imageClick={this.handleImgClick}
                                        />
                              
                                ))}
                            </GoogleMapReact>
                        </div>

                        <div className="TodayWalks__past--mapimage">
                            {this.state.activeImage ?
                                <img width={'300px'} src={this.state.activeImage}></img> : null}
                        </div>
                    </div>

                ) : null}

            </div>
            </Container>
        );
    }
}

export default ownerWalks;
