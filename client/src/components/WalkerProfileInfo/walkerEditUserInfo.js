import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "../../index.css";


class WalkerEditUserInfo extends Component {
    state = {
        userId: 0,
        username: '',
        firstName: '',
        lastName: '',
        profilePhotoURL: '',
        aboutMe: '',
        address: '',
        City: '',
        State: '',
        zipCode: '',
        country:'',
        certAdded: false
    };
    
    async componentDidMount() {
        
        let accessString = localStorage.getItem('JWT');
        await axios
            .get('/findWalker', {
                params: {
                    username: this.props.username
                },
                headers: { Authorization: `JWT ${accessString}` },
            })
            .then(response => {
                console.log("Response",response)
                this.setState({
                    userId: response.data.UserID,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    profilePhotoURL: response.data.profilePhotoURL,
                    aboutMe: response.data.aboutMe,
                    address: response.data.address,
                    City: response.data.City,
                    State: response.data.State,
                    zipCode: response.data.zipCode,
                    country: response.data.country
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleWalkerProfile = e => {
        e.preventDefault();
        axios
            .post('/api/walker/updateProfile', {
                userId: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                aboutMe: this.state.aboutMe,
                address: this.state.address,
                City: this.state.City,
                State: this.state.State,
                zipCode: this.state.zipCode,
                country: this.state.country
            })
            .then(response => {
                this.setState({
                    certAdded: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { username, certAdded } = this.state;
        if (certAdded) {
            // return <Redirect to={`/userProfileWalker/${username}`} />;
            return window.location.reload();
        } else {
            return (
                <div className="main-content-profile">
                    <div className="main-content-profile__title"></div>
                    <form className="main-content-profile__form" onSubmit={this.handleWalkerProfile}>
                        <label className="main-content-profile__form--firstNameLabel">First Name:</label>
                        <input className="main-content-profile__form--firstNameInput"
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                            placeholder="First Name"
                        />
                        <label className="main-content-profile__form--lastNameLabel">Last Name:</label>
                        <input className="main-content-profile__form--lastNameInput"
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                            placeholder="Last Name"
                        />
                        <label className="main-content-profile__form--aboutLabel">About Me:</label>
                        < input /* textarea  */className="main-content-profile_form--aboutInput"
                            type="text"
                            name="aboutMe"
                            value={this.state.aboutMe}
                            onChange={this.handleInputChange}
                            placeholder="About Me"
                           /*  rows="10"
                            cols="30" */
                        />
                        <label className="main-content-profile__form--addressLabel">Address:</label>
                        <input className="main-content-profile__form--addressInput"
                            type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleInputChange}
                            placeholder="Address"
                        />

                        <label className="main-content-profile__form--cityLabel">City:</label>
                        <input className="main-content-profile__form--cityInput"
                            type="text"
                            name="City"
                            value={this.state.City}
                            onChange={this.handleInputChange}
                            placeholder="City"
                        />

                        <label className="main-content-profile__form--stateLabel">State:</label>
                        <input className="main-content-profile__form--stateInput"
                            type="text"
                            name="state"
                            value={this.state.State}
                            onChange={this.handleInputChange}
                            placeholder="State"
                        />

                        <label className="main-content-profile__form--zipLabel">Zip Code:</label>
                        <input className="main-content-profile__form--zipInput"
                            type="text"
                            name="zipCode"
                            value={this.state.zipCode}
                            onChange={this.handleInputChange}
                            placeholder="Zip Code"
                        />

                        <label className="main-content-profile__form--countryLabel">Country:</label>
                        <input className="main-content-profile__form--countryInput"
                            type="text"
                            name="country"
                            value={this.state.country}
                            onChange={this.handleInputChange}
                            placeholder="Country"
                        />

                        
                        <button className="main-content-profile__form--button" type="submit">Update</button>
                    </form>

                   
                </div>
            );
        }
    }
}


export default WalkerEditUserInfo;