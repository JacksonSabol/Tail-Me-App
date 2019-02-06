import React, { Component } from "react";
import history from "../history/history";
import TodayWalks from '../components/TodayWalks';
// import axios from "axios";
import "../index.css";

class walkerDashboard extends Component {
    handleLogOut = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        // Clear local storage to remove JWT
        localStorage.clear();
        // Redirect to the home page
        history.push("/");
    }

    render() {
        return (
            <div>
                <TodayWalks />
                <button onClick={this.handleLogOut}>Log Out</button>
            </div>
        )
    }
}
export default walkerDashboard