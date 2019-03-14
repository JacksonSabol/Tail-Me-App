import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Profile from './Profile'
import DogOwnerGallery from "../components/DogGallery";
import OwnerWalks from "../components/ownerWalks";
import CreateDog from './createDog';
import TopBarNavOwner from "../components/TopBarNavOwner";
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
        profilePhotoURL: '',
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
                .get('/findOwner', {
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
                        profilePhotoURL: response.data.profilePhotoURL,
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

    capitalizeUserType(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Function to handle Sidebar Navigation
    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    // Function to handle rendering the correct owner page from Sidebar Nav
    renderOwnerPage = () => {
        switch (this.state.currentPage) {
            case "Home": return <Profile
                username={this.state.username}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                profilePhotoURL={this.state.profilePhotoURL}
                userType={this.capitalizeUserType(this.state.userType)}
                aboutMe={this.state.aboutMe}
                address={this.state.address}
                City={this.state.City}
                State={this.state.State}
                zipCode={this.state.zipCode}
                country={this.state.country}
            />;
            case "Walks": return <OwnerWalks
                OwnerID={this.state.userId}
            />;
            // Make it my dogs with react table and existing CreateDog component
            case "Dogs": return <CreateDog
                UserID={this.state.userId}
                username={this.state.username}
                handlePageChange={this.handlePageChange}
            />;
            case "Gallery": return <DogOwnerGallery
                userId={this.state.userId}
                username={this.state.username}
                handlePageChange={this.handlePageChange}
            />;
            default: return <Profile
                username={this.state.username}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                profilePhotoURL={this.state.profilePhotoURL}
                userType={this.capitalizeUserType(this.state.userType)}
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
        } else if (userType === "walker") {
            return <Redirect to={`/userProfileWalker/${username}`} />;
        } else {
            return (
                <div className="ownerDash">
                    <div className="ownerDash__grid">
                    <div className="ownerDash__grid--header">
                            <TopBarNavOwner
                                username={username}
                                currentPage={this.state.currentPage}
                                handlePageChange={this.handlePageChange}
                                handleLogOut={this.handleLogOut}
                            />
                        </div>
                        {/* <SidebarNavOwner className="ownerDash__grid--sidebarNav"
                            username={username}
                            currentPage={this.state.currentPage}
                            handlePageChange={this.handlePageChange}
                            handleLogOut={this.handleLogOut}
                        /> */}
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