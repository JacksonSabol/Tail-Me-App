import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'green',
    padding: '10px 15px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

class SimpleMap extends Component {
  state = {
    currentLocation: {
      lat: 37.7912398,
      lng: -122.39435999999998
    },
    zoom: 14
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      console.log("coords: ", coords);
      this.setState({
        currentLocation: {
          lat: coords.latitude,
          lng: coords.longitude
        }
      });
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.state.currentLocation}
          defaultZoom={this.state.zoom}
        >
          <AnyReactComponent
            background = {'blue'}
            icon={{ url: "../paw-purple-2020.svg" }}
            lat={this.state.lat}
            lng={this.state.lng}
            text={'1'}
          />
           <AnyReactComponent
            icon={{ url: "../paw-green-2020.svg" }}
            lat={37.7924791}
            lng={-122.1818368}    
            text={'2'}
          />
          <AnyReactComponent
            icon={{ url: "../paw-green-2020.svg" }}
            lat={37.7929616}
            lng={-122.1776605}  
            text={'3'}
          /> 
           <AnyReactComponent
            icon={{ url: "../paw-green-2020.svg" }}
            lat={37.7947019}
            lng={-122.1858723}  
            text={'4'}
          /> 
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
