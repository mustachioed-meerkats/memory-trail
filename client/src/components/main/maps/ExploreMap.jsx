import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

import Markers from './Markers.jsx';
import Search from './Search.jsx';
import PostList from '../PostList.jsx';

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={12}
    center={props.mapCenter}
    onClick={props.onMapClick}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder='Search for a place!'
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map(marker => (
      <Marker
        {...marker}
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
          lat: 37.769421,
          lng: -122.486214
        },
        key: 'Golden Gate Park',
        defaultAnimation: 2
      }],
      bounds: null,
      center: {
        lat: 47.6205588,
        lng: -122.3212725,
      }
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
  }

  handleMapMounted(map) {
    this._mapComponent = map;
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

  handleBoundsChanged() {
    this.setState({
      bounds: this._mapComponent._map.getBounds(),
      center: this._map.getCenter()
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();
    console.log('got some new places: ', places);
    const markers = places.map(place => ({
      position: place.geometry.location
    }));

    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers
    });
  }

  render() {
    return (
      <div style={{height: '700px'}}>
        <GettingStartedGoogleMap
          containerElement={<div style={{height: '100%'}} />}
          mapElement={<div style={{height: '100%'}} />}
          mapCenter={this.state.center}
          onMapMounted={this.handleMapMounted}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onBoundsChanged={this.onBoundsChanged}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged}
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