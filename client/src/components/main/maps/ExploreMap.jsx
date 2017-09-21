import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import Search from './Search.jsx';
import PostList from '../PostList.jsx';
import InfoWindowContent from './InfoWindowContent.jsx';

/** ============================================================
 * Import Redux Action Creators
 * ========================================================== */
import {
  handleMapMounted, 
  handleSearchBoxMounted,
  handlePlacesChanged,
  handleBoundsChanged,
  handleSearchArea,
  handleMarkerClick,
  handleMarkerClose
} from '../../../store/modules/map';

// TODO: Refactor into styles
var inputStyle = {
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  border: '1px solid transparent',
  width: '218px',
  height: '34px',
  margin: '1rem 0rem 0rem 7.2rem',
  padding: '0 12px',
  borderRadius: '1px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  outline: 'none',
  textOverflow: 'ellipses',
};

// TODO: Refactor into styles
const buttonStyle = {
  position: 'fixed',
  bottom: 50,
};
const togglebuttonStyle = {
  position: 'fixed',
  bottom: 100,
};

const togglebuttonSmall = {
  position: 'fixed',
  top: 100,
};

let mapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false
};

const infoMarker = (landMarkImage) => {
  return (
    {
      margin: '-1rem -1rem 0.5rem -1rem',
      height: '5rem',
      background: `url(${landMarkImage})  center center`,
      backgroundSize: 'cover'
    }
  );
};


const ExploreMapComponent = withGoogleMap(props => (
  <GoogleMap
    ref={props.handleMapMounted}
    defaultZoom={12}
    center={props.center}
    onDragEnd={() => props.handleBoundsChanged(props.map)}
    options={mapOptions}
  >
    <SearchBox
      ref={props.handleSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={() => props.handlePlacesChanged(props.searchBox, props.center)}
      inputPlaceholder='Search for a place!'
      inputStyle={props.inputStyle}
    />
    {props.landmarks.map((landmark, index) => (
      <Marker 
        position={{lat: parseFloat(landmark.lat), lng: parseFloat(landmark.lng)}} key={index} 
        onClick={() => props.handleMarkerClick(landmark)}
      >
        {landmark.showInfo && (
          <InfoWindow onCloseClick={() => props.handleMarkerClose(landmark)}>
            <InfoWindowContent landmark={landmark} />
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

class ExploreMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _map: null,
      _searchBox: null
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  }

  handleMapMounted(map) {
    this.setState({
      _map: map
    });
  }

  handleSearchBoxMounted(searchBox) {
    this.setState({
      _searchBox: searchBox
    });
  }

  render() {
    return (
      <ExploreMapComponent 
        containerElement={this.props.containerElement}
        mapElement={this.props.mapElement}
        handleMapMounted={this.handleMapMounted}
        center={this.props.center}
        handleBoundsChanged={this.props.handleBoundsChanged}
        map={this.state._map}
        handleSearchArea={this.props.handleSearchArea}
        handleSearchBoxMounted={this.handleSearchBoxMounted}
        bounds={this.props.bounds}
        handlePlacesChanged={this.props.handlePlacesChanged}
        searchBox={this.state._searchBox}
        inputStyle={this.props.inputStyle}
        handleMarkerClick={this.props.handleMarkerClick}
        handleMarkerClose={this.props.handleMarkerClose}
        markers={this.props.markers}
        landmarks={this.props.landmarks}
        openSideBar={this.props.openSideBar}
      />
    );
  }
}

const mapStateToProps = state => ({
  center: state.map.center,
  bounds: state.map.bounds,
  inputStyle: inputStyle,
  containerElement: <div style={{height: '100%'}} />,
  mapElement: <div style={{height: '100%'}} />,
  markers: state.map.markers,
  landmarks: state.map.landmarks,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handlePlacesChanged,
  handleBoundsChanged,
  handleSearchArea,
  handleMarkerClick,
  handleMarkerClose
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreMap);