import React from 'react';
import {withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Markers from './maps/Markers.jsx';
import Search from './maps/Search.jsx';
import PostList from './PostList.jsx';
import { Modal, Button, MenuItem, ButtonToolbar, ControlLabel, Form, FormGroup, DropdownButton, FormControl, Radio, ButtonGroup } from 'react-bootstrap';


import { 
  handlePlacesChanged,
  handleBoundsChanged,
  handleSearchArea,
  handleSingleStory,
} from '../../store/modules/map';

import {
  handleStoryLoad,
} from '../../store/modules/newpost';

//For right now, handleSearchArea will be used.
//After the backend is built out, handleStoryLoad will be used. 

// Implement once everything is hooked up. 

/*
  props.storyPosts.forEach(function (post) {
    var obj = {'lat': parseFloat(post.lat), 'lng': parseFloat(post.lng)};
    path.push(obj);
  });

{props.storyPosts.map((marker, index) => (
  <Marker
    position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}} key={index}
  >
  </Marker>
*/



const TimelineComponent = withGoogleMap(props => {
  const path = [];
  props.storyPosts.forEach(function (post) {
    var obj = {'lat': parseFloat(post.lat), 'lng': parseFloat(post.lng)};
    path.push(obj);
  });
  return (
    <div>
      <ButtonToolbar>
        <DropdownButton bsSize="large" title="Choose A Story!!" id="dropdown-size-large" >  
          {props.stories.map((story, i) => {
            return <MenuItem key={i} eventKey= {story.title} onSelect={(eventKey) => { props.storySelected(eventKey); }} >{story.title}</MenuItem>;                  
          })}
        </DropdownButton>
      </ButtonToolbar>

      <GoogleMap
        ref={props.handleMapMounted}
        zoom={props.zoom}
        center={props.center}
      >
        {props.storyPosts.map((marker, index) => (
          <Marker
            position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}} key={index}
          >
          </Marker>
        ))}
        <Polyline
          path={path}
        />
      </GoogleMap>
      <PostList type={'TYPE_STORY'} />
    </div>
  );
});

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _map: null,
      center: this.props.center,
      zoom: this.props.zoom,
      storyID: 0,
      stories: this.props.stories,
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
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

  storySelected (name) {
    let localID = 0;
    this.stories.map((story) => {
      if (story.title === name) {
        localID = story.id;
      }
    });
    this.props.handleSingleStory(localID); 
  }

  componentDidMount() {
    this.props.handleStoryLoad();
  }

  render() {
    return (
      <TimelineComponent 
        containerElement={this.props.containerElement}
        mapElement={this.props.mapElement}
        handleMapMounted={this.handleMapMounted}
        center={this.state.center}
        map={this.state._map}
        markers={this.props.markers}
        zoom={this.props.zoom}
        storyPosts={this.props.storyPosts}
        stories={this.props.stories}
        storySelected={this.storySelected}
      />
    );
  }
}

//Markers will need to be moved out later. They will be replaced with StoryPosts. 

const mapStateToProps = state => ({
  center: state.map.center,
  zoom: state.map.zoom,
  bounds: state.map.bounds,
  containerElement: <div style={{height: '100%'}} />,
  mapElement: <div style={{height: '100%'}} />,
  markers: state.map.markers,
  storyPosts: state.map.storyPosts,
  user: state.user,
  stories: state.newpost.allUserStories,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handlePlacesChanged,
  handleBoundsChanged,
  handleSearchArea,
  handleStoryLoad,
  handleSingleStory,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);