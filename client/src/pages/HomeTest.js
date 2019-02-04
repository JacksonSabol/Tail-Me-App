import React, { Component } from "react";
import "../index.css";

class Home extends Component {
    state = {
        message: ""
    };

    render() {
        return (
            <div>
                <p>Home Page</p>
                <p><a href="/walker/signup">Sign up as a Dog Walker</a></p>
                <p><a href="/owner/signup">Sign up as a Dog Owner</a></p>
                <p><a href="user/login">Log In</a></p>
            </div>
        );
    }
}

export default Home;
