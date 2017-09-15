import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getTimeSinceMembership from '../../../../lib/getTimeSinceMembership.js';

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
const FollowingsPageListEntry = (props) => {
  return (
    <Card> 
      <Card.Content>
        <Image floated='right' size='tiny' src={props.following.profile.avatar || 'https://avatars0.githubusercontent.com/u/11849230?v=4&s=60'} />
        <Card.Header>
          {props.following.profile.display}
        </Card.Header>
        <Card.Meta>
          Member since: {getTimeSinceMembership(props.following.profile.created_at)}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>Unfollow</Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default FollowingsPageListEntry;