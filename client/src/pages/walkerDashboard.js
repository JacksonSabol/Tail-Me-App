import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import history from "../history/history";
import TodayWalks from '../components/TodayWalks';
import axios from "axios";
import "../index.css";

class walkerDashboard extends Component {
    handleLogOut = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        // Make a GET request to the /user/logout path to destroy the session and log user out
        axios.get('/user/logout')
            .then(function (response) {
                history.push("/");
            })
            .catch(function (error) {
                console.log(error);
            });
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