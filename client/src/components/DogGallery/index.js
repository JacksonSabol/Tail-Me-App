import React, { Component } from "react";
import API from "../../utils/API";
import Gallery from 'react-grid-gallery';
import GoogleMapReact from "google-map-react"



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

class DogOwnerGallery extends Component {
    state = {
        gallery: [],
        selectedOptions: [],
        showMap: false,
        buttonText: "Show Map",
        title: "My Gallery",
        zoom: 10,
        currentLocation: {
            lat: 37.7924791,
            lng: -122.1818368
        },
        images: [],
        activeImage: "",
        walkPoints: [],
        pastWalks: [],
        showMap: false
    }

    componentDidMount() {
        // Load images from the gallery      
        this.loadImages()
    }

    loadImages = () => {
        const userId = this.props.userId;
        API.getImagesOwner(userId)
            .then(res => {
                // console.log(res.data[0]);
            
                if (res.data[0]) {

                    const users = res.data[0].walkImages
                    const arrayPhotos = []
                    const imagesWalkGallery = users.map(walkImage => {
                        const imageData = {
                            id: walkImage.image.id,
                            src: walkImage.image.url,
                            thumbnail: walkImage.image.url,
                            thumbnailWidth: 320,
                            thumbnailHeight: 212,
                            lat: walkImage.image.GPSLatitude,
                            lng: walkImage.image.GPSLongitude
                        }
                        arrayPhotos.push(imageData)
                    })

                    // console.log("arrayPhotos: ", arrayPhotos);
                    let picsWithGpsInfo = arrayPhotos.filter(image => image.lat != null);
                    // console.log("picsWithGpsInfo:", picsWithGpsInfo);

                    // Floored value for cases where middle point is not an integer
                    let middlePoint = Math.floor(picsWithGpsInfo.length / 2);
                    
                    this.setState({
                        gallery: arrayPhotos,
                        images: picsWithGpsInfo,
                        currentLocation: {
                            lat: parseFloat(picsWithGpsInfo[middlePoint].lat),
                            lng: parseFloat(picsWithGpsInfo[middlePoint].lng)
                        },
                        activeImage: picsWithGpsInfo[middlePoint].src
                    })

                }

            })

    }


    handleImgClick = (id) => {
        // console.log("id: ", id)
        let clickWalk = this.state.images.filter(image => image.id === id)
        // console.log(clickWalk)
        this.setState({ activeImage: clickWalk[0].src })
    };

    handleShowClick = event => {
        event.preventDefault();
        if (this.state.showMap == false) {
            this.setState({
                showMap: true,
                buttonText: "Show Gallery",
                title: "Places / Pictures"
            })
        } else {
            this.setState({
                showMap: false,
                buttonText: "Show Map",
                title: "My Gallery"
            })
        }

    }

    render() {

        return (
            <div className="ownerGallery">
                <button className="ownerGallery__gallery--button" onClick={this.handleShowClick}>{this.state.buttonText}</button>
                <p className="ownerGallery__Title">{this.state.title}</p>

                {!this.state.showMap ? (
                    <Gallery
                        enableImageSelection={true}
                        backdropClosesModal={true}
                        onSelectImage={this.onSelectImage}
                        enableLightbox={true}
                        images={this.state.gallery}
                        showLightboxThumbnails={true}
                    />

                ) : (

                        <div className="ownerWalks__past--map" style={{ display: "flex" }}>
                            <div className="ownerWalks__past--mapmap" style={{ height: '100vh', width: '60%' }}>
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
                                        lat={image.lat}
                                        lng={image.lng}
                                        imageClick={this.handleImgClick}
                                    />
                                ))}
                            </GoogleMapReact>
                            </div>
                            <div className="ownerWalks__past--mapimage">
                                {this.state.activeImage ?
                                    <img width={'500px'} src={this.state.activeImage}></img> : null}
                            </div>
                        </div>




                    )}
            </div>
        )
    }
}

export default DogOwnerGallery;