import React from 'react';
import ReactDOM from 'react-dom';


class CurrentLocation extends React.Component {

  state = {
    currentLocation: {
      lat: 0,
      lng: 0
    }
  };

  handleCheckin = () => {

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        console.log("coords: ", coords);

        // update walks start time and coordinates and end time and coords
        //
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
      });
    }
  }

render() {

  return (
    <div>

      <p>testing the location</p>
      <button onClick={() => this.handleCheckin()}>Check-in </button>
      <button onClick={() => this.handleCheckout()}>Check-out</button>

      <p>Lat: {this.state.currentLocation.lat} | Long: {this.state.currentLocation.lng}</p>
   
    </div>

  )
}
}
export default CurrentLocation;
