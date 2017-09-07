import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostListEntry from './PostListEntry.jsx';
import {Col} from 'react-bootstrap';
import StoryListEntry from './StoryListEntry.jsx';

const PostList = ({posts, userPosts, props, type}) => {
  if (type === 'TYPE_STORY') {
    console.log(userPosts);
    return (
      <div style = {{display:'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-evenly', overflowX: 'scroll'}}>     
        {userPosts.map((post, i) => { 
          return  <StoryListEntry post={post} id={i} key={i} />; 
        })}
      </div>
    );
  } else if (type === 'TYPE_PROFILE') {
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