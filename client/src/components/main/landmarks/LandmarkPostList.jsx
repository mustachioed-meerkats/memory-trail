import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LandMarkPostListEntry from './LandMarkPostListEntry.jsx';

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
const LandMarkPostList = (props) => {
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
        {props.landmark.posts.sort((a, b) => { return a.created_at - b.created_at; }).map((post, i) => {
          return <LandMarkPostListEntry post={post} id={i} key={i} />;
        })}
      </Segment>
    );
  }
};

export default LandMarkPostList;