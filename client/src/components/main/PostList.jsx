import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import PostListEntry from './PostListEntry.jsx';

const PostList = (props) => {
  //TEMP DATA
  //let data = [{title: 'First Post', postMemory: 'This is my first memory'}];
  //let posts = data.map((post, i) => { return <PostListEntry post={post} key={i} />; });

  return (
    <Panel collapsible defaultExpanded header="Panel Header" bsStyle="info">
      This is where posts go
    </Panel>
  );
};

//export default PostList;

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(
  mapStateToProps
)(PostList);