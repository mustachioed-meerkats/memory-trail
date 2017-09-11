import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/** ============================================================
 * Define Store Modules
 * =============================================================
 */

import {setCenter} from '../../store/modules/map';
import ExploreMap from './maps/ExploreMap.jsx';
import PostList from './PostList.jsx';

// TODO: Refactor into styles
const postListStyle = {
  position: 'fixed',
  width: '360px',
  height: window.innerHeight - 20,
  bottom: 0,
  top: 64,
  right: 1,
  overflowY: 'auto'
};

const exploreMapStyle = {
  height: window.innerHeight,
  marginTop: '-20px'
};

const Home = (props) => {
  if (!props.userLocationAvailable) {
    navigator.geolocation.getCurrentPosition(function(location) {
      var lat = location.coords.latitude;
      var lng = location.coords.longitude;
      props.setCenter(lat, lng);
    });
  }

  return (
    <div>
      <div style={exploreMapStyle}>
        <ExploreMap />
      </div>
      <div style={postListStyle}>
        <PostList />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userLocationAvailable: state.map.userLocationAvailable
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCenter
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);