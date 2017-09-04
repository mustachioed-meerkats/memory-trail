import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import PostListEntry from './PostListEntry.jsx';

const PostList = ({posts}) => {
  return (
    <div>
      {posts.map((post, i) => { 
        return <PostListEntry post={post} id={i} key={i} />; 
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(
  mapStateToProps
)(PostList);