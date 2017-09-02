import React from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{lat: -25.363882, lng: 131.044922}}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
    </GoogleMap>
));

export default class GettingStartedExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001
        },
        key: 'Taiwan',
        defaultAnimation: 2
      }]
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now()
      }
    ];
    this.setState({
      markers: nextMarkers
    });

    // if (nextMarkers.length === 3) {
    //   this.props.toast(
    //     `Right click on the marker to remove it`,
    //     `Also check the code before you wreck yo self!`
    //   );
    // }
  }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers
    });
  }

  render() {
    return (
      <div style={{height: `100%`}}>
        <GettingStartedGoogleMap
          containerElement={
            <div style={{height: `500px`}} />
          }
          mapElement={
            <div style={{height: `500px`}} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}