import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getTimeSincePost from '../../../../lib/getTimeSincePost';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import { Icon, Card } from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
const LandmarkMapListListEntry = ({landmark}) => {
  const landMarkImage = landmark.image_url || 'https://i.imgur.com/a53MMcb.jpg';
  const style = {
    card: {
      margin: '-1rem -1rem 0.5rem -1rem',
      height: '5rem',
      background: `url(${landMarkImage})  center center`,
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
          <strong><Link to={`/landmark/${landmark.id}`}><Icon name='map pin' /> {landmark.name || 'LANDMARK_NAME'}</Link></strong>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default LandmarkMapListListEntry;