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
        zoom: 14,
        activeImage: "",
        walks: [],
        errorMessage: "",
        onClickButton: false,
        walkId: 0,
        images: [],
        pastWalks: []

    }
    // Life-cycle function that executes when the components mount (page loads)



    componentDidMount() {
        this.loadWalks();
    }
    // Function to load all TodayWalks from the database
    loadWalks = () => {

        /// this is the id from the user table to match in the dogOwner table
        const id = this.props.dogOwnerId;
        API.getOwnerId(id)
            .then(res => {
                const dogs = {};
                const ongoingWalks = [];
                const completedWalks = [];
                console.log("data from getOwnerId: ", res.data);
                const dogData = res.data.map(dogData => {
                    dogs[dogData.dogName] = [];
                    const dataFormat = dogData.walks.map(data => {
                        // console.log(data);
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
                        dogs[dogData.dogName].push(dataFormatted);
                    });
                    // console.log("Data Format", dogs)
                    const finishedWalks = dogs[dogData.dogName].filter(data => data.finishedWalk === true)
                    const UpcomingWalks = dogs[dogData.dogName].filter(data => data.finishedWalk === false)
                    // console.log("finished walks: ", finishedWalks);
                    // console.log("upcoming Walks: ", UpcomingWalks);
                    for (var i = 0; i < finishedWalks.length; i++) {
                        completedWalks.push(finishedWalks[i]);
                    }
                    for (var i = 0; i < UpcomingWalks.length; i++) {
                        ongoingWalks.push(UpcomingWalks[i]);
                    }
                });
                // console.log("dogs object: ", dogs);
                // console.log("ongoingWalks: ", ongoingWalks);
                // console.log("completedWalks: ", completedWalks);
                this.setState({
                    walks: ongoingWalks,
                    pastWalks: completedWalks
                })
            })
            .catch(err => console.log(err));

        // let getOwnerwalks = (id) => {
        //     console.log("id",id)
        //     API.getOwnerWalks(id)
        //         .then(res => {

        //             const dataFormat = res.data.map(data => {

        //                 const start_time = Moment(data.checkInTime);
        //                 const end_time = Moment(data.checkOutTime);
        //                 const difference = end_time.diff(start_time, 'minutes', true);

        //                 const finishedWalk = data.checkInTime === null ? false : true

        //                 const dataFormatted = {
        //                     checkInTime: data.checkInTime,
        //                     checkOutTime: data.checkOutTime,
        //                     totalTime: this.convertMinsToHrsMins(difference),
        //                     id: data.id,
        //                     walkDate: data.walkDate,
        //                     finishedWalk: finishedWalk

        //                 }


        //                 return (dataFormatted)
        //             });
        //             console.log("Data Format", dataFormat)

        //             const finishedWalks = dataFormat.filter(data => data.finishedWalk === true)
        //             const UpcommingWalks = dataFormat.filter(data => data.finishedWalk === false)
        //             console.log("UpcommingWalks", UpcommingWalks)
        //             console.log("finishedWalks", finishedWalks)
        //             this.setState({
        //                 walks: UpcommingWalks,
        //                 pastWalks: finishedWalks
        //             })

        //         })

        //         .catch(err => console.log(err));
        // }
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
                let picsWithGpsInfo = res.data.filter(image => image.image.GPSLatitude != null)
                //   console.log("PICS GPS: ", picsWithGpsInfo)
                //   console.log("PICS GPS loc: ", picsWithGpsInfo[0].image.GPSLatitude)
                //   console.log("PICS GPS loc: ", picsWithGpsInfo[0].image.GPSLongitude)
                //console.log("data[0]: ", res.data[0].GPSLatitude)
                this.setState({
                    onClickButton: true,
                    walkId: walkId,
                    images: picsWithGpsInfo,
                    // currentLocation: {
                    //     lat: parseFloat(picsWithGpsInfo[0].image.GPSLatitude),
                    //     lng: parseFloat(picsWithGpsInfo[0].image.GPSLongitude)
                    // },
                    currentLocation: {
                        lat: parseFloat(picsWithGpsInfo[0].image.GPSLatitude),
                        lng: parseFloat(picsWithGpsInfo[0].image.GPSLongitude)
                    }
                })
            }).catch(err => {
                console.log(err)
            });

    };

    _onChange = ({ center, zoom }) => {
        console.log("Center", this.state.center)
        console.log("zoom", this.state.zoom)
        this.setState({
            currentLocation: center,
            zoom: zoom
        });
    };

    handleImgClick = (id) => {

        console.log("id: ", id)
        let clickWalk = this.state.images.filter(image => image.id === id)
        console.log(clickWalk)
        this.setState({ activeImage: clickWalk[0].image.url })

    }

    convertMinsToHrsMins = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        h = h < 1 ? '00' : h;
        m = m > 0 ? Math.round(m) : m;
        m = m < 10 ? '0' + m : m;
        return `${h}h:${m}m`;
    };

    render() {
        return (
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
                        <p className="ownerWalks__alert"> There are no upcoming walks scheduled.</p>
                    )}
                {this.state.pastWalks.length ? (
                    <div className="ownerWalks__past">
                        <List>
                            <div className="ownerWalks__past--title">Walks History: </div>
                            {this.state.pastWalks.map(walk => (
                                <ListItem key={walk.id}>

                                    <div className="ownerWalks__past--list-publish"> Walk Date: {Moment(walk.walkDate, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</div>

                                    <div className="ownerWalks__past--list-publish"> Check In Time: {Moment(walk.checkInTime, "YYYY-MM-DD  HH:mm:ss").format("HH:mm:ss")}</div>

                                    <div className="ownerWalks__past--list-publish"> Check Out Time: {Moment(walk.checkOutTime, "YYYY-MM-DD  HH:mm:ss").format("HH:mm:ss")} </div>

                                    <div className="ownerWalks__past--list-publish"> Total Time: {walk.totalTime}</div>

                                    <button className="ownerWalks__past--list-publish-button" onClick={this.handleOnClick.bind(this, walk.id)}>Walk Map</button>

                                </ListItem>
                            ))}
                        </List>
                    </div>
                ) : (
                        <p className="ownerWalks__alert"> No history of previous walks found.</p>
                    )}
                {this.state.onClickButton ? (
                    <div className="TodayWalks__past--map" style={{ display: "flex" }}>
                        <div className="TodayWalks__past--mapmap" style={{ height: '50vh', width: '50%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                                //    defaultCenter={this.state.currentLocation}
                                defaultZoom={this.state.zoom}
                                zoom={this.state.zoom}
                                center={this.state.currentLocation}
                                onClick={this._onChange}
                            >
                                {this.state.images.map(image => (
                                    <AnyReactComponent key={image.id} ///all of the props ie walk.img/walk.lat))}
                                        id={image.id}
                                        icon="../paw-tailme-2020.svg"
                                        lat={image.image.GPSLatitude}
                                        lng={image.image.GPSLongitude}
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
        );
    }
}

export default ownerWalks;
