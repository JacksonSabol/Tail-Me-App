import React, { Component } from "react";
import API from "../../utils/API";
import Gallery from 'react-grid-gallery';




class DogOwnerGallery extends Component {
    state = {
        gallery: [],
        selectedOptions: []
    }

    componentDidMount() {
        // Load images from the gallery      
        this.loadImages()
    }

    loadImages = () => {
        const idOwner = 1; // This is the id of the dog, despite the table name being dogOwner - change to the dog id of the button clicked from Today Walks
        API.getImagesOwner(idOwner)
            .then(res => {
                const dataGallery = res.data.map(data => {
                    const imageData = {
                        id: data.id,
                        src: data.url,
                        thumbnail: data.url,
                        thumbnailWidth: 320,
                        thumbnailHeight: 212,
                        caption: data.dogOwner.dogName
                    }
                    return (imageData)
                })

                this.setState({ gallery: dataGallery })
            })

    }

    /* Leave to select option for send or delete */
    /*  onSelectImage(index, image) {
         const images = this.state.images.slice();
         console.log("images", images)
         const img = images[index];
         console.log("img", img)
         if (img.hasOwnProperty("isSelected"))
             img.isSelected = !img.isSelected;
         else
             img.isSelected = true;
 
         this.setState({
             gallery: images
         });
 
     } */

    render() {
        return (
            <div>
                <p className="rdtPicker__title">My Gallery</p>
                <Gallery
                    enableImageSelection={true}
                    backdropClosesModal={true}
                    onSelectImage={this.onSelectImage}
                    enableLightbox={true}
                    images={this.state.gallery}
                    showLightboxThumbnails={true}
                />
            </div>
        )
    }
}

export default DogOwnerGallery;