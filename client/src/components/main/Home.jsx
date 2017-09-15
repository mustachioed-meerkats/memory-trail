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
  Container,
  Grid, 
  Header, 
  Icon,
  Image, 
  Item, 
  Label, 
  Menu, 
  Segment, 
  Step,
  Table,
  Card,
  Dimmer,
  Loader
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
  handlePlacesChanged
 } from '../../store/modules/map';
import { openSideBar } from '../../store/modules/sidebar';

// TODO: Refactor into styles

const landMarkListContainer = {
  position: 'fixed',
  padding: '1rem',
  bottom: 0,
  top: 64,
  overflow: 'hidden'
};

const listNav = {
  position: 'fixed',
  padding: '1rem',
  top: 0
};

const postListStyle = {
  position: 'fixed',
  bottom: 0,
  top: 64,
  overflowY: 'auto'
};

const exploreMapStyle = {
  height: window.innerHeight
};

// class Home extends React.Component {



// }

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
        <Button
          style={{backgroundColor: 'white'}}
          icon='compass'
          onClick={() => props.handleSearchArea(props.center)}
        />
      </div>
      <div style={landMarkListContainer}>
        <div style={postListStyle}>
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
  handlePlacesChanged,
  handleSearchArea
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);