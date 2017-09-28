import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getTimeSincePost from '../../../../lib/getTimeSincePost';
import LandmarkPostModal from '../landmarks/LandMarkPostModal.jsx';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import { Image, Card, Icon } from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
class CurrentUserPostListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const landMarkImage = this.props.post.image_url || 'https://i.imgur.com/a53MMcb.jpg';
    const profileImage = this.props.post.profile_image || 'https://i.imgur.com/yUvX0Es.png';
    const landmarkImageStyle = {
      height: '25rem',
      background: `url(${landMarkImage})  center center`,
      backgroundSize: 'cover'
    };

    return (
      <div style={{paddingBottom: '1rem'}}>
        <Card fluid raised={true}>
          <div style={landmarkImageStyle}></div>
          <Card.Content>
            <Image floated='left' shape='circular' size='mini' src={profileImage} />
            <Card.Meta>
              <div>
                <Link to={`/landmark/${this.props.post.landmark_id}`}>
                  <strong><Icon name='book' /> {this.props.post.story_name} </strong>
                </Link>
                <Link to={`/landmark/${this.props.post.landmark_id}`}>
                  <strong><Icon name='map pin' />{this.props.post.landmark_name} </strong>
                </Link>
              </div>
              Submitted {getTimeSincePost(this.props.post.created_at)} by <Link to={`/profile/${this.props.post.profile_id}`}><strong>{this.props.post.profile_display}</strong></Link>
            </Card.Meta>
            <Card.Description>
              {this.props.post.content}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
export default CurrentUserPostListEntry;