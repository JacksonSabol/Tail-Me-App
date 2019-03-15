import React, { Component } from "react";
import API from "../../utils/API";
import Gallery from 'react-grid-gallery';




class DogOwnerGallery extends Component {
    state = {
        gallery: [],
        selectedOptions: [],
        showMap: false,
        buttonText: "Show Map",
        title: "My Gallery"
    }

    componentDidMount() {
        // Load images from the gallery      
        this.loadImages()
    }

    loadImages = () => {
        const userId = this.props.userId;
        API.getImagesOwner(userId)
            .then(res => {
                console.log(res.data[0])
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

                        }
                        arrayPhotos.push(imageData)
                    })

                    this.setState({ gallery: arrayPhotos })

                }

            })

    }


    handleShowClick = event => {
        event.preventDefault();
        if (this.state.showMap == false) {
            this.setState({
                showMap: true,
                buttonText: "Show Gallery",
                title: "My Map"
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
            <div>
                <p className="ownerGalleryTitle">{this.state.title}</p>
                <button className="photos__gallery--btn" onClick={this.handleShowClick}>{this.state.buttonText}</button>

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

                        <div>

                        </div>

                    )}
            </div>
        )
    }
}

export default DogOwnerGallery;