import React, { Component } from "react";
import API from "../../utils/API";



class InviteOwners extends Component {

    state = {
        name: "",
        phone: ""
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
        console.log(this.state.phone.slice(1, this.state.phone.length));

        const data = {
            ownerName: this.state.name,
            phoneNumber: this.state.phone,
            specialCode:  this.state.phone.slice(1, this.state.phone.length),
            walkerId :  1,
            walkerName: "Jon Snow"
            // walkerId :  this.state.walkerid 
            // walkerName :  this.state.walkerName
        }

        API.createInvitation(data)
            .then(res => {
                console.log("back from createinvitation")
                this.setState({
                    name: "",
                    phone: ""
                });
            }).catch(err => {
                console.log(err)
            });
        // }
    };


    render() {
        return (
            <div>
                <p>
                    Hello {this.state.firstName} {this.state.lastName}
                </p>
                <form className="form">
                    <input
                        value={this.state.name}
                        name="name"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        value={this.state.phone}
                        name="phone"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Phone number"
                    />
                    <button onClick={this.handleInviteSubmit}>Send Invitation</button>
                </form>
            </div>
        );
    }

};

export default InviteOwners;


