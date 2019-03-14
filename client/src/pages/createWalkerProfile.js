import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import "../index.css";
import Footer from "../components/Footer";
import logo from "../images/tailMeLogo.png";

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
        profilePhotoURL: '',
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
                <div className="walkerProfile">
                    <img className="walkerProfile__logo" src={logo} alt="tailME logo" ></img>
                    <p className="walkerProfile__title">{title}</p>
                    <form className="walkerProfile__form" onSubmit={this.handleCreateUser}>
                        <label className="walkerProfile__form--firstNameLabel">Enter your first name</label>
                        <input className="walkerProfile__form--firstNameInput"
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                            placeholder="John"
                        />
                        <label className="walkerProfile__form--lastNameLabel">Enter your last name</label>
                        <input className="walkerProfile__form--lastNameInput"
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                            placeholder="Doe"
                        />
                        <label className="walkerProfile__form--userTypeLabel">you are a dog walker</label>
                        <select className="walkerProfile__form--userTypeSelect" name="userType" onChange={this.handleInputChange}>
                            <option value="walker">Dog Walker</option>
                        </select>
                        <label className="walkerProfile__form--textAreaLabel">Tell us about yourself</label>
                        <textarea className="walkerProfile__form--textArea"
                            name="aboutMe"
                            value={this.state.aboutMe}
                            onChange={this.handleInputChange}
                            rows="10"
                            cols="30"
                        />
                        {/* profilePhoto upload */}
                        <label className="walkerProfile__form--addressLabel">Enter your address</label>
                        <input className="walkerProfile__form--addressInput"
                            type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleInputChange}
                            placeholder="123 45th Street"
                        />
                        <label className="walkerProfile__form--cityLabel">Enter your city</label>
                        <input className="walkerProfile__form--cityInput"
                            type="text"
                            name="City"
                            value={this.state.City}
                            onChange={this.handleInputChange}
                            placeholder="San Francisco"
                        />
                        <label className="walkerProfile__form--stateLabel">Enter your state</label>
                        <input className="walkerProfile__form--stateInput"
                            type="text"
                            name="State"
                            value={this.state.State}
                            onChange={this.handleInputChange}
                            placeholder="CA"
                        />
                        <label className="walkerProfile__form--zipcodeLabel">Enter your zip code</label>
                        <input className="walkerProfile__form--zipcodeInput"
                            type="number"
                            name="zipCode"
                            value={this.state.zipCode}
                            onChange={this.handleInputChange}
                            placeholder="12345"
                        />
                        <label className="walkerProfile__form--countryLabel">Enter your country</label>
                        <input className="walkerProfile__form--countryInput"
                            type="text"
                            name="country"
                            value={this.state.country}
                            onChange={this.handleInputChange}
                            placeholder="USA"
                        />
                        <button type="submit" className="walkerProfile__form--submitButton">Register</button>
                    </form>
                    {dbError === true && (
                        <div>
                            <p>An error occured while adding entries to the database.</p>
                        </div>
                    )}
                     <a className="walkerProfile__form--homeButton" href="/">Return to Home</a>
                     <div className="walkerProfile__form--footer">
                    <Footer />
                    </div>
                </div>
            );
        } else {
            return <Redirect to={`/walker/create/qualifications/${username}`} />;
        }
    }
}
export default createWalkerProfile