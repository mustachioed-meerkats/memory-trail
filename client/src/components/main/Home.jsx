import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import {
  Button,
  Popup
} from 'semantic-ui-react';

/** ============================================================
 * Define Store Modules
 * ========================================================== */
import ExploreMap from './maps/ExploreMap.jsx';
import PostList from './PostList.jsx';
import LandmarkMapList from './landmarks/LandmarkMapList.jsx';

/** ============================================================
 * Import Redux Action Creators
 * ========================================================== */
import { 
  setCenter,
  handleSearchArea,
} from '../../store/modules/map';
import { openSideBar } from '../../store/modules/sidebar';

// TODO: Refactor into styles-
const listNav = {
  position: 'fixed',
  padding: '1rem',
  top: 0
};
const exploreMapStyle = {
  height: window.innerHeight
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
      <div style={listNav}>
        <Button
          style={{backgroundColor: 'white'}}
          icon='sidebar'
          onClick={ () => props.openSideBar()}
        />
        <Popup
          trigger={
            <Button 
              style={{backgroundColor: 'white'}} 
              icon='compass' 
              onClick={() => props.handleSearchArea(props.center)}
            />
          }
          content='Search this Area!'
          position='top center'
        />
      </div>
      <div className='landmark-map-list-container'>
        <div className='landmark-map-list'>
          <LandmarkMapList />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userLocationAvailable: state.map.userLocationAvailable,
  center: state.map.center,
  bounds: state.map.bounds
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCenter,
  openSideBar,
  handleSearchArea
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);