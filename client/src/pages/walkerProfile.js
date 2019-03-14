import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "../index.css";


class walkerProfile extends Component {
    state = {
        userId: 0,
        firstName: '',
        lastName: '' ,
        aboutMe: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        profilePhotoURL: ''
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
                this.setState({
                    userId: response.data.UserID,
                    username: response.data.username,
                    certification: response.data.certification,
                    insurance: response.data.insurance,
                    bond: response.data.bond,
                    services: response.data.services,
                    availibility: response.data.availibility
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

    handleWalkerCert = e => {
        e.preventDefault();
        axios
            .post('/api/walker/create', {
                userId: this.state.userId,
                certification: this.state.certification,
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
                <div className="main-content-certify">
                <div className="main-content-certify__title">Walker Profile Update</div>
                    <form className="main-content-certify__form" onSubmit={this.handleWalkerCert}>
                    <label className="main-content-certify__form--certificationLabel">Certification:</label>
                    <input className="main-content-certify__form--certificationInput"
                            type="text"
                            name="certification"
                            value={this.state.certification}
                            onChange={this.handleInputChange}
                            placeholder="Certifications"
                        />
                        <label className="main-content-certify__form--insuranceLabel">Insurance:</label>
                        <input className="main-content-certify__form--insuranceInput"
                            type="text"
                            name="insurance"
                            value={this.state.insurance}
                            onChange={this.handleInputChange}
                            placeholder="Insurance"
                        />
                        <label className="main-content-certify__form--bondLabel">Bond:</label>
                        <input className="main-content-certify__form--bondInput"
                            type="text"
                            name="bond"
                            value={this.state.bond}
                            onChange={this.handleInputChange}
                            placeholder="Bond"
                        />
                        <label className="main-content-certify__form--servicesLabel">Services:</label>
                        <input className="main-content-certify__form--servicesInput"
                            type="text"
                            name="services"
                            value={this.state.services}
                            onChange={this.handleInputChange}
                            placeholder="Special services"
                        />
                        <label className="main-content-certify__form--availibilityLabel">Availibility Status:</label>
                        <select className="main-content-certify__form--availibilityStatus"
                         name="availibility" onChange={this.handleInputChange} value={this.state.status}>
                            <option value="available">Available for Hire</option>
                            <option value="unavailable">Not Available for Hire</option>
                        </select>
                        <button className="main-content-certify__form--button" type="submit">Update</button>
                    </form>
                </div>
            );
        }
    }
}


export default walkerProfile