import React from 'react';
import {withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Markers from './maps/Markers.jsx';
import Search from './maps/Search.jsx';
import PostList from './PostList.jsx';

import { 
  handlePlacesChanged,
  handleBoundsChanged,
  handleSearchArea,
  handleStoryLoad,
} from '../../store/modules/map';

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
  props.markers.forEach(function (post) {
    var obj = {'lat': parseFloat(post.lat), 'lng': parseFloat(post.lng)};
    path.push(obj);
  });
  return (
    <div>
      <GoogleMap
        ref={props.handleMapMounted}
        zoom={props.zoom}
        center={props.center}
      >
        {props.markers.map((marker, index) => (
          <Marker
            position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}} key={index}
          >
          </Marker>
        ))}
        <Polyline
          path={path}
        />
      </GoogleMap>
      <PostList type={'TYPE_STORY'} StoryListClick={props.StoryListClick} />
    </div>
  );
});

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _map: null,
      center: this.props.center,
      zoom: 10
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.StoryListClick = this.StoryListClick.bind(this);
  }

// Eventually we will need to fix this so that we get actual posts from the appropriate story. 
// We may have an eventual issue with the postList page, as it looks for the storyPosts state, which is set by 
// the following component. This needs to be investigated later on. 

// We will also need to have a story that loads on default with the page. 
// This can be looked at later, probably qualifies as techinical debt. 
  componentDidMount () {
    this.props.handleStoryLoad(storyID);
  }


  StoryListClick(post) {
    console.log('STORYLIST CLICK WORKING', post);
    this.setState({
      center: {lat: parseFloat(post.lat), lng: parseFloat(post.lng)},
      zoom: 15
    });
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
      <TimelineComponent 
        containerElement={this.props.containerElement}
        mapElement={this.props.mapElement}
        handleMapMounted={this.handleMapMounted}
        center={this.state.center}
        map={this.state._map}
        markers={this.props.markers}
        zoom={this.state.zoom}
        StoryListClick={this.StoryListClick}
      />
    );
  }
}

//Markers will need to be moved out later. They will be replaced with StoryPosts. 

const mapStateToProps = state => ({
  center: state.map.center,
  bounds: state.map.bounds,
  containerElement: <div style={{height: '100%'}} />,
  mapElement: <div style={{height: '100%'}} />,
  markers: state.map.markers,
  storyPosts: state.map.storyPosts,
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handlePlacesChanged,
  handleBoundsChanged,
  handleSearchArea,
  handleStoryLoad,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
