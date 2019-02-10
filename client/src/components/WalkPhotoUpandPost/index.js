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
        onwnerList: [],
        selectedOptions: []
    }


    componentDidMount() {
        // Load images from the gallery      
        this.loadImages()
        this.loadOwners()
    }

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

    loadOwners = () => {
        const idWalker = this.props.WalkerID;
        API.getDogOwners(idWalker)
            .then(res => {
                const dataDogOwners = res.data.map(data => {
                    const dataOwners = {
                        label: `${data.user.firstName} ${data.user.lastName} - ${data.dogName}`,
                        value: data.id
                    }
                    return (dataOwners)
                })
                this.setState({ onwnerList: dataDogOwners })
            })
            .catch(err => console.log(err));
    }
    //Owner List event
    handleChangeList = (options) => {
        this.setState({ selectedOptions: options });

    }


    handleDrop = files => {
        // Push all the axios request promise into a single array
        const idWalk = 1; // Change to actual walkId from TodayWalks in loadWalks - add ID into new button next to Walk Map
        const walkerId = this.props.WalkerID;
        const uploaders = files.map(file => {
            // Initial FormData
            console.log("FIIIIIILLLLLLEEEE",file)
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
            formData.append("api_key", `${process.env.REACT_APP_CLOUDINARY_API_KEY}`); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);
            formData.append("folder", 'tailMeApp');

            API.addPicturesToCloudinary(formData, idWalk)
                .then(response => {
                    const data = response.data;
                    const fileURL = data.secure_url; // You should store this URL for future references in your app
                    const imageData = {
                        walkId: 1, // Change to actual walkId from TodayWalks in loadWalks - add ID into new button next to Walk Map
                        url: fileURL
                    }

                    API.uploadPhotoWalks(imageData, walkerId)
                        .then(res => {
                            this.loadImages()
                        })
                }).catch(err => console.log("ERROR", err));
        })
    }

    onSelectImage(index, image) {
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

    }
    //Send Image to Owner
    handleTransferImages = () => {
        const idWalk = 1; // Change to actual walkId from TodayWalks in loadWalks - add ID into new button next to Walk Map
        const selectedImages = this.state.gallery.filter(image => image.isSelected === true)
        console.log("Selected", selectedImages)

        selectedImages.map(data => {
            const dataImageOwner = {
                dogOwnerId: this.state.onwnerList[0].value,
                sendCustomer:true
            }
            const imageId=data.id
            console.log("dataImageOwner", dataImageOwner)

            API.updateImageOwner(dataImageOwner, idWalk,imageId)
                .then(res => {
                  this.loadImages()
                })
                
                return(selectedImages)
        })
        
    }
    

    render() {

        return (

            <div>
                <form>
                    <div className="FileUpload" style={{
                        'textAlign': 'center'
                    }}>
                        <Dropzone
                            onDrop={this.handleDrop}
                            accept="image/*"
                            activeClassName='active-dropzone'

                            multiple={true}>
                            {({ getRootProps, getInputProps, isDragActive }) => {
                                let styles = { ...baseStyle }
                                styles = isDragActive ? { ...styles, ...activeStyle } : styles

                                return (
                                    <div
                                        {...getRootProps()}
                                        style={styles}
                                        className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
                                    >
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <h1>Drop files here...</h1> :
                                                <h1 className="dropzoneText">Try dropping some files here, or click to select files to upload.</h1>
                                        }

                                    </div>
                                )
                            }}
                        </Dropzone>


                    </div>
                </form>
                <ReactSelect
                    options={this.state.onwnerList}
                    onChange={this.handleChangeList} />
                <br></br>
                <button className="dropzoneButton" onClick={this.handleTransferImages}>Send images to Owner</button>
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