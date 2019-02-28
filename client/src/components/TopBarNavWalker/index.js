import React from "react";
import logo from "../../images/tailMeLogo.png";
import certificationIcon from "../../images/certificationIcon.png";
import imagesIcon from"../../images/imagesIcon.png";
import inviteIcon from "../../images/inviteIcon.png";
import logoutIcon from "../../images/logoutIcon.png";
import mapIcon from "../../images/mapIcon.png";
import profileIcon from "../../images/profileIcon.png";
import scheduleIcon from "../../images/scheduleIcon.png";
import walkIcon from "../../images/walkIcon.png";
import "../../index.css";

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...
function TopBarNavWalker(props) {
    return (
        <div className="topBarWalker">
            <a href="/" className="topBarWalker__brand"><img src={logo} className="topBarWalker__brand--logo" alt="^_^" />
            <span className="topBarWalker__brand--logotooltip">Home</span>
            </a>
            <p className="topBarWalker__title">Welcome, {props.username}!</p>
            <div className="topBarWalker__nav">
                <div className="topBarWalker__nav--itemDashboard">
                    <a className="topBarWalker__nav--itemLink"
                        href="#home"
                        onClick={() => props.handlePageChange("Home")}
                    >
                        <img className="topBarWalker__nav--profile" src={profileIcon} alt="profile icon" ></img>
                    </a>
                </div>
                <div className="topBarWalker__nav--itemWalks">
                    <a className="topBarWalker__nav--itemLink"
                        href="#walks"
                        onClick={() => props.handlePageChange("Walks")}
                    >
                     <img className="topBarWalker__nav--walks" src={walkIcon} alt="walk icon" ></img>
                        {/* Upcoming Walks */}
                    </a>
                </div>
                {/* <div className="topBarWalker__nav--itemSchedWalks">
                    <a className="topBarWalker__nav--itemLink"
                        href="#schedwalks"
                        onClick={() => props.handlePageChange("SchedWalks")}
                    >
                        Schedule a Walk
                    </a>
                </div> */}
                <div className="topBarWalker__nav--itemSchedWalks">
                    <a className="topBarWalker__nav--itemLink"
                        href="#fullschedule"
                        onClick={() => props.handlePageChange("FullSchedule")}
                    >
                     <img className="topBarWalker__nav--schedule" src={scheduleIcon} alt="scheduleicon" ></img>
                        {/* Full Schedule */}
                    </a>
                </div>
                <div className="topBarWalker__nav--itemFullSchedule">
                    <a className="topBarWalker__nav--itemLink"
                        href="#invite"
                        onClick={() => props.handlePageChange("Invite")}
                    >
                     <img className="topBarWalker__nav--invite" src={inviteIcon} alt="invite icon" ></img>
                        {/* Invite Clients */}
                    </a>
                </div>
                <div className="topBarWalker__nav--itemInvite">
                    <a className="topBarWalker__nav--itemLink"
                        href="#certs"
                        onClick={() => props.handlePageChange("Certs")}
                    >
                     <img className="topBarWalker__nav--certification" src={certificationIcon} alt="certification icon" ></img>
                        {/* Update Qualifications */}
                    </a>
                </div>
                <div className="topBarWalker__nav--itemCerts">
                    <a className="topBarWalker__nav--itemLink"
                        href="#map"
                        onClick={() => props.handlePageChange("Map")}
                    >
                     <img className="topBarWalker__nav--map" src={mapIcon} alt="map icon" ></img>
                        {/* Map */}
                    </a>
                </div>
                <div className="topBarWalker__nav--itemMap">
                    <a className="topBarWalker__nav--itemLink"
                        href="#upload"
                        onClick={() => props.handlePageChange("Upload")}
                    >
                     <img className="topBarWalker__nav--images" src={imagesIcon} alt="images icon" ></img>
                        {/* Upload Images */}
                    </a>
                </div>
                <div className="topBarWalker__nav--itemNotifications">
                    <a className="topBarWalker__nav--itemLink"
                        href="#"
                        onClick={() => props.handleLogOut()}
                    >
                     <img className="topBarWalker__nav--logout" src={logoutIcon} alt="logout icon" ></img>
                        {/* Log Out */}
                    </a>
                </div>
                {/* <div className="topBarWalker__nav--item">
                    <a
                        href="#map"
                        onClick={() => props.deleteUser}
                    >
                        Delete Account
                    </a>
                </div> */}
            </div>
        </div>
    );
}

export default TopBarNavWalker;