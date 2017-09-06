import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import PostListEntry from './PostListEntry.jsx';

const PostList = ({posts, userPosts, type}) => {
  if (type === 'TYPE_PROFILE') {
    return (
      <div>
        {userPosts.map((post, i) => { 
          return <PostListEntry post={post} id={i} key={i} />; 
        }).slice(0, 3)}
      </div>
    );
  } else {
    return (
      <div>
        {posts.map((post, i) => { 
          return <PostListEntry post={post} id={i} key={i} />; 
        })}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  posts: state.map.markers,
  userPosts: state.userPosts

});

export default connect(
  mapStateToProps
)(PostList);