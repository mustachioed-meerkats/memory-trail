import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LandmarkPostListEntry from './LandmarkPostListEntry.jsx';

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
const LandmarkPostList = (props) => {
  if (!props.landmark) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment>
    );
  } else {
    return (
      <Segment>
        {props.landmark.posts.sort((a, b) => { return b.created_at - a.created_at; }).map((post, i) => {
          return <LandmarkPostListEntry post={post} id={i} landmark={props.landmark} key={i} />;
        })}
      </Segment>
    );
  }
};

export default LandmarkPostList;