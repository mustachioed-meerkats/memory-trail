import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
const Carousel = require('react-responsive-carousel').Carousel;
import axios from 'axios';
import StoryMap from './maps/storyMap.jsx';

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
  handleMarkerClose,
  handleCurrentPostMarker
} from '../../store/modules/map';

const mapStyle = {
  height: window.innerHeight
};

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStories: '',
      currentStory: '',
      currentStoryPosts: [],
      currentStoryMarkers: [],
      currentPost: '',
      currentPostIndex: 0,
      _map: null
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount () {
    let userData = this.props.isCurrentUser ? this.props.user : this.props.otherUser;
    console.log(userData);
    this.setState({
      userStories: userData.stories,
      currentStory: userData.stories[0],
      currentStoryPosts: userData.stories[0].posts,
      currentPostIndex: 0,
      currentPost: ''
    });
  }

  handleMapMounted(map) {
    this.setState({
      _map: map
    });
  }

  updateCurrentPostIndex (index) {
    this.setState({
      currentPostIndex: index
    });
  }
  
  handleChange(e) {
    this.updateCurrentPostIndex(e);
  }

  render() {
    return (
      <Grid container={true} relaxed columns={2} stackable>
        <Grid.Column>
          <div style={mapStyle}>
            <StoryMap 
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
              currentMarker={this.props.currentPostMarker}
              landmarks={this.props.landmarks}
              openSideBar={this.props.openSideBar}
            />
          </div>
        </Grid.Column>
        <Grid.Column>
          <Carousel
            showThumbs={false}
            showArrows={true}
            showStatus={true}
            showIndicators={false}
            useKeyboardArrows={true}
            selectedItem={this.state.currentPostIndex}
            onChange={(e) => this.handleChange(e)}
          >
            {this.state.currentStory.posts.map((post, index) => {
              return (
                <Card fluid={true} key={index}>
                  <Image src={post.image_url} />
                  <Card.Content>
                    <Card.Description>
                      {post.content}
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </Carousel>
        </Grid.Column>
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
  markers: state.user.stories[0].posts,
  user: state.user,
  otherUser: state.otherUser
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
)(Timeline);

// onChange={this.props.handleCurrentPostMarker(this.state.currentPost)}

