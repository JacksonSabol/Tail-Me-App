import React, { Component } from "react";
import EmailOwner from "./emailOwner"
import TextOwner from "./textOwner"
import CustomerList from "../Customers"
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
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
            inviteEmail: true,
            custumerList: false
        });
    };

    render() {

        const invites = [
            {
                name: 'Invite by Text', component: <TextOwner
                    walkerId={this.state.walkerId}
                    walkerName={this.state.walkerName}
                />
            },
            {
                name: 'Invite by Email', component: <EmailOwner
                    walkerId={this.state.walkerId}
                    walkerName={this.state.walkerName}
                />
            },
            {
                name: 'Customer List', component: <CustomerList
                    walkerId={this.state.walkerId}
                />
            }

        ];

        function getTabs() {
            return invites.map(invite => ({

                tabClassName: 'tab', // Optional
                panelClassName: 'panel', // Optional
                title: invite.name,
                content: invite.component,
            }));
        }
        return(
            <div className="InviteOwners">
        <Tabs items={getTabs()} />
        </div>
        )
       

    }

};

export default InviteOwners;


