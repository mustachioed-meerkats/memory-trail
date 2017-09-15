import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LandmarkMapListEntry from './LandmarkMapListEntry.jsx';
//import StoryListEntry from './StoryListEntry.jsx';

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
 * Define Component
 * ========================================================== */
const LandmarkMapList = ({landmarks}) => {
  return (
    <div>
      {landmarks.map((landmark, i) => { 
        return <LandmarkMapListEntry landmark={landmark} id={i} key={i} />; 
      })}
    </div>
  );
};

/** ============================================================
 * Define Class Properties
 * ========================================================== */
const mapStateToProps = (state) => ({
  landmarks: state.map.landmarks,
});

/** ============================================================
 * Define Redux Store Connection
 * ========================================================== */
export default connect(
  mapStateToProps
)(LandmarkMapList);