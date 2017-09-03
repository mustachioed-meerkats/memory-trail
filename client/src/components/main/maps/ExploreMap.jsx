import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

import Markers from './Markers.jsx';
import Search from './Search.jsx';
import PostList from '../PostList.jsx';

const ExploreMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.handleMapMounted}
    defaultZoom={12}
    center={props.center}
  >
    <SearchBox
      ref={props.handleSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      inputPlaceholder='Search for a place!'
      inputStyle={props.inputStyle}
    />
    {props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
));

const mapStateToProps = state => ({
  center: state.map.center,
  bounds: state.map.bounds,
  inputStyle: state.map.inputStyle,
  containerElement: <div style={{height: '100%'}} />,
  mapElement: <div style={{height: '100%'}} />,
  markers: state.map.markers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleMapMounted: state.map.handleMapMounted,
  handleSearchBoxMounted: state.map.handleSearchBoxMounted,
});

export default connect(
  mapStateToProps
)(ExploreMap);