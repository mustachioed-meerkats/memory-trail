import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CurrentUserPostListEntry from './CurrentUserPostListEntry.jsx';

const CurrentUserPostList = (props) => {
  var posts = props.isCurrentUser ? props.userPosts : props.otherUserPosts;
  if (!posts) {
    return (
      <div>
        Loading
      </div>
    );
  } else if (posts) {
    return (
      <div>
        {posts.map((post, i) => { 
          return <CurrentUserPostListEntry post={post} id={i} key={i} />; 
        })}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  userPosts: state.user.posts,
  otherUserPosts: state.otherUser.posts,
});

export default connect(
  mapStateToProps
)(CurrentUserPostList);