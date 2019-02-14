import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import "../index.css";
import logo from "../images/tailMeLogo.png";
import homeIcon from "../images/homeIcon.png";
import FooterWalker from "../components/FooterWalker";

const title = 'Log Into';

class LoginWalker extends Component {
    // Setting the initial state values
    state = {
        username: '',
        password: '',
        loggedIn: false,
        showError: false,
        showNullError: false
    };
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    loginUser = event => {
        event.preventDefault();
        if (this.state.username === '' || this.state.password === '') {
            this.setState({
                showError: false,
                showNullError: true,
                loggedIn: false,
            });
        } else {
            axios
                .post('/user/signin', {
                    username: this.state.username,
                    password: this.state.password
                })
                .then(response => {
                    localStorage.setItem('JWT', response.data.token);
                    this.setState({
                        loggedIn: true,
                        showError: false,
                        showNullError: false,
                    });
                })
                .catch(error => {
                    console.log(error.resonse);
                    console.log(error.response.data);
                    if (
                        error.response.data === "Unauthorized" 
                    ) {
                        this.setState({
                            showError: true,
                            showNullError: false,
                        });
                    }
                });
        }
    };
    render() {
        const {
            username,
            showError,
            loggedIn,
            showNullError,
        } = this.state;

        if (!loggedIn) {
            return (
                <div className="walkerlogin">
                    <p className="walkerlogin__title">{title}</p>
                    <img className="walkerlogin__logo" src={logo} alt="tailME logo" ></img>
                    <form className="walkerlogin__form" onSubmit={this.loginUser}>
                    <label className="walkerlogin__form--usernameLabel">Enter your user name</label>
                        <input className="walkerlogin__form--usernameInput"
                            value={this.state.username}
                            name="username"
                            onChange={this.handleInputChange}
                            type="text"
                            placeholder="UserName"
                        />
                         <label className="walkerlogin__form--passwordLabel">Enter your password</label>
                        <input className="walkerlogin__form--passwordInput"
                            value={this.state.password}
                            name="password"
                            onChange={this.handleInputChange}
                            type="password"
                            placeholder=""
                        />
                        <button type="submit" className="walkerlogin__form--submitButton">Log in</button>
                    {showNullError && (
                        <div>
                            <p className="walkerlogin__form--alertOne">Username and password are required.</p>
                        </div>
                    )}
                    {showError && (
                        <div>
                            <p className="walkerlogin__form--alertTwo">That username or password isn't recognized. Please try again or register now.</p>
                            <p className="walkerlogin__form--alertButton" ><a href="/walker/signup">Sign up </a></p>
                        </div>
                    )}
                    </form>
                    <a className="walkerlogin__form--homeButton" href="/">
                    <img className="walkerlogin__form--homeIcon" src={homeIcon} alt="home icon" >
                    </img> Home</a>
                    <div className="walkerlogin__form--footer">
                    <FooterWalker/>
                    </div>
                </div>
            );
        } else {
            return <Redirect to={`/userProfileWalker/${username}`} />;
        }
    }
}

export default LoginWalker;