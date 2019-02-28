import React, { Component } from "react";
import EmailOwner from "./emailOwner"
import TextOwner from "./textOwner"

class InviteOwners extends Component {
    state = {
        walkerName: this.props.walkerName,
        walkerId: this.props.walkerId,
        inviteEmail: true,
        inviteText: false
    };

    // Function to render text invite component
    renderTextInvite = () => {
        this.setState({
            inviteText: true,
            inviteEmail: false
        });
    };
    // Function to render email invite component
    renderEmailInvite = () => {
        this.setState({
            inviteText: false,
            inviteEmail: true
        });
    };

    render() {
        const {
            inviteText,
            inviteEmail
        } = this.state;

        if (inviteText === false && inviteEmail === true) {
            return (
                <div className="inviteDash">
                    <div className="inviteDash__nav">
                        {/* <button className="inviteDash__nav--emailActive" onClick={this.renderEmailInvite}></button> */}
                        <button className="inviteDash__nav--buttonEmail" onClick={this.renderEmailInvite} disabled>Invite By Email</button>
                        {/* <button className="inviteDash__nav--text" onClick={this.renderTextInvite}></button> */}
                        <button className="inviteDash__nav--buttonText" onClick={this.renderTextInvite}>Invite By Text</button>
                    </div>
                    <div className="inviteDash__main-content">
                        <EmailOwner
                            walkerId={this.state.walkerId}
                            walkerName={this.state.walkerName}
                        />;
                    </div>
                </div>
            );
        } else {
            return (
                <div className="inviteDash">
                    <div className="inviteDash__nav">
                        {/* <button className="inviteDash__nav--email" onClick={this.renderEmailInvite}></button> */}
                        <button className="inviteDash__nav--buttonEmail" onClick={this.renderEmailInvite}>Invite By Email</button>
                        {/* <button className="inviteDash__nav--textActive" onClick={this.renderTextInvite}></button> */}
                        <button className="inviteDash__nav--buttonText" onClick={this.renderTextInvite} disabled>Invite By Text</button>
                    </div>
                    <div className="inviteDash__main-content">
                        <TextOwner
                            walkerId={this.state.walkerId}
                            walkerName={this.state.walkerName}
                        />;
                    </div>
                </div>
            );
        }

    }

};

export default InviteOwners;


