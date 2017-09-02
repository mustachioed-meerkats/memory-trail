import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Markers from './Markers.jsx';
import Search from './Search.jsx';
import PostList from '../PostList.jsx';

const ExploreMap = ({posts}) => ( 
  <div>
    This is the Map.
  </div>
);

const mapStateToProps = state => ({
  mapCenter: state.app.mapCenter,
});

const mapDispatchToProps = dispatch => bindActionCreators({
});

export default connect(
  mapStateToProps
)(ExploreMap);