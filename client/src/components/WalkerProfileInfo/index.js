import React, { Component } from 'react';
import API from "../../utils/API";
import "../../index.css";
import WalkerUserInfo from "./walkerUserInfo";
import WalkerEditUserInfo from "./walkerEditUserInfo";
import WalkerCertification from "./walkerCetrification";

class WalkerProfileInfo extends Component {
    state = {
        editClick: false
    };

    handleEditUserClick = event => {
        event.preventDefault();
        this.setState({
            editClick: true
        })
    }

    checkUploadResult = (result) => {
       
        if (result.event === 'success') {
          
            const userId = this.props.userId;
            const file = result.info.url; // You should store this URL for future references in your app
            const fileURL = {

                url: file
            }
            API.uploadProfilePicture(userId, fileURL)
                .then(res => {
                   
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
        const { username, editClick } = this.state;
        if (editClick) {

            return (
                <div>
                    <div className="main-content-userEdition__title">Update My Info</div>
                    <div className="main-content-userEdition">

                        <div className="main-content-userEditionprofile__form">
                            <WalkerEditUserInfo
                                username={this.props.username}
                                firstName={this.props.firstName}
                                lastName={this.props.lastName}
                                userType={this.props.username}
                                aboutMe={this.props.aboutMe}
                                address={this.props.address}
                                City={this.props.City}
                                State={this.props.State}
                                zipCode={this.props.zipCode}
                                country={this.props.country}
                                certification={this.props.certification}
                                insurance={this.props.insurance}
                                bond={this.props.bond}
                                services={this.props.services}
                                availibility={this.props.availibility}
                            />
                        </div>
                        <div className="main-content-userEditionCert__form">

                            <WalkerCertification
                                username={this.props.username}
                                certification={this.props.certification}
                                insurance={this.props.insurance}
                                bond={this.props.bond}
                                services={this.props.services}
                                availibility={this.props.availibility}
                            />
                        </div>
                    </div>
                </div>

            );
        } else {

            return (

                <div>

                    <WalkerUserInfo
                        username={this.props.username}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        userType={this.props.username}
                        aboutMe={this.props.aboutMe}
                        address={this.props.address}
                        City={this.props.City}
                        State={this.props.State}
                        zipCode={this.props.zipCode}
                        country={this.props.country}
                        certification={this.props.certification}
                        insurance={this.props.insurance}
                        bond={this.props.bond}
                        services={this.props.services}
                        availibility={this.props.availibility}

                    />
                    <button className="photos__gallery--btn" onClick={this.handleEditUserClick}>Edit My Info</button>
                    <button className="photos__upload--btn"onClick={this.showWidget}>Upload Profile Picture</button>
                
                </div>
            );
        }
    }
}


export default WalkerProfileInfo;