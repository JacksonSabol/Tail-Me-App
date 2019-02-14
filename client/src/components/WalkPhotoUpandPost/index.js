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
        walksList: [],
        selectedOptions: []
    }


    componentDidMount() {
        // Load images from the gallery      
        this.loadImages()
        this.loadWalks()
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

                this.setState({ gallery: dataGallery })
            })

    }

    //update the List of selected walks
    handleChangeList = (options) => {
        this.setState({ selectedOptions: options });
    }

    /* Load walks for the dropdown Should we only display the walks of the day? Of the month? Walks that have no pictures?*/
    loadWalks = () => {
        const idWalker = this.props.WalkerID;
        API.getMyWalks(idWalker)
            .then(res => {

                const dataWalks = res.data.map(data => {

                    const dataWalks = {
                        label: `${data.walkDate} - ${data.dogOwner.dogName}`,
                        value: data.id
                    }
                    return (dataWalks)
                })
                this.setState({ walksList: dataWalks })
            })
            .catch(err => console.log(err));
    }

    /* TO BE REPLACED BY ISABEL USE CLOUDINARY WIDGET  */
    // handleDrop = files => {
    //     // Push all the axios request promise into a single array
       
    //     const walkerId = this.props.WalkerID;
    //     const uploaders = files.map(file => {
    //         // Initial FormData
            
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
    //         formData.append("api_key", `${process.env.REACT_APP_CLOUDINARY_API_KEY}`); // Replace API key with your own Cloudinary key
    //         formData.append("timestamp", (Date.now() / 1000) | 0);
    //         formData.append("folder", 'tailMeApp');

    //         API.addPicturesToCloudinary(formData)
    //             .then(response => {
    //                 const data = response.data;
    //                 const fileURL = data.secure_url; // You should store this URL for future references in your app
    //                 const imageData = {
                      
    //                     url: fileURL
    //                 }

    //                 API.uploadPhotoWalks(imageData, walkerId )
    //                     .then(res => {
    //                         this.loadImages()
    //                     })
    //             }).catch(err => console.log("ERROR", err));
    //     })
    // }

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



    //Send Image to Walks
    handleTransferImages = () => {

        /* Filter the Selected images form the gallery */
        const selectedImages = this.state.gallery.filter(image => image.isSelected === true)

        /* Iterate through Selected Walks */
        /* Have to figure out how to make just one iteration */
        this.state.selectedOptions.map(walk => {
            /* Iterate through Selected Images */

            selectedImages.map(data => {

                /* Check if the image is already on the mapping table and skip the insertion if exist - we should figure out what to do with the already mapped images.. or just leave it ..  But now is not possible to know which image is alrready mapped to which walk ..  */

                API.checkImageExist(walk.value, data.id)
                    .then(res => {

                        const checkImage = res.data ? false : true

                        /* IF not exist insert */
                        const insertImageData = checkImage ? this.insertData(walk.value, data.id) : null;


                    })
                return (selectedImages)
            })
        })
    }

    /* ANY CLUE WHY THIS DOESNT WORK?   */
    /* IT DOESN RETURN THE VALUE */
    /*   checkIfImageExist(walkId, imageId) {
    
          
          API.checkImageExist(walkId, imageId)
              .then(res => {
                //  console.log("length",res.data)
                 const checkImage  = res.data ? false : true
                  
                  return checkImage
              })
             
             
      } */

    /* Map images with walks*/
    insertData(walkId, imageId) {
        const dataImage = {
            walkId: walkId,
            imageId: imageId
        }
        API.addImagesToWalk(dataImage)
            .then(res => {
                this.loadImages()
            })

    }

    checkUploadResult = (result) => {
        if (result.event === 'success') {
            console.log(result)
            console.log(result.info.url)
            // const data = response.data;
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

            <div>
                  <div id='photo-form-container'>
                    <button onClick={this.showWidget}>Upload Photo</button>
                </div>

                <ReactSelect
                    options={this.state.walksList}
                    onChange={this.handleChangeList}
                    isMulti={true}
                />
                <br></br>
                <button className="dropzoneButton" onClick={this.handleTransferImages}>Send images to the Walk</button>
                <Gallery
                    enableImageSelection={true}
                    backdropClosesModal={true}
                    onSelectImage={this.onSelectImage}
                    enableLightbox={true}
                    images={this.state.gallery}
                    showLightboxThumbnails={true} />



            </div>
        )
    }
}

export default WalkPhotoUpandPost;