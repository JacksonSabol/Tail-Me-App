import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';

import API from "../../utils/API";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    checkin: false
  };

  handleCheckin = () => {
    
   /*  API.updateWalk(event.id, data)
            .then(res => {
              this.setState({
                checkin: true
              });
            })
            .catch(err => console.log(err));
    */
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div className="showMap">
        <div className="showMap__title">Check into your walk</div>
        <div className="showMap__button">
        <button className="showMap__button--checkIn" onClick={() => this.handleCheckin()}>Check-in </button>
        <button className="showMap__button--checkOut"onClick={() => this.handleCheckout()}>Check-out</button>
        </div>
        {this.state.checkin ? (
          <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
            <Marker onClick={this.onMarkerClick} name={'current location'} icon={{ url: "../paw2020.svg" }} />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </CurrentLocation>
        ) : (
            <p className="search__form--openmsg">{this.state.errorMessage}</p>
          )}

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(MapContainer);

// export default MapContainer
