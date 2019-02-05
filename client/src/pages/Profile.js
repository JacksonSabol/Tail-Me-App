import React from "react";
import "../index.css";

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...
function Profile(props) {
    return (
        <div className="main-content__body">
            {/* <div className="main-content__body--profileimg"><img src={`data:image/jpeg;Base64,${this.state.profilePhoto}`} /></div> */}
            <div className="main-content__body--">First Name</div>
            <div className="main-content__body--">{props.firstName}</div>
            <div className="main-content__body--">Last Name</div>
            <div className="main-content__body--">{props.lastName}</div>
            <div className="main-content__body--">User Type</div>
            <div className="main-content__body--">{props.userType}</div>
            <div className="main-content__body--">About Me</div>
            <div className="main-content__body--">{props.aboutMe}</div>
            <div className="main-content__body--">Address</div>
            <div className="main-content__body--">{props.address}</div>
            <div className="main-content__body--">City</div>
            <div className="main-content__body--">{props.City}</div>
            <div className="main-content__body--">State</div>
            <div className="main-content__body--">{props.State}</div>
            <div className="main-content__body--">Zipcode</div>
            <div className="main-content__body--">{props.zipCode}</div>
            <div className="main-content__body--">Country</div>
            <div className="main-content__body--">{props.country}</div>
        </div>
    );
}

export default Profile;