import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
const Carousel = require('react-responsive-carousel').Carousel;
import axios from 'axios';
import Timeline from './Timeline.jsx'

const TestPage = (props) => {
  return (
    <div>
      <Timeline />
    </div>
  )
}

export default TestPage;

