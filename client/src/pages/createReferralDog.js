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

const title = "Please Fill Out Your Dog's Information";

class createReferralDog extends Component {
    // Setting the initial state values
    state = {
        userId: 0,
        referredWalkerID: 0,
        username: '',
        dogName: '',
        emergencyContact: '',
        loggedIn: true,
        dogCreated: false,
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
                .get('/findUser', {
                    params: {
                        username: this.props.match.params.username
                    },
                    headers: { Authorization: `JWT ${accessString}` },
                })
                .then(response => {
                    this.setState({
                        userId: response.data.UserID,
                        referredWalkerID: this.props.match.params.referredWalkerID,
                        username: this.props.match.params.username,
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
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleCreateDog = event => {
        event.preventDefault();
        axios
            .post('/api/dogProfile/create', {
                dogName: this.state.dogName,
                emergencyContact: this.state.emergencyContact,
                userId: this.state.userId,
                walkerId: this.state.referredWalkerID
            })
            .then(response => {
                this.setState({
                    dogCreated: true
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
            dogCreated,
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
        } else if (!dogCreated) {
            return (
                <div className="ownerProfile">
                    <img className="ownerProfile__logo" src={logo} alt="tailME logo" ></img>
                    <p className="ownerProfile__title">{title}</p>
                    <form className="ownerProfile__form" onSubmit={this.handleCreateDog}>
                        <label className="ownerProfile__form--firstNameLabel">Enter your Dog's Name</label>
                        <input className="ownerProfile__form--firstNameInput"
                            type="text"
                            name="dogName"
                            value={this.state.dogName}
                            onChange={this.handleInputChange}
                            placeholder="Fido"
                        />
                        <label className="ownerProfile__form--lastNameLabel">Enter an Emergency Contact Number</label>
                        <input className="ownerProfile__form--lastNameInput"
                            type="text"
                            name="emergencyContact"
                            value={this.state.emergencyContact}
                            onChange={this.handleInputChange}
                            placeholder="415-867-5309"
                        />
                        <button type="submit" className="ownerProfile__form--submitButton">Add Your Dog</button>
                    </form>
                    {dbError === true && (
                        <div>
                            <p>An error occured while adding entries to the database.</p>
                        </div>
                    )}
                    <a className="ownerProfile__form--homeButton" href="/">Return to Home</a>
                    <Footer />
                </div>
            );
        } else {
            return <Redirect to={`/userProfile/${username}`} />;
        }
    }
}
export default createReferralDog