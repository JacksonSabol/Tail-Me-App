import React, { Component } from 'react';
import API from "../../utils/API";
import "../../index.css";
import WalkerPublicUserInfo from "./walkerPublicProfile";
import axios from 'axios';

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
        console.log(this.props.match.params.username)
        await axios
            .get('/public/findWalker', {
                params: {
                    username: this.props.match.params.username
                }
            })
            .then(response => {
                console.log("res", response.data)
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

                <div className="walkersplash">
                    <div className="walkersplash__nav">

                        <a className="walkersplash__nav--userregistration" href="/user/Login">
                            owner log in
                        </a>

                        <a className="walkersplash__nav--walkerauthentification" href="/walker/signup">
                            walker sign up
                    </a>
                        <a className="walkersplash__nav--walkerregistration" href="/user/LoginWalker">
                            walker log in
                    </a>
                    </div>

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
                );
            
        }
    }
    
    
export default WalkerPublicProfileInfo;