import React, { Component } from "react";
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import API from "../../utils/API";
import Gallery from 'react-grid-gallery';
import ReactSelect from 'react-select';

const baseStyle = {
    width: '100%',
    height: 100,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
};
const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
};


class WalkPhotoUpandPost extends Component {
    state = {
        selectedFile: null,
        loaded: 0,
        gallery: [],
        galleryAll: [],
        walksList: [],
        selectedOptions: [],
        showSentButton: false
    }


    componentDidMount() {
        // Load images from the gallery      
        this.loadImages()
        this.loadOwners()
    }

    /* Walker - Walks images  */
    loadImages = () => {
        const idWalk = this.props.WalkerID;
        API.getImages(idWalk)
            .then(res => {
                const dataGallery = res.data.map(data => {
                    const imageData = {
                        id: data.id,
                        src: data.url,
                        thumbnail: data.url,
                        thumbnailWidth: 320,
                        thumbnailHeight: 212
                    }
                    return (imageData)
                })

                this.setState({
                    gallery: dataGallery,
                    galleryAll: [],
                    showSentButton: false
                })
            })

    }

    loadAllImages = () => {
        const idWalk = this.props.WalkerID;
        API.getAllImages(idWalk)
            .then(res => {
                const dataGallery = res.data.map(data => {
                    const imageData = {
                        id: data.id,
                        src: data.url,
                        thumbnail: data.url,
                        thumbnailWidth: 320,
                        thumbnailHeight: 212
                    }
                    return (imageData)
                })
                this.setState({
                    galleryAll: dataGallery,
                    showSentButton: true
                })
            })
    }

    //update the List of selected walks
    handleChangeList = (options) => {
        this.setState({ selectedOptions: options });
    }

    

    loadOwners = () => {
        // console.log("Dog Owner")
        const idWalker = this.props.WalkerID;
        API.getDogOwners(idWalker)
           .then(res => {
               console.log(res.data)
               const dataDogOwners = res.data.map(data => {
                   const dataOwners = {
                       label: `${data.user.firstName} ${data.user.lastName} - ${data.dogName}`,
                       value: data.userId
                   }
                   return (dataOwners)
               })
               this.setState({ onwnerList: dataDogOwners })
           })
           .catch(err => console.log(err));
   }
 
    /* Push image to gallery with selected state */
    onSelectImage(index, image) {
        const images = this.state.images.slice();
        const img = images[index];

        if (img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;
        this.setState({
            gallery: images
        });

    }



    //Send Image to users
    handleTransferImages = () => {

        /* Filter the Selected images form the gallery */
        const selectedImages = this.state.gallery.filter(image => image.isSelected === true)

        /* Iterate through Selected Walks */
        /* Have to figure out how to make just one iteration */
        this.state.selectedOptions.map(user => {
            /* Iterate through Selected Images */
      
            selectedImages.map(data => {

                /* Check if the image is already on the mapping table and skip the insertion if exist - we should figure out what to do with the already mapped images.. or just leave it ..  But now is not possible to know which image is alrready mapped to which walk ..  */
               
                API.checkImageExist(user.value, data.id)
                    .then(res => {

                        const checkImage = res.data ? false : true

                        /* IF not exist insert */
                        const insertImageData = checkImage ? this.insertData(user.value, data.id) : null;


                    })
                return (selectedImages)
            })
        })
    }
    //Send Previously Sent Images to Walks
    handleTransferImagesSent = () => {

        /* Filter the Selected images form the gallery */
        const selectedImages = this.state.galleryAll.filter(image => image.isSelected === true)

        /* Iterate through Selected Walks */
        this.state.selectedOptions.map(user => {
            /* Iterate through Selected Images */

            selectedImages.map(data => {

                /* Check if the image is already on the mapping table and skip the insertion if exist - we should figure out what to do with the already mapped images.. or just leave it ..  But now is not possible to know which image is alrready mapped to which walk ..  */
               
                API.checkImageExist(user.value, data.id)
                    .then(res => {

                        const checkImage = res.data ? false : true

                        /* IF not exist insert */
                        const insertImageData = checkImage ? this.insertData(user.value, data.id) : null;


                    })
                return (selectedImages)
            })
        })
    }

    /* Map images with walks*/
    insertData(userId, imageId) {
        const dataImage = {
            userId: userId,
            imageId: imageId
        }
        console.log("insertData" , userId)
        console.log("insertData image" , imageId)
        API.addImagesToUser(dataImage)
            .then(res => {
                API.updateImageSentStatus(imageId)
                    .then(res => {
                        this.loadImages()
                    })
            })

    }

    checkUploadResult = (result) => {
        if (result.event === 'success') {
          
            const walkerId = this.props.WalkerID;
            const fileURL = result.info.url; // You should store this URL for future references in your app
            const imageData = {

                url: fileURL
            }

            API.uploadPhotoWalks(imageData, walkerId)
                .then(res => {
                    this.loadImages()
                })
        }
    }

    showWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`,
            uploadPreset: `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`,
            sources: [
                "local",
                "camera"
            ],
        }, (error, result) => { this.checkUploadResult(result) });
        widget.open()
    }

    render() {

        return (

            <div className="photos">
                <div className="photos__upload" id='photo-form-container'>
                    <button className="photos__upload--btn"onClick={this.showWidget}>Upload Photo</button>
                </div>

                <ReactSelect
                    options={this.state.onwnerList}
                    onChange={this.handleChangeList}
                    isMulti={true}
                />
                <div className="photos__dropZone">
                    <button className="photos__dropZone--btn" onClick={this.handleTransferImages}>Send Image to the User</button>
                    <Gallery
                        enableImageSelection={true}
                        backdropClosesModal={true}
                        onSelectImage={this.onSelectImage}
                        enableLightbox={true}
                        images={this.state.gallery}
                        showLightboxThumbnails={true} />
                </div>
                <div className="photos__gallery">
                    <button className="photos__gallery--btn" onClick={this.loadAllImages}>Load All (Including Sent) Images</button>
                    {this.state.showSentButton ? (
                        <button className="photos__gallery--btn" onClick={this.handleTransferImagesSent}>Add Sent Images to the User</button>
                    ) : (null)
                    }
                    < Gallery
                        enableImageSelection={true}
                        backdropClosesModal={true}
                        onSelectImage={this.onSelectImage}
                        enableLightbox={true}
                        images={this.state.galleryAll}
                        showLightboxThumbnails={true} />
                </div>


            </div>
        )
    }
}

export default WalkPhotoUpandPost;