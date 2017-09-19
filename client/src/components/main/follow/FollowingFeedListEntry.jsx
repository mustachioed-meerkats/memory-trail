import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../../../styles/following.js';
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
  Loader,
  Comment,
  Form
} from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
const FollowingFeedListEntry = ({post}) => {

  const postImage = post.image_url || 'https://i.imgur.com/a53MMcb.jpg';
  const postImageStyle = {
    margin: '-1rem -1rem 0.5rem -1rem',
    height: '5rem',
    display: '-webkit-flex',
    display: 'flex',
  };
  return (
    <Card fluid raised={true}> 
      <Card.Content>
        <Image src={post.image_url} />
        <Card.Meta>
          <div>
            <Link to={`/landmark/${post.landmark_id || '1'}`}>
              <strong>
                <Icon name='map pin' /> {post.landmark_display || 'LAND_MARK'}
              </strong>
            </Link>
          </div>
          Submitted {getTimeSincePost(post.created_at)} by <Link to={`/profile/${post.profile_id}`}><strong>{post.profile_display}</strong></Link>
        </Card.Meta>
        <Card.Description>
          {post.content}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default FollowingFeedListEntry;