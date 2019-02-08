import React from "react";
import "../index.css";

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...
function ProfileWalker(props) {
    return (
        <div className="walker-main-content">
        <div className="walker-main-content__title">Profile</div>
        <div className="walker-main-content__body">
            {/* <div className="main-content__body--profileimg"><img src={`data:image/jpeg;Base64,${this.state.profilePhoto}`} /></div> */}
            <div className="walker-main-content__body--firstNameLabel">First Name:</div>
            <div className="walker-main-content__body--firstNameInput">{props.firstName}</div>
            <div className="walker-main-content__body--lastNameLabel">Last Name:</div>
            <div className="walker-main-content__body--lastNameInput">{props.lastName}</div>
            <div className="walker-main-content__body--userTypeLabel">User Type:</div>
            <div className="walker-main-content__body--userTypeInput">{props.userType}</div>
            <div className="walker-main-content__body--aboutMeLabel">About Me:</div>
            <div className="walker-main-content__body--aboutMeInput">{props.aboutMe}</div>
            <div className="walker-main-content__body--addressLabel">Address:</div>
            <div className="walker-main-content__body--addressInput">{props.address}</div>
            <div className="walker-main-content__body--cityLabel">City:</div>
            <div className="walker-main-content__body--cityInput">{props.City}</div>
            <div className="walker-main-content__body--stateLabel">State:</div>
            <div className="walker-main-content__body--stateInput">{props.State}</div>
            <div className="walker-main-content__body--zipcodeLabel">Zipcode:</div>
            <div className="walker-main-content__body--zipcodeInput">{props.zipCode}</div>
            <div className="walker-main-content__body--countryLabel">Country:</div>
            <div className="walker-main-content__body--countryInput">{props.country}</div>
        </div>
        </div>
    );
}

export default ProfileWalker;