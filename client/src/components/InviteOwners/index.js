import React, { Component } from "react";
import EmailOwner from "./emailOwner"
import TextOwner from "./textOwner"
import CustomerList from "../Customers"
import "../../index.css";

class InviteOwners extends Component {
    state = {
        walkerName: this.props.walkerName,
        walkerId: this.props.walkerId,
        currentComponent: "Email"
    };

    // Function to handle Tab Navigation
    handleComponentChange = component => {
        this.setState({ currentComponent: component });
    };

    // Function to render components
    renderCurrentComponent = () => {
        switch (this.state.currentComponent) {
            case "Email": return <EmailOwner
                walkerId={this.state.walkerId}
                walkerName={this.state.walkerName}
            />;
            case "Text": return <TextOwner
                walkerId={this.state.walkerId}
                walkerName={this.state.walkerName}
            />;
            case "List": return <CustomerList
                walkerId={this.state.walkerId}
            />;
            default: return <EmailOwner
                walkerId={this.state.walkerId}
                walkerName={this.state.walkerName}
            />;
        }
    }

    render() {
        return (
            <div className="walkerInvite">
                <div className="walkerInvite__tabs--email">
                    <button className="walkerInvite__tabs--itemLink" onClick={() => this.handleComponentChange("Email")}>
                        Invite by Email
                    </button>
                </div>
                <div className="walkerInvite__tabs--text">
                    <button className="walkerInvite__tabs--itemLink" onClick={() => this.handleComponentChange("Text")}>
                        Invite by Text
                    </button>
                </div>
                <div className="walkerInvite__tabs--list">
                    <button className="walkerInvite__tabs--itemLink" onClick={() => this.handleComponentChange("List")}>
                        Customer List
                    </button>
                </div>
                <div className="walkerInvite__form">
                    {this.renderCurrentComponent()}
                </div>
            </div>
        );
    }

};

export default InviteOwners;


