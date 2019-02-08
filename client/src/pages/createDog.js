import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "../index.css";


class WalkerCertification extends Component {
    state = {
        userId: 0,
        walkerId: 0,
        username: '',
        dogName: '',
        emergencyContact: '',
        dogAdded: false
    };

    async componentDidMount() {
        await axios
            .get('/api/dogProfile/findWalker', {
                params: {
                    UserID: this.props.UserID
                }
            })
            .then(response => {
                this.setState({
                    userId: response.data.userId,
                    walkerId: response.data.walkerId,
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

    handleCreateDog = event => {
        event.preventDefault();
        axios
            .post('/api/dogProfile/create', {
                dogName: this.state.dogName,
                emergencyContact: this.state.emergencyContact,
                userId: this.state.userId,
                walkerId: this.state.walkerId
            })
            .then(response => {
                // this.setState({
                //     dogAdded: true
                // });
                this.props.handlePageChange("Home")
            })
            .catch(error => {
                console.log(error.response.data);
                this.setState({
                    dbError: true,
                    // errorMessage: error.response.data
                });
            });
    };

    render() {
        const { username, dogAdded } = this.state;
        if (dogAdded) {
            return <Redirect to={`/userProfile/${username}`} />;
        } else {
            return (
                <div className="createDog">
                    <div className="createDog__title">Add a Dog</div>
                    <form className="createDog__form" onSubmit={this.handleCreateDog}>
                        <label className="createDog__form--nameLabel">What is your dog's name?: </label>
                        <input className="createDog__form--nameInput"
                            type="text"
                            name="dogName"
                            value={this.state.dogName}
                            onChange={this.handleInputChange}
                            placeholder="Lassie"
                        />
                        <label className="createDog__form--phoneLabel">Enter an Emergency Contact Number: </label>
                        <input className="createDog__form--phoneInput"
                            type="text"
                            name="emergencyContact"
                            value={this.state.emergencyContact}
                            onChange={this.handleInputChange}
                            placeholder="415-867-5309"
                        />
                        <button className="createDog__form--button" type="submit">Add Your Dog</button>
                    </form>
                </div>
            );
        }
    }
}


export default WalkerCertification;