import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../../../styles/following.js';
import { Col, Glyphicon } from 'react-bootstrap';
import getTimeSincePost from '../../../../lib/getTimeSincePost'

const FollowingFeedListEntry = ({post}) => {
  
  // TODO: Remove this dummy data and replace with uplaoded images
  post.user = {
    avatar: 'https://avatars0.githubusercontent.com/u/11849230?v=4&s=60'
  }
  post.image = 'http://www.quotemaster.org/images/1b/1b652896515238ec56fb6a38e58c9baa.jpg';

  let postContent = '';
  if(post.content.length > 255) {
    postContent = post.content.slice(0,255) + ' ...';
  } else {
    postContent = post.content;
  }

  return (
    <div style={style.card}>
      <div>
      <img style={style.card.image} src={post.image} /> 
      </div>
      <div style={style.card.contentContainer}/>
          <div style={style.card.profile}>
            <Col md={1}>
              <img style={style.card.avatar} src={post.user.avatar} />
            </Col>
            <Col md={11}>
              <div>
                <Link to={`/profile/${post.profile_id}`}>{post.profile.display}</Link>
              </div>
              <div>
                Submitted {getTimeSincePost(post.created_at)}
              </div>
            </Col>
          </div>
          <div style={style.card.content}>
            {postContent}
          </div>
    </div>
  );
};

export default FollowingFeedListEntry;