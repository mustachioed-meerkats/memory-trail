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

/** ============================================================
 * Define Component
 * ========================================================== */
const LandmarkMapListListEntry = ({landmark}) => {
  const style = {
    card: {
      margin: '-1rem -1rem 0.5rem -1rem',
      height: '5rem',
      background: `url(${landmark.image_url})  center center`,
      backgroundSize: 'cover'
    }
  };

  return (
    <Card raised={true}> 
      <Card.Content>
        <div style={style.card}>
        </div >
        <Card.Meta>
        </Card.Meta>
        <Card.Description>
          <Link to={`/landmark/${landmark.id}`}>{landmark.name}</Link>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default LandmarkMapListListEntry;