import React, { Component } from "react";
import { List, ListItem } from "../List";
import API from "../../utils/API";
import Moment from "moment";
import GoogleMapReact from "google-map-react"
import "../../index.css";
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        zIndex: '1',
        transform: 'translate(-50%, -50%)'

    }
};


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
        transform: 'translate(-50%, -50%)'
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
        // center: {
        //     lat: 37.7924791,
        //     lng: -122.1818368
        // },
        zoom: 14,
        activeImage: "",
        walks: [],
        errorMessage: "",
        onClickButton: false,
        walkId: 0,
        images: [],
        pastWalks: [],
        showMap: false,
        locationckeck: false,
        modalIsOpen: false,
        valueNote: "",
        enableEmail:false
    }
    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);
    openModal = this.openModal.bind(this);
    closeModal = this.closeModal.bind(this);


    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    // Life-cycle function that executes when the components mount (page loads)
    componentDidMount() {
        console.log("this.state")
        console.log(this.state)
        this.loadWalks();
    }
    // Function to load all TodayWalks from the database
    loadWalks = () => {
        const id = this.props.walkerId;
        API.getWalkerWalks(id)
            .then(res => {
                const dataFormat = res.data.map(data => {
                    const start_time = Moment(data.checkInTime);
                    const end_time = Moment(data.checkOutTime);
                    const difference = end_time.diff(start_time, 'minutes', true);
                    const finishedWalk = data.checkOutTime === null ? false : true
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
                const finishedWalks = dataFormat.filter(data => data.finishedWalk === true)
                const UpcommingWalks = dataFormat.filter(data => data.finishedWalk === false)
            
                this.setState({
                    walks: UpcommingWalks,
                    pastWalks: finishedWalks
                })
            })
            .catch(err => console.log(err));
    };

    handleOnClick = (walkId) => {
       
        API.getImagesWalk(walkId)
            .then(res => {
                console.log("back from getpics")
                console.log("getpics: ", res.data)
                console.log("getpics dot image: ", res.data[0].image)
                // this.setState({
                //   walks: res.data
                // });
                let picsWithGpsInfo = res.data.filter(image => image.image.GPSLatitude != null);
                console.log("PICS GPS: ", picsWithGpsInfo)
                console.log("PICS GPS loc: ", picsWithGpsInfo[0].image.GPSLatitude)
                console.log("PICS GPS loc: ", picsWithGpsInfo[0].image.GPSLongitude)
                // console.log("data[0]: ", res.data[0].GPSLatitude)
                this.setState({
                    // onClickButton: true,
                    showmap: true,
                    walkId: walkId,
                    images: picsWithGpsInfo,
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
    };


    handleCheckIn = (walkId) => {


        // if the location in the browser is not activated we update the checkin time and keep the coords we value 0

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                let coords = pos.coords;

                console.log("walkId IN: ", walkId);
                console.log("coords IN: ", coords);


                API.updateCheckInOut("in", walkId, coords.latitude, coords.longitude)
                    .then(res => {
                        console.log("back from update checkIn")
                        console.log("updateCheck: ", res.data)
                        // this.setState({
                        //   walks: res.data
                        // });
                        this.loadWalks();
                        //console.log("data[0]: ", res.data[0].GPSLatitude)
                        // this.setState({
                        //   locationckeck: true
                        // })
                    }).catch(err => {
                        console.log(err)
                    });
            })
        }
        else {

            let coords = {
                latitude: 0,
                longitude: 0
            }
            API.updateCheckInOut("in", walkId, coords.latitude, coords.longitude)
                .then(res => {
                    console.log("back from update checkIn")
                    console.log("updateCheck: ", res.data)
                    // this.setState({
                    //   walks: res.data
                    // });
                    this.loadWalks();
                    //console.log("data[0]: ", res.data[0].GPSLatitude)
                    // this.setState({
                    //   locationckeck: true
                    // })
                }).catch(err => {
                    console.log(err)
                });
        }
    };

    handleCheckOut = (walkId) => {
        
        API.getNote(walkId)
            .then(res => {
                //Here is the note to insert at the bottom of the email
                const noteCheckOut = "Text for checkOut"
                const dataNote = {
                    note: `${res.data.note} \n\n\n ${noteCheckOut}`
                }
                if (navigator && navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(pos => {
                        let coords = pos.coords;
                        console.log("walkId OUT: ", walkId);
                        console.log("coords OUT: ", coords);
                        // update walks start time and coordinates and end time and coords
                        API.updateCheckInOut("out", walkId, coords.latitude, coords.longitude, dataNote)
                            .then(res => {
                                console.log("back from update checkIn")
                                console.log("updateCheck: ", res.data)
                                // this.setState({
                                //   walks: res.data
                                // });
                                this.loadWalks();
                                //console.log("data[0]: ", res.data[0].GPSLatitude)
                                // this.setState({
                                //   locationckeck: true
                                // })
                            }).catch(err => {
                                console.log(err)
                            });
                    });
                }
                else {
                    let coords = {
                        latitude: 0,
                        longitude: 0
                    }
                    API.updateCheckInOut("out", walkId, coords.latitude, coords.longitude, dataNote)
                        .then(res => {
                            console.log("back from update checkIn")
                            console.log("updateCheck: ", res.data)
                            this.loadWalks();
                        }).catch(err => {
                            console.log(err)
                        });
                }


            }).catch(err => {
                console.log(err)
            });

    };

    handleOnClickNote = (walkId,review) => {
        //For conditional Render. If Review Mode then enable Email Button
        const enabelEmail=review?this.setState({enableEmail:true}):this.setState({enableEmail:false})
        
        //Get Note to send to the Modal
        API.getNote(walkId)
            .then(res => {
                this.setState({
                    valueNote: res.data.note,
                    walkId: walkId
                })

            }).catch(err => {
                console.log(err)
            });
        this.openModal()
    }

    //Get the value of the note
    handleChange(event) {
        this.setState({ valueNote: event.target.value });
    }

    //Update the walk note
    handleSubmit(event) {
      event.preventDefault();
        const notes = {
            note: this.state.valueNote
        }

        API.addNote(this.state.walkId, notes)
            .then(res => {
                this.closeModal()
            }).catch(err => {
                console.log(err)
            });

    }

    //Send Email Code
    handleSendEmail() {
        console.log("sendEmail")
    }

    convertMinsToHrsMins = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h}h:${m}m`;
    };


    render() {
        return (


            <div className="TodayWalks">
                {this.state.walks.length ? (
                    <div className="TodayWalks__upcoming">
                        <List >
                            <div className="TodayWalks__upcoming--title">Upcoming Walks: </div>
                            {this.state.walks.map(walk => (
                                <ListItem key={walk.id}>
                                    <div className="TodayWalks__upcoming--list-publish"> Walk Date:
                                         {Moment(walk.walkDate, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}
                                        {walk.checkInTime === null ? (
                                            <button className="TodayWalks__upcoming--list-publish-button" onClick={this.handleCheckIn.bind(this, walk.id)}>Check-in </button>) :
                                            (
                                                <div>
                                                    <button className="TodayWalks__upcoming--list-publish-button" onClick={this.handleCheckOut.bind(this, walk.id)}>
                                                        Check-out
                                                    </button>

                                                    <button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClickNote.bind(this, walk.id,false)}

                                                    >Add Walk Notes</button>
                                                </div>




                                            )}
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    </div>

                ) : (
                        <p className="TodayWalks__alert"> You don't have any upcoming walks!</p>
                    )}

                {this.state.pastWalks.length ? (
                    <div className="TodayWalks__past">
                        <List>
                            <div className="TodayWalks__past--title">Walks History: </div>
                            {this.state.pastWalks.map(walk => (
                                <ListItem key={walk.id}>

                                    <div className="TodayWalks__past--list-publish"> Walk Date: {Moment(walk.walkDate, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</div>

                                    <div className="TodayWalks__past--list-publish"> Check In Time: {Moment(walk.checkInTime, "YYYY-MM-DD  HH:mm:ss").format("HH:mm:ss")}</div>

                                    <div className="TodayWalks__past--list-publish"> Check Out Time: {Moment(walk.checkOutTime, "YYYY-MM-DD  HH:mm:ss").format("HH:mm:ss")} </div>

                                    <div className="TodayWalks__past--list-publish"> Total Time: {Moment(walk.totalTime, "HH:mm").format("HH:mm")}</div>
                                    <button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClick.bind(this, walk.id)}>Walk Map</button>

                                    <button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClickNote.bind(this, walk.id,true)}

                                    >Review Walk Notes</button>

                                </ListItem>
                            ))}
                        </List>
                    </div>
                ) : (
                        <p className="TodayWalks__alert"> You don't have any previous walks!</p>
                    )}

                {this.state.walkId ? (
                    <div className="TodayWalks__past--map" style={{ display: "flex" }}>
                        <div className="TodayWalks__past--mapmap" style={{ height: '50vh', width: '50%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                                // defaultCenter={this.state.currentLocation}
                                defaultZoom={this.state.zoom}
                                zoom={this.state.zoom}
                                center={this.state.currentLocation}
                                onClick={this._onChange}
                            >
                                {this.state.images.map(image => (
                                    <AnyReactComponent key={image.id}///all of the props ie walk.img/walk.lat))}
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

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add Note"
                    ariaHideApp={false}
                >

                    {/* <h2 ref={subtitle => this.subtitle = subtitle}>Test</h2> */}
                    <button onClick={this.closeModal}>X</button>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                        <textarea value={this.state.valueNote} onChange={this.handleChange}
                                rows="15" cols="50" />

                        </label>
                        <br></br>
                        <input type="submit" value="Submit" />
                        
                       {/*  conditional render for the send email button */}

                        {this.state.enableEmail ? (
                        <button onClick={this.handleSendEmail.bind(this)} > Send  Email</button>
                        ) : null}
                    </form>

                </Modal>
            </div>
        );
    }
}

export default TodayWalks;