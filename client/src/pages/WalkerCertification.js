import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "../index.css";


class WalkerCertification extends Component {
    state = {
        userId: 0,
        username: '',
        certifications: '',
        services: '',
        status: '',
        certAdded: false
    };

    async componentDidMount() {
        let accessString = localStorage.getItem('JWT');
        await axios
            .get('/findUser', {
                params: {
                    username: this.props.username
                },
                headers: { Authorization: `JWT ${accessString}` },
            })
            .then(response => {
                this.setState({
                    userId: response.data.UserID,
                    username: this.props.username
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleWalkerCert = e => {
        e.preventDefault();
        axios
            .post('/api/walker/create', {
                userId: this.state.userId,
                certifications: this.state.certifications,
                services: this.state.services,
                status: this.state.status
            })
            .then(response => {
                this.setState({
                    certAdded: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { username, certAdded } = this.state;
        if (certAdded) {
            return <Redirect to={`/userProfile/${username}`} />;
        } else {
            return (
                <div className="main-content__certify">
                    <form className="certify-form" onSubmit={this.handleWalkerCert}>
                        <input
                            type="text"
                            name="certifications"
                            value={this.state.certifications}
                            onChange={this.handleInputChange}
                            placeholder="Certifications?"
                        />
                        <input
                            type="text"
                            name="services"
                            value={this.state.services}
                            onChange={this.handleInputChange}
                            placeholder="Special services?"
                        />
                        <select name="status" onChange={this.handleInputChange} value={this.state.status}>
                            <option value="available">Available for Hire</option>
                            <option value="unavailable">Not Available for Hire</option>
                        </select>
                        <button type="submit">Update</button>
                    </form>
                </div>
            );
        }
    }
}


export default WalkerCertification;