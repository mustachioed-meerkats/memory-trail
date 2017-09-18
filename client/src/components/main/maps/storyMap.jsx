import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

/** ============================================================
 * Import Redux Action Creators
 * ========================================================== */
import {
  handleMapMounted, 
  handlePlacesChanged,
  handleBoundsChanged,
  handleMarkerClick,
  handleMarkerClose
} from '../../../store/modules/map';

let mapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false
};

const StoryMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.handleMapMounted}
    defaultZoom={12}
    center={props.center}
    onDragEnd={() => props.handleBoundsChanged(props.map)}
    options={mapOptions}
  >
    {props.markers.map((marker, index) => {
      return (
        <Marker
          position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}} key={index}
          onClick={() => props.handleMarkerClick(marker)}
        >
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.handleMarkerClose(marker)}>
            <div><Link to={`/landmark/${marker.landmark_id}`}>View Landmark</Link></div>
          </InfoWindow>
        )}
        </Marker>
      )
    })}
  </GoogleMap>
));

/** ============================================================
 * Define State Subscriptions
 * =============================================================
 */
const mapStateToProps = state => ({
  center: state.map.center,
  bounds: state.map.bounds,
  containerElement: <div style={{height: '100%'}} />,
  mapElement: <div style={{height: '100%'}} />,
  user: state.user
});

/** ============================================================
 * Define Dispatches Subscriptions
 * =============================================================
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  handlePlacesChanged,
  handleBoundsChanged,
  handleMarkerClick,
  handleMarkerClose
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryMap);