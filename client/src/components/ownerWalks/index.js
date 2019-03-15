import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import API from "../../utils/API";
import Moment from "moment";
import GoogleMapReact from "google-map-react"
import ReactTable from "react-table";
import 'react-table/react-table.css'
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
        // onClick={() => imageClick(id)}
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
        zoom: 13,
        activeImage: "",
        walks: [],
        errorMessage: "",
        onClickButton: false,
        walkId: 0,
        images: [],
        pastWalks: [],
        walkPoints: [],
        showMap: false

    }
    // Life-cycle function that executes when the components mount (page loads)



    componentDidMount() {
        this.loadWalks();
    }
    // Function to load all TodayWalks from the database
    loadWalks = () => {

        /// this is the id from the user table to match in the dogOwner table
        const id = this.props.OwnerID;
        API.getOwnerId(id)
            .then(res => {
                console.log("getOwnerId response: ", res.data);
                const dataFormat = res.data.map(data => {
                    const start_time = Moment(data.checkInTime);
                    const end_time = Moment(data.checkOutTime);
                    const difference = end_time.diff(start_time, 'minutes', true);
                    const finishedWalk = data.checkOutTime === null ? false : true
                    const dataFormatted = {
                        id: data.id,
                        checkInTime: data.checkInTime,
                        checkOutTime: data.checkOutTime,
                        totalTime: this.convertMinsToHrsMins(difference),
                        dogName: data.dogOwner.dogName,
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

    // handleOnClick = (walkId) => {
    //     console.log("walkId", walkId)
    //     API.getImagesWalk(walkId)
    //         .then(res => {
    //             console.log("back from getpics")
    //             console.log("getpics: ", res.data)
    //             // this.setState({
    //             //   walks: res.data
    //             // });
    //             let picsWithGpsInfo = res.data.filter(image => image.image.GPSLatitude != null)
    //             //   console.log("PICS GPS: ", picsWithGpsInfo)
    //             //   console.log("PICS GPS loc: ", picsWithGpsInfo[0].image.GPSLatitude)
    //             //   console.log("PICS GPS loc: ", picsWithGpsInfo[0].image.GPSLongitude)
    //             //console.log("data[0]: ", res.data[0].GPSLatitude)
    //             this.setState({
    //                 onClickButton: true,
    //                 walkId: walkId,
    //                 images: picsWithGpsInfo,
    //                 // currentLocation: {
    //                 //     lat: parseFloat(picsWithGpsInfo[0].image.GPSLatitude),
    //                 //     lng: parseFloat(picsWithGpsInfo[0].image.GPSLongitude)
    //                 // },
    //                 currentLocation: {
    //                     lat: parseFloat(picsWithGpsInfo[0].image.GPSLatitude),
    //                     lng: parseFloat(picsWithGpsInfo[0].image.GPSLongitude)
    //                 }
    //             })
    //         }).catch(err => {
    //             console.log(err)
    //         });

    // };
    handleOnClickMap = (walkId) => {

        API.getPath(walkId)
            .then(res => {

                console.log("path points:", res.data)

                let middlePoint = res.data.length / 2;
                console.log("middlePoint ", middlePoint);

                this.setState({
                    // onClickButton: true,
                    walkPoints: res.data,
                    showmap: true,
                    mapWalkId: walkId,
                    currentLocation: {
                        lat: parseFloat(res.data[middlePoint].lat),
                        lng: parseFloat(res.data[middlePoint].lng)
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
        // React Table Columns
        const { walks, pastWalks } = this.state;

        const columnsUpcoming = [{
            Header: 'Date',
            accessor: 'walkDate',
            Cell: props => <span>{Moment(props.value, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</span>
        }, {
            Header: 'Dog',
            accessor: 'dogName',
            Cell: props => <span>{props.value}</span>
        }, {
            Header: 'Check-In Time',
            Cell: row => row.original.checkInTime === null ? (
                null
            ) : (
                    <span>{Moment(row.original.checkInTime, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</span>
                )
        }, {
            Header: 'Status',
            accessor: 'status',
            Cell: props => <span>{props.value}</span>
        }];

        const columnsPast = [{
            Header: 'Date',
            accessor: 'walkDate',
            Cell: props => <span>{Moment(props.value, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</span>
        }, {
            Header: 'Dog',
            accessor: 'dogName',
            Cell: props => <span>{props.value}</span>
        }, {
            Header: 'Check In',
            accessor: 'checkInTime',
            Cell: props => <span>{Moment(props.value, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</span>
        }, {
            Header: 'Check Out',
            accessor: 'checkOutTime',
            Cell: props => <span>{Moment(props.value, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm")}</span>
        }, {
            Header: 'Total Time',
            accessor: 'totalTime',
            Cell: props => <span>{props.value}</span>
        },
        {
            // id: 'notes',
            Header: 'Notes',
            // // accessor: data => data.checkInTime,
            // // accessor: 'checkInTime',
            // Cell: row => <div><button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClickNote.bind(this, row.original.id, row.original.dogName, row.original.dogOwnerName, row.original.dogOwnerEmail, true, Moment(row.original.checkOutTime, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm"))}>Review Walk Notes</button></div>
        },
        {
            // id: '?????',
            Header: 'Map the Walk',
            // accessor: data => data.checkInTime,
            // accessor: 'checkInTime',
            Cell: row => <div><button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClickMap.bind(this, row.original.id)}>Map</button></div>
        },
        // {
        //     Header: 'Map the Walk',
        //     Cell: row => <div><button className="TodayWalks__past--list-publish-button" onClick={this.handleOnClickMap.bind(this, row.original.id)}>Map</button></div>
        // }, 
        {
            Header: 'Status',
            accessor: 'status',
            Cell: props => <span>{props.value}</span>
        }];
        return (
            <div className="ownerWalks">
                <div className="ownerWalks__reactTableUpcoming">
                    <span className="ownerWalks__reactTableUpcoming--title">Upcoming Walks: </span>
                    {this.state.walks.length ? (
                        <ReactTable
                            data={walks}
                            columns={columnsUpcoming}
                            // minWidth={100}
                            className="ownerWalks__reactTableUpcoming--table -striped -highlight"
                            getTheadProps={() => {
                                return ({
                                    style: {
                                        backgroundColor: "#4d4d4d",
                                        color: "#1190cb"
                                    }
                                })
                            }}
                            getPaginationProps={() => {
                                return ({
                                    style: {
                                        backgroundColor: "#696969",
                                        color: "#1190cb"
                                    }
                                })
                            }}
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
                            <p className="ownerWalks__alert">There are no upcoming walks scheduled.</p>
                        )}
                </div>
                <div className="ownerWalks__reactTablePast">
                    {/* <button className="ownerWalks__past--list-publish-button" onClick={this.handleOnClickMap.bind(this, 47)}>Map the Walk</button> */}

                    <span className="ownerWalks__reactTablePast--title">Completed Walks: </span>
                    {this.state.pastWalks.length ? (
                        <ReactTable
                            data={pastWalks}
                            columns={columnsPast}
                            // minWidth={100}
                            className="ownerWalks__reactTablePast--table -striped -highlight"
                            getTheadProps={() => {
                                return ({
                                    style: {
                                        backgroundColor: "#4d4d4d",
                                        color: "#1190cb"
                                    }
                                })
                            }}
                            getPaginationProps={() => {
                                return ({
                                    style: {
                                        backgroundColor: "#696969",
                                        color: "#1190cb"
                                    }
                                })
                            }}
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
                            <p className="ownerWalks__alert">No history of previous walks found.</p>
                        )}
                </div>
                {this.state.mapWalkId ? (
                    <div className="ownerWalks__past--map" style={{ display: "flex" }}>
                        <div className="ownerWalks__past--mapmap" style={{ height: '50vh', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                                // defaultCenter={this.state.currentLocation}
                                defaultZoom={this.state.zoom}
                                zoom={this.state.zoom}
                                center={this.state.currentLocation}
                                onClick={this._onChange}
                            >
                                {this.state.walkPoints
                                    .filter(point => point.pointType === "in")
                                    .map(point => (
                                        <AnyReactComponent key={point.id}///all of the props ie walk.img/walk.lat))}
                                            id={point.id}
                                            icon="../paw-green-2020.svg"
                                            lat={point.lat}
                                            lng={point.lng}
                                        // imageClick={this.handleImgClick}
                                        />

                                    ))}
                                {this.state.walkPoints
                                    .filter(point => point.pointType === "dot")
                                    .map(point => (
                                        <AnyReactComponent key={point.id}///all of the props ie walk.img/walk.lat))}
                                            id={point.id}
                                            icon="../paw-tailme-2020.svg"
                                            lat={point.lat}
                                            lng={point.lng}
                                        // imageClick={this.handleImgClick}
                                        />

                                    ))}
                                {this.state.walkPoints
                                    .filter(point => point.pointType === "out")
                                    .map(point => (
                                        <AnyReactComponent key={point.id}///all of the props ie walk.img/walk.lat))}
                                            id={point.id}
                                            icon="../paw-red-2020.svg"
                                            lat={point.lat}
                                            lng={point.lng}
                                        // imageClick={this.handleImgClick}
                                        />

                                    ))}
                            </GoogleMapReact>
                        </div>
                        {/* <div className="ownerWalks__past--mapimage">
                            {this.state.activeImage ?
                                <img width={'300px'} src={this.state.activeImage}></img> : null}
                        </div> */}
                    </div>

                ) : null}
            </div>
        );
    }
}

export default ownerWalks;
