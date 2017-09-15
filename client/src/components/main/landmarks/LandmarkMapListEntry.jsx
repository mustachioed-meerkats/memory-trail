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


// id(pin): 1
// name(pin): "Oakland"
// image_url(pin): "https://lh3.googleusercontent.com/p/AF1QipMQneBzguRjSYMM-SQi_Fyrym80ek4EbXfx8u8S=w1080-k"
// lat(pin): "37.80436370"
// lng(pin): "-122.27111370"
// google_id(pin): "ChIJA-2qKIt9hYARZ5N1NdUVtHE"
// ▶posts(pin)
// ▶0(pin)
// id(pin): 1
// profile_id(pin): 1
// lat(pin): "37.80436370"
// lng(pin): "-122.27111370"
// content(pin): "This is a Memoery for my story"
// title(pin): "Placeholder"
// created_at(pin): "2017-09-15T22:39:45.046Z"
// updated_at(pin): "2017-09-15T22:39:45.046Z"
// story_id(pin): 1
// landmark_id(pin): 1
// image_url(pin): "https://memorytrail.s3.amazonaws.com/DG2015-san-francisco_1505515179102"
// profile_display(pin): "Talis Lazdins"