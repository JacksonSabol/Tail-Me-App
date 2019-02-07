import React from "react";
import logo from "../../images/tailMeLogo.png";
import "../../index.css";

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...
function SidebarNavOwner(props) {
    return (
        <div className="sidebar">
            <p className="sidebar__title">Welcome, {props.username}!</p>
            <a href="/" className="sidebar__brand"><img src={logo} className="sidebar__brand--logo" alt="^_^" /> tailMe©</a>
            <div className="sidebar__nav">
                <div className="sidebar__nav--itemDashboard">
                    <a
                        href="#home"
                        onClick={() => props.handlePageChange("Home")}
                    >
                        Dashboard
                    </a>
                </div>
                <div className="sidebar__nav--itemWalks">
                    <a
                        href="#walks"
                        onClick={() => props.handlePageChange("Walks")}
                    >
                        Upcoming Walks
                    </a>
                </div>
                <div className="sidebar__nav--itemSchedWalks">
                    <a
                        href="#dogs"
                        onClick={() => props.handlePageChange("Dogs")}
                    >
                        Add a Dog
                    </a>
                </div>
                {/* Fix later in Sass; this just forces the logout button to fill the consecutive grid space */}
                <div className="sidebar__nav--itemFullSchedule">
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
