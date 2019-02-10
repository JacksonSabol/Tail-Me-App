import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Container } from '../Grid';
import API from "../../utils/API";


const AnyReactComponent = ({ icon, imageClick, id }) => (
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


// const walks =
//     [
//         {
//             id: 1,
//             icon: "../paw-tailme-2020.svg",
//             lat: 37.7924791,
//             lng: -122.1818368,
//             text: "1",
//             urlImage: "https://images.unsplash.com/photo-1534628526458-a8de087b1123?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
//         },
//         {
//             id: 2,
//             icon: "../paw-tailme-2020.svg",
//             lat: 37.7929616,
//             lng: -122.1776605,
//             text: "2",
//             urlImage: "https://www.sheknows.com/wp-content/uploads/2018/08/fajkx3pdvvt9ax6btssg.jpeg"
//         },
//         {
//             id: 3,
//             icon: "../paw-tailme-2020.svg",
//             lat: 37.7947019,
//             lng: -122.1858723,
//             text: "3",
//             urlImage: "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg?quality=98&strip=all&w=782"
//         },
//         {
//             id: 4,
//             icon: "../paw-tailme-2020.svg",
//             lat: 37.7947019,
//             lng: -122.1858723,
//             text: "3",
//             urlImage: "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg?quality=98&strip=all&w=782"
//         }
//     ]

class SimpleMap extends Component {
    state = {
        currentLocation: {
            lat: 37.7924791,
            lng: -122.1818368
        },
        zoom: 10,
        activeImage: "",
        images: []
    };

    componentDidMount() {

        this.setState({
            currentLocation: {
                lat: 37.7929616,
                lng: -122.1776605,
            }
        })
        // navigator.geolocation.getCurrentPosition(pos => {
        //   const coords = pos.coords;
        //   console.log("coords: ", coords);
        //   this.setState({
        //     currentLocation: {
        //       lat: coords.latitude,
        //       lng: coords.longitude
        //     }
        //   });
        // });

        // API CALL TO GET ALL THE POINTS OF A WALK (COORDS AND TIMESTAMP)


        const walkId = 1;   // pending incorporate to a form
        API.getImagesWalk(walkId)
            .then(res => {
                console.log("back from getpics")
                console.log("getpics: ", res.data)
                let picsWithGpsInfo = res.data.filter(image =>
                    image.GPSLatitude != null)
                console.log("PICS GPS: ", picsWithGpsInfo)
                console.log("PICS GPS loc picsWithGpsInfo[0].lat: ", picsWithGpsInfo[0].GPSLatitude)
                console.log("PICS GPS loc picsWithGpsInfo[0].lng: ", picsWithGpsInfo[0].GPSLongitude)
                //console.log("data[0]: ", res.data[0].GPSLatitude)
                this.setState({
                    /*  onClickButton: true, */
                    walkId: walkId,
                    images: picsWithGpsInfo
                    // currentLocation: {
                    //     lat: picsWithGpsInfo[0].GPSLatitude,
                    //     lng: picsWithGpsInfo[0].GPSLongitude
                    // }
                })
            }).catch(err => {
                console.log(err)
            });

        // API.getImages(walkid)
        //   .then(res => {
        //     console.log("back from getpics")
        //     console.log("getpics: ", res.data)
        //     // this.setState({
        //     //   walks: res.data
        //     // });
        //     this.setState({
        //       currentLocation: {
        //         lat: 37.7947019,
        //         lng: -122.1858723
        //       }
        //     });
        //   }).catch(err => {
        //     console.log(err)
        //   });


    }


    handleImgClick = (id) => {

        console.log("id: ", id)
        let clickWalk = this.state.images.filter(image => image.id === id)
        console.log(clickWalk)
        this.setState({ activeImage: clickWalk[0].url })

    }

    render() {
        return (
            // Important! Always set the container height explicitly 
            <Container>
                <div style={{
                    display: "flex",

                }}>
                    <div style={{ height: '50vh', width: '50%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                            defaultCenter={this.state.currentLocation}
                            defaultZoom={this.state.zoom}
                        >

                            {this.state.images.map(image => (<AnyReactComponent  key={image.id} ///all of the props ie walk.img/walk.lat))}
                               id={image.id}
                                icon={"../paw-tailme-2020.svg"}
                                lat={image.GPSLatitude}
                                lng={image.GPSLongitude}
                                // text={walk.text}
                                imageClick={this.handleImgClick}
                            />))}
                        </GoogleMapReact>
                    </div>

                    <div style={{ postition: "relative" }}>
                        {this.state.activeImage ?
                            <img width={'300px'} src={this.state.activeImage}></img> : null}
                    </div>
                </div>
            </Container>
        );
    }
}

export default SimpleMap;
