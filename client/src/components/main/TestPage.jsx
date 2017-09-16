import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Markers from './maps/Markers.jsx';

// import Markers from './maps/Markers.jsx';
// import PostList from './PostList.jsx';

/** ============================================================
 * Import Semantic UI Components
 * =============================================================
 */
import {
  Button,
  Card,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  List,
  Menu,
  Message,
  Segment,
  Table,
  TextArea,
  Transition
} from 'semantic-ui-react';

/** ============================================================
 * Import Redux Action Creators
 * ========================================================== */
import {
  handleMapMounted, 
  handlePlacesChanged,
  handleBoundsChanged,
  handleMarkerClick,
  handleMarkerClose
} from '../../store/modules/map';

const MapComponent = withGoogleMap(props => (
  <GoogleMap
    ref={props.handleMapMounted}
    defaultZoom={12}
    center={props.center}
    onDragEnd={() => props.handleBoundsChanged(props.map)}
    options={mapOptions}
  >
    {props.landmarks.map((marker, index) => (
      <Marker 
        position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}} key={index} 
        onClick={() => props.handleMarkerClick(marker)}
      >
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.handleMarkerClose(marker)}>
            <div><Link to={`/landmark/${marker.id}`}>{marker.name}</Link></div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

let mapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false
};

const mapStyle = {
  height: window.innerHeight
};

class TimeLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userStories: [],
      currentStory: '',
      currentStoryPosts: [],
      currentStoryMarkers: [],
      currentPost: '',
      _map: null
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
  }

  handleMapMounted(map) {
    this.setState({
      _map: map
    });
  }

  render() {
    return (
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column>
            <div style={mapStyle}>
              <MapComponent 
                containerElement={this.props.containerElement}
                mapElement={this.props.mapElement}
                handleMapMounted={this.handleMapMounted}
                center={this.props.center}
                handleBoundsChanged={this.props.handleBoundsChanged}
                map={this.state._map}
                bounds={this.props.bounds}
                handlePlacesChanged={this.props.handlePlacesChanged}
                inputStyle={this.props.inputStyle}
                handleMarkerClick={this.props.handleMarkerClick}
                handleMarkerClose={this.props.handleMarkerClose}
                markers={this.props.markers}
                landmarks={this.props.landmarks}
                openSideBar={this.props.openSideBar}
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            <div> Posts Go Here </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    );
  }
}


/** ============================================================
 * Define State Subscriptions
 * =============================================================
 */
const mapStateToProps = state => ({
  center: state.map.center,
  bounds: state.map.bounds,
  containerElement: <div style={{height: '100%'}} />,
  mapElement: <div style={{height: '100%'}} />,
  markers: state.map.markers,
  landmarks: state.map.landmarks,
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
)(TimeLine);



