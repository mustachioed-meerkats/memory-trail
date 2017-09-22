import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../../../styles/following.js';
import getTimeSincePost from '../../../../lib/getTimeSincePost';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import { Icon, Image, Card } from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
const FollowingFeedListEntry = ({post}) => {

  const postImage = post.image_url || 'https://i.imgur.com/a53MMcb.jpg';
  const profileImage = post.profile_image || 'https://i.imgur.com/yUvX0Es.png';
  return (
    <Card fluid raised={true} > 
      <Image centered fluid src={post.image_url}/>
      <Card.Content>
        <Image floated='left' shape='circular' size='mini' src={profileImage} />
        <Card.Meta>
          <div>
            <Link to={`/profile/${post.profile_id}/stories/${post.story_id}`}>
              <strong>
                <Icon name='book' /> {post.story_name || 'STORY_NAME'}
              </strong>
            </Link>
            <Link to={`/landmark/${post.landmark_id || '1'}`}>
              <strong>
                <Icon name='map pin' /> {post.landmark_name || 'LAND_MARK'}
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