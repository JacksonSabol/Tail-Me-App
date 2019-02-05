import React, { Component } from "react";
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
const dropzoneStyle = {
    width: "100%",
    height: "20%",
    border: "1px solid black"
};
class WalkPhotoUpandPost extends Component {
    state = {
        selectedFile: null,
        loaded: 0,
        gallery: []
    }
    componentDidMount() {
        // Request for images tagged xmas       
        axios.get('https://res.cloudinary.com/christekh/image/list/xmas.json')
            .then(res => {
                console.log(res.data.resources);
                this.setState({gallery: res.data.resources});
            });
    }

    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", ""); // Replace the preset name with your own
            formData.append("api_key", ""); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);
            formData.append("folder",'tailMeApp');
            formData.append("tags",1)

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                console.log(data);
                this.setState({ gallery: response.data.resources })
            })
        });

        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation
        });
    }

    render() {
        return (
            <div>
                <form>
        <div className="FileUpload">
            <Dropzone
                onDrop={this.handleDrop}
                accept="image/*"
                multiple={true}>
                {({ getRootProps, getInputProps }) => {
                    return (
                        <div
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            {
                                <p>Try dropping some files here, or click to select files to upload.</p>
                            }
                        </div>
                    )
                }}
            </Dropzone>

            </div>
      </form>

            <div className="main">
                <h1>Gallery</h1>
                <div className="gallery">
                    <CloudinaryContext cloudName="CLOUDNAME">
                        {
                            this.state.gallery.map(data => {
                                return (
                                    <div className="responsive" key={data.public_id}>
                                        <div className="img">
                                            <a target="_blank" href={`https://res.cloudinary.com/christekh/image/upload/${data.public_id}.jpg`}>
                                                <Image publicId={data.public_id}>
                                                    <Transformation
                                                        crop="scale"
                                                        width="300"
                                                        height="200"
                                                        dpr="auto"
                                                        responsive_placeholder="blank"
                                                    />
                                                </Image>
                                            </a>
                                            <div className="desc">Created at {data.created_at}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </CloudinaryContext>
                    <div className="clearfix"></div>
                </div>
            </div>
            </div>
        )
    }
}

export default WalkPhotoUpandPost;