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
      currentPostIndex: 0,
      currentPost: '',
      _map: null,
      chartVisible: false
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleChartVisibility = this.toggleChartVisibility.bind(this);
  }

  componentWillMount () {
    let userData = this.props.isCurrentUser ? this.props.user : this.props.otherUser;
    this.setState({
      userStories: userData.stories,
      currentStory: userData.stories[0],
      currentStoryPosts: userData.stories[0].posts,
      currentPostIndex: 0,
      currentPost: userData.stories[0].posts[0]
    });
  }

  handleMapMounted(map) {
    this.setState({
      _map: map
    });
  }

  updateCurrentPostIndex (index) {
    this.setState({
      currentPostIndex: index,
      currentPost: this.state.currentStoryPosts[index]
    })
  }
  
  handleChange(e) {
    this.updateCurrentPostIndex(e);
  }

  toggleChartVisibility() {
    this.setState({
      chartVisible: !this.state.chartVisible
    });
  }

  render() {
    var sentimentAnalysis = (<div></div>);
    if (this.state.chartVisible) {
      sentimentAnalysis = (
        <Card raised fluid>
          <Card.Header>
            Sentiment Analysis
          </Card.Header>
          <Card.Content>
            <SentimentChart story={this.state.currentStory}/>
          </Card.Content>
        </Card>
      );
    }
    

    return (
      <Container fluid={true}>
        <Card raised fluid>
          <Card.Header>
          <Menu size='large'>
            <Dropdown
              item 
              text='Choose a Story'
              options={this.state.userStories.map((story, index) => {
                return {value: story.title, text: story.title, key: index}
              })}>
            </Dropdown>
            <Button onClick={this.toggleChartVisibility}>
              Sentiment Analysis
            </Button>
          </Menu>
          <h1 style={{textAlign:'center'}}>{this.state.currentStory.title}</h1>
          <p style={{textAlign:'center'}}>{this.state.currentStory.summary}</p>
          </Card.Header>
          <Card.Content>
            <Grid style={{display: 'flex'}} columns={2} stackable>
              <Grid.Column>
                <div style={{height: '75vh'}}>
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
                    currentPost={this.state.currentPost}
                    landmarks={this.props.landmarks}
                    openSideBar={this.props.openSideBar}
                  />
                </div>
              </Grid.Column>
              <Grid.Column>
                <div style={{height: '75vh'}}>
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
                        <Card key={index} fluid style={{height: 100+'%'}}>
                          <Image src={post.image_url} />
                          <Card.Description>
                            {post.content}
                          </Card.Description>
                        </Card>
                      );
                    })}
                  </Carousel>
                </div>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
        {sentimentAnalysis}
      </Container>
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
