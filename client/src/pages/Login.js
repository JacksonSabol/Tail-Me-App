import React, { Component } from "react";
import history from "../history/history";
import axios from "axios";
import "../index.css";

class Login extends Component {
    // Setting the initial values of this.state.email and this.state.password
    state = {
        email: "",
        password: "",
        errorMessage: ""
    };
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value; // Change to let to disallow users from inputing passwords longer than 15 characters
        const name = event.target.name;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        if (!this.state.email || !this.state.password) {
            this.setState({ errorMessage: "Fill out your email and password please!" });
            return;
        }
        else {
            // Make POST request to the Auth route with the user's email and password; redirect using history after success
            axios.post('/user/signin', {
                email: this.state.email,
                password: this.state.password
            })
                .then(function (response) {
                    history.push("/walker/create");
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
    render() {
        return (
            <form>
                <p>Login:</p>
                <input
                    value={this.state.email}
                    name="email"
                    onChange={this.handleInputChange}
                    type="email"
                    placeholder="john.doe@gmail.com"
                />
                <input
                    value={this.state.password}
                    name="password"
                    onChange={this.handleInputChange}
                    type="password"
                    placeholder=""
                />
                <button onClick={this.handleFormSubmit}>Submit</button>
                <p>{this.state.errorMessage}</p>
            </form>
        );
    }
}

export default Login;
