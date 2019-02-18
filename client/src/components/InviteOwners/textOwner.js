import React, { Component } from "react";
import API from "../../utils/API";

class TextOwner extends Component {
    state = {
        name: "",
        phone: "",
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
        // console.log(this.state.phone.slice(1, this.state.phone.length));
        if (this.state.name === '' || this.state.phone === '') {
            this.setState({ fieldError: true });
        } else {
            const data = {
                ownerName: this.state.name,
                phoneNumber: this.state.phone,
                specialCode: this.state.phone.slice(1, this.state.phone.length),
                walkerId: this.props.walkerId,
                walkerName: this.props.walkerName
            }

            API.createTextInvitation(data)
                .then(res => {
                    // console.log("back from createinvitation")
                    this.setState({
                        name: "",
                        phone: "",
                        messageSent: true
                    });
                }).catch(err => {
                    console.log(err);
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
                                Hello {this.props.walkerName}, use this form to invite new clients to TailMe by text message!</p>
                            <form className="walkerInvite__form">
                                <label className="walkerInvite__form--nameLabel">Client Name:</label>
                                <input className="walkerInvite__form--nameInput"
                                    value={this.state.name}
                                    name="name"
                                    onChange={this.handleInputChange}
                                    type="Dog Owner"
                                    placeholder="Name"
                                />
                                <label className="walkerInvite__form--phoneLabel">Client Phone Number:</label>
                                <input className="walkerInvite__form--phoneInput"
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={this.handleInputChange}
                                    type="number"
                                    placeholder="10 digit number"
                                />
                                <button className="walkerInvite__form--button" onClick={this.handleInviteSubmit}>Send Invitation</button>
                            </form>
                            {fieldError === true && (
                                <div>
                                    <p className="walkerSignup__form--alertOne">Name and phone number are required fields.</p>
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

export default TextOwner;


