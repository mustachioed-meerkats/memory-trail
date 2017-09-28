import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getTimeSincePost from '../../../../lib/getTimeSincePost';
import LandmarkPostModal from './LandMarkPostModal.jsx';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import { Image, Card, Icon } from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
class LandmarkPostListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  closeModal() {
    this.setState({ 
      showModal: false 
    });
  }

  openModal() {
    this.setState({ 
      showModal: true 
    });
  }
  render () {
    const landMarkImage = this.props.post.image_url || 'https://i.imgur.com/a53MMcb.jpg';
    const profileImage = this.props.post.profile_image || 'https://i.imgur.com/yUvX0Es.png';
    const landmarkImageStyle = {
      height: '8rem',
      background: `url(${landMarkImage})  center center`,
      backgroundSize: 'cover'
    };
    return (
      <div>
        <Card fluid raised={true}>
          <div style={landmarkImageStyle} onClick={this.openModal.bind(this)}>
          </div>
          <Card.Content>
            <Image floated='left' shape='circular' size='mini' src={profileImage} />
            <Card.Meta>
              <div>
                <Link to={`/profile/${this.props.post.profile_id}/stories/${this.props.post.story_id}`}>
                  <strong>
                    <Icon name='book' /> {this.props.post.story_name || 'STORY_NAME'}
                  </strong>
                </Link>
                <Link to={`/landmark/${this.props.post.landmark_id || '1'}`}>
                  <strong>
                    <Icon name='map pin' /> {this.props.post.landmark_name || 'LAND_MARK'}
                  </strong>
                </Link>
              </div>
              Submitted {getTimeSincePost(this.props.post.created_at)} by <Link to={`/profile/${this.props.post.profile_id}`}><strong>{this.props.post.profile_display}</strong></Link>
            </Card.Meta>
            <Card.Description>
              {this.props.post.content.length > 255 ? this.props.post.content.slice(0, 255) + ' ...' : this.props.post.content }
            </Card.Description>
          </Card.Content>
        </Card>
        <LandmarkPostModal
          landmark={this.props.landmark}
          post={this.props.post} 
          showModal={this.state.showModal} 
          openModal={this.openModal.bind(this)}
          closeModal={this.closeModal.bind(this)}
        />
      </div>
    );
  }
}
export default LandmarkPostListEntry;