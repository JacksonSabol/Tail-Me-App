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

const title = "Please Fill Out Your Qualifications";

class createWalkerQualifications extends Component {
    // Setting the initial state values
    state = {
        userId: 0,
        username: '',
        certifications: '',
        services: '',
        status: '',
        loggedIn: false,
        certAdded: false,
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

    handleCreateQualifications = event => {
        event.preventDefault();
        axios
            .post('/api/walker/create', {
                userId: this.state.userId,
                certifications: this.state.certifications,
                services: this.state.services,
                status: this.state.status
            })
            .then(response => {
                this.setState({
                    certAdded: true
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
            certAdded,
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
        } else if (!certAdded) {
            return (
                <div className="ownerProfile">
                    <img className="ownerProfile__logo" src={logo} alt="tailME logo" ></img>
                    <p className="ownerProfile__title">{title}</p>
                    <form className="ownerProfile__form" onSubmit={this.handleCreateQualifications}>
                        <label className="ownerProfile__form--firstNameLabel">Do you have any certifications?</label>
                        <input className="ownerProfile__form--firstNameInput"
                            type="text"
                            name="certifications"
                            value={this.state.certifications}
                            onChange={this.handleInputChange}
                            placeholder="Certified VA"
                        />
                        <label className="ownerProfile__form--lastNameLabel">Do you offer any specialty services?</label>
                        <input className="ownerProfile__form--lastNameInput"
                            type="text"
                            name="services"
                            value={this.state.services}
                            onChange={this.handleInputChange}
                            placeholder="Good with aggressive dogs, etc..."
                        />
                        <label className="ownerProfile__form--userTypeLabel">Are you accepting new clients?</label>
                        <select className="ownerProfile__form--userTypeSelect"
                         name="status" onChange={this.handleInputChange} value={this.state.status}>
                            <option value="available">Available for Hire</option>
                            <option value="unavailable">Not Available for Hire</option>
                        </select>
                        <button type="submit" className="ownerProfile__form--submitButton">Add Your Qualifications</button>
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
            return <Redirect to={`/userProfileWalker/${username}`} />;
        }
    }
}
export default createWalkerQualifications