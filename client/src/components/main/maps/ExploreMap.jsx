import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

import Markers from './Markers.jsx';
import Search from './Search.jsx';
import PostList from '../PostList.jsx';

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    defaultCenter={{lat: props.mapCenter.lat, lng: props.mapCenter.lng}}
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

class ExploreMap extends React.Component {
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
  }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers
    });
  }

  render() {
    return (
      <div style={{height: '700px'}}>
        <GettingStartedGoogleMap
          containerElement={
            <div style={{height: '100%'}} />
          }
          mapElement={
            <div style={{height: '100%'}} />
          }
          mapCenter={this.props.mapCenter}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mapCenter: state.map.mapCenter,
});

const mapDispatchToProps = dispatch => bindActionCreators({
});

export default connect(
  mapStateToProps
)(ExploreMap);