import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getTimeSincePost from '../../../../lib/getTimeSincePost';

/** ============================================================
 * Import Bootstrap UI Components
 * ========================================================== */
import { Modal } from 'react-bootstrap';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import { Image, Icon } from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
const LandmarkPostModal = ({post, landmark, showModal, openModal, closeModal}) => {
  const postImage = post.image_url || 'https://i.imgur.com/a53MMcb.jpg';
  const profileImage = post.profile_image || 'https://i.imgur.com/yUvX0Es.png';

  return (
    <div>
      <Modal show={showModal} onHide={closeModal} bsSize='large' dialogClassName='modal-landmark'>
        <Modal.Header closeButton className='landmark-post-modal'>
          {landmark.name}
        </Modal.Header>
        <Modal.Body>
          <Image src={postImage} style={{paddingBottom: '1rem'}} fluid />
          <div style={{paddingBottom: '1rem'}}>
            <Image floated='left' shape='circular' size='mini' src={profileImage} />
            <div>
              <Link to={`/landmark/${post.landmark_id || '1'}`}>
                <strong><Icon name='book' /> {post.story_name || 'STORY_NAME'} </strong>
              </Link>
              <Link to={`/landmark/${post.landmark_id || '1'}`}>
                <strong><Icon name='map pin' />{post.landmark_name || 'LAND_MARK'} </strong>
              </Link>
            </div>
            Submitted {getTimeSincePost(post.created_at)} by <Link to={`/profile/${post.profile_id}`}><strong>{post.profile_display}</strong></Link>
          </div>
          <div>
            {post.content}
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LandmarkPostModal;