import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import "../index.css";
import FooterWalker from "../components/FooterWalker";
import logo from "../images/tailMeLogo.png";
import homeIcon from "../images/homeIcon.png";

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
        insurance: '',
        bond: '',
        services: '',
        availibility: '',
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
                insurance: this.state.insurance,
                bond: this.state.bond,
                services: this.state.services,
                availibility: this.state.availibility
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
                <div className="walkerQualifications">
                    <img className="walkerQualifications__logo" src={logo} alt="tailME logo" ></img>
                    <p className="walkerQualifications__title">{title}</p>
                    <form className="walkerQualifications__form" onSubmit={this.handleCreateQualifications}>
                        <label className="walkerQualifications__form--certificationLabel">SF dog walker certification</label>
                        <input className="walkerQualifications__form--certificationInput"
                            type="text"
                            name="certifications"
                            value={this.state.certifications}
                            onChange={this.handleInputChange}
                            placeholder="Certified "
                        />
                        <label className="walkerQualifications__form--insuranceLabel">Proof of insurance</label>
                        <input className="walkerQualifications__form--insuranceInput"
                            type="text"
                            name="insurance"
                            value={this.state.insurance}
                            onChange={this.handleInputChange}
                            placeholder="Insurance"
                        />
                        <label className="walkerQualifications__form--bondLabel">Proof of Bond</label>
                        <input className="walkerQualifications__form--bondInput"
                            type="text"
                            name="bond"
                            value={this.state.bond}
                            onChange={this.handleInputChange}
                            placeholder="Bond"
                        />
                        <label className="walkerQualifications__form--servicesLabel">Do you offer any specialty services?</label>
                        <input className="walkerQualifications__form--servicesInput"
                            type="text"
                            name="services"
                            value={this.state.services}
                            onChange={this.handleInputChange}
                            placeholder="Good with aggressive dogs, etc..."
                        />
                        <label className="walkerQualifications__form--userTypeLabel">Are you accepting new clients?</label>
                        <select className="walkerQualifications__form--userTypeSelect"
                         name="availibility" onChange={this.handleInputChange} value={this.state.availibility}>
                            <option value="available">Available for Hire</option>
                            <option value="unavailable">Not Available for Hire</option>
                        </select>
                        <button type="submit" className="walkerQualifications__form--submitButton">Add Your Qualifications</button>
                    {dbError === true && (
                        <div>
                            <p className="walkerQualifications__form--alert">An error occured while adding entries to the database.</p>
                        </div>
                    )}
                    </form>
                    <a className="walkerQualifications__form--homeButton" href="/">
                        <img className="walkerQualifications__form--homeIcon" src={homeIcon} alt="home icon" >
                        </img> Home</a>
                        <div className="walkerQualifications__form--footer">
                        <FooterWalker />
                    </div>
                </div>
            );
        } else {
            return <Redirect to={`/userProfileWalker/${username}`} />;
        }
    }
}
export default createWalkerQualifications