import React from "react";
import logo from "../../images/tailMeLogo.png";
import "../../index.css";

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...
function TopBarNavWalker(props) {
    return (
        <div className="topBarWalker">
            <a href="/" className="topBarWalker__brand"><img src={logo} className="topBarWalker__brand--logo" alt="^_^" /></a>
            <p className="topBarWalker__title">Welcome, {props.username}!</p>
            <div className="topBarWalker__nav">
                <div className="topBarWalker__nav--itemDashboard">
                    <a className="topBarWalker__nav--itemLink"
                        href="#home"
                        onClick={() => props.handlePageChange("Home")}
                    >
                        Profile
                    </a>
                </div>
                <div className="topBarWalker__nav--itemWalks">
                    <a className="topBarWalker__nav--itemLink"
                        href="#walks"
                        onClick={() => props.handlePageChange("Walks")}
                    >
                        Upcoming Walks
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
                        Full Schedule
                    </a>
                </div>
                <div className="topBarWalker__nav--itemFullSchedule">
                    <a className="topBarWalker__nav--itemLink"
                        href="#invite"
                        onClick={() => props.handlePageChange("Invite")}
                    >
                        Invite Clients
                    </a>
                </div>
                <div className="topBarWalker__nav--itemInvite">
                    <a className="topBarWalker__nav--itemLink"
                        href="#certs"
                        onClick={() => props.handlePageChange("Certs")}
                    >
                        Update Qualifications
                    </a>
                </div>
                <div className="topBarWalker__nav--itemCerts">
                    <a className="topBarWalker__nav--itemLink"
                        href="#map"
                        onClick={() => props.handlePageChange("Map")}
                    >
                        Map
                    </a>
                </div>
                <div className="topBarWalker__nav--itemMap">
                    <a className="topBarWalker__nav--itemLink"
                        href="#upload"
                        onClick={() => props.handlePageChange("Upload")}
                    >
                        Upload Images
                    </a>
                </div>
                <div className="topBarWalker__nav--itemNotifications">
                    <a className="topBarWalker__nav--itemLink"
                        href="#"
                        onClick={() => props.handleLogOut()}
                    >
                        Log Out
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