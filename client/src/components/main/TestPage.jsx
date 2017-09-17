import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
const Carousel = require('react-responsive-carousel').Carousel;
import axios from 'axios';

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

const PostEntry = (post) => {
  return (
    <div style={mapStyle}>
      <img src={post.image} />
      <p className="legend">{post.message}</p>
    </div>
  );
};

class TimeLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userStories: '',
      currentStory: '',
      currentStoryPosts: ["https://cdn.vox-cdn.com/uploads/chorus_asset/file/6538939/dolores_park_torbakhopper.jpg",
      "http://bethandarcher.com/wp-content/uploads/2016/05/thumb_IMG_5929_1024.jpg",
      "https://sfbay.ca/home/wp-content/uploads/2016/06/coit.jpg"],
      currentStoryMarkers: [],
      currentPost: '',
      _map: null
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
  }

  componentWillMount () {
    axios.get(`/api/stories/user/${this.props.user.id}`)
    .then((result) => {
      this.setState({
        userStories: result.data,
        currentStory: result.data[0],
        currentStoryPosts: result.data[0].posts
      })
    })
  }

  handleMapMounted(map) {
    this.setState({
      _map: map
    });
  }

  render() {
    if (this.state.userStories) {
      return (
          <Grid compact columns={2} stackable>
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
                <Carousel
                  style={{height: '100%'}}
                  showThumbs={false}
                  showArrows={true}
                  showStatus={true}
                  showIndicators={false}
                  useKeyboardArrows={true}
                >
                  {this.state.currentStoryPosts.map((post, index) => {
                    return (
                      <Card fluid={true} key={index}>
                        <Image src={post.image_url} />
                        <Card.Content>
                          <Card.Description>
                            {post.content}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    )
                  })}
                </Carousel>
              </Grid.Column>
          </Grid>
      );
    } else {
      return <div> Loading...</div>
    }
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
)(TimeLine);



{/* <div>
  <img src={this.state.currentStoryPosts[0]}/>
</div>
<div>
  <img src={this.state.currentStoryPosts[1]}/>
</div>
<div>
  <img src={this.state.currentStoryPosts[2]}/>
</div> */}

{/* <Card>
                        <Image src={this.state.currentStoryPosts[0]}/>
                        <Card.Content>
                          <Card.Description> Hello this is my post </Card.Description>
                        </Card.Content>
                      </Card> */}


                    //   <Grid columns={2} stackable>
                    //   <Grid.Row>
                    //     <Grid.Column>
                    //       <div style={mapStyle}>
                    //         <MapComponent 
                    //           containerElement={this.props.containerElement}
                    //           mapElement={this.props.mapElement}
                    //           handleMapMounted={this.handleMapMounted}
                    //           center={this.props.center}
                    //           handleBoundsChanged={this.props.handleBoundsChanged}
                    //           map={this.state._map}
                    //           bounds={this.props.bounds}
                    //           handlePlacesChanged={this.props.handlePlacesChanged}
                    //           inputStyle={this.props.inputStyle}
                    //           handleMarkerClick={this.props.handleMarkerClick}
                    //           handleMarkerClose={this.props.handleMarkerClose}
                    //           markers={this.props.markers}
                    //           landmarks={this.props.landmarks}
                    //           openSideBar={this.props.openSideBar}
                    //         />
                    //       </div>
                    //     </Grid.Column>
                    //     <Grid.Column>
                    //       <div>
                    //         <Carousel 
                    //           axis="horizontal"
                    //           style={mapStyle}
                    //           dynamicHeight
                    //           emulateTouch
                    //           showThumbs={false}
                    //           >
                    //           {this.state.currentStoryPosts}
                    //           })}
                    //         </Carousel>
                    //       </div>
                    //     </Grid.Column>
                    //   </Grid.Row>
                    // </Grid>