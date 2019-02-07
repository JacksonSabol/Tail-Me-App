import React, { Component } from "react";
import './App.css'
import API from "../../utils/API";
var fs = require('fs');


class UserProfileInput extends Component {
    state = {
        selectedFile: null,
        loaded: 0,
    }




    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }
    handleUpload = () => {

        const data = new FormData();
        data.append('imageUp', this.state.selectedFile);

        const image = {
            walkId: 1,
            image:data
            //image2:reader.result
        }
        const id = 1
        API.uploadPhotoServer(image, id)
            .then(res => {
                console.log("back", res)
                //this.props.history.push("/walkerDashboard");
            })
            .catch(err => console.log(err));

    };

    getBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log("READER:", reader.result)
            return reader.result;
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    /* const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    console.log("Data",data)
    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      }) */


    render() {
        return (
            <div className="App">
                <input type="file" name="imageUpload" id="imageUpload" onChange={this.handleselectedFile} />
                <button onClick={this.handleUpload}>Upload</button>
                <div> {Math.round(this.state.loaded, 2)} %</div>

            </div>
        )
    }
}

export default UserProfileInput;