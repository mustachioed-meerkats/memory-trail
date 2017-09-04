import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, ButtonGroup, ListGroupItem, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

const cardStyle = {
  padding: '1.5rem',
  boxShadow: '0 1px 2px #aaa',
  background: 'white',
  margin: '0 1rem 1rem',
  borderRadius: '3px',
  paddingBottom: '3em'
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 200
};

const contentStyle = {
  fontSize: '1.25rem',
  lineHeight: 2.5,
  color: 'gray',
  fontWeight: 400
};

const userStyle = {
  fontSize: '.9rem',
  lineHeight: 2.5,
  color: 'gray',
  fontWeight: 400
};

const likeButton = {
  float: 'right',
  overflow: 'hidden',
  borderWidth: '0',
  outline: 'none',
  borderRadius: '2px',
  boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
  backgroundColor: 'white',
  color: 'gray',
  transition: 'background-color .3s',
};
const getTimeSincePost = (postTime) => {
  let postDateMilliseconds = new Date(postTime).getTime();
  let currentDateMilliseconds = new Date().getTime();

  let diff = Math.abs(currentDateMilliseconds - postDateMilliseconds);
  let seconds = (diff / 1000).toFixed(0);

  if (seconds < 60) {
    return seconds + ' seconds ago ';
  } else {
    let minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + ' minutes ago ';
    } else {
      let hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return hours + ' hours ago';
      } else {
        let days = Math.floor(hours / 24);
        return days + ' days ago ';
      }
    }
  }
  return 0;
};

const PostListEntry = (props) => {
  return (
    <Row>
      <Col md={3}/>
      <Col md={5}>
        <div style={cardStyle}>
          <div style={titleStyle}>{props.post.title}</div>
          <div style={userStyle}>Submitted {getTimeSincePost('2015-03-25T12:00:00Z')} by {props.post.profile_id}</div>
          <div style={contentStyle}>{props.post.content.slice(0, 64) + ' ...'}</div>
          <Button style={likeButton}><Glyphicon glyph="bookmark" /></Button>
        </div>
      </Col>
      <Col md={3}/>
    </Row>
  );
};

export default PostListEntry;