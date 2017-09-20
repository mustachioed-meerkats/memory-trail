import React from 'react';
import { connect } from 'react-redux';
import FollowingFeedListEntry from './FollowingFeedListEntry.jsx';

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
const FollowingFeedList = (props) => {
  if (!props.posts) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment>
    );
  } else {
    return (
      <div>
        {props.posts.map((post, i) => {
          return <FollowingFeedListEntry post={post} id={i} key={i} />;
        })}
      </div>
    );
  }
};

/** ============================================================
 * Define Class Properties
 * ========================================================== */
const mapStateToProps = (state) => ({
  posts: state.following.posts
});

/** ============================================================
 * Define Redux Store Connection
 * ========================================================== */
export default connect(
  mapStateToProps
)(FollowingFeedList);