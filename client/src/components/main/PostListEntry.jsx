import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, ButtonGroup, ListGroupItem, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

const PostListEntry = (props) => {
  return (
    <div>
      Hello from post list entry
      {props.post.title}
      {props.post.postMemory}
    </div>
  );
};

export default PostListEntry;