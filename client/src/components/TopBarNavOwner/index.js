import React from "react";
import logo from "../../images/tailMeLogo.png";
import imagesIcon from"../../images/imagesIcon.png";
import inviteIcon from "../../images/inviteIcon.png";
import logoutIcon from "../../images/logoutIcon.png";
import profileIcon from "../../images/profileIcon.png";
import walkIcon from "../../images/walkIcon.png";
import "../../index.css";

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...
function TopBarNavOwner(props) {
    return (
        <div className="topBarOwner">
            <button href="/" className="topBarOwner__brand"><img src={logo} className="topBarOwner__brand--logo" alt="^_^" />
            <span className="topBarOwner__brand--logotooltip">Home</span>
            </button>
            <p className="topBarOwner__title">Welcome, {props.username}!</p>
            <div className="topBarOwner__nav">
                <div className="topBarOwner__nav--itemDashboard">
                    <button className="topBarOwner__nav--itemLink"
                        onClick={() => props.handlePageChange("Home")}
                    >
                        <img className="topBarOwner__nav--profile" src={profileIcon} alt="profile icon" ></img>
                        {/* <label className="topBarOwner__nav--profileLabel">Profile</label> */}
                    </button>
                </div>
                <div className="topBarOwner__nav--itemWalks">
                    <button className="topBarOwner__nav--itemLink"
                        onClick={() => props.handlePageChange("Walks")}
                    >
                     <img className="topBarOwner__nav--walks" src={walkIcon} alt="walk icon" ></img>
                        {/* <label className="topBarOwner__nav--walksLabel">My Walks</label> */}
                    </button>
                </div>
                <div className="topBarOwner__nav--itemMyDogs">
                    <button className="topBarOwner__nav--itemLink"
                        onClick={() => props.handlePageChange("Dogs")}
                    >
                     <img className="topBarOwner__nav--dogs" src={inviteIcon} alt="invite icon" ></img>
                     {/* <label className="topBarOwner__nav--dogsLabel">My Dogs</label> */}
                    </button>
                </div>
                <div className="topBarOwner__nav--itemGallery">
                    <button className="topBarOwner__nav--itemLink"
                        onClick={() => props.handlePageChange("Gallery")}
                    >
                     <img className="topBarOwner__nav--images" src={imagesIcon} alt="images icon" ></img>
                     {/* <label className="topBarOwner__nav--imagesLabel">Gallery</label> */}
                    </button>
                </div>
                <div className="topBarOwner__nav--itemLogout">
                    <button className="topBarOwner__nav--itemLink"
                        href="#"
                        onClick={() => props.handleLogOut()}
                    >
                     <img className="topBarOwner__nav--logout" src={logoutIcon} alt="logout icon" ></img>
                     {/* <label className="topBarOwner__nav--logoutLabel">Log Out</label> */}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TopBarNavOwner;