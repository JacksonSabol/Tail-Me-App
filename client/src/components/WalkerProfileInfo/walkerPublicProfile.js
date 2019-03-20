import React from "react";
import "../../index.css";


// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...


function WalkerPublicInfo(props) {
    console.log("WalkerUserInfo:", props)

    return (
        <div className="walker-main-content">
            <div className="walker-main-content__subtitle">{props.firstName}  {props.lastName}</div>
            <div className="walker-main-content__availibility">{props.availibility}</div>
            <div className="walker-main-content__profilePhoto"><img className="walker-main-content__profilePhoto--image" src={props.profilePhotoURL}  ></img></div>
            <div className="walker-main-content__body">
                <div className="walker-main-content__body--firstNameInput">{props.certifications}</div>
                <div className="walker-main-content__body--aboutMeLabel">About me:</div>
                <div className="walker-main-content__body--aboutMeInput">{props.aboutMe}</div>
                <div className="walker-main-content__body--qualificationsLabel">Qualifications:</div>
                <div className="walker-main-content__body--certificationInput">{props.certification}</div>
                <div className="walker-main-content__body--insuranceInput">{props.insurance}</div>
                <div className="walker-main-content__body--bondInput">{props.bond}</div>
                <div className="walker-main-content__body--servicesLabel">Services:</div>
                <div className="walker-main-content__body--servicesInput">{props.services}</div>
            </div>
        </div>
    );
}

export default WalkerPublicInfo;