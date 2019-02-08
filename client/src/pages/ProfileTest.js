import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import SidebarNavOwner from '../components/SidebarNavOwner';
import Profile from './Profile'
import TodayWalks from '../components/TodayWalks';
import InviteOwners from "../components/InviteOwners";
import ShowMap from "../components/ShowMap";
import ScheduleWalks from "../components/WalkerScheduleWalks";
import Schedule from '../components/Schedule';
import WalkerCertification from './WalkerCertification';
import WalkPhotoUpload from "../components/WalkPhotoUpandPost";
import DogOwnerGallery from "../components/DogGallery";
import OwnerWalks from "../components/ownerWalks";
import CreateDog from './createDog';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";

const loading = {
    margin: '1em',
    fontSize: '24px',
};

const title = 'DASHBOARD';

class ProfileContainer extends Component {
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
            case "Home": return <Profile
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
            case "SchedWalks": return <ScheduleWalks
                walkerID={this.state.userId}
                handlePageChange={this.handlePageChange}
            />;
            case "FullSchedule": return <Schedule
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
            default: return <Profile
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

    // Function to handle rendering the correct owner page from Sidebar Nav
    renderOwnerPage = () => {
        switch (this.state.currentPage) {
            case "Home": return <Profile
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
            case "Walks": return <OwnerWalks
                dogOwnerId={this.state.userId}
            />;
            case "Dogs": return <CreateDog
                UserID={this.state.userId}
                username={this.state.username}
                handlePageChange={this.handlePageChange}
            />;
            case "Gallery": return <DogOwnerGallery
                UserID={this.state.userId}
                username={this.state.username}
                handlePageChange={this.handlePageChange}
            />;
            default: return <Profile
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
            return <Redirect to="/user/login" />;
        } else {
            return (
                <div className="ownerDash">
                    <Header />
                    <div className="ownerDash__grid">
                        <SidebarNavOwner className="ownerDash__grid--sidebarNav"
                            username={username}
                            currentPage={this.state.currentPage}
                            handlePageChange={this.handlePageChange}
                            handleLogOut={this.handleLogOut}
                        />
                        <div className="ownerDash__grid--main-content">
                            {this.renderOwnerPage()}
                        </div>
                    </div>
                    <div className="ownerDash__grid--footer" >
                        <Footer />
                    </div>
                </div>
            );
        }
    }
}

export default ProfileContainer;