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
const LandmarkPostListEntry = ({post}) => {
  
  const style = {
    card: {
      margin: '-1rem -1rem 0.5rem -1rem',
      height: '5rem',
      background: `url(${post.image_url})  center center`,
      backgroundSize: 'cover'
    }
  };

  return (
    <Card fluid raised={true}> 
      <Card.Content>
        <div style={style.card}>
        </div >
        <Card.Meta>
          Submitted {getTimeSincePost(post.created_at)} by <Link to={`/profile/${post.profile_id}`}><strong>{post.profile_display}</strong></Link>
        </Card.Meta>
        <Card.Description>
          {post.content}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button icon='heart'/>
        <Button circular icon='commenting outline' />
        <Button circular icon='share alternate' />
      </Card.Content>
    </Card>
  );
};

export default LandmarkPostListEntry;