import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import "../index.css";

const loading = {
    margin: '1em',
    fontSize: '24px',
};

const title = 'Fill Out Your Dog Walking Profile';

class createWalkerProfile extends Component {
    // Setting the initial state values
    state = {
        AuthID: 0,
        username: '',
        firstName: '',
        lastName: '',
        userType: '',
        aboutMe: '',
        profilePhoto: [],
        address: '',
        City: '',
        State: '',
        zipCode: 0,
        country: '',
        loggedIn: true,
        profileCreated: false,
        isLoading: true,
        error: false,
        dbError: false,
        errorMessage: ''
    };

    async componentDidMount() {
        let accessString = localStorage.getItem('JWT');
        if (accessString == null) {
            this.setState({
                isLoading: false,
                error: true
            });
        }
        else {
            await axios
                .get('/authenticate', {
                    params: {
                        username: this.props.match.params.username
                    },
                    headers: { Authorization: `JWT ${accessString}` },
                })
                .then(response => {
                    this.setState({
                        AuthID: response.data.AuthID,
                        username: response.data.username,
                        loggedIn: true,
                        isLoading: false,
                        error: false
                    });
                })
                .catch(error => {
                    // console.log(error.response.data);
                    this.setState({
                        error: true,
                        // errorMessage: error.response.data
                    });
                });
        }
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        if (name === "zipCode") {
            value = value.substring(0, 5);
        }
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleCreateUser = event => {
        event.preventDefault();
        axios
            .post('/api/userProfile/create', {
                authId: this.state.AuthID,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userType: "walker",
                aboutMe: this.state.aboutMe,
                // profilePhoto: this.state.profilePhoto,
                address: this.state.address,
                City: this.state.City,
                State: this.state.State,
                zipCode: this.state.zipCode,
                country: this.state.country
            })
            .then(response => {
                this.setState({
                    profileCreated: true
                });
            })
            .catch(error => {
                console.log(error.response.data);
                this.setState({
                    dbError: true,
                    // errorMessage: error.response.data
                });
            });
    };

    render() {
        const {
            username,
            loggedIn,
            profileCreated,
            isLoading,
            error,
            dbError
        } = this.state;

        if (error) {
            return (
                <div>
                    <p>{title}</p>
                    <div style={loading}>
                        <p>Problem fetching user data. Please login again.</p>
                    </div>
                    <a href="/user/login">Login</a>
                </div>
            );
        } else if (isLoading) {
            return (
                <div>
                    <p>{title}</p>
                    <div style={loading}>Loading User Data...</div>
                </div>
            );
        } else if (!loggedIn) {
            return (
                <div>
                    <p>{title}</p>
                    <div style={loading}>
                        Please login to proceed.
                    </div>
                    <a href="/user/login">Login</a>
                </div>
            );
        } else if (!profileCreated) {
            return (
                <div>
                    <p>{title}</p>
                    <form className="profile-form" onSubmit={this.handleCreateUser}>
                        <input
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                            placeholder="John"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                            placeholder="Doe"
                        />
                        <select name="userType" onChange={this.handleInputChange}>
                            <option value="walker">Dog Walker</option>
                        </select>
                        <textarea
                            name="aboutMe"
                            value={this.state.aboutMe}
                            onChange={this.handleInputChange}
                            rows="10"
                            cols="30"
                        />
                        {/* profilePhoto upload */}
                        <input
                            type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleInputChange}
                            placeholder="123 45th Street"
                        />
                        <input
                            type="text"
                            name="City"
                            value={this.state.City}
                            onChange={this.handleInputChange}
                            placeholder="San Francisco"
                        />
                        <input
                            type="text"
                            name="State"
                            value={this.state.State}
                            onChange={this.handleInputChange}
                            placeholder="CA"
                        />
                        <input
                            type="number"
                            name="zipCode"
                            value={this.state.zipCode}
                            onChange={this.handleInputChange}
                            placeholder="12345"
                        />
                        <input
                            type="text"
                            name="country"
                            value={this.state.country}
                            onChange={this.handleInputChange}
                            placeholder="USA"
                        />
                        <button type="submit">Register</button>
                    </form>
                    {dbError === true && (
                        <div>
                            <p>An error occured while adding entries to the database.</p>
                        </div>
                    )}
                    <p><a href="/">Return to Home</a></p>
                </div>
            );
        } else {
            return <Redirect to={`/userProfile/${username}`} />;
        }
    }
}
export default createWalkerProfile