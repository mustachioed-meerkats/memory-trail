import React from 'react';
import { connect } from 'react-redux';
import FollowingsPageListEntry from './FollowingsPageListEntry.jsx';

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
 * ============================================================= */
const FollowingsPageList = (props) => {
  if (!props.followings) {
    return (
      <div>Loading</div>
    );
  } else if (props.followings.length === 0) {
    return (
      <div>Hey {props.user.display}! It looks like you aren't following anyone</div>
    );
  } else {
    return (
      <Segment>
        {props.followings.map((following, i) => {
          return <FollowingsPageListEntry following={following} id={i} key={i} />;
        })}
      </Segment>
    );
  }
};

/** ============================================================
 * Define Class Properties
 * ========================================================== */
const mapStateToProps = (state) => ({
  user: state.user,
  followings: state.following.followings
});

/** ============================================================
 * Define Redux Store Connection
 * ========================================================== */
export default connect(
  mapStateToProps
)(FollowingsPageList);