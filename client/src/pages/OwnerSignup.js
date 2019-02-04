import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import "../index.css";

const title = 'Sign Up as a Dog Owner';

class OwnerSignup extends Component {
    // Setting the initial state values
    state = {
        username: '',
        email: '',
        password: '',
        unregistered: true,
        showError: false,
        registerError: false,
        loginError: false
      };
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        if (name === "username") {
            value = value.substring(0, 25);
          }
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleRegisterUser = event => {
        event.preventDefault();
        if (this.state.username === '' || this.state.password === '' || this.state.email === '') {
            this.setState({
                showError: true,
                registerError: true
            });
        } else {
            axios
                .post('/owner/signup', {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password
                })
                .then(response => {
                    // console.log(response.data);
                    localStorage.setItem('JWT', response.data.token);
                    this.setState({
                        unregistered: false,
                        showError: false,
                        loginError: false,
                        registerError: false,
                    });
                })
                .catch(error => {
                    console.log(error.response.data);
                    if (error.response.data === 'That username is already taken.') {
                        this.setState({
                            showError: true,
                            loginError: true,
                            registerError: false,
                        });
                    }
                });
        }
    };

    render() {
        const {
            username,
            unregistered,
            showError,
            registerError,
            loginError
        } = this.state;

        if (unregistered) {
            return (
                <div>
                    <p>{title}</p>
                    <form className="signup-form" onSubmit={this.handleRegisterUser}>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            placeholder="john.doe@gmail.com"
                        />
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            placeholder="UserName"
                        />
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            placeholder="Password"
                        />
                        <button type="submit">Register</button>
                    </form>
                    {showError === true && registerError === true && (
                        <div>
                            <p>Username, password, and email are required fields.</p>
                        </div>
                    )}
                    {showError === true && loginError === true && (
                        <div>
                            <p>That username is already taken. Please choose another, or login.</p>
                            <p><a href="/user/login">Login</a></p>
                        </div>
                    )}
                    <p><a href="/">Return to Home</a></p>
                </div>
            );
        } else {
            return <Redirect to={`/owner/create/${username}`} />;
        }
    }
}

export default OwnerSignup;
