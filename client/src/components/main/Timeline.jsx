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
import SentimentChart from './SentimentChart.jsx';

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
  Transition,
  Dimmer,
  Loader
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

import {getUserInfo} from '../../store/modules/otherUser';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPostIndex: 0,
      currentStory: '',
      _map: null,
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount () {
    if (this.props.match.params.storyId) {
      var story_id = Number(this.props.match.params.storyId);
      this.setCurrentStory(story_id);
    } else {
      this.setCurrentStory();
    }
  }

  componentWillReceiveProps(nextProps) {
    var new_story_id = Number(nextProps.match.params.storyId);
    if (this.props.match.params.storyId !== new_story_id) {
      this.setCurrentStory(new_story_id);
    }
  }

  setCurrentStory(storyId) {
    var userId = Number(this.props.match.url.split('/')[2]);
    var isCurUser = (userId === this.props.user.user.id);
    let userData = isCurUser ? this.props.user : this.props.otherUser;
    if (userData.stories.length !== 0) {
      this.setStory(storyId, userData);
    } else if (userData.stories.length === 0 && !isCurUser) {
      this.props.getUserInfo(userId);
    }
  }

  setStory(storyId, userData) {
    let selectedStory = userData.stories[0];
    if (storyId) {
      selectedStory = userData.stories.filter((story) => {
        return story.id === storyId;
      })[0];
    }
    if (selectedStory) {
      this.setState({
        currentStory: selectedStory
      });
    }
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
    var sentimentAnalysis = (<div></div>);
    var mapStyle={height: '80vh'};
    if (this.props.chartVisible) {
      mapStyle={height: '50vh'}
      sentimentAnalysis = (
        <div style={{height: '30vh'}}>
          <SentimentChart story={this.state.currentStory} currentPostIndex={this.state.currentPostIndex}/>
        </div>
      );
    }
    if (this.state.currentStory) {
    return (
      <Card fluid={true}>
        <Card.Content>
          <Card.Header>
            <h1 style={{textAlign:'center'}}>{this.state.currentStory.title}</h1>
          </Card.Header>
          <Card.Description>
            <p style={{textAlign:'center'}}>{this.state.currentStory.summary}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Grid columns={2} stackable>
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
                  markers={this.state.currentStory.posts}
                  currentPost={this.state.currentStory.posts[this.state.currentPostIndex]}
                  landmarks={this.props.landmarks}
                  openSideBar={this.props.openSideBar}
                />
              </div>
              {sentimentAnalysis}
            </Grid.Column>
            <Grid.Column>
              <div style={{height: 100+'%'}}>
                <Card fluid={true} raised>
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
                        <Card key={index} fluid>
                          <Image style={{height: '60vh', objectFit: 'cover'}} src={post.image_url} />
                          <Card.Content style={{height: '20vh', objectFit: 'cover'}}>
                            <Card.Header>
                              {post.landmark_name}
                            </Card.Header>
                            <Card.Description>
                              {post.content}
                            </Card.Description>
                          </Card.Content>
                        </Card>
                      );
                    })}
                  </Carousel>
                </Card>
              </div>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  } else {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
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
  handleMarkerClose,
  getUserInfo
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
