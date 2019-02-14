import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import Profile from './Profile';
import ProfileWalker from "./ProfileWalker";
import TodayWalks from '../components/TodayWalks';
import InviteOwners from "../components/InviteOwners";
import ShowMap from "../components/ShowMap";
import WalkPhotoUpload from "../components/WalkPhotoUpandPost";
import ScheduleWalker from '../components/ScheduleWalker';
import WalkerCertification from './WalkerCertification';
import CreateDog from './createDog';
import FooterWalker from "../components/FooterWalker";
import HeaderWalker from "../components/HeaderWalker";
import "../index.css";


const loading = {
    margin: '1em',
    fontSize: '24px',
};

const title = 'DASHBOARD';

class ProfileContainerWalker extends Component {
    state = {
        currentPage: "Home",
        userId: 0,
        username: '',
        firstName: '',
        lastName: '',
        userType: '',
        aboutMe: '',
        address: '',
        City: '',
        State: '',
        zipCode: 0,
        country: '',
        loggedIn: false,
        isLoading: true,
        deleted: false,
        error: false,
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
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        userType: response.data.userType,
                        aboutMe: response.data.aboutMe,
                        address: response.data.address,
                        City: response.data.City,
                        State: response.data.State,
                        zipCode: response.data.zipCode,
                        country: response.data.country,
                        loggedIn: true,
                        isLoading: false,
                        error: false
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        error: true,
                    });
                });
        }
    }

    // Function to handle Sidebar Navigation
    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    // Function to handle rendering the correct walker page from Sidebar Nav
    renderWalkerPage = () => {
        switch (this.state.currentPage) {
            case "Home": return <ProfileWalker
                username={this.state.username}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                userType={this.state.userType}
                aboutMe={this.state.aboutMe}
                address={this.state.address}
                City={this.state.City}
                State={this.state.State}
                zipCode={this.state.zipCode}
                country={this.state.country}
            />;
            case "Walks": return <TodayWalks
                walkerId={this.state.userId}
            />;
            // case "SchedWalks": return <ScheduleWalksWalker
            //     walkerID={this.state.userId}
            //     handlePageChange={this.handlePageChange}
            // />;
            case "FullSchedule": return <ScheduleWalker
                walkerID={this.state.userId}
                username={this.state.username}
            />
            case "Certs": return <WalkerCertification
                username={this.state.username}
            />;
            case "Invite": return <InviteOwners
                walkerId={this.state.userId}
                walkerName={this.state.username}
            />;
            case "Map": return <ShowMap />;
            case "Upload": return <WalkPhotoUpload
                WalkerID={this.state.userId}
            />;
            default: return <ProfileWalker
                username={this.state.username}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                userType={this.state.userType}
                aboutMe={this.state.aboutMe}
                address={this.state.address}
                City={this.state.City}
                State={this.state.State}
                zipCode={this.state.zipCode}
                country={this.state.country}
            />;
        }
    };

    deleteUser = e => {
        let accessString = localStorage.getItem('JWT');
        if (accessString === null) {
            this.setState({
                isLoading: false,
                error: true,
            });
        }

        e.preventDefault();
        axios
            .delete('/deleteUser', {
                params: {
                    username: this.props.match.params.username,
                },
                headers: { Authorization: `JWT ${accessString}` },
            })
            .then(response => {
                console.log(response.data);
                localStorage.removeItem('JWT');
                this.setState({
                    deleted: true
                });
            })
            .catch(error => {
                console.log(error.response.data);
                this.setState({
                    error: true
                });
            });
    };

    handleLogOut = () => {
        localStorage.removeItem('JWT');
        this.setState({
            loggedIn: false
        });
    };

    render() {
        const {
            username,
            userType,
            loggedIn,
            error,
            isLoading,
            deleted,
        } = this.state;

        if (error) {
            return (
                <div>
                    <p>{title}</p>
                    <div style={loading}>
                        Problem fetching user data. Please login again.
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
        } else if (deleted) {
            return <Redirect to="/" />;
        } else if (!loggedIn) {
            return <Redirect to="/user/loginWalker" />;
        } else if (userType === "owner") {
            return <Redirect to={`/userProfile/${username}`} />;
        } else {
            return (
                <div className="walkerDash">
                    <HeaderWalker />
                    <div className="walkerDash__grid">
                        <SidebarNav className="walkerDash__grid--sidebarNav"
                            username={username}
                            currentPage={this.state.currentPage}
                            handlePageChange={this.handlePageChange}
                            handleLogOut={this.handleLogOut}
                        />
                        <div className="walkerDash__grid--main-content">
                            {this.renderWalkerPage()}
                        </div>
                    </div>
                    <div className="walkerDash__grid--footer" >
                    <FooterWalker />
                    </div>
                </div>
            );
        }
    }
}

export default ProfileContainerWalker;