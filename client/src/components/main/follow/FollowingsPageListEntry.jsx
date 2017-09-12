import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../../../styles/following.js';
import { Col, Glyphicon, Button } from 'react-bootstrap';

const FollowingsPageListEntry = (props) => {
  return (
    <div style={style.card}>
      <div>{props.following.profile.display}</div>
      <div><img style={style.card.avatar} src={props.following.profile.avatar || 'https://avatars0.githubusercontent.com/u/11849230?v=4&s=60'}/></div>
      <div><Button>Unfollow</Button></div>
    </div>
  );
};

export default FollowingsPageListEntry;