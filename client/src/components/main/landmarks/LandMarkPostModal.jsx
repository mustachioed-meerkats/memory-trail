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
const LandmarkPostModal = ({post, landmark, showModal, openModal, closeModal}) => {
  const postImage = post.image_url || 'https://i.imgur.com/a53MMcb.jpg';

  return (
    <div>
      <Modal show={showModal} onHide={closeModal} bsSize='large' dialogClassName='modal-landmark'>
        <Modal.Header closeButton>
          <Modal.Title>
            {landmark.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={postImage} />
          <div>
            Submitted {getTimeSincePost(post.created_at)} by <Link to={`/profile/${post.profile_id}`}><strong>{post.profile_display}</strong></Link>
          </div>
          <div>
            {post.content}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button icon='heart'/>
          <Button circular icon='commenting outline' />
          <Button circular icon='share alternate' />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LandmarkPostModal;