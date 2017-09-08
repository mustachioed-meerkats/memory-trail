import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostListEntry from './PostListEntry.jsx';
import StoryListEntry from './StoryListEntry.jsx';

//Eventually, we will be using storyPosts.map

const PostList = ({posts, userPosts, StoryListClick, type, storyPosts}) => {
  if (type === 'TYPE_STORY') {
    return (
      <div style = {{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-evenly', overflowX: 'scroll'}}>     
        {userPosts.map((post, i) => { 
<<<<<<< HEAD
          return <StoryListEntry post={post} id={i} key={i} />; 
=======
          return <StoryListEntry StoryListClick = {StoryListClick} post={post} id={i} key={i}/>; 
>>>>>>> Added post click. Map Center next.
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
  userPosts: state.userPosts,
  // storyPosts: state.map.storyPosts
});


export default connect(
  mapStateToProps
)(PostList);