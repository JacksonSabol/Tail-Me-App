import React from "react";
import logo from "../../images/tailMeLogo.png";
import "../../index.css";

// Depending on the current path, make props set an "active" class on the appropriate navigation link item
// Maybe pass id of which link is clicked and reference this.props.style somehow...
function SidebarNav(props) {
    return (
        <div className="sidebar">
            <p>Welcome, {props.username}!</p>
            <a href="/" className="sidebar__brand"><img src={logo} className="sidebar__brand--logo" alt="^_^" /> tailMe©</a>
            <div className="sidebar__nav">
                <div className="sidebar__nav--item">
                    <a
                        href="#home"
                        onClick={() => props.handlePageChange("Home")}
                    >
                        Dashboard
                    </a>
                </div>
                <div className="sidebar__nav--item">
                    <a
                        href="#walks"
                        onClick={() => props.handlePageChange("Walks")}
                    >
                        Upcoming Walks
                    </a>
                </div>
                <div className="sidebar__nav--item">
                    <a
                        href="#invite"
                        onClick={() => props.handlePageChange("Invite")}
                    >
                        Invite Clients
                    </a>
                </div>
                <div className="sidebar__nav--item">
                    <a
                        href="#map"
                        onClick={() => props.handlePageChange("Map")}
                    >
                        Map
                    </a>
                </div>
                <div className="sidebar__nav--item">
                    <a href="#">
                        Notifications
                    </a>
                </div>
                <div className="sidebar__nav--item">
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

export default SidebarNav;
