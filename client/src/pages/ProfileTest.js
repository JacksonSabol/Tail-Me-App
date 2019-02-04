import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


const loading = {
    margin: '1em',
    fontSize: '24px',
};

const title = 'User Profile Screen';

class Profile extends Component {
    state = {
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
                    console.log(error.response.data);
                    this.setState({
                        error: true,
                    });
                });
        }
    }

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

    handleLogOut = event => {
        event.preventDefault();
        localStorage.removeItem('JWT');
        this.setState({
            loggedIn: false
        });
    };

    render() {
        const {
            firstName,
            lastName,
            userType,
            aboutMe,
            address,
            City,
            State,
            zipCode,
            country,
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
                <div>
                    <p>{title}</p>
                    <table>
                        <tbody>
                            <tr>
                                {/* <td><img src={`data:image/jpeg;Base64,${this.state.profilePhoto}`} /></td> */}
                                <td>First Name</td>
                                <td>{firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{lastName}</td>
                            </tr>
                            <tr>
                                <td>User Type</td>
                                <td>{userType}</td>
                            </tr>
                            <tr>
                                <td>About Me</td>
                                <td>{aboutMe}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{address}</td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>{City}</td>
                            </tr>
                            <tr>
                                <td>State</td>
                                <td>{State}</td>
                            </tr>
                            <tr>
                                <td>Zipcode</td>
                                <td>{zipCode}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{country}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <button onClick={this.deleteUser}>Delete Account</button> */}
                    <button onClick={this.handleLogOut}>Log Out</button>
                </div>
            );
        }
    }
}

export default Profile;