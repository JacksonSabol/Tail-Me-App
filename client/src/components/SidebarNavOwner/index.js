import React from "react";
import logo from "../../images/tailMeLogo.png";
import "../../index.css";

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...
function SidebarNavOwner(props) {
    return (
        <div className="ownersidebar">
            <p className="ownersidebar__title">Welcome, {props.username}!</p>
            <a href="/" className="ownersidebar__brand"><img src={logo} className="ownersidebar__brand--logo" alt="^_^" /> tailMe©</a>
            <div className="ownersidebar__nav">
                <div className="ownersidebar__nav--itemDashboard">
                    <a
                        href="#home"
                        onClick={() => props.handlePageChange("Home")}
                    >
                        Dashboard
                    </a>
                </div>
                <div className="ownersidebar__nav--itemWalks">
                    <a
                        href="#walks"
                        onClick={() => props.handlePageChange("Walks")}
                    >
                        Upcoming Walks
                    </a>
                </div>
                <div className="ownersidebar__nav--itemSchedWalks">
                    <a
                        href="#dogs"
                        onClick={() => props.handlePageChange("Dogs")}
                    >
                        Add a Dog
                    </a>
                </div>
                {/* Fix later in Sass; this just forces the logout button to fill the consecutive grid space */}
                <div className="ownersidebar__nav--itemFullSchedule">
                    <a
                        href="#gallery"
                        onClick={() => props.handlePageChange("Gallery")}
                    >
                        Image Gallery
                    </a>
                </div>
                {/* Fix later in Sass; this just forces the logout button to fill the consecutive grid space */}
                <div className="sidebar__nav--itemInvite">
                    <a
                        href="#"
                        onClick={() => props.handleLogOut()}
                    >
                        Log Out
                    </a>
                </div>
                {/* <div className="sidebar__nav--item">
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

export default SidebarNavOwner;
