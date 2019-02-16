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
        const userId = this.props.userId;
        API.getImagesOwner(userId)
            .then(res => {
                console.log(res.data[0])
                if (res.data[0]) {
                    const walks = res.data[0].dogOwner.walks

                    const arrayPhotos = []
                    const dataGallery = walks.map(data => {
                        const walkImages = data.walkImages
                        const imagesWalkGallery = walkImages.map(walkImage => {

                            const imageData = {
                                id: walkImage.image.id,
                                src: walkImage.image.url,
                                thumbnail: walkImage.image.url,
                                thumbnailWidth: 320,
                                thumbnailHeight: 212,

                            }
                            arrayPhotos.push(imageData)
                        })
                    })


                    this.setState({ gallery: arrayPhotos })

                }

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