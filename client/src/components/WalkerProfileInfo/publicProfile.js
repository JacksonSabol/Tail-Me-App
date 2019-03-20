import React, { Component } from 'react';
import "../../index.css";
import WalkerPublicUserInfo from "./walkerPublicProfile";
import axios from 'axios';
import FooterWalker from "../FooterWalker";
import homeIcon from "../../images/homeIcon.png";
import contactIcon from "../../images/mailIcon.png";

class WalkerPublicProfileInfo extends Component {
    state = {
        username: '',
        userEmail: '',
        firstName: '',
        lastName: '',
        profilePhotoURL: '',
        userType: '',
        aboutMe: '',
        certification: '',
        insurance: '',
        bond: '',
        services: '',
        availibility: ''
    };
    async componentDidMount() {
        await axios
            .get('/public/findWalker', {
                params: {
                    username: this.props.match.params.username
                }
            })
            .then(response => {
                this.setState({
                    username: this.props.match.params.username,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    profilePhotoURL: response.data.profilePhotoURL,
                    userType: response.data.userType,
                    aboutMe: response.data.aboutMe,
                    email: response.data.email,
                    certification: response.data.certification,
                    insurance: response.data.insurance,
                    bond: response.data.bond,
                    services: response.data.services,
                    availibility: response.data.availibility,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="walkerpublic">
                <div className="walkerpublic__nav">
                    <a className="walkerpublic__nav--home" href="/">
                        <img className="walkerpublic__nav--homeIcon" src={homeIcon} alt="home icon" ></img>
                    </a>
                    <a className="walkerpublic__nav--contact" href="/contactTailMe">
                        <img className="walkerpublic__nav--contactIcon" src={contactIcon} alt="contact icon" ></img>
                    </a>
                    <a className="walkerpublic__nav--userregistration" href="/user/Login">
                        owner log in
                        </a>
                    <a className="walkerpublic__nav--walkerauthentification" href="/walker/signup">
                        walker sign up
                    </a>
                    <a className="walkerpublic__nav--walkerregistration" href="/user/LoginWalker">
                        walker log in
                    </a>
                </div>
                <div className="walkerpublic__public">
                    <WalkerPublicUserInfo
                        username={this.state.username}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        profilePhotoURL={this.state.profilePhotoURL}
                        userType={this.state.userType}
                        aboutMe={this.state.aboutMe}
                        certification={this.state.certification}
                        insurance={this.state.insurance}
                        bond={this.state.bond}
                        services={this.state.services}
                        availibility={this.state.availibility}
                        email={this.state.email}
                    />
                </div>
                <div className="walkerpublic__publicFooter">
                    <FooterWalker />
                </div>
            </div>
        );
    }
}

export default WalkerPublicProfileInfo;