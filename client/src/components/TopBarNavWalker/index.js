import React from "react";
import logo from "../../images/tailMeLogo.png";
import imagesIcon from"../../images/imagesIcon.png";
import inviteIcon from "../../images/inviteIcon.png";
import logoutIcon from "../../images/logoutIcon.png";
// import mapIcon from "../../images/mapIcon.png";
import profileIcon from "../../images/profileIcon.png";
import scheduleIcon from "../../images/scheduleIcon.png";
import walkIcon from "../../images/walkIcon.png";
import "../../index.css";

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...
function TopBarNavWalker(props) {
    return (
        <div className="topBarWalker">
            <button href="/" className="topBarWalker__brand"><img src={logo} className="topBarWalker__brand--logo" alt="^_^" />
            <span className="topBarWalker__brand--logotooltip">Home</span>
            </button>
            <p className="topBarWalker__title">Welcome, {props.username}!</p>
            <div className="topBarWalker__nav">
                <div className="topBarWalker__nav--itemDashboard">
                    <button className="topBarWalker__nav--itemLink"
                        onClick={() => props.handlePageChange("Home")}
                    >
                        <img className="topBarWalker__nav--profile" src={profileIcon} alt="profile icon" ></img>
                        {/* <label className="topBarWalker__nav--profileLabel">Profile</label> */}
                    </button>
                </div>
                <div className="topBarWalker__nav--itemWalks">
                    <button className="topBarWalker__nav--itemLink"
                        onClick={() => props.handlePageChange("Walks")}
                    >
                     <img className="topBarWalker__nav--walks" src={walkIcon} alt="walk icon" ></img>
                        {/* <label className="topBarWalker__nav--walksLabel">My Walks</label> */}
                    </button>
                </div>
                <div className="topBarWalker__nav--itemSchedWalks">
                    <button className="topBarWalker__nav--itemLink"
                        onClick={() => props.handlePageChange("FullSchedule")}
                    >
                     <img className="topBarWalker__nav--schedule" src={scheduleIcon} alt="scheduleicon" ></img>
                     {/* <label className="topBarWalker__nav--scheduleLabel">Schedule</label> */}
                    </button>
                </div>
                <div className="topBarWalker__nav--itemInvite">
                    <button className="topBarWalker__nav--itemLink"
                        onClick={() => props.handlePageChange("Invite")}
                    >
                     <img className="topBarWalker__nav--invite" src={inviteIcon} alt="invite icon" ></img>
                     {/* <label className="topBarWalker__nav--inviteLabel">Invite Clients</label> */}
                    </button>
                </div>
                <div className="topBarWalker__nav--itemGallery">
                    <button className="topBarWalker__nav--itemLink"
                        onClick={() => props.handlePageChange("Gallery")}
                    >
                     <img className="topBarWalker__nav--images" src={imagesIcon} alt="images icon" ></img>
                     {/* <label className="topBarWalker__nav--imagesLabel">Upload Images</label> */}
                    </button>
                </div>
                <div className="topBarWalker__nav--itemLogout">
                    <button className="topBarWalker__nav--itemLink"
                        onClick={() => props.handleLogOut()}
                    >
                     <img className="topBarWalker__nav--logout" src={logoutIcon} alt="logout icon" ></img>
                     {/* <label className="topBarWalker__nav--logoutLabel">Log Out</label> */}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TopBarNavWalker;