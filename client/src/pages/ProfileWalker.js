import React from "react";
import "../index.css";
import WalkerProfileDashboard from "../components/WalkerProfileInfo"

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...


function ProfileWalker(props) {

    return (

        <WalkerProfileDashboard
            userId={props.userId}
            username={props.username}
            firstName={props.firstName}
            lastName={props.lastName}
            userType={props.username}
            aboutMe={props.aboutMe}
            address={props.address}
            City={props.City}
            State={props.State}
            zipCode={props.zipCode}
            country={props.country}
            certification={props.certification}
            insurance={props.insurance}
            bond={props.bond}
            services={props.services}
            availibility={props.availibility}
            editClick={props.editClick}

        />



    );
}

export default ProfileWalker;