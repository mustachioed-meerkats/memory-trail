import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getTimeSincePost from '../../../../lib/getTimeSincePost';

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

const style = {
  card: {
    margin: '-1rem -1rem 0.5rem -1rem',
    height: '5rem',
    background: 'url(http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1444253482/DG2015-san-francisco.jpg?itok=MdRJm2Zo)  center center',
    backgroundSize: 'cover'
  }
};

/** ============================================================
 * Define Component
 * ========================================================== */
const LandmarkMapListListEntry = (props) => {
  return (
    <Card raised={true}> 
      <Card.Content>
        <div style={style.card}>
        </div >
        <Card.Meta>
          <div>
            <a><Icon name='heart' /># </a>
            <a><Icon name='map pin' /> LAND_MARK</a>
          </div>
          Submitted {getTimeSincePost('2017-09-12')} hrs ago by <strong>{'PROFILE_DISPLAY'}</strong>
        </Card.Meta>
        <Card.Description>
          {'CONTENT CONTENT'}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button circular icon='heart' />
        <Button circular icon='commenting outline' />
        <Button circular icon='share alternate' />
      </Card.Content>
    </Card>
  );
};

export default LandmarkMapListListEntry;