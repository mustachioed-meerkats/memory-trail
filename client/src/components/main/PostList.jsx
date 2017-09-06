import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import PostListEntry from './PostListEntry.jsx';

const PostList = ({posts, type}) => {
  if (type === 'TYPE_PROFILE') {
    return (
      <div>
        {posts.map((post, i) => { 
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
  posts: state.map.markers
});

export default connect(
  mapStateToProps
)(PostList);