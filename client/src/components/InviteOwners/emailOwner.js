import React, { Component } from "react";
import axios from "axios";

class EmailOwner extends Component {
    state = {
        name: "",
        email: "",
        fieldError: false,
        messageSent: false,
        error: false
    };

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleInviteSubmit = event => {
        event.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            this.setState({ registerError: true });
        } else {
            axios
                .post('/mail/invite', {
                    ownerName: this.state.name,
                    email: this.state.email,
                    walkerId: this.props.walkerId,
                    walkerName: this.props.walkerName
                })
                .then(response => {
                    console.log(response);
                    this.setState({
                        name: "",
                        email: "",
                        messageSent: true
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ error: true });
                });
        }
    };

    render() {
        const {
            error,
            fieldError,
            messageSent
        } = this.state;
        return (
            <div>
                {error ? (
                    <div className="walkerInvite">
                        <p className="search__form--alert"> Please update your qualifications before inviting clients. </p>
                    </div>
                ) : (
                        <div className="walkerInvite">
                            <p className="walkerInvite__title">
                                Hello {this.props.walkerName}, use this form to invite new clients to TailMe by email!</p>
                            <form className="walkerInvite__form">
                                <label className="walkerInvite__form--nameLabel">Client Name:</label>
                                <input className="walkerInvite__form--nameInput"
                                    value={this.state.name}
                                    name="name"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    placeholder="Name"
                                />
                                <label className="walkerInvite__form--phoneLabel">Client Email:</label>
                                <input className="walkerInvite__form--phoneInput"
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.handleInputChange}
                                    type="email"
                                    placeholder="john.doe@gmail.com"
                                />
                                <button className="walkerInvite__form--button" onClick={this.handleInviteSubmit}>Send Invitation</button>
                            </form>
                            {fieldError === true && (
                                <div>
                                    <p className="walkerSignup__form--alertOne">Name and email are required fields.</p>
                                </div>
                            )}
                            {messageSent === true && (
                                <div>
                                    <p className="walkerSignup__form--alertTwo">Message sent!</p>
                                </div>
                            )}
                        </div>
                    )}
            </div>
        );
    }

};

export default EmailOwner;


