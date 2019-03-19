import React, { Component } from 'react';
import API from "../../utils/API";
import "../../index.css";
import WalkerUserInfo from "./walkerUserInfo";


class WalkerProfileInfo extends Component {
   
    
    render() {
     

            return (

                <div className="main-content">

                    <WalkerUserInfo
                        username={this.props.username}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        profilePhotoURL={this.props.profilePhotoURL}
                        userType={this.props.userType}
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
                        handleEditUserClick={this.handleEditUserClick}
                        showWidget={this.showWidget}
                    />

                </div>
            );
        
    }
}


export default WalkerProfileInfo;