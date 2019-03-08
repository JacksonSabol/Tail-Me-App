import React, { Component } from "react";
import axios from 'axios';
import API from "../../utils/API";
import Moment from "moment";
import GoogleMapReact from "google-map-react"
import "../../index.css";
import Modal from 'react-modal';
import ReactTable from "react-table";
import 'react-table/react-table.css'

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
        walkerFullName: this.props.walkerName,
        walkerEmail: this.props.walkerEmail,
        walkId: 0,
        mapWalkId: 0,
        noteWalkId: 0,
        images: [],
        walkPoints: [],
        pastWalks: [],
        showMap: false,
        locationckeck: false,
        modalIsOpen: false,
        valueNote: "",
        noteOwnerName: "",
        noteOwnerEmail: "",
        noteDogName: "",
        noteCheckOutTime: 0,
        enableEmail: false,
        intervalID: 0
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
        this.loadWalks();

    }
    // Function to load all TodayWalks from the database
    loadWalks = () => {
        const id = this.props.walkerId;
        API.getWalkerWalks(id)
            .then(res => {
                console.log("loadWalks response: ", res.data);
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
                        dogName: data.dogOwner.dogName,
                        dogOwnerName: data.dogOwner.user.firstName + " " + data.dogOwner.user.lastName,
                        dogOwnerEmail: data.dogOwner.user.auth.email,
                        walkDate: data.walkDate,
                        status: data.status,
                        finishedWalk: finishedWalk
                    }
                    return (dataFormatted)
                });
                const finishedWalks = dataFormat.filter(data => data.finishedWalk === true)
                const upcomingWalks = dataFormat.filter(data => data.finishedWalk === false)

                this.setState({
                    walks: upcomingWalks,
                    pastWalks: finishedWalks
                })
            })
            .catch(err => console.log(err));
    };

    handleOnClick = (walkId) => {

        API.getImagesWalk(walkId)
            .then(res => {
                // console.log("back from getpics")
                // console.log("getpics: ", res.data)
                // console.log("getpics dot image: ", res.data[0].image)

                // this.setState({
                //   walks: res.data
                // });

                let picsWithGpsInfo = res.data.filter(image => image.image.GPSLatitude != null);
                // console.log("PICS GPS: ", picsWithGpsInfo)
                // console.log("PICS GPS loc: ", picsWithGpsInfo[0].image.GPSLatitude)
                // console.log("PICS GPS loc: ", picsWithGpsInfo[0].image.GPSLongitude)
                // console.log("data[0]: ", res.data[0].GPSLatitude)
                this.setState({
                    // onClickButton: true,
                    showmap: true,
                    mapWalkId: walkId,
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

    handleOnClickMap = (walkId) => {

        API.getPath(walkId)
        .then(res => {
          
            console.log("path points:", res.data)
    
            this.setState({
                // onClickButton: true,
                walkPoints: res.data,
                showmap: true,
                mapWalkId: walkId,
                currentLocation: {
                    lat: parseFloat(res.data[0].lat),
                    lng: parseFloat(res.data[0].lng)
                }

            })

        }).catch(err => {
            console.log(err)
        });
    };

    _onChange = ({ center, zoom }) => {
        // console.log("Center", this.state.center)
        // console.log("zoom", this.state.zoom)
        this.setState({
            currentLocation: center,
            zoom: zoom

        });
    };

    handleImgClick = (id) => {
        // console.log("id: ", id)
        let clickWalk = this.state.images.filter(image => image.id === id)
        // console.log(clickWalk)
        this.setState({ activeImage: clickWalk[0].image.url })
    };


    handleCheckIn = (walkId, dogName) => {
        console.log("checkin")
        // Pass dogName as an object
        const dogData = {
            dogName: dogName
        }

        // if the location in the browser is not activated we update the checkin time and keep the coords we value 0

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                let coords = pos.coords;

                console.log("coords IN: ", coords);
               
                // set the timmer record walk geolocation points 

                this.intervalID = setInterval(() => {
                    console.log("recpath", walkId)
                    let options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };

                    function success(pos) {
                        var crd = pos.coords;

                        console.log('Your current position is:');
                        console.log(`Latitude : ${crd.latitude}`);
                        console.log(`Longitude: ${crd.longitude}`);
                        console.log(`More or less ${crd.accuracy} meters.`);
                        let coords = pos.coords;
                        console.log("coords innside recpath", coords)

                        API.updatePath(walkId, coords.latitude, coords.longitude)
                            .then(res => {
                                console.log("back from update path")
                            }).catch(err => {
                                console.log(err)
                            });
                    }

                    function error(err) {
                        console.warn(`ERROR(${err.code}): ${err.message}`);
                    }

                    navigator.geolocation.getCurrentPosition(success, error, options);

                }, 300000);


                API.updateCheckInOut("in", walkId, coords.latitude, coords.longitude, dogData)
                    .then(res => {
                   
                        this.loadWalks();
                
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
            API.updateCheckInOut("in", walkId, coords.latitude, coords.longitude, dogData)
                .then(res => {
                    // console.log("back from update checkIn")
                    // console.log("updateCheck: ", res.data)
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

    handleCheckOut = (walkId, dogName) => {
        console.log("checkout")
        // const walkerName = this.props.walkerName;
        // const walkerEmail = this.props.walkerEmail;
        // const ownerName = this.props.ownerName; // Add function to get owner name and/or add it to each dog
        // const ownerEmail = this.props.ownerName; // Add function to get owner email and/or add it to each dog
        // const subject = `Walk Summary for ${dogName} at ${Moment(Date.now()).format("HH:mm - MM/DD/YYYY")}`; // Maybe change to subject field on Modal that autopopulates with this

        // clearTimeout(timeWalk)
        clearInterval(this.intervalID);

        API.getNote(walkId)
            .then(res => {
                //Here is the note to insert at the bottom of the email
                const noteCheckOutHeading = `Hi ${this.state.noteOwnerName}, I have completed a walk with your dog, ${this.state.noteDogName}. Below are the details.`;
                const noteCheckOut = `Your dog, ${dogName}, was dropped off at ${Moment(Date.now()).format("HH:mm - MM/DD/YYYY")}.\n\nKind Regards,\n\n${this.state.walkerFullName}`;
                const dataNote = {
                    dogName: dogName,
                    note: `${noteCheckOutHeading}\n\n${res.data.note}\n\n${noteCheckOut}`
                }
                if (navigator && navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(pos => {
                        let coords = pos.coords;
                        // console.log("walkId OUT: ", walkId);
                        // console.log("coords OUT: ", coords);
                        // update walks start time and coordinates and end time and coords

                        API.updateCheckInOut("out", walkId, coords.latitude, coords.longitude, dataNote)
                            .then(res => {
                                // console.log("back from update checkIn")
                                // console.log("updateCheck: ", res.data)
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
                            // console.log("back from update checkIn")
                            // console.log("updateCheck: ", res.data)
                            this.loadWalks();
                        }).catch(err => {
                            console.log(err)
                        });
                }


            }).catch(err => {
                console.log(err)
            });

    };

    handleOnClickNote = (walkId, dogName, dogOwnerName, dogOwnerEmail, review, checkOutTime) => {
        //For conditional Render. If Review Mode then enable Email Button
        const enabelEmail = review ? this.setState({ enableEmail: true }) : this.setState({ enableEmail: false })

        //Get Note to send to the Modal
        API.getNote(walkId)
            .then(res => {
                this.setState({
                    valueNote: res.data.note,
                    noteWalkId: walkId,
                    noteOwnerName: dogOwnerName,
                    noteOwnerEmail: dogOwnerEmail,
                    noteDogName: dogName,
                    noteCheckOutTime: checkOutTime
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

        API.addNote(this.state.noteWalkId, notes)
            .then(res => {
                this.closeModal()
            }).catch(err => {
                console.log(err)
            });

    }

    //Send Email Code
    handleSendEmail(event) {
        event.preventDefault();
        const data = {
            walkerName: this.state.walkerFullName,
            walkerEmail: this.state.walkerEmail,
            ownerEmail: this.state.noteOwnerEmail,
            subject: `Walk Summary for ${this.state.noteDogName} at ${this.state.noteCheckOutTime}`,
            notes: this.state.valueNote
        }
        axios
            .post('/mail/notes', {
                walkerName: data.walkerName,
                walkerEmail: data.walkerEmail,
                ownerName: data.ownerName,
                subject: data.subject,
                notes: data.notes
            })
            .then(response => {
                console.log(response);
                this.closeModal();
                // this.setState({ messageSent: true });
            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: true });
            });
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
        // React Table Test
        const { walks, pastWalks } = this.state;

        const columnsUpcoming = [{
            // id: 'date',
            Header: 'Date',
            // accessor: data => data.walkDate,
            accessor: 'walkDate',
            Cell: props => <span>{Moment(props.value, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</span>
        }, {
            // id: 'dogName',
            Header: 'Dog',
            // accessor: data => data.dogOwner.dogName,
            accessor: 'dogName',
            Cell: props => <span>{props.value}</span>
        }, {
            // id: 'checkinTime',
            Header: 'Check-In/Check-Out',
            // accessor: data => data.checkInTime,
            // accessor: 'checkInTime',

            Cell: row => row.original.checkInTime === null ? (
                <div><button className="TodayWalks__upcoming--list-publish-button" onClick={this.handleCheckIn.bind(this, row.original.id, row.original.dogName)}>Check-in </button></div>
            ) : (
                    <div>
                        <button className="TodayWalks__upcoming--list-publish-button" onClick={this.handleCheckOut.bind(this, row.original.id, row.original.dogName)}>
                            Check-out
                        </button>
                    </div>
                )
        }, {
            // id: 'notes',
            Header: 'Notes',
            // accessor: data => data.checkInTime,
            // accessor: 'checkInTime',
            Cell: row => row.original.checkInTime === null ? (null) : (
                <div><button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClickNote.bind(this, row.original.id, row.original.dogName, row.original.dogOwnerName, row.original.dogOwnerEmail, true, Moment(row.original.checkOutTime, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm"))}>Review Walk Notes</button></div>
            )
        },
        {
            // id: 'checkinTime',
            Header: 'Status',
            // accessor: data => data.checkInTime,
            accessor: 'status',
            Cell: props => <span>{props.value}</span>
        }];

        const columnsPast = [{
            // id: 'date',
            Header: 'Date',
            // accessor: data => data.walkDate,
            accessor: 'walkDate',
            Cell: props => <span>{Moment(props.value, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</span>
        }, {
            // id: 'dogName',
            Header: 'Dog',
            // accessor: data => data.dogOwner.dogName,
            accessor: 'dogName',
            Cell: props => <span>{props.value}</span>
        }, 
        
        {
            // id: 'checkinTime',
            Header: 'Check In',
            // accessor: data => data.checkInTime,
            accessor: 'checkInTime',
            Cell: props => <span>{Moment(props.value, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</span>
        }, {
            // id: 'checkOutTime',
            Header: 'Check Out',
            // accessor: data => data.checkOutTime,
            accessor: 'checkOutTime',
            Cell: props => <span>{Moment(props.value, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</span>
        }, {
            // id: 'totalTime',
            Header: 'Total Time',
            // accessor: data => data.totalTime,
            accessor: 'totalTime',
            Cell: props => <span>{props.value}</span>
        },
        {
            // id: 'notes',
            Header: 'Notes',
            // accessor: data => data.checkInTime,
            // accessor: 'checkInTime',
            Cell: row => <div><button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClickNote.bind(this, row.original.id, row.original.dogName, row.original.dogOwnerName, row.original.dogOwnerEmail, true, Moment(row.original.checkOutTime, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm"))}>Review Walk Notes</button></div>
        },
        {
            // id: '?????',
            Header: 'Map the Walk',
            // accessor: data => data.checkInTime,
            // accessor: 'checkInTime',
            Cell: row => <div><button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClickMap.bind(this, row.original.id)}>Map</button></div>
        },
        {
            // id: 'checkinTime',
            Header: 'Status',
            // accessor: data => data.checkInTime,
            accessor: 'status',
            Cell: props => <span>{props.value}</span>
        }];
        return (
            <div className="TodayWalks">
                <div className="TodayWalks__reactTableUpcoming">
                    <span className="TodayWalks__reactTableUpcoming--title">Upcoming Walks: </span>
                    {this.state.walks.length ? (
                        <ReactTable
                            data={walks}
                            columns={columnsUpcoming}
                            // minWidth={100}
                            className="TodayWalks__reactTableUpcoming--table -striped -highlight"
                            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                            showPagination={true}
                            sortable={true}
                            defaultSorted={[
                                {
                                    id: "walkDate",
                                    desc: false
                                }
                            ]}
                            multiSort={true}
                            resizable={true}
                            defaultPageSize={5}
                            minRows={3}
                            SubComponent={row => {
                                // SubComponent for accessing original row values
                                const columns = [
                                    {
                                        Header: "Property",
                                        accessor: "property",
                                        width: 200,
                                        Cell: ci => {
                                            return `${ci.value}:`;
                                        },
                                        style: {
                                            backgroundColor: "#DDD",
                                            textAlign: "right",
                                            fontWeight: "bold"
                                        }
                                    }
                                ];
                                const rowData = Object.keys(row.original).map(key => {
                                    return {
                                        property: key,
                                        value: row.original[key].toString()
                                    };
                                });
                                return (
                                    <div style={{ padding: "10px", width: "40%" }}>
                                        <ReactTable
                                            data={rowData}
                                            columns={columns}
                                            pageSize={rowData.length}
                                            showPagination={false}
                                        />
                                    </div>
                                );
                            }}
                        />
                    ) : (
                            <p className="TodayWalks__alert">There are no upcoming walks scheduled.</p>
                        )}
                </div>
                <div className="TodayWalks__reactTablePast">
                    {/* <button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClickMap.bind(this, 47)}>Map the Walk</button> */}

                    <span className="TodayWalks__reactTablePast--title">Completed Walks: </span>
                    {this.state.pastWalks.length ? (
                        <ReactTable
                            data={pastWalks}
                            columns={columnsPast}
                            // minWidth={100}
                            className="TodayWalks__reactTablePast--table -striped -highlight"
                            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                            showPagination={true}
                            sortable={true}
                            defaultSorted={[
                                {
                                    id: "walkDate",
                                    desc: true
                                }
                            ]}
                            multiSort={true}
                            resizable={true}
                            defaultPageSize={5}
                            minRows={3}
                            SubComponent={row => {
                                // SubComponent for accessing original row values
                                const columns = [
                                    {
                                        Header: "Property",
                                        accessor: "property",
                                        width: 200,
                                        Cell: ci => {
                                            return `${ci.value}:`;
                                        },
                                        style: {
                                            backgroundColor: "#DDD",
                                            textAlign: "right",
                                            fontWeight: "bold"
                                        }
                                    }
                                ];
                                const rowData = Object.keys(row.original).map(key => {
                                    return {
                                        property: key,
                                        value: row.original[key].toString()
                                    };
                                });
                                return (
                                    <div style={{ padding: "10px", width: "40%" }}>
                                        <ReactTable
                                            data={rowData}
                                            columns={columns}
                                            pageSize={rowData.length}
                                            showPagination={false}
                                        />
                                    </div>
                                );
                            }}
                        />
                    ) : (
                            <p className="TodayWalks__alert">No history of previous walks found.</p>
                        )}
                </div>
                {this.state.mapWalkId ? (
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
                                {this.state.walkPoints.map(point => (
                                    <AnyReactComponent key={point.id}///all of the props ie walk.img/walk.lat))}
                                        id={point.id}
                                        icon="../paw-tailme-2020.svg"
                                        lat={point.lat}
                                        lng={point.lng}
                                        // imageClick={this.handleImgClick}
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
                    {this.state.noteCheckOutTime === 0 ? (
                        <p>Walk In-Progress</p>
                    ) : (
                            <p>Email Subject: Walk Summary for {this.state.noteDogName} at {this.state.noteCheckOutTime}</p>
                        )
                    }
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <textarea value={this.state.valueNote} onChange={this.handleChange}
                                rows="15" cols="50" />

                        </label>
                        <br></br>
                        <input type="submit" value="Save" />

                        {/*  conditional render for the send email button */}

                        {this.state.enableEmail ? (
                            <button onClick={this.handleSendEmail.bind(this)}>Send Email</button>
                        ) : null}
                    </form>

                </Modal>
            </div>
        );
    }
}

export default TodayWalks;